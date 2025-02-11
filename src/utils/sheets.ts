export const appendToSheet = async (data: any) => {
  try {
    const response = await fetch('https://v1.nocodeapi.com/azulmarino175/google_sheets/dREBFuEpQdRUHIhM?tabId=Hoja 1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([[data.name, data.email, data.phone, data.guests, data.date, data.time, data.notes]])
    });

    if (!response.ok) {
      throw new Error("Error al enviar los datos");
    }

    // Devolver un objeto con éxito para que el componente maneje la notificación
    return { success: true };
    
  } catch (error) {
    console.error("Error al enviar datos a Google Sheets:", error);
    return { success: false, error: error.message };  // Puedes devolver el error para manejarlo en el componente
  }
};
