import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import LabelImportantTwoToneIcon from "@mui/icons-material/LabelImportantTwoTone";
import { AddLabelIconProps } from "global";

import React from "react";

const AddLabelIcon = ({ style }: AddLabelIconProps) => {
  return (
    <div style={style}>
      {/* Label Icon */}
      <LabelImportantTwoToneIcon
        sx={{
          fontSize: "18px", // Adjust size as needed
          color: "#404040",
          position: "absolute",
          left: "3%",
        }}
      />
      {/* Add Icon */}
      <AddOutlinedIcon
        sx={{
          position: "absolute",
          top: "12%",
          left: "84%",
          transform: "translate(-50%, -50%)",
          fontSize: "10px", // Adjust size as needed
          color: "black",
        }}
      />
    </div>
  );
};

export default AddLabelIcon;
