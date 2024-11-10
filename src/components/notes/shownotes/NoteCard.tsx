import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Tooltip,
} from "@mui/material";
import AddLabelIcon from "components/icons/AddLabelIcon";
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
    handleColorTooltipClose,
    handleColorTooltipOpen,
    handleMoreTooltipClose,
    handleMoreTooltipOpen,
    isOpenColorTooltip,
    isOpenMoreTooltip,
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
              width: "190px",
              top: "95%", // Positions below the icon
              left: "20%", // Aligns with the left of the icon
              zIndex: "10", // Ensures it appears on top
              boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",
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
            <Tooltip
              open={isOpenColorTooltip}
              onClose={handleColorTooltipClose}
              onOpen={handleColorTooltipOpen}
              title="Change color"
            >
              <IconButton onClick={toggleColorPalette}>
                <PaletteOutlinedIcon className="fs-6" />
              </IconButton>
            </Tooltip>
          </div>
          <div className="col-2">
            <div className="dropdown">
              <Tooltip
                open={isOpenMoreTooltip}
                onClose={handleMoreTooltipClose}
                onOpen={handleMoreTooltipOpen}
                title="More"
              >
                <IconButton
                  onClick={onMoreClick}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <MoreVertOutlinedIcon className="fs-6" />
                </IconButton>
              </Tooltip>
              <MenuList className="dropdown-menu">
                <MenuItem>
                  <ListItemIcon>
                    <DeleteOutlinedIcon className="fs-6" />
                  </ListItemIcon>
                  <ListItemText>Delete</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <AddLabelIcon
                      style={{
                        position: "relative",
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        marginLeft: "-2px",
                        marginTop: "2px",
                      }}
                    />
                  </ListItemIcon>

                  <ListItemText>Add Labels</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <LibraryAddCheckOutlinedIcon className="fs-6" />
                  </ListItemIcon>
                  <ListItemText>Add List</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopyIcon className="fs-6" />
                  </ListItemIcon>
                  <ListItemText>Clone Note</ListItemText>
                </MenuItem>
              </MenuList>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
