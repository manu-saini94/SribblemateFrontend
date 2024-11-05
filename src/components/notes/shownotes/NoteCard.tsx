import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { IconButton } from "@mui/material";
import useNoteCard from "hooks/useNoteCard";
import { NoteCardPropsType } from "notetypes";
import React from "react";
import "../../../scss/notecard.scss";
import ColorPalette from "../colorpalette/ColorPalette";

function NoteCard({ noteCardValues, onNoteClick }: NoteCardPropsType) {
  const {
    updateNote,
    setUpdateNote,
    takeNoteDetailsRef,
    openPalette,
    setOpenPalette,
    colorPaletteRef,
    onPinClick,
    handleTitleClick,
    handleContentClick,
    onCollaboratorClick,
    onReminderClick,
    onArchiveClick,
    onMoreClick,
    onImageClick,
    toggleColorPalette,
  } = useNoteCard({ noteCardValues, onNoteClick });

  return (
    <div
      className="card "
      style={{
        height: "auto",
        backgroundColor: `${updateNote.color}`,
        width: "15.625rem",
      }}
      ref={takeNoteDetailsRef}
    >
      <div className="card-body pb-2">
        <div className="d-flex flex-row ">
          <div className="input-group mb-3">
            <input
              type="text"
              readOnly
              className="form-control border-0 p-0 m-0"
              aria-label="Title"
              aria-describedby="basic-addon1"
              style={{ backgroundColor: `${updateNote.color}` }}
              value={updateNote.title}
              onClick={onNoteClick}
            />
          </div>
          <div>
            <IconButton
              onClick={onPinClick}
              style={{ marginTop: "-14px", marginRight: "-14px" }}
            >
              {updateNote.pinned ? (
                <PushPinIcon className="fs-6 " />
              ) : (
                <PushPinOutlinedIcon className="fs-6 " />
              )}
            </IconButton>
          </div>
        </div>

        <div className="input-group mb-3">
          <textarea
            readOnly
            className="form-control border-0 p-0 m-0"
            placeholder="Take a note..."
            aria-label="Take a note..."
            aria-describedby="basic-addon1"
            style={{
              backgroundColor: `${updateNote.color}`,
              resize: "none",
              overflow: "hidden",
              minHeight: "auto",
            }}
            value={updateNote.content}
            onClick={onNoteClick}
          />
        </div>
        <div
          className="collapse"
          id="collapseColorPalette"
          ref={colorPaletteRef}
        >
          <div className="card border-light z-1 position-absolute">
            <div className="card-body align-items-center ">
              <ColorPalette />
            </div>
          </div>
        </div>
        <div className="row note-card-icon">
          <div className="col-2">
            <IconButton onClick={onReminderClick}>
              <NotificationAddOutlinedIcon className="fs-6 " />
            </IconButton>
          </div>
          <div className="col-2">
            <IconButton onClick={onImageClick}>
              <PermMediaOutlinedIcon className="fs-6" />
            </IconButton>
          </div>
          <div className="col-2">
            <IconButton onClick={onCollaboratorClick}>
              <PersonAddOutlinedIcon className="fs-6" />
            </IconButton>
          </div>
          <div className="col-2">
            <IconButton onClick={onArchiveClick}>
              <ArchiveOutlinedIcon className="fs-6" />
            </IconButton>
          </div>
          <div className="col-2">
            <IconButton onClick={toggleColorPalette}>
              <PaletteOutlinedIcon className="fs-6" />
            </IconButton>
          </div>
          <div className="col-2">
            <IconButton onClick={onMoreClick}>
              <MoreVertOutlinedIcon className="fs-6" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
