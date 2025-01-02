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
  Modal,
  Tooltip,
} from "@mui/material";
import AddLabelIcon from "components/icons/AddLabelIcon";
import { useUpdateNote } from "contexts/hooks/useUpdateNote";
import React from "react";
import { SidebarMenus } from "utility/miscsUtils";
import "../../../scss/notecard.scss";
import ColorPalette from "../colorpalette/ColorPalette";
import DisplayCollaborator from "./DisplayCollaborator";
import DisplayLabel from "./DisplayLabel";
import ModalNoteCard from "./ModalNoteCard";

function NoteCard() {
  const updateNoteContext = useUpdateNote();

  return (
    <div
      className="card "
      style={{
        maxHeight: "53rem",
        backgroundColor: `${updateNoteContext?.noteData.color}`,
        width: "15.625rem",
      }}
    >
      <Modal
        open={!!updateNoteContext?.isUpdateCardActive}
        onClose={updateNoteContext?.handleNoteCardClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ModalNoteCard />
      </Modal>
      <div className="card-body pb-2" ref={updateNoteContext?.noteRef}>
        <div className="d-flex flex-row">
          <div className="input-group mb-3">
            <input
              type="text"
              readOnly
              className="form-control border-0 p-0 m-0 title"
              aria-label="Title"
              aria-describedby="basic-addon1"
              style={{
                backgroundColor: `${updateNoteContext?.noteData?.color}`,
                cursor: "default",
              }}
              value={updateNoteContext?.noteData?.title}
            />
          </div>
          <div ref={updateNoteContext?.pinIconRef}>
            <Tooltip
              title={updateNoteContext?.noteData?.pinned ? "Unpin" : "Pin"}
            >
              <IconButton
                onClick={updateNoteContext?.onPinClick}
                style={{ marginTop: "-14px", marginRight: "-14px" }}
              >
                {updateNoteContext?.noteData?.pinned ? (
                  <PushPinIcon className="fs-4" />
                ) : (
                  <PushPinOutlinedIcon className="fs-4" />
                )}
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <div className="input-group mb-3" ref={updateNoteContext?.noteRef}>
          <textarea
            readOnly
            className="form-control border-0 p-0 m-0 content"
            placeholder="Take a note..."
            aria-label="Take a note..."
            aria-describedby="basic-addon1"
            style={{
              backgroundColor: `${updateNoteContext?.noteData?.color}`,
              resize: "none",
              overflow: "hidden",
              minHeight: "auto",
              cursor: "default",
            }}
            value={updateNoteContext?.noteData?.content}
          />
        </div>

        <div
          className="d-flex column flex-wrap"
          style={{ marginLeft: "-10px", marginBottom: "3px" }}
        >
          {updateNoteContext?.noteData?.collaboratorList?.map(
            (collaborator) => {
              return (
                <DisplayCollaborator
                  key={collaborator.email}
                  collaborator={collaborator}
                  onCollabClick={updateNoteContext?.onCollaboratorClick}
                />
              );
            }
          )}
        </div>
        <div
          className="d-flex column flex-wrap"
          style={{ marginLeft: "-10px" }}
        >
          {updateNoteContext?.noteData?.labelSet?.map((label) => {
            return (
              <DisplayLabel
                key={label.labelName}
                label={label}
                onLabelRemoveClick={updateNoteContext?.onLabelRemoveClick}
              />
            );
          })}
        </div>

        <div
          className="collapse"
          id="collapseColorPalette"
          ref={updateNoteContext?.colorPaletteRef}
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
                color={updateNoteContext?.noteData?.color}
                onChangeColor={updateNoteContext?.changeColorClick}
              />
            </div>
          </div>
        </div>

        <div className="row note-card-icon" ref={updateNoteContext?.iconsRef}>
          <div className="col-2">
            <Tooltip title="Add Reminder">
              <IconButton onClick={updateNoteContext?.onReminderClick}>
                <NotificationAddOutlinedIcon className="fs-6 " />
              </IconButton>
            </Tooltip>
          </div>
          <div className="col-2">
            <Tooltip title="Add Images">
              <IconButton onClick={updateNoteContext?.onImageClick}>
                <PermMediaOutlinedIcon className="fs-6" />
              </IconButton>
            </Tooltip>
          </div>
          <div className="col-2">
            <Tooltip title="Add Collaborators">
              <IconButton onClick={updateNoteContext?.onCollaboratorClick}>
                <PersonAddOutlinedIcon className="fs-6" />
              </IconButton>
            </Tooltip>
          </div>
          <div className="col-2">
            <Tooltip
              title={
                updateNoteContext?.activeMenu === SidebarMenus.Archive
                  ? "Unarchive note"
                  : "Archive note"
              }
            >
              <IconButton onClick={updateNoteContext?.onArchiveClick}>
                {updateNoteContext?.activeMenu === SidebarMenus.Archive ? (
                  <UnarchiveOutlinedIcon className="fs-6" />
                ) : (
                  <ArchiveOutlinedIcon className="fs-6" />
                )}
              </IconButton>
            </Tooltip>
          </div>
          <div className="col-2 position-relative">
            <Tooltip
              open={!!updateNoteContext.isOpenColorTooltip}
              onClose={updateNoteContext?.handleColorTooltipClose}
              onOpen={updateNoteContext?.handleColorTooltipOpen}
              title="Change color"
            >
              <IconButton onClick={updateNoteContext?.toggleColorPalette}>
                <PaletteOutlinedIcon className="fs-6" />
              </IconButton>
            </Tooltip>
          </div>
          <div className="col-2">
            <div className="dropdown">
              <Tooltip
                open={!!updateNoteContext.isOpenMoreTooltip}
                onClose={updateNoteContext?.handleMoreTooltipClose}
                onOpen={updateNoteContext?.handleMoreTooltipOpen}
                title="More"
              >
                <IconButton
                  onClick={updateNoteContext?.onMoreClick}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <MoreVertOutlinedIcon className="fs-6" />
                </IconButton>
              </Tooltip>
              <MenuList className="dropdown-menu">
                <MenuItem onClick={updateNoteContext?.onDeleteClick}>
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
