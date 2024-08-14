/**
 * Genera un array de horarios disponibles entre dos tiempos.
 * @param {string} startTime - Hora de inicio en formato "HH:mm".
 * @param {string} endTime - Hora de fin en formato "HH:mm".
 * @param {number} duration - Duración de cada bloque en minutos.
 * @param {number} breakTime - Tiempo de descanso entre bloques en minutos (por defecto 10).
 * @returns {string[]} Array de horarios disponibles en formato "HH:mm".
 */
export default function getIntervals(start, end, duration, breakTime = 10) {
  const result = [
    { label: "am", items: [] },
    { label: "pm", items: [] }
  ];

  const today = new Date();
  const utcToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));

  // Convertir start y end de string a objeto Date en UTC
  const [startHours, startMinutes] = start.split(':').map(Number);
  const [endHours, endMinutes] = end.split(':').map(Number);

  let currentTime = new Date(utcToday.setUTCHours(startHours, startMinutes, 0));
  const endTime = new Date(utcToday.setUTCHours(endHours, endMinutes, 0));

  // Si el tiempo final es antes que el inicial, asumimos que cruza la medianoche
  if (endTime <= currentTime) {
    endTime.setUTCDate(endTime.getUTCDate() + 1);
  }

  while (currentTime <= endTime) {
    // Convertir el tiempo UTC a tiempo local para el resultado
    const localTime = new Date(currentTime.toUTCString());
    const timeString = localTime.toTimeString().slice(0, 8); // Formato HH:MM:SS
    const isPM = localTime.getHours() >= 12;
    const item = { value: timeString };

    if (isPM) {
      result[1].items.push(item);
    } else {
      result[0].items.push(item);
    }

    // Avanzar el tiempo en UTC
    currentTime.setUTCMinutes(currentTime.getUTCMinutes() + duration + breakTime);

    const nextBlockEnd = new Date(currentTime);
    nextBlockEnd.setUTCMinutes(nextBlockEnd.getUTCMinutes() + duration);

    if (nextBlockEnd > endTime) {
      break;
    }
  }

  // Eliminar objetos vacíos
  return result.filter(obj => obj.items.length > 0);
}
