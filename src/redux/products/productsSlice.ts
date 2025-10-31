import { createSlice } from "@reduxjs/toolkit";
import type MainProduct from "../../types";
import type Product from "../../types";

interface ProductsState {
  mainProduct: MainProduct | null;
  products: Product[];
  isLoader: boolean;
  error: null;
}

const initialState: ProductsState = {
  mainProduct: null,
  products: [],
  isLoader: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export const productsReducer = productsSlice.reducer;
