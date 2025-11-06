import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types";
import { getProducts } from "./operations";

interface ProductsState {
  items: Product[] | undefined;
  isLoader: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  isLoader: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoader = true;
      })
      .addCase(
        getProducts.fulfilled,
        (state, { payload }: PayloadAction<Product[] | undefined>) => {
          state.isLoader = false;
          state.items = payload;
        }
      )
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoader = false;
        if (action.payload === "string") {
          state.error = action.payload;
        }
      });
  },
});

export const productsReducer = productsSlice.reducer;
