import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import LabelImportantTwoToneIcon from "@mui/icons-material/LabelImportantTwoTone";

import { Stack } from "@mui/material";
import React from "react";

const AddLabelIcon = () => {
  return (
    <Stack
      sx={{
        position: "relative",
        display: "inline-block",
        width: "20px", // Adjust based on icon size
        height: "20px",
      }}
    >
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
    </Stack>
  );
};

export default AddLabelIcon;
