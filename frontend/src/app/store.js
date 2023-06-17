import { configureStore } from "@reduxjs/toolkit";
import carReducer from "../features/user/user";
import orderReducer from "../features/order/order";

export const store = configureStore({
  reducer: {
    user: carReducer,
    order: orderReducer,
  },
});
