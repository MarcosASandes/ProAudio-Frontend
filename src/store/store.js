import { configureStore } from '@reduxjs/toolkit';
import tagReducer from '../features/tags/tagSlice';
import productReducer from '../features/products/ProductSlice'
import itemReducer from "../features/items/ItemSlice";
import eventReducer from "../features/events/EventSlice";
import expenseReducer from "../features/expenses/ExpenseSlice";
import parameterReducer from "../features/parameters/ParameterSlice";
import projectReducer from "../features/projects/ProjectSlice";
import authReducer from "../features/auth/AuthSlice";
import clientReducer from "../features/clients/ClientSlice";
import notificationReducer from "../features/notifications/NotificationSlice";
import analyticsReducer from "../features/analytics/AnalyticSlice";

const store = configureStore({
  reducer: {
    tags: tagReducer,
    products: productReducer,
    items: itemReducer,
    events: eventReducer,
    expenses: expenseReducer,
    parameters: parameterReducer,
    projects: projectReducer,
    auth: authReducer,
    clients: clientReducer,
    notifications: notificationReducer,
    analytics: analyticsReducer,
  }
});

export default store;
