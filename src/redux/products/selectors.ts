import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { selectFilter } from "../filter/selectors";
import { getDiff } from "../../helpers";
import type { Product } from "../../types";

export const selectProducts = (state: RootState) => state.products.items;
export const selectIsLoader = (state: RootState) => state.products.isLoader;
export const selectFilteredProducts = createSelector(
  [selectProducts, selectFilter],
  (products, filter) => {
    if (products)
      return products.filter((product: Product) => {
        const number = getDiff(product.date);

        if (filter === "expired") return number <= 0;
        if (filter === "soon") return number > 0 && number <= 30;
        if (filter === "all") return true;

        return false;
      });
  }
);
