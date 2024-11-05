import LabelImportantTwoToneIcon from "@mui/icons-material/LabelImportantTwoTone";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import React from "react";
const NoLabelledNotesIcon = () => {
  return (
    <>
      <NotesOutlinedIcon style={{ fontSize: "90px", color: "lightgray" }} />

      <LabelImportantTwoToneIcon
        style={{
          fontSize: "50px",
          marginTop: "-44px",
          marginLeft: "70px",
          color: "lightgray",
        }}
      />
    </>
  );
};

export default NoLabelledNotesIcon;
