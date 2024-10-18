import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateCollaboratorType } from "notetypes";
import { UserDto, UsersStoreInitialStateType } from "userstypes";
import { checkCollaboratorExist, fetchAllUsers } from "../asyncThunks";

const initialLoadingStates = {
  collaboratorExistLoading: false,
  usersFetchLoading: false,
};

const initialDataStates = {
  existingCollaborator: {} as CreateCollaboratorType,
  collaboratorArray: [] as CreateCollaboratorType[],
  newCollaboratorArray: [] as CreateCollaboratorType[],
  currentCollaborator: {} as CreateCollaboratorType,
  allUsers: [],
};

const initialErrorStates = {
  collaboratorExistError: "",
  usersFetchError: "",
};

const initialState: UsersStoreInitialStateType = {
  ...initialLoadingStates,
  ...initialDataStates,
  ...initialErrorStates,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addCollaborators(state, action: PayloadAction<CreateCollaboratorType[]>) {
      state.collaboratorArray = [...action.payload, ...state.collaboratorArray];
      state.existingCollaborator = { email: "", name: "" };
    },
    setNewCollaboratorArray(
      state,
      action: PayloadAction<CreateCollaboratorType[]>
    ) {
      state.newCollaboratorArray = action.payload;
    },
    setCurrentCollaborator(
      state,
      action: PayloadAction<CreateCollaboratorType>
    ) {
      state.currentCollaborator = action.payload;
    },
    setCollaboratorError(state, action: PayloadAction<string>) {
      state.collaboratorExistError = action.payload;
    },
    resetExistingCollaborator(state) {
      state.existingCollaborator = { email: "", name: "" };
    },
    resetCollaboratorArray(state) {
      state.collaboratorArray = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkCollaboratorExist.pending, (state) => {
        state.collaboratorExistLoading = true;
        state.collaboratorExistError = "";
        state.existingCollaborator = { email: "", name: "" };
      })
      .addCase(checkCollaboratorExist.fulfilled, (state, action) => {
        state.collaboratorExistLoading = false;
        state.existingCollaborator = action.payload;
        const newArray: CreateCollaboratorType[] = [
          ...state.newCollaboratorArray,
          state.existingCollaborator,
        ];
        state.newCollaboratorArray = newArray;
        state.currentCollaborator = {
          email: "",
          name: "",
        } as CreateCollaboratorType;
        state.collaboratorExistError = "";
      })
      .addCase(checkCollaboratorExist.rejected, (state, action) => {
        state.collaboratorExistLoading = false;
        state.collaboratorExistError =
          action.error.message ?? "Some problem occured";
        state.existingCollaborator = { email: "", name: "" };
      })

      .addCase(fetchAllUsers.pending, (state) => {
        state.usersFetchLoading = true;
        state.allUsers = [] as UserDto[];
        state.usersFetchError = "";
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.usersFetchLoading = false;
        state.allUsers = action.payload;
        state.usersFetchError = "";
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.usersFetchLoading = false;
        state.usersFetchError =
          action.error.message ?? "Unable to fetch all users";
        state.allUsers = [] as UserDto[];
      });
  },
});

export const {
  addCollaborators,
  resetExistingCollaborator,
  setNewCollaboratorArray,
  setCurrentCollaborator,
  setCollaboratorError,
  resetCollaboratorArray,
} = usersSlice.actions;
export default usersSlice.reducer;
