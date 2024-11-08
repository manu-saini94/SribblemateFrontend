import NavBar from "components/navbar/NavBar";
import SideBar from "components/sidebar/SideBar";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { RootState } from "redux/store";
import AllLabelledNotes from "./AllLabelledNotes";
import Archive from "./Archive";
import EditLabels from "./EditLabels";
import Label from "./Label";
import Notes from "./Notes";
import Reminder from "./Reminder";
import Trash from "./Trash";

const MainLayout = () => {
  const isSideBarCollapsed = useSelector(
    (state: RootState) => state.menus.isSideBarCollapsed
  );

  return (
    <div
      className="scroll-overflow custom-scrollbar"
      style={{ minHeight: "100vh" }}
    >
      <NavBar />
      <div className="d-flex" style={{ marginTop: "65px" }}>
        <div
          style={{
            width: isSideBarCollapsed ? "0px" : "270px",
            transition: "width 0.3s ease",
          }}
        >
          <SideBar />
        </div>
        <div
          style={{
            width: isSideBarCollapsed ? "100%" : "calc(100% - 310px)", // Adjust width based on sidebar state
            marginLeft: isSideBarCollapsed ? "40px" : "20px",
            transition: "width 0.3s ease, margin-left 0.3s ease",
            minHeight: "100vh",
          }}
        >
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
};

export default MainLayout;
