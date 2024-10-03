import LabelImportantTwoToneIcon from "@mui/icons-material/LabelImportantTwoTone";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import UpdateLabelCard from "./UpdateLabelCard";

const UpdateLabel = () => {
  const userLabels = useSelector((state: RootState) => state.allLabels.labels);

  return (
    <div>
      <div className="d-flex flex-wrap">
        {userLabels?.length > 0 ? (
          userLabels.map((label, index) => (
            <UpdateLabelCard label={label} key={label.id} index={index} />
          ))
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
    </div>
  );
};

export default UpdateLabel;
