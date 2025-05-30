import { configureStore } from '@reduxjs/toolkit';
import tagReducer from '../features/tags/TagSlice';

const store = configureStore({
  reducer: {
    tags: tagReducer
  }
});

export default store;
