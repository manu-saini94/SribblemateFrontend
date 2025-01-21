import { useLazyGetAllLabelsQuery } from "api/labelsApi";
import {
  useLazyFetchNotesByLabelsQuery,
  useLazyGetAllNotesQuery,
} from "api/notesApi";
import NavBar from "components/navbar/NavBar";
import SideBar from "components/sidebar/SideBar";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { setLoaderState } from "../redux/global/globalSlice";
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

  const queryOptions = {
    refetchOnReconnect: true,
    refetchOnFocus: false,
  };
  const [triggerFetchNotes, { isLoading: isNotesLoading, error: notesError }] =
    useLazyGetAllNotesQuery(queryOptions);

  const [
    triggerFetchLabels,
    { isLoading: isLabelsLoading, error: labelsError },
  ] = useLazyGetAllLabelsQuery(queryOptions);

  const [
    triggerFetchNotesByLabels,
    { isLoading: isNotesByLabelsLoading, error: isNotesByLabelsError },
  ] = useLazyFetchNotesByLabelsQuery(queryOptions);

  useEffect(() => {
    dispatch(
      setLoaderState(
        isNotesLoading || isNotesByLabelsLoading || isLabelsLoading
      )
    );
  }, [dispatch, isLabelsLoading, isNotesByLabelsLoading, isNotesLoading]);

  useEffect(() => {
    if (loggedInUserData?.userDto?.id !== -1) {
      triggerFetchNotes();
      triggerFetchLabels();
      triggerFetchNotesByLabels();
    } else {
      // dispatch(checkAuthorizedUser())
      //   .unwrap()
      //   .then(() => {
      //     if (Object.keys(loggedInUserData).length !== 0) {
      //     }
      //   })
      //   .catch((error) => {
      //     console.error("Authorization failed:", error);
      //   });
    }
  }, [
    dispatch,
    loggedInUserData,
    triggerFetchLabels,
    triggerFetchNotes,
    triggerFetchNotesByLabels,
  ]);

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
