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
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
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
import { DateTime } from "luxon";
import { NoteCardPropsType } from "notetypes";
import React from "react";
import { SidebarMenus } from "utility/miscsUtils";
import "../../../scss/notecard.scss";
import ColorPalette from "../colorpalette/ColorPalette";
import DisplayCollaborator from "./DisplayCollaborator";
import DisplayLabel from "./DisplayLabel";
import ModalNoteCard from "./ModalNoteCard";

function NoteCard({ noteCardValues }: NoteCardPropsType) {
  const {
    noteData,
    noteRef,
    iconsRef,
    pinIconRef,
    isUpdateCardActive,
    handleNoteCardClose,
    onLabelRemoveClick,
    handleNoteCardClick,
    activeMenu,
    changeColorClick,
    colorPaletteRef,
    onPinClick,
    onDeleteClick,
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
    loggedInUserData,
  } = useNoteCard({ noteCardValues });

  return (
    <div
      className="card "
      style={{
        maxHeight: "53rem",
        backgroundColor: `${noteData.color}`,
        width: "15.625rem",
      }}
    >
      <div>
        <ModalNoteCard
          noteCardValues={noteData}
          isUpdateCardActive={isUpdateCardActive}
          handleNoteCardClose={handleNoteCardClose}
        />
      </div>
      <div className="card-body pb-2" ref={noteRef}>
        <div className="d-flex flex-row">
          <div className="input-group mb-3">
            <input
              type="text"
              readOnly
              className="form-control border-0 p-0 m-0 title"
              aria-label="Title"
              aria-describedby="basic-addon1"
              style={{
                backgroundColor: `${noteData.color}`,
                cursor: "default",
              }}
              value={noteData.title}
            />
          </div>
          <div ref={pinIconRef}>
            <Tooltip title={noteData.pinned ? "Unpin" : "Pin"}>
              <IconButton
                onClick={onPinClick}
                style={{ marginTop: "-14px", marginRight: "-14px" }}
              >
                {noteData.pinned ? (
                  <PushPinIcon className="fs-4" />
                ) : (
                  <PushPinOutlinedIcon className="fs-4" />
                )}
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <div className="input-group mb-3" ref={noteRef}>
          <textarea
            readOnly
            className="form-control border-0 p-0 m-0 content"
            placeholder="Take a note..."
            aria-label="Take a note..."
            aria-describedby="basic-addon1"
            style={{
              backgroundColor: `${noteData.color}`,
              resize: "none",
              overflow: "hidden",
              minHeight: "auto",
              cursor: "default",
            }}
            value={noteData.content}
          />
        </div>

        <div
          className="d-flex column flex-wrap"
          style={{ marginLeft: "-10px", marginBottom: "3px" }}
        >
          {noteData?.collaboratorList?.map((collaborator) => {
            return (
              <DisplayCollaborator
                key={collaborator.email}
                collaborator={collaborator}
                onCollabClick={onCollaboratorClick}
              />
            );
          })}
        </div>
        <div
          className="d-flex column flex-wrap"
          style={{ marginLeft: "-10px" }}
        >
          {noteData?.labelSet?.map((label) => {
            return (
              <DisplayLabel
                key={label.labelName}
                label={label}
                onLabelRemoveClick={onLabelRemoveClick}
              />
            );
          })}
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
              top: "95%",
              left: "20%",
              zIndex: "10",
              boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div className="card-body align-items-center">
              <ColorPalette
                color={noteData?.color}
                onChangeColor={changeColorClick}
              />
            </div>
          </div>
        </div>
        <div className="row" style={{ fontSize: "10px", color: "#212529" }}>
          <div className="column">
            <span>Edited:</span>
            <span>
              {(() => {
                const updatedDate = DateTime.fromISO(noteData?.updatedAt);
                const now = DateTime.local();

                if (updatedDate.hasSame(now, "day")) {
                  return `Today ${updatedDate.toFormat("HH:mm")}`;
                } else if (updatedDate.hasSame(now.minus({ days: 1 }), "day")) {
                  return `Yesterday ${updatedDate.toFormat("HH:mm")}`;
                } else {
                  return updatedDate.toFormat("MMM dd, HH:mm");
                }
              })()}
            </span>
          </div>
          {/* <div className="column">
            <span>by:</span>
            <span>{noteData?.updatedBy?.email}</span>
          </div> */}
        </div>
        <div className="row note-card-icon" ref={iconsRef}>
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
            <Tooltip
              title={
                activeMenu === SidebarMenus.Archive
                  ? "Unarchive note"
                  : "Archive note"
              }
            >
              <IconButton onClick={onArchiveClick}>
                {activeMenu === SidebarMenus.Archive ? (
                  <UnarchiveOutlinedIcon className="fs-6" />
                ) : (
                  <ArchiveOutlinedIcon className="fs-6" />
                )}
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
                <MenuItem onClick={onDeleteClick}>
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
