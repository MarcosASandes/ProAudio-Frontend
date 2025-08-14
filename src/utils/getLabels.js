export const getEnabledDisabledLabel = (status) => {
  switch (status) {
    case "ENABLED":
      return "Habilitado";
    case "DISABLED":
      return "Deshabilitado";
    default:
      return status;
  }
};

export const getItemsSortByOptionsLabel = (status) => {
  switch (status) {
    case "ID":
      return "ID";
    case "LOCATION":
      return "Ubicación";
    case "BOUGHT_AT":
      return "Fecha de compra";
    default:
      return status;
  }
};

export const getDirectionLabel = (status) => {
  switch (status) {
    case "ASC":
      return "Ascendente";
    case "DESC":
      return "Descendente";
    case "asc":
      return "Ascendente";
    case "desc":
      return "Descendente";
    default:
      return status;
  }
};

export const getItemsLocationLabel = (status) => {
  switch (status) {
    case "IN_DEPOSIT":
      return "En el depósito";
    case "USING":
      return "En uso";
    case "NOT_RETURNED":
      return "No retornado";
    default:
      return status;
  }
};

export const getItemsStatusLabel = (status) => {
  switch (status) {
    case "CREATED":
      return "Creado";
    case "DELETED":
      return "Eliminado";
    case "GOOD":
      return "Buen estado";
    case "WITH_DETAILS":
      return "Con detalles";
    case "OUT_OF_USAGE":
      return "Fuera de uso";
    default:
      return status;
  }
};

export const getProjectRunningStatusLabel = (status) => {
  switch (status) {
    case "RUNNING":
      return "En curso";
    case "PREPARING":
      return "En preparación";
    case "NONE":
      return "Pendiente";
    default:
      return status;
  }
};

export const getExpensesTypesLabel = (status) => {
  switch (status) {
    case "PERSONNEL":
      return "Personal";
    case "EXTRA_COST":
      return "Otros";
    default:
      return status;
  }
};

export const getProductStatusLabel = (status) => {
  switch (status) {
    case "ACTIVE":
      return "Activo";
    case "UNUSED":
      return "Desuso";
    case "ELIMINATED":
      return "Eliminado";
    default:
      return status;
  }
};

export const getProjectTypeLabel = (status) => {
  switch (status) {
    case "RENT":
      return "Renta";
    case "SERVICE":
      return "Servicio";
    default:
      return status;
  }
};

export const getProjectStatusLabel = (status) => {
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
    default:
      return status;
  }
};

export const getProjectPaymentStatusLabel = (status) => {
  switch (status) {
    case "BUDGETED":
      return "Presupuestado";
    case "BILL_CREATED":
      return "Factura creada";
    case "PARTIALLY_PAID":
      return "Parcialmente pagado";
    case "PAID":
      return "Pagado";
    default:
      return status;
  }
};

export const getProductTagTypeLabel = (status) => {
  switch (status) {
    case "DESCRIPTIVE":
      return "Descriptiva";
    case "RELATION":
      return "Relación";
    case "DEPENDENCY":
      return "Dependencia";
    default:
      return status;
  }
};

export const getProductsSortByOptionsLabel = (status) => {
  switch (status) {
    case "id":
      return "ID";
    case "brand":
      return "Marca";
    case "model":
      return "Modelo";
    default:
      return status;
  }
};

export const getProjectSortByOptionsLabel = (status) => {
  switch (status) {
    case "start_date":
      return "Fecha de inicio";
    case "name":
      return "Nombre";
    case "end_date":
      return "Fecha de fin";
    default:
      return status;
  }
};

export const getClientSortByOptionsLabel = (status) => {
  switch (status) {
    case "id":
      return "ID";
    case "name":
      return "Nombre";
    case "phone":
      return "Número de teléfono";
    default:
      return status;
  }
}

export const getNotificationCompletedLabel = (status) => {
  return status ? "Completada" : "Incompleta";
};

export const getNotificationSeenLabel = (is_seen) => {
  return is_seen ? "Vista" : "No vista";
};

export const getNotificationSolveLabel = (is_solve) => {
  return is_solve ? "Resuelta" : "No resuelta";
};

export const getNotificationsTypeLabel = (type) => {
  switch (type) {
    case "Project":
      return "Proyecto";
    case "Client":
      return "Cliente";
    case "Product":
      return "Producto";
    default:
      return type;
  }
}

export const getActionKeyLabel = (key) => {
  switch (key) {
    case "NOT_REQUIRED":
      return "No requerido";
    case "RETURN_ITEMS":
      return "Retorno de artículos";
    case "PAY_PROJECT":
      return "Pago de proyecto";
    case "SEND_ITEMS":
      return "Salida de artículos";
    default:
      return type;
  }
}