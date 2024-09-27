import { createSlice } from "@reduxjs/toolkit";
import { LabelStoreInitialStateType, UpdateLabelType } from "labeltypes";
import { initialLabelValue } from "utility/reduxutils/labelUtils";
import { createLabel, fetchLabels, updateLabel } from "../asyncThunks";

const initialLoadingStates = {
  loading: false,
  createdLabelLoading: false,
  updateLabelLoading: false,
};

const initialDataStates = {
  createdLabelObject: initialLabelValue,
  updateLabelObject: initialLabelValue,
  labels: [],
};

const initialErrorStates = {
  error: "",
  createdLabelError: "",
  updateLabelError: "",
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
    updateCurrentLabel(state, action) {
      state.labels.splice(action.payload, 1, state.updateLabelObject);
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
    builder.addCase(updateLabel.pending, (state) => {
      state.updateLabelLoading = true;
    });
    builder.addCase(updateLabel.fulfilled, (state, action) => {
      state.updateLabelLoading = false;
      state.updateLabelObject = action.payload;
      state.updateLabelError = "";
    });
    builder.addCase(updateLabel.rejected, (state, action) => {
      state.updateLabelLoading = false;
      state.updateLabelObject = {} as UpdateLabelType;
      state.updateLabelError = action.error.message ?? "Failed to update label";
    });
  },
});

export const { insertNewLabel, updateCurrentLabel } = labelSlice.actions;
export default labelSlice.reducer;
