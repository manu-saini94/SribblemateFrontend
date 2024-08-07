import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { AppDispatch } from "redux/store";
import Login from "./auth/Login";
import Register from "./auth/Register";
import NavBar from "./components/navbar/NavBar";
import SideBar from "./components/sidebar/SideBar";
import Archive from "./pages/Archive";
import Notes from "./pages/Notes";
import Reminder from "./pages/Reminder";

import Trash from "pages/Trash";
import { fetchLabels } from "./redux/labels/labelSlice";
import { fetchNotes } from "./redux/notes/noteSlice";
import { fetchReminderNotes } from "./redux/reminder/reminderSlice";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(fetchNotes());
      dispatch(fetchReminderNotes());
      dispatch(fetchLabels());
    }
  }, [dispatch, token]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Register />} />
        {token ? (
          <Route path="/*" element={<MainLayout />} />
        ) : (
          <Route path="/*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

function MainLayout() {
  return (
    <div>
      <NavBar />
      <div className="d-flex">
        <div style={{ width: "270px" }}>
          <SideBar />
        </div>
        <div style={{ width: "100%" }}>
          <Routes>
            <Route path="/note" element={<Notes />} />
            <Route path="/reminder" element={<Reminder />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/trash" element={<Trash />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;