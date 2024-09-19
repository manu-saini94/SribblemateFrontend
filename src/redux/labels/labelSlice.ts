import { createSlice } from "@reduxjs/toolkit";
import { LabelStoreInitialStateType, UpdateLabelType } from "labeltypes";
import { initialLabelValue } from "utility/reduxutils/labelUtils";
import { createLabel, fetchLabels } from "../asyncThunks";

const initialLoadingStates = {
  loading: false,
  createdLabelLoading: false,
};

const initialDataStates = {
  createdLabelObject: initialLabelValue,
  labels: [],
};

const initialErrorStates = {
  error: "",
  createdLabelError: "",
};

const initialState: LabelStoreInitialStateType = {
  ...initialLoadingStates,
  ...initialDataStates,
  ...initialErrorStates,
};

const labelSlice = createSlice({
  name: "labels",
  initialState,
  reducers: {
    insertNewLabel(state) {
      state.labels.unshift(state.createdLabelObject);
    },
  },
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
    builder.addCase(createLabel.pending, (state) => {
      state.createdLabelLoading = true;
    });
    builder.addCase(createLabel.fulfilled, (state, action) => {
      state.createdLabelLoading = false;
      state.createdLabelObject = action.payload;
      state.createdLabelError = "";
    });
    builder.addCase(createLabel.rejected, (state, action) => {
      state.createdLabelLoading = false;
      state.createdLabelObject = {} as UpdateLabelType;
      state.createdLabelError =
        action.error.message ?? "Failed to create label";
    });
  },
});

export const { insertNewLabel } = labelSlice.actions;
export default labelSlice.reducer;
