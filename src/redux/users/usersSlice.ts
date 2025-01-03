import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateCollaboratorType } from "notetypes";
import { UserDto, UsersStoreInitialStateType } from "userstypes";
import {
  addCollaborator,
  checkCollaboratorExist,
  fetchAllUsers,
} from "../asyncThunks";

const initialLoadingStates = {
  collaboratorUpdateLoading: false,
  usersFetchLoading: false,
};

const initialDataStates = {
  existingCollaborator: {} as UpdateCollaboratorType,
  collaboratorArray: [] as UpdateCollaboratorType[],
  newCollaboratorArray: [] as UpdateCollaboratorType[],
  currentCollaborator: {} as UpdateCollaboratorType,
  allUsers: [],
};

const initialErrorStates = {
  collaboratorUpdateError: "",
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
    addCollaborators(state, action: PayloadAction<UpdateCollaboratorType[]>) {
      state.collaboratorArray = [...action.payload, ...state.collaboratorArray];
      state.existingCollaborator = { id: 0, email: "", name: "" };
    },
    setNewCollaboratorArray(
      state,
      action: PayloadAction<UpdateCollaboratorType[]>
    ) {
      state.newCollaboratorArray = action.payload;
    },
    setCurrentCollaborator(
      state,
      action: PayloadAction<UpdateCollaboratorType>
    ) {
      state.currentCollaborator = action.payload;
    },
    setCollaboratorError(state, action: PayloadAction<string>) {
      state.collaboratorUpdateError = action.payload;
    },
    resetExistingCollaborator(state) {
      state.existingCollaborator = { id: 0, email: "", name: "" };
    },
    resetCollaboratorArray(state) {
      state.collaboratorArray = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkCollaboratorExist.pending, (state) => {
        state.collaboratorUpdateLoading = true;
        state.collaboratorUpdateError = "";
        state.existingCollaborator = { id: 0, email: "", name: "" };
      })
      .addCase(checkCollaboratorExist.fulfilled, (state, action) => {
        state.collaboratorUpdateLoading = false;
        state.existingCollaborator = action.payload;
        const newArray: UpdateCollaboratorType[] = [
          ...state.newCollaboratorArray,
          state.existingCollaborator,
        ];
        state.newCollaboratorArray = newArray;
        state.currentCollaborator = {
          id: 0,
          email: "",
          name: "",
        } as UpdateCollaboratorType;
        state.collaboratorUpdateError = "";
      })
      .addCase(checkCollaboratorExist.rejected, (state, action) => {
        state.collaboratorUpdateLoading = false;
        state.collaboratorUpdateError =
          action.error.message ?? "Some problem occured";
        state.existingCollaborator = { id: 0, email: "", name: "" };
      })
      .addCase(addCollaborator.pending, (state) => {
        state.collaboratorUpdateLoading = true;
        state.collaboratorUpdateError = "";
        state.existingCollaborator = { id: 0, email: "", name: "" };
      })
      .addCase(addCollaborator.fulfilled, (state, action) => {
        state.collaboratorUpdateLoading = false;
        state.existingCollaborator = action.payload;
        const newArray: UpdateCollaboratorType[] = [
          ...state.newCollaboratorArray,
          state.existingCollaborator,
        ];
        state.newCollaboratorArray = newArray;
        state.currentCollaborator = {
          id: 0,
          email: "",
          name: "",
        } as UpdateCollaboratorType;
        state.collaboratorUpdateError = "";
      })
      .addCase(addCollaborator.rejected, (state, action) => {
        state.collaboratorUpdateLoading = false;
        state.collaboratorUpdateError =
          action.error.message ?? "Some problem occured";
        state.existingCollaborator = { id: 0, email: "", name: "" };
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
