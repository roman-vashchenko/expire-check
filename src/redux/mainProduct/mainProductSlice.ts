import { createSlice } from "@reduxjs/toolkit";
import type { MainProduct } from "../../types";

interface ProductsState {
  product: MainProduct | null;
  isLoader: boolean;
  error: null;
}

const initialState: ProductsState = {
  product: null,
  isLoader: false,
  error: null,
};

const mainProductSlice = createSlice({
  name: "mainProduct",
  initialState,
  reducers: {},
});

export const mainProductReducer = mainProductSlice.reducer;
