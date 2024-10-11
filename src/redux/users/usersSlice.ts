import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateCollaboratorType } from "notetypes";
import { UserDto, UsersStoreInitialStateType } from "userstypes";
import { checkCollaboratorExist, fetchAllUsers } from "../asyncThunks";

const initialLoadingStates = {
  collaboratorExistLoading: false,
  usersFetchLoading: false,
};

const initialDataStates = {
  isExist: false,
  collaboratorArray: [] as CreateCollaboratorType[],
  allUsers: [],
};

const initialErrorStates = {
  collaboratorExistError: {},
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
    insertCurrentCollaborator(
      state,
      action: PayloadAction<CreateCollaboratorType>
    ) {
      if (state.isExist) {
        state.collaboratorArray.unshift(action.payload);
        state.isExist = false;
      }
    },
    setIsExistFalse(state) {
      state.isExist = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkCollaboratorExist.pending, (state) => {
        state.collaboratorExistLoading = true;
        state.collaboratorExistError = "";
        state.isExist = false;
      })
      .addCase(checkCollaboratorExist.fulfilled, (state, action) => {
        state.collaboratorExistLoading = false;
        state.isExist = action.payload;
        state.collaboratorExistError = "";
      })
      .addCase(checkCollaboratorExist.rejected, (state, action) => {
        state.collaboratorExistLoading = false;
        state.collaboratorExistError =
          action.error.message ?? "Some problem occured";
        state.isExist = false;
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

export const { insertCurrentCollaborator, setIsExistFalse } =
  usersSlice.actions;
export default usersSlice.reducer;
