import AddIcon from "@mui/icons-material/Add";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import { IconButton } from "@mui/material";
import React from "react";

function AddLabelIcon() {
  return (
    <IconButton style={{ position: "relative" }}>
      {/* Base Label Icon */}
      <LabelOutlinedIcon style={{ fontSize: 20, color: "#000" }} />
      {/* Add Icon positioned over Label Icon */}
      <AddIcon
        style={{
          fontSize: 15,
          color: "black",
          position: "absolute",
          top: 11,
          right: 12,

          borderRadius: "50%",
        }}
      />
    </IconButton>
  );
}

export default AddLabelIcon;
