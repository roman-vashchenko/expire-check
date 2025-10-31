import { createSlice } from "@reduxjs/toolkit";

interface FilterState {
  name: string;
}

const initialState: FilterState = {
  name: "all",
};

const filtersSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {},
});

export const filterRducer = filtersSlice.reducer;
