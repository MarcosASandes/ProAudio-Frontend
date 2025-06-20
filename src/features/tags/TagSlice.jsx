import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tags: [],
  tagsTypes: [],
  loading: false,
  error: null,
  selectedTag: null,
};

const TagSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    fetchTagsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTagsSuccess: (state, action) => {
      state.loading = false;
      state.tags = action.payload;
    },
    fetchTagsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedTag: (state, action) => {
      state.selectedTag = action.payload; // <-- NUEVO
    },
    clearSelectedTag: (state) => {
      state.selectedTag = null; // <-- NUEVO
    },
    updateTagInStore: (state, action) => {
      const updatedTag = action.payload;
      const index = state.tags.findIndex((t) => t.tag_id === updatedTag.tag_id);
      if (index !== -1) {
        state.tags[index] = updatedTag;
      }
    },
    addTag: (state, action) => {
      return {
        ...state,
        tags: [...state.tags, action.payload], // ✅ sin mutar el array original
      };
    },
    deleteTagStore: (state, action) => {
      return {
        ...state,
        tags: state.tags.filter((tag) => tag.tag_id !== action.payload), // ✅ sin mutar
      };
    },
    setTagsTypeInStore: (state, action) => {
      state.tagsTypes = action.payload;
    },
  },
});

export const {
  fetchTagsStart,
  fetchTagsSuccess,
  fetchTagsFailure,
  setSelectedTag,
  clearSelectedTag,
  updateTagInStore,
  addTag,
  deleteTagStore,
  setTagsTypeInStore,
} = TagSlice.actions;

export default TagSlice.reducer;
