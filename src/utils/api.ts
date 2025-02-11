const NOCODE_API_URL = import.meta.env.VITE_NOCODEAPI_URL
const MAX_GUESTS = 65; // Maximum simultaneous guests.

export const fetchAvailableTimeSlots = async (date: string): Promise<string[]> => {
  try {
    const response = await fetch(NOCODE_API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener reservas: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("🔎 Respuesta completa de NoCodeAPI:", data);

    if (!Array.isArray(data.data)) {
      throw new Error("Formato de respuesta inválido");
    }

    // Formatear la fecha de entrada
    const inputDate = new Date(date);
    const formattedDate = `${inputDate.getDate().toString().padStart(2, '0')}/${(inputDate.getMonth() + 1).toString().padStart(2, '0')}/${inputDate.getFullYear().toString()}`;

    console.log("📆 Fecha formateada para comparar:", formattedDate);

    // Filtrar reservas por la fecha seleccionada
    const reservations = data.data.filter((row: { date: string; }) => row.date?.trim() === formattedDate);

    console.log("📅 Reservas filtradas para la fecha", formattedDate, ":", reservations);

    // Inicializar un contador de ocupación para cada franja horaria de 30 minutos
    const timeSlotsOccupation: Record<string, number> = {
      "21:00": 0,
      "21:30": 0,
      "22:00": 0,
      "22:30": 0,
      "23:00": 0,
      "23:30": 0
    };

    // Contabilizar las franjas horarias ocupadas por cada reserva de 1h30
    reservations.forEach((res: { time: { toString: () => string; }; guests: { toString: () => string; }; }) => {
      const time = res.time?.toString().trim();
      const guests = parseInt(res.guests?.toString().trim() || "0", 10); // Obtener el número de comensales
      if (time && guests > 0) {
        // Calcular las franjas de 30 minutos ocupadas por la reserva de 1h30
        const occupiedSlots = getOccupiedSlotsForBooking(time);
        occupiedSlots.forEach(slot => {
          if (timeSlotsOccupation[slot] !== undefined) {
            timeSlotsOccupation[slot] += guests; // Añadir comensales ocupados
          }
        });
      }
    });

    console.log("📊 Ocupación de franjas horarias:", timeSlotsOccupation);

    // Filtrar franjas horarias que tienen menos de MAX_GUESTS comensales ocupados
    const availableSlots = Object.keys(timeSlotsOccupation)
      .filter(slot => timeSlotsOccupation[slot] < MAX_GUESTS);

    // Bloquear la franja siguiente si alcanzamos el límite de comensales (65)
    const blockedSlots = new Set<string>();
    availableSlots.forEach(slot => {
      if (timeSlotsOccupation[slot] >= MAX_GUESTS) {
        // Si la franja está llena, bloquear la siguiente
        const nextSlot = getNextSlot(slot);
        if (nextSlot) {
          blockedSlots.add(nextSlot);
        }
      }
    });

    // Filtrar los slots disponibles sin los bloqueados
    const finalAvailableSlots = availableSlots.filter(slot => !blockedSlots.has(slot));

    console.log("✅ Horarios disponibles:", finalAvailableSlots);

    return finalAvailableSlots;

  } catch (error) {
    console.error("🚨 Error al obtener horarios disponibles:", error);
    return [];
  }
};

// Esta función devuelve las franjas ocupadas por una reserva de 1h30, dado el horario de inicio
function getOccupiedSlotsForBooking(startTime: string): string[] {
  const slots: string[] = [];
  const startDate = new Date(`2025-02-12T${startTime}:00`);

  // Las reservas de 1h30 ocupan tres franjas de 30 minutos
  for (let i = 0; i < 3; i++) {
    const slot = new Date(startDate.getTime() + i * 30 * 60 * 1000); // Añadimos 30 minutos a la hora de inicio
    const hour = slot.getHours().toString().padStart(2, '0');
    const minute = slot.getMinutes().toString().padStart(2, '0');
    slots.push(`${hour}:${minute}`);
  }

  return slots;
}

// Obtener la siguiente franja horaria de 30 minutos a partir de una hora dada
function getNextSlot(currentSlot: string): string | null {
  const times = ["21:00", "21:30", "22:00", "22:30", "23:00", "23:30"];
  const index = times.indexOf(currentSlot);
  return index >= 0 && index < times.length - 1 ? times[index + 1] : null;
}
