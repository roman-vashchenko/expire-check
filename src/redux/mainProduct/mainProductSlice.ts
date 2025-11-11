import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MainProduct } from "../../types";
import { getMainProduct } from "./operations";

interface ProductsState {
  product: MainProduct | null | undefined;
  isLoader: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  product: null,
  isLoader: false,
  error: null,
};

const mainProductSlice = createSlice({
  name: "mainProduct",
  initialState,
  reducers: {
    resetMainProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMainProduct.pending, (state) => {
        state.isLoader = true;
      })
      .addCase(
        getMainProduct.fulfilled,
        (state, { payload }: PayloadAction<MainProduct | null | undefined>) => {
          state.isLoader = false;
          state.product = payload;
          console.log(state.product);
        }
      )
      .addCase(getMainProduct.rejected, (state, action) => {
        state.isLoader = false;
        if (action.payload === "string") state.error = action.payload;
      });
  },
});

export const { resetMainProduct } = mainProductSlice.actions;
export const mainProductReducer = mainProductSlice.reducer;
