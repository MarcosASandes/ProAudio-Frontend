import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tags: [],
  loading: false,
  error: null
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
    }
  }
});

export const { fetchTagsStart, fetchTagsSuccess, fetchTagsFailure } = TagSlice.actions;

export default TagSlice.reducer;
