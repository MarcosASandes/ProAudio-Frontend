/*export const getActionSolutionRoute = (notification) => {
  const notifType = notification?.type;
  const id = notification?.entity_id;
  const actionKey = notification?.action?.key;

  if (actionKey) {
    if (notifType === "Project") {
      switch (actionKey) {
        case "SEND_ITEMS":
          return `/project/${id}/outlet`;
        case "RETURN_ITEMS":
          return `/project/${id}/return`;
        case "PAY_PROJECT":
          return `/project/${id}`;
        default:
          return "default";
      }
    }
    return "";
  }
};*/

/*----------------------------- */


const routesByType = {
  PROJECT: {
    SEND_ITEMS: (id) => `/project/${id}/outlet`,
    RETURN_ITEMS: (id) => `/project/${id}/return`,
    PAY_PROJECT: (id) => `/project/${id}`,
  },
};

export const getActionSolutionRoute = (notification) => {
  const notifType = notification?.type;
  const id = notification?.entity_id;
  const actionKey = notification?.action?.action_key;
  const routeFn = routesByType[notifType]?.[actionKey];
  return routeFn ? routeFn(id) : null;
};