import { configureStore } from '@reduxjs/toolkit';
import tagReducer from '../features/tags/tagSlice';
import productReducer from '../features/products/ProductSlice'

const store = configureStore({
  reducer: {
    tags: tagReducer,
    products: productReducer
  }
});

export default store;
