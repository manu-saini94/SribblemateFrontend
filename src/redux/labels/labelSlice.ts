import { createSlice } from "@reduxjs/toolkit";
import {
  CreateLabelType,
  LabelStoreInitialStateType,
  UpdateLabelType,
} from "labeltypes";
import { initialLabelValue } from "utility/reduxutils/labelUtils";
import {
  createLabel,
  deleteLabel,
  fetchLabels,
  updateLabel,
} from "../asyncThunks";

const initialLoadingStates = {
  loading: false,
  createdLabelLoading: false,
  updateLabelLoading: false,
};

const initialDataStates = {
  createdLabelObject: initialLabelValue,
  updateLabelObject: initialLabelValue,
  labelArray: [] as CreateLabelType[],
  newLabelArray: [] as CreateLabelType[],
  labels: [],
  isDeleted: false,
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
    deleteCurrentLabel(state, action) {
      state.labels.splice(action.payload, 1);
    },
    insertNewLabelInNote(state, action) {
      state.labelArray.unshift(action.payload);
    },
    deleteLabelInNote(state, action) {
      state.labelArray = state.labelArray.filter(
        (label) => label.labelName !== action.payload
      );
    },
    resetLabelArray(state) {
      state.labelArray = [];
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

    builder.addCase(deleteLabel.pending, (state) => {
      state.updateLabelLoading = true;
    });
    builder.addCase(deleteLabel.fulfilled, (state, action) => {
      state.updateLabelLoading = false;
      state.isDeleted = action.payload;
      state.updateLabelError = "";
    });
    builder.addCase(deleteLabel.rejected, (state, action) => {
      state.updateLabelLoading = false;
      state.isDeleted = false;
      state.updateLabelError = action.error.message ?? "Failed to delete label";
    });
  },
});

export const {
  insertNewLabel,
  updateCurrentLabel,
  deleteCurrentLabel,
  insertNewLabelInNote,
  deleteLabelInNote,
  resetLabelArray,
} = labelSlice.actions;
export default labelSlice.reducer;
