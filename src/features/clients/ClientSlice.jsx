import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clients: [],
  pageable: null,
  selectedClient: null,
  selectedClientDetails: null,
  loading: false,
  error: null,
};

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setClients: (state, action) => {
      state.clients = action.payload.clients;
    },
    clearClients: (state) => {
      state.clients = null;
    },
    fetchClientsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchClientsSuccess: (state, action) => {
      state.loading = false;
      state.clients = action.payload.clients;
      state.pageable = action.payload.pageable;
      state.error = null;
    },
    fetchClientsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedClientDetails: (state, action) => {
      state.selectedClientDetails = action.payload;
    },
    setSelectedClient: (state, action) => {
      state.selectedClient = action.payload;
    },
    removeClient: (state, action) => {
      return {
        ...state,
        clients: state.clients.filter(
          (client) => client.client_id !== action.payload
        ),
      };
    },
    addClient: (state, action) => {
      return {
        ...state,
        clients: [...state.clients, action.payload],
      };
    },
    updateClientInStore: (state, action) => {
      const updatedClient = action.payload;
      return {
        ...state,
        clients: state.clients.map((client) =>
          client.client_id === updatedClient.client_id ? updatedClient : client
        ),
      };
    },
  },
});

export const {
    setClients,
    clearClients,
    fetchClientsStart,
    fetchClientsSuccess,
    fetchClientsFailure,
    setSelectedClientDetails,
    setSelectedClient,
    removeClient,
    addClient,
    updateClientInStore,
} = clientSlice.actions;

export default clientSlice.reducer;
