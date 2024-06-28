import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  color: "#fff",
};

const colorSlice = createSlice({
  name: "noteColor",
  initialState,
  reducers: {
    changeColor: (state, action) => {
      state.color = action.payload;
    },
  },
});

export default colorSlice.reducer;
export const { changeColor } = colorSlice.actions;
