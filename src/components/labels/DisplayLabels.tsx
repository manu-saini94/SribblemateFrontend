import LabelImportantTwoToneIcon from "@mui/icons-material/LabelImportantTwoTone";
import { labelsApi } from "api/labelsApi";
import React from "react";
import UpdateLabelCard from "./UpdateLabelCard";

const DisplayLabels = () => {
  const {
    data: userLabels,
    isLoading: isLabelsLoading,
    error: labelsError,
    isUninitialized,
    isFetching,
  } = labelsApi.endpoints.getAllLabels.useQueryState(undefined);

  return (
    <div className="container-fluid">
      {userLabels && userLabels.length > 0 ? (
        <div className="d-flex flex-wrap ">
          {userLabels?.map((label, index) => (
            <UpdateLabelCard label={label} key={label.id} index={index} />
          ))}
        </div>
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
      )}{" "}
      );
    </div>
  );
};

export default DisplayLabels;
