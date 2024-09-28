import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import { IconButton } from "@mui/material";
import { TakeNotePropsType } from "notetypes";
import React from "react";

const TakeNote = ({ onTakeNoteClick }: TakeNotePropsType) => {
  const onImageIconClick = () => {};

  return (
    <div className="card" style={{ height: "50px" }}>
      <div className="card-body ">
        <div className="d-flex flex-row ">
          <div className="d-flex input-group align-middle">
            <input
              type="text"
              className="form-control border-0 p-0 m-0"
              placeholder="Take a note..."
              aria-label="Take a note..."
              aria-describedby=""
              style={{
                width: "28rem",
              }}
              onClick={onTakeNoteClick}
            />
          </div>
          <div>
            <IconButton onClick={onImageIconClick}>
              <PermMediaOutlinedIcon className="take-note-card " />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeNote;
