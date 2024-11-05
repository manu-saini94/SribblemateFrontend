import LabelImportantTwoToneIcon from "@mui/icons-material/LabelImportantTwoTone";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import React from "react";

function LabelledNotesMenuIcon() {
  return (
    <>
      <NotesOutlinedIcon style={{ fontSize: "21px", color: "black" }} />

      <LabelImportantTwoToneIcon
        style={{
          fontSize: "13px",
          marginLeft: "-9px",
          marginTop: "10px",
          color: "black",
        }}
      />
    </>
  );
}

export default LabelledNotesMenuIcon;
