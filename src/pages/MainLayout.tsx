import NavBar from "components/navbar/NavBar";
import SideBar from "components/sidebar/SideBar";
import React from "react";
import { Route, Routes } from "react-router-dom";
import AllLabelledNotes from "./AllLabelledNotes";
import Archive from "./Archive";
import EditLabels from "./EditLabels";
import Label from "./Label";
import Notes from "./Notes";
import Reminder from "./Reminder";
import Trash from "./Trash";

const MainLayout = () => {
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
};

export default MainLayout;
