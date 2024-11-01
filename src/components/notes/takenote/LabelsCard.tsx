import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import useAddLabelCard from "hooks/useAddLabelCard";
import { LabelCardPropsType } from "notetypes";
import React from "react";

const LabelsCard = ({ changeActiveCard }: LabelCardPropsType) => {
  const { handleLabelSubmit, handleCancelClick, labelArray, labels } =
    useAddLabelCard({
      changeActiveCard,
    });

  return (
    <form onSubmit={handleLabelSubmit}>
      <div
        className="card "
        style={{
          height: "auto",
          width: "35rem",
        }}
      >
        <div className="card-header " style={{ fontWeight: "2px" }}>
          Add Labels
        </div>
        <div className="overflow-y-h-auto">
          {labels.map((label) => {
            return (
              <div key={label.labelName} className="d-flex mt-1">
                <div className="" style={{ color: "gray" }}>
                  <CheckBoxOutlineBlankOutlinedIcon />
                </div>
                <div className="mx-1" style={{ marginTop: "1.2px" }}>
                  {label.labelName}
                </div>
              </div>
            );
          })}
        </div>
        <div className="d-flex justify-content-end mx-2 my-2">
          <button
            onClick={(event) => handleCancelClick(event)}
            className="btn btn-sm fw-medium card-button mx-2"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-sm fw-medium card-button">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default LabelsCard;
