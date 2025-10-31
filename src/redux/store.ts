import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./products/productsSlice";
import { filterRducer } from "./filter/filterSlice";
import { mainProductReducer } from "./mainProduct/mainProductSlice";

export const store = configureStore({
  reducer: {
    mainProduct: mainProductReducer,
    products: productsReducer,
    filter: filterRducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
