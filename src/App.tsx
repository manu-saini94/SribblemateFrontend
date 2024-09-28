import AllLabelledNotes from "pages/AllLabelledNotes";
import EditLabels from "pages/EditLabels";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { AppDispatch } from "redux/store";
import NavBar from "./components/navbar/NavBar";
import SideBar from "./components/sidebar/SideBar";
import Archive from "./pages/Archive";
import Label from "./pages/Label";
import Login from "./pages/Login";
import Notes from "./pages/Notes";
import Register from "./pages/Register";
import Reminder from "./pages/Reminder";
import Trash from "./pages/Trash";
import { fetchLabels, fetchNotes } from "./redux/asyncThunks";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  });

  useEffect(() => {
    if (token) {
      dispatch(fetchNotes());
      dispatch(fetchLabels());
    }
  }, [dispatch, token]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
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
            <Route path="/labellednotes" element={<AllLabelledNotes />} />
            <Route path="/editlabels" element={<EditLabels />} />
            <Route path={`/label/:labelId`} element={<Label />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
