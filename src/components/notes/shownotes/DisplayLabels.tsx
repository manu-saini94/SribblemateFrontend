import LabelImportantTwoToneIcon from "@mui/icons-material/LabelImportantTwoTone";
import { Chip } from "@mui/material";
import { DisplayLabelTypes } from "labeltypes";
import React from "react";

const DisplayLabels = (props: DisplayLabelTypes) => {
  const { labelSet, onLabelRemoveClick } = props;
  return (
    <div className="d-flex column flex-wrap" style={{ marginLeft: "-10px" }}>
      {labelSet?.map((label) => {
        return (
          <Chip
            icon={
              <LabelImportantTwoToneIcon
                style={{
                  color: label.important ? "#ffc61a" : "",
                  fontSize: "16px",
                }}
              />
            }
            label={label.labelName}
            sx={{
              marginLeft: "4px",
              marginBottom: "4px",
            }}
            key={label.labelName}
            size="small"
            onDelete={onLabelRemoveClick}
          />
        );
      })}
    </div>
  );
};

export default DisplayLabels;
