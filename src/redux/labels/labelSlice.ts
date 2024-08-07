import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LabelStoreInitialStateType } from "storetypes";
import { getAllLabelsByUser } from "../../api/services";

const initialState: LabelStoreInitialStateType = {
  loading: false,
  labels: [],
  error: "",
};

export const fetchLabels = createAsyncThunk("labels/fetchLabels", () => {
  return getAllLabelsByUser().then((response) => response.data.object);
});

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
      state.error = action.error.message || "Failed to fetch labels";
    });
  },
});

export default labelSlice.reducer;
