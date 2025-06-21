import { configureStore } from '@reduxjs/toolkit';
import tagReducer from '../features/tags/tagSlice';
import productReducer from '../features/products/ProductSlice'
import itemReducer from "../features/items/ItemSlice";

const store = configureStore({
  reducer: {
    tags: tagReducer,
    products: productReducer,
    items: itemReducer,
  }
});

export default store;
