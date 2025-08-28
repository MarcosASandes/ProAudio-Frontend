export function formatDateToDDMMYY(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

export function formatDateToYYYYMMDD(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatearFecha(fechaISO) {
  const fecha = new Date(fechaISO);

  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const anio = fecha.getFullYear();

  const horas = String(fecha.getHours()).padStart(2, '0');
  const minutos = String(fecha.getMinutes()).padStart(2, '0');

  return `${dia}/${mes}/${anio} (${horas}:${minutos})`;
}

export const formatDateToDatetimeLocal = (input) => {
  if (!input) return "";

  // ya en formato correcto
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(input)) return input;

  // Si viene un ISO con segundos o zona (ej: 2025-09-05T00:00:00 o 2025-09-05T00:00:00Z)
  const isoMatch = input.match(
    /^(\d{4}-\d{2}-\d{2})[T ]?(\d{2}):(\d{2})(?::\d{2}(?:\.\d+)?)?(Z|[+-]\d{2}:\d{2})?$/
  );
  if (isoMatch) {
    return `${isoMatch[1]}T${isoMatch[2]}:${isoMatch[3]}`;
  }

  // Fallback: intentar con Date (podría ajustar zona horaria)
  const d = new Date(input);
  if (!isNaN(d.getTime())) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  // Si no se pudo parsear, devolver vacío para evitar valores inválidos
  return "";
};