import { configureStore } from '@reduxjs/toolkit';
import tagReducer from '../features/tags/tagSlice';

const store = configureStore({
  reducer: {
    tags: tagReducer
  }
});

export default store;
