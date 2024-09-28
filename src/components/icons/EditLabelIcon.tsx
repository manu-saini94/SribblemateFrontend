import LabelImportantTwoToneIcon from "@mui/icons-material/LabelImportantTwoTone";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import React from "react";

function EditLabelIcon() {
  return (
    <>
      {/* Base Label Icon */}
      <NotesOutlinedIcon style={{ fontSize: "21px", color: "#3c3c3c" }} />

      <LabelImportantTwoToneIcon
        style={{
          fontSize: "18px",
          marginLeft: "-11px",
          marginTop: "9px",
          color: "#3c3c3c",
        }}
      />
      {/* Add Icon positioned over Label Icon */}
    </>
  );
}

export default EditLabelIcon;
