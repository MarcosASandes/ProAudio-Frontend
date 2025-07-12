import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  paymentStatus: [],
  projectStatus: [],
  pageable: null,
  selectedProject: null,
  loading: false,
  error: null,
  selectProjectDetails: null,
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
      state.paymentStatus = action.payload;
    },
    setProjectStatusInStore: (state, action) => {
      state.projectStatus = action.payload;
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
} = projectSlice.actions;

export default projectSlice.reducer;
