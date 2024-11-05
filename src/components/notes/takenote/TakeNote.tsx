import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import { IconButton, Tooltip } from "@mui/material";
import { TakeNotePropsType } from "notetypes";
import React from "react";

const TakeNote = ({ onTakeNoteClick }: TakeNotePropsType) => {
  const onImageIconClick = () => {};
  const onCheckboxIconClick = () => {};

  return (
    <div className="d-flex flex-row ">
      <div className="input-group input-group-sm align-middle">
        <input
          type="text"
          className="form-control  border-opacity-75 input-box-border"
          placeholder="Take a note..."
          aria-label="Take a note..."
          aria-describedby=""
          style={{
            width: "26rem",
          }}
          onClick={onTakeNoteClick}
        />
        <span
          className="input-group-text bg-white bg-opacity-75"
          id="basic-addon1"
        >
          <Tooltip title={" New note with list"}>
            <IconButton onClick={onCheckboxIconClick}>
              <LibraryAddCheckOutlinedIcon className="fs-6" />
            </IconButton>
          </Tooltip>
        </span>
        <span
          className="input-group-text bg-white bg-opacity-75"
          id="basic-addon1"
        >
          <Tooltip title={" New note with Image"}>
            <IconButton onClick={onImageIconClick}>
              <PermMediaOutlinedIcon className="fs-6" />
            </IconButton>
          </Tooltip>
        </span>
      </div>
    </div>
  );
};

export default TakeNote;
