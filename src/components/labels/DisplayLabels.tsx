import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import UpdateLabelCard from "./UpdateLabelCard";

const DisplayLabels = () => {
  const userLabels = useSelector((state: RootState) => state.allLabels.labels);
  return (
    <div className="d-flex flex-wrap ">
      {userLabels.map((label, index) => (
        <UpdateLabelCard label={label} key={label.id} index={index} />
      ))}
    </div>
  );
};

export default DisplayLabels;
