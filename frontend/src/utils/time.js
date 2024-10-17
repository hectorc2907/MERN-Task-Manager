// Función para ajustar la hora de una fecha
export const adjustTime = (date, hoursOffset) => {
  // Crea un nuevo objeto Date basado en la fecha proporcionada
  const adjustedDate = new Date(date);

  // Ajusta las horas de la fecha sumando el desplazamiento horario
  adjustedDate.setHours(adjustedDate.getHours() + hoursOffset);

  // Devuelve la fecha ajustada
  return adjustedDate;
};
