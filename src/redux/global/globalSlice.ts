import { createSlice } from "@reduxjs/toolkit";
import { GlobalStoreInitialStateType } from "global";
import { SidebarMenus } from "utility/miscsUtils";

const initialLoadingStates = {
  loading: false,
};

const initialDataStates = {
  isSideBarCollapsed: false,
  isMenuBarCollapsed: false,
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
    setMenuBarCollapse(state) {
      state.isMenuBarCollapsed = !state.isMenuBarCollapsed;
    },
    setSideBarCollapse(state) {
      state.isSideBarCollapsed = !state.isSideBarCollapsed;
    },
  },
  extraReducers: (builder) => {},
});

export const { setCurrentActiveMenu, setMenuBarCollapse, setSideBarCollapse } =
  globalSlice.actions;
export default globalSlice.reducer;
