import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { IconButton, Tooltip } from "@mui/material";
import useModalLabelCard from "hooks/useModalLabelCard";
import React from "react";

const LabelUpdateCard = () => {
  const {
    labelArray,
    labels,
    handleBackClick,
    handleCloseClick,
    handleExcludeLabelClick,
    handleIncludeLabelClick,
  } = useModalLabelCard();

  return (
    <form>
      <div
        className="card "
        style={{
          height: "auto",
          width: "35rem",
        }}
      >
        <div className="card-header d-flex" style={{ fontWeight: "2px" }}>
          <div style={{ marginLeft: "-8px" }}>
            <Tooltip title={"Back To Note"}>
              <IconButton onClick={handleBackClick}>
                <ArrowBackRoundedIcon />
              </IconButton>
            </Tooltip>
          </div>
          <span style={{ marginTop: "8px", marginLeft: "2px" }}>Labels</span>
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
                    <IconButton onClick={() => handleExcludeLabelClick(label)}>
                      <CheckBoxOutlinedIcon style={{ color: "green" }} />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => handleIncludeLabelClick(label)}>
                      <CheckBoxOutlineBlankOutlinedIcon />
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

export default LabelUpdateCard;
