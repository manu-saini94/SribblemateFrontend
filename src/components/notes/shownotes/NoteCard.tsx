import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { Button, IconButton, Tooltip } from "@mui/material";
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
        maxHeight: "53rem",
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
              className="form-control border-0 p-0 m-0 title"
              aria-label="Title"
              aria-describedby="basic-addon1"
              style={{ backgroundColor: `${updateNote.color}` }}
              value={updateNote.title}
              onClick={onNoteClick}
            />
          </div>
          <div>
            <Tooltip title={updateNote.pinned ? "Unpin" : "Pin"}>
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
            </Tooltip>
          </div>
        </div>

        <div className="input-group mb-3">
          <textarea
            readOnly
            className="form-control border-0 p-0 m-0 content"
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
          <div
            className="card border-light z-1 position-absolute"
            style={{
              top: "100%", // Positions below the icon
              left: "0", // Aligns with the left of the icon
              zIndex: "10", // Ensures it appears on top
            }}
          >
            <div className="card-body align-items-center">
              <ColorPalette />
            </div>
          </div>
        </div>
        <div className="row note-card-icon">
          <div className="col-2">
            <Tooltip title="Add Reminder">
              <IconButton onClick={onReminderClick}>
                <NotificationAddOutlinedIcon className="fs-6 " />
              </IconButton>
            </Tooltip>
          </div>
          <div className="col-2">
            <Tooltip title="Add Images">
              <IconButton onClick={onImageClick}>
                <PermMediaOutlinedIcon className="fs-6" />
              </IconButton>
            </Tooltip>
          </div>
          <div className="col-2">
            <Tooltip title="Add Collaborators">
              <IconButton onClick={onCollaboratorClick}>
                <PersonAddOutlinedIcon className="fs-6" />
              </IconButton>
            </Tooltip>
          </div>
          <div className="col-2">
            <Tooltip title="Archive note">
              <IconButton onClick={onArchiveClick}>
                <ArchiveOutlinedIcon className="fs-6" />
              </IconButton>
            </Tooltip>
          </div>
          <div className="col-2 position-relative">
            <Tooltip title="Change color">
              <IconButton onClick={toggleColorPalette}>
                <PaletteOutlinedIcon className="fs-6" />
              </IconButton>
            </Tooltip>
          </div>
          <div className="col-2">
            <Tooltip title="More">
              <div className="dropdown">
                <IconButton
                  onClick={onMoreClick}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <MoreVertOutlinedIcon className="fs-6" />
                </IconButton>
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <Button>Delete Note</Button>
                  </li>
                  <li className="dropdown-item">Delete Note</li>
                  <li className="dropdown-item">Delete Note</li>
                </ul>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
