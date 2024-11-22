import LabelImportantTwoToneIcon from "@mui/icons-material/LabelImportantTwoTone";
import { Chip } from "@mui/material";
import { DisplayLabelTypes } from "labeltypes";
import React, { useState } from "react";

const DisplayLabel = (props: DisplayLabelTypes) => {
  const { label, onLabelRemoveClick } = props;
  const [isOverChip, setIsOverChip] = useState<Boolean>(false);

  const onMouseOver = () => {
    setIsOverChip(true);
  };

  const onMouseExit = () => {
    setIsOverChip(false);
  };

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
      label={
        <span
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: isOverChip ? "clip" : "ellipsis", // Full label on hover
            display: "inline-block",
            maxWidth: isOverChip ? "auto" : "100px", // Adjust maxWidth
            transition: "all 0.2s ease-in-out", // Smooth transition
          }}
        >
          {label.labelName}
        </span>
      }
      sx={{
        marginLeft: "4px",
        marginBottom: "4px",
      }}
      key={label.labelName}
      size="small"
      onDelete={isOverChip && onLabelRemoveClick}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseExit}
    />
  );
};

export default DisplayLabel;
