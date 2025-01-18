import NavBar from "components/navbar/NavBar";
import SideBar from "components/sidebar/SideBar";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import {
  checkAuthorizedUser,
  fetchLabels,
  fetchNotes,
  fetchNotesByLabels,
} from "../redux/asyncThunks";
import { AppDispatch, RootState } from "../redux/store";
import Archive from "./Archive";
import EditLabels from "./EditLabels";
import LabelledNotes from "./LabelledNotes";
import LabelNotes from "./LabelNotes";
import Notes from "./Notes";
import Reminder from "./Reminder";
import Trash from "./Trash";

const MainLayout = () => {
  const isSideBarCollapsed = useSelector(
    (state: RootState) => state.menus.isSideBarCollapsed
  );

  const dispatch = useDispatch<AppDispatch>();
  const loggedInUserData = useSelector(
    (state: RootState) => state.auth.loggedInUserData
  );

  useEffect(() => {
    if (Object.keys(loggedInUserData).length !== 0) {
      dispatch(fetchNotes());
      dispatch(fetchLabels());
      dispatch(fetchNotesByLabels());
    } else {
      dispatch(checkAuthorizedUser())
        .unwrap()
        .then(() => {
          if (Object.keys(loggedInUserData).length !== 0) {
          }
        })
        .catch((error) => {
          console.error("Authorization failed:", error);
        });
    }
  }, [dispatch, loggedInUserData]);

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
            width: isSideBarCollapsed ? "100%" : "calc(100% - 310px)",
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
            <Route path="/labellednotes" element={<LabelledNotes />} />
            <Route path="/editlabels" element={<EditLabels />} />
            <Route path={`/label/:labelId`} element={<LabelNotes />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
