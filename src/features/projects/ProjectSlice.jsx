import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  paymentStatus: [],
  projectStatus: [],
  startingProjectStatus: [],
  projectTypes: [],
  pageable: null,
  selectedProject: null,
  loading: false,
  error: null,
  selectProjectDetails: null,
  allStatuses: [],
  allPaymentStatuses: [],
  allRunningStatuses: [],
  outletItems: [],
  outletProducts: [],
  returnItems: [],
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    fetchProjectsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProjectsSuccess: (state, action) => {
      state.loading = false;
      state.projects = action.payload.projects;
      state.pageable = action.payload.pageable;
      state.error = null;
    },
    fetchProjectsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    clearSelectedProject: (state) => {
      state.selectedProject = null;
    },
    setSelectedProjectDetails: (state, action) => {
      state.selectProjectDetails = action.payload;
    },
    clearSelectedProjectDetails: (state) => {
      state.selectProjectDetails = null;
    },
    addProject: (state, action) => {
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    },
    removeProject: (state, action) => {
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.project_id !== action.payload
        ),
      };
    },
    updateProjectInStore: (state, action) => {
      const updatedProject = action.payload;
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.project_id === updatedProject.project_id
            ? updatedProject
            : project
        ),
      };
    },
    setPaymentStatusInStore: (state, action) => {
      state.paymentStatus = action.payload.payment_statuses;
    },
    setProjectStatusInStore: (state, action) => {
      state.projectStatus = action.payload.statuses;
    },
    setProjectTypesInStore: (state, action) => {
      state.projectTypes = action.payload.types;
    },
    setStartingProjectStatusInStore: (state, action) => {
      state.startingProjectStatus = action.payload;
    },
    setAllStatusesInStore: (state, action) => {
      state.allStatuses = action.payload.statuses;
    },
    setAllPaymentStatusesInStore: (state, action) => {
      state.allPaymentStatuses = action.payload.payment_statuses;
    },
    setAllRunningStatusesInStore: (state, action) => {
      state.allRunningStatuses = action.payload.running_statuses;
    },

    setOutletItemsInStore: (state, action) => {
      state.outletItems = action.payload;
    },
    setReturnItemsInStore: (state, action) => {
      state.returnItems = action.payload;
    },
    addItemToOutletInStore: (state, action) => {
      console.log(
        `En el reducer addItemToOutletInStore llega: ${action.payload}`
      );
      return {
        ...state,
        outletItems: [...state.outletItems, action.payload],
      };
    },
    removeItemToOutletInStore: (state, action) => {
      const item = action.payload;
      const { item_id, product_id } = item;

      state.outletItems = state.outletItems.filter(
        (i) => i.item_id !== item_id
      );

      const isAnotherItemOfSameProduct = state.outletItems.some(
        (i) => i.product_id === product_id
      );

      if (!isAnotherItemOfSameProduct) {
        state.outletProducts = state.outletProducts.filter(
          (p) => p.product_id !== product_id
        );
      }
    },

    setOutletProductsInStore: (state, action) => {
      state.outletProducts = action.payload.items;
    },
    addProductToOutletInStore: (state, action) => {
      const isExist = state.outletProducts.some(
        (producto) => producto.product_id === action.payload.product_id
      );

      if (!isExist) {
        state.outletProducts.push(action.payload);
      }
    },

    returnItemToDepositInStore: (state, action) => {
      const item = action.payload;
      const { item_id, product_id } = item;

      state.returnItems.push(item);

      state.outletItems = state.outletItems.filter(
        (i) => i.item_id !== item_id
      );

      const isAnotherItemOfSameProduct = state.outletItems.some(
        (i) => i.product_id === product_id
      );

      if (!isAnotherItemOfSameProduct) {
        state.outletProducts = state.outletProducts.filter(
          (p) => p.product_id !== product_id
        );
      }
    },
  },
});

export const {
  fetchProjectsStart,
  fetchProjectsSuccess,
  fetchProjectsFailure,
  setSelectedProject,
  clearSelectedProject,
  setSelectedProjectDetails,
  clearSelectedProjectDetails,
  addProject,
  removeProject,
  updateProjectInStore,
  setPaymentStatusInStore,
  setProjectTypesInStore,
  setStartingProjectStatusInStore,
  setProjectStatusInStore,
  setAllStatusesInStore,
  setAllPaymentStatusesInStore,
  setAllRunningStatusesInStore,
  setOutletItemsInStore,
  addItemToOutletInStore,
  removeItemToOutletInStore,
  setOutletProductsInStore,
  addProductToOutletInStore,
  returnItemToDepositInStore,setReturnItemsInStore,
} = projectSlice.actions;

export default projectSlice.reducer;
