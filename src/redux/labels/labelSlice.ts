import { createSlice } from "@reduxjs/toolkit";
import { LabelStoreInitialStateType } from "labeltypes";
import { fetchLabels } from "../asyncThunks";

const initialState: LabelStoreInitialStateType = {
  loading: false,
  labels: [],
  error: "",
};

const labelSlice = createSlice({
  name: "labels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLabels.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLabels.fulfilled, (state, action) => {
      state.loading = false;
      state.labels = action.payload;
      state.error = "";
    });
    builder.addCase(fetchLabels.rejected, (state, action) => {
      state.loading = false;
      state.labels = [];
      state.error = action.error.message ?? "Failed to fetch labels";
    });
  },
});

export default labelSlice.reducer;
