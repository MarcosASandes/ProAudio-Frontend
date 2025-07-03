import { configureStore } from '@reduxjs/toolkit';
import tagReducer from '../features/tags/tagSlice';
import productReducer from '../features/products/ProductSlice'
import itemReducer from "../features/items/ItemSlice";
import eventReducer from "../features/events/EventSlice"

const store = configureStore({
  reducer: {
    tags: tagReducer,
    products: productReducer,
    items: itemReducer,
    events: eventReducer,
  }
});

export default store;
