import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./products/productsSlice";
import { filterRducer } from "./filter/filterSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filter: filterRducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
