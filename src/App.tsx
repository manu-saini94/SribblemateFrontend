import MainLayout from "pages/MainLayout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AppDispatch, RootState } from "redux/store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  checkAuthorizedUser,
  fetchLabels,
  fetchNotes,
} from "./redux/asyncThunks";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const loggedInUserData = useSelector(
    (state: RootState) => state.auth.loggedInUserData
  );

  useEffect(() => {
    if (Object.keys(loggedInUserData).length !== 0) {
      dispatch(fetchNotes());
      dispatch(fetchLabels());
    } else {
      dispatch(checkAuthorizedUser())
        .unwrap() // unwrap to directly get the resolved/rejected action
        .then(() => {
          if (Object.keys(loggedInUserData).length !== 0) {
            // dispatch(fetchNotes());
            // dispatch(fetchLabels());
          }
        })
        .catch((error) => {
          console.error("Authorization failed:", error);
        });
    }
  }, [dispatch, loggedInUserData]);

  // useEffect(() => {
  //   dispatch(refreshAccessToken());
  // }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
