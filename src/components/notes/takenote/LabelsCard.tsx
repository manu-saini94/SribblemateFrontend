import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { IconButton } from "@mui/material";
import useAddLabelCard from "hooks/useAddLabelCard";
import { LabelCardPropsType } from "notetypes";
import React from "react";

const LabelsCard = ({ changeActiveCard }: LabelCardPropsType) => {
  const {
    handleCloseClick,
    labelArray,
    labels,
    handleIncludeLabelClick,
    handleExcludeLabelClick,
  } = useAddLabelCard({
    changeActiveCard,
  });

  return (
    <form>
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
        <div className="scroll-overflow my-1 custom-scrollbar">
          <div
            className="d-flex column flex-wrap mx-1"
            style={{ width: "100%" }}
          >
            {labels.map((label) => {
              return (
                <div
                  key={label.labelName}
                  className="d-flex mt-1"
                  style={{ width: "33%", justifyContent: "flex-start" }}
                >
                  {labelArray.find(
                    (labelItem) => label.labelName === labelItem.labelName
                  ) ? (
                    <IconButton>
                      <CheckBoxOutlinedIcon
                        style={{ color: "green" }}
                        onClick={() => handleExcludeLabelClick(label)}
                      />
                    </IconButton>
                  ) : (
                    <IconButton>
                      <CheckBoxOutlineBlankOutlinedIcon
                        onClick={() => handleIncludeLabelClick(label)}
                      />
                    </IconButton>
                  )}
                  <div style={{ marginTop: "9px", marginLeft: "1px" }}>
                    {label.labelName}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="d-flex justify-content-end mx-2 my-2">
          <button
            onClick={handleCloseClick}
            className="btn btn-sm fw-medium card-button mx-2"
          >
            Close
          </button>
        </div>
      </div>
    </form>
  );
};

export default LabelsCard;
