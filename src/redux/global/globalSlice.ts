import { createSlice } from "@reduxjs/toolkit";
import { GlobalStoreInitialStateType } from "global";
import { SidebarMenus } from "utility/miscsUtils";

const initialDataStates = {
  isSideBarCollapsed: false,
  isMenuBarCollapsed: false,
  isUpdating: false,
  activeMenu: SidebarMenus.Notes,
};

const initialErrorStates = {
  error: "",
};

const initialState: GlobalStoreInitialStateType = {
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
    setMenuBarCollapse(state) {
      state.isMenuBarCollapsed = !state.isMenuBarCollapsed;
    },
    setSideBarCollapse(state) {
      state.isSideBarCollapsed = !state.isSideBarCollapsed;
    },
    setLoaderState(state, action) {
      state.isUpdating = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setCurrentActiveMenu,
  setMenuBarCollapse,
  setSideBarCollapse,
  setLoaderState,
} = globalSlice.actions;
export default globalSlice.reducer;
