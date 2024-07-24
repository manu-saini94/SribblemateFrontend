import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Archive from "./components/archive/Archive";
import NavBar from "./components/navbar/NavBar";
import Notes from "./components/notes/Notes";
import Reminder from "./components/reminder/Reminder";
import SideBar from "./components/sidebar/SideBar";
import Trash from "./components/trash/Trash";
import { fetchLabels } from "./redux/labels/labelSlice";
import { fetchNotes } from "./redux/notes/noteSlice";
import { fetchReminderNotes } from "./redux/reminder/reminderSlice";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const dispatch = useDispatch();

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
        <Route path="/" exact element={<Login setToken={setToken} />} />
        <Route path="/login" exact element={<Login setToken={setToken} />} />
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
