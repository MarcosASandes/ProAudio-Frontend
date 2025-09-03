export const selectClients = (state) => state.clients.clients;
export const selectSelectedClient = (state) => state.clients.selectedClient;
export const selectSelectedClientDetails = (state) => state.clients.selectedClientDetails;
export const selectClientsPageable = (state) => state.clients.pageable;
export const selectClientsLoading = (state) => state.clients.loading;
export const selectClientsError = (state) => state.clients.error;