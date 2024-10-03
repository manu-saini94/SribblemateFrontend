import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
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
      <LabelOutlinedIcon
        sx={{
          fontSize: "16px", // Adjust size as needed
          color: "black",
          position: "absolute",
        }}
      />
      {/* Add Icon */}
      <AddOutlinedIcon
        sx={{
          position: "absolute",
          top: "40%",
          left: "90%",
          transform: "translate(-50%, -50%)",
          fontSize: "8px", // Adjust size as needed
          color: "black",
        }}
      />
    </Stack>
  );
};

export default AddLabelIcon;
