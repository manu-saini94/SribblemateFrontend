import { createSlice } from "@reduxjs/toolkit";
import { UpdateCollaboratorType } from "notetypes";
import { CollaboratorStoreInitialStateType } from "userstypes";

const initialLoadingStates = {
  collaboratorExistLoading: false,
};

const initialDataStates = {
  existingCollaborator: {} as UpdateCollaboratorType,
  collaboratorArray: [] as UpdateCollaboratorType[],
  newCollaboratorArray: [] as UpdateCollaboratorType[],
  currentCollaborator: {} as UpdateCollaboratorType,
};

const initialErrorStates = {
  collaboratorExistError: "",
};

const initialState: CollaboratorStoreInitialStateType = {
  ...initialLoadingStates,
  ...initialDataStates,
  ...initialErrorStates,
};

const collaboratorSlice = createSlice({
  name: "collaborators",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default collaboratorSlice;
