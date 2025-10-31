import type { RootState } from "../store";

export const selectMainProducts = (state: RootState) =>
  state.products.mainProduct;
export const selectProducts = (state: RootState) => state.products.products;
export const isLoader = (state: RootState) => state.products.isLoader;
