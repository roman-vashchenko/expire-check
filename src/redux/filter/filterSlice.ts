import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type FilterName = "all" | "soon" | "expired";

const initialState = "all" as FilterName;

const filtersSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilter: (_state, { payload }: PayloadAction<FilterName>) => {
      return payload;
    },
  },
});

export const { changeFilter } = filtersSlice.actions;
export const filterRducer = filtersSlice.reducer;
