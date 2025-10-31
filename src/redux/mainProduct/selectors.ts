import type { RootState } from "../store";

export const selectMainProduct = (state: RootState) =>
  state.mainProduct.product;
