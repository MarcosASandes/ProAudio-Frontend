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
  const month = String(date.getMonth() + 1).padStart(2, "0"); // +1 porque los meses van de 0 a 11
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
