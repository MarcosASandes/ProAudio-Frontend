export const getStatusLabel = (status) => {
  switch (status) {
    case "PLANNED":
      return "Planificado";
    case "CONFIRMED":
      return "Confirmado";
    case "ON_COURSE":
      return "En curso";
    case "COMPLETED":
      return "Completado";
    case "EXPIRED":
      return "Expirado";
    case "DISCARDED":
      return "Descartado";
    case "BUDGETED":
      return "Presupuestado";
    case "BILL_CREATED":
      return "Factura creada";
    case "PARCIALLY_PAID":
      return "Parcialmente pagado";
    default:
      return status;
  }
};
