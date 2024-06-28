import { configureStore } from "@reduxjs/toolkit";
import colorReducer from "./notes/color/colorSlice";
import noteReducer from "./notes/noteSlice";
// const store = createStore(rootReducer, applyMiddleware(thunk));

const store = configureStore({
  reducer: {
    noteColor: colorReducer,
    allNotes: noteReducer,
  },
});

export default store;
