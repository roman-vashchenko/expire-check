import { createAsyncThunk } from "@reduxjs/toolkit";
// import type Product from "../../types";
import { get, ref, remove, set } from "firebase/database";
import { db } from "../../firebase/firebase";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import type { newProduct, Product } from "../../types";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const productsRef = ref(db, "products");
      const snapshot = await get(productsRef);
      const data = snapshot.val();
      const exists: Product[] = data ? Object.values(data) : [];
      return exists;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProducts",
  async (data: newProduct, { rejectWithValue }) => {
    try {
      const newProduct: Product = {
        id: uuidv4(),
        ...data,
      };
      const productsRef = ref(db, `products/${newProduct.id}`);
      await set(productsRef, newProduct);

      toast.success("Артикул додано", {
        iconTheme: {
          primary: "rgb(118, 181, 204)",
          secondary: "#2196f3",
        },
      });
      return newProduct;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error occurred");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId: string, { rejectWithValue }) => {
    try {
      const product = ref(db, `products/${productId}`);

      await remove(product);
      toast.success("Артикул видалено", {
        iconTheme: {
          primary: "rgb(118, 181, 204)",
          secondary: "#2196f3",
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);
