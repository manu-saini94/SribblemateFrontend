import { createSlice } from "@reduxjs/toolkit";
import { GlobalStoreInitialStateType } from "global";
import { SidebarMenus } from "utility/miscsUtils";

const initialLoadingStates = {
  loading: false,
};

const initialDataStates = {
  activeMenu: SidebarMenus.Notes,
};

const initialErrorStates = {
  error: "",
};

const initialState: GlobalStoreInitialStateType = {
  ...initialLoadingStates,
  ...initialDataStates,
  ...initialErrorStates,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setCurrentActiveMenu(state, action) {
      state.activeMenu = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setCurrentActiveMenu } = globalSlice.actions;
export default globalSlice.reducer;
