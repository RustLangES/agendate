/**
 * Genera un array de horarios disponibles entre dos tiempos.
 * @param {string} startTime - Hora de inicio en formato "HH:mm".
 * @param {string} endTime - Hora de fin en formato "HH:mm".
 * @param {number} duration - Duración de cada bloque en minutos.
 * @param {number} breakTime - Tiempo de descanso entre bloques en minutos (por defecto 10).
 * @returns {string[]} Array de horarios disponibles en formato "HH:mm".
 */
export default function getIntervals(date, start, end, duration, breakTime = 10) {
  const result = [ ];

  const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

  // Convertir start y end de string a objeto Date en UTC
  const [startHours, startMinutes] = start.split(':').map(Number);
  const [endHours, endMinutes] = end.split(':').map(Number);

  // UTC to Localtime
  let currentTime = new Date(utcDate.setUTCHours(startHours, startMinutes, 0));
  const endTime = new Date(utcDate.setUTCHours(endHours, endMinutes, 0));

  // Si el tiempo final es antes que el inicial, asumimos que cruza la medianoche
  if (endTime <= currentTime) {
    endTime.setUTCDate(endTime.getUTCDate() + 1);
  }

  while (currentTime <= endTime) {
    // Convertir el tiempo UTC a tiempo local para el resultado
    const timeString = currentTime.toLocaleTimeString([], {
      hourCycle: 'h23',
      hour: '2-digit',
      minute: '2-digit'
    }); // Formato HH:MM

    result.push({ value: timeString, utc: currentTime.toUTCString() });

    // Avanzar el tiempo en UTC
    currentTime.setUTCMinutes(currentTime.getUTCMinutes() + duration + breakTime);

    const nextBlockEnd = new Date(currentTime);
    nextBlockEnd.setUTCMinutes(nextBlockEnd.getUTCMinutes() + duration);

    if (nextBlockEnd > endTime) {
      break;
    }
  }

  // Eliminar objetos vacíos
  return result
}
