import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, ref } from "firebase/database";
import type { MainProduct } from "../../types";
import { db } from "../../firebase/firebase";

export const getMainProduct = createAsyncThunk(
  "mainProduct/getMainProduct",
  async (code: string, { rejectWithValue }) => {
    try {
      const product = ref(db, `allProducts/${code}`);
      const snapshot = await get(product);
      if (snapshot.exists()) {
        const product: MainProduct = snapshot.val();
        return product;
      } else {
        return null;
      }
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);
