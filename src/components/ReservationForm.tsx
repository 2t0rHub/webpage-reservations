import React, { useState, useEffect, useCallback } from 'react';
import { fetchAvailableTimeSlots } from '../utils/api';
import { appendToSheet } from '../utils/sheets';

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  notes: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: '2',
  notes: ''
};

interface Notification {
  type: 'success' | 'error';
  message: string;
}

export function ReservationForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [isFetchingSlots, setIsFetchingSlots] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [notification, setNotification] = useState<Notification | null>(null);

  // Función para mostrar notificaciones (éxito o error) por 3 segundos
  const showNotification = useCallback((type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }, []);

  // Se utiliza la función formatTime para formatear las franjas horarias
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  // Cuando cambia la fecha, se obtienen las franjas horarias disponibles desde el backend
  useEffect(() => {
    if (formData.date) {
      const fetchSlots = async () => {
        setIsFetchingSlots(true);
        try {
          // Se asume que fetchAvailableTimeSlots devuelve un array de franjas disponibles
          const slots = await fetchAvailableTimeSlots(formData.date);
          setAvailableTimeSlots(slots);
        } catch (error) {
          console.error("Error fetching time slots:", error);
          showNotification('error', 'Error fetching available time slots. Please try again.');
        } finally {
          setIsFetchingSlots(false);
        }
      };
      fetchSlots();
    } else {
      setAvailableTimeSlots([]);
    }
  }, [formData.date, showNotification]);

  // Handler para actualizar los campos del formulario
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Handler para el envío del formulario
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      
      // Se envían los datos a la hoja de Google Sheets
      const result = await appendToSheet({
        ...formData
      });

      if (result.success) {
        showNotification('success', 'Thank you for your reservation! We will contact you shortly to confirm.');
        setFormData(initialFormData);
        setAvailableTimeSlots([]);
      } else {
        throw new Error('Failed to submit reservation');
      }
    } catch (error) {
      console.error('Error submitting reservation:', error);
      showNotification('error', 'Sorry, there was an error submitting your reservation. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, showNotification]);

  return (
    <section id="reserve" className="py-24 px-4 bg-gradient-to-b from-stone-50 to-stone-100">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-stone-800">Make a Reservation</h2>
        
        {notification && (
          <div className={`mb-4 p-4 rounded ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {notification.message}
          </div>
        )}

        {(isFetchingSlots || isSubmitting) && (
          <div className="text-center mb-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-yellow-500 border-t-transparent"></div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-300 bg-white/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-300 bg-white/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                pattern=".*[0-9].*"  // Solo permite números
                title="Solamente se aceptan números en este campo."
                className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-300 bg-white/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Number of Guests</label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-300 bg-white/50"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Date</label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                max={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-300 bg-white/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Time</label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                disabled={!formData.date || isFetchingSlots}
                className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-300 bg-white/50 disabled:opacity-50"
              >
                <option value="">Select a time</option>
                {availableTimeSlots.map(time => (
                  <option key={time} value={time}>
                    {formatTime(time)}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-sm text-stone-500">
                Our dinner service starts at 21:00 (9 PM) and runs until 23:30 (11:30 PM)
              </p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Special Requests</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-300 bg-white/50"
            ></textarea>
          </div>
          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting || isFetchingSlots}
              className="bg-yellow-500 text-stone-900 px-12 py-4 rounded-full text-lg font-semibold hover:bg-yellow-400 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : 'Reserve Now'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
