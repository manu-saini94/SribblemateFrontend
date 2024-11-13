import LabelImportantTwoToneIcon from "@mui/icons-material/LabelImportantTwoTone";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import DisplayLabels from "./DisplayLabels";

const UpdateLabel = () => {
  const userLabels = useSelector((state: RootState) => state.allLabels.labels);

  return (
    <div className="container-fluid">
      {userLabels?.length > 0 ? (
        <DisplayLabels />
      ) : (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <LabelImportantTwoToneIcon
            className=""
            style={{ fontSize: "100px", color: "lightgray" }}
          />
          <span style={{ fontSize: "25px", color: "lightgray" }}>
            You have no labels yet.
          </span>
          <span style={{ fontSize: "25px", color: "lightgray" }}>
            Start creating some!
          </span>
        </div>
      )}
    </div>
  );
};

export default UpdateLabel;
