import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Archive from "./components/archive/Archive";
import NavBar from "./components/navbar/NavBar";
import Notes from "./components/notes/Notes";
import Reminder from "./components/reminder/Reminder";
import SideBar from "./components/sidebar/SideBar";
import Trash from "./components/trash/Trash";
import store from "./redux/store";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </Provider>
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
