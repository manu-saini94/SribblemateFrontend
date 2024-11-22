import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { IconButton, Modal, Tooltip } from "@mui/material";
import AddLabelIcon from "components/icons/AddLabelIcon";
import useNoteCard from "hooks/useNoteCard";
import { ModalNotePropsType } from "notetypes";
import React from "react";
import ColorPalette from "../colorpalette/ColorPalette";
import ListItemContent from "../takenote/ListItemContent";
import DisplayCollaborator from "./DisplayCollaborator";
import DisplayLabel from "./DisplayLabel";

const ModalNoteCard = ({
  noteCardValues,
  isUpdateCardActive,
  handleNoteCardClose,
}: ModalNotePropsType) => {
  const {
    noteData,
    loggedInUserData,
    onModalPinClick,
    isListNote,
    onLabelRemoveClick,
    handleChange,
    handleNoteSubmit,
    onLabelAddIconClick,
    onCheckboxIconClick,
    activeMenu,
    changeColorClick,
    onDeleteClick,
    colorPaletteRef,
    onPinClick,
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
  } = useNoteCard({ noteCardValues });

  return (
    <Modal
      open={!!isUpdateCardActive}
      onClose={handleNoteCardClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <form onSubmit={handleNoteSubmit}>
        <div
          className="card "
          style={{
            height: "auto",
            backgroundColor: `${noteData.color}`,
            width: "35rem",
          }}
        >
          <div className="card-body pb-2">
            <div className="d-flex flex-row">
              <div className="input-group mb-3 ">
                <input
                  type="text"
                  className="form-control border-0 p-0 m-0 title"
                  name="title"
                  placeholder="Title"
                  aria-label="Title"
                  aria-describedby="basic-addon1"
                  style={{
                    backgroundColor: `${noteData.color}`,
                  }}
                  value={noteData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="">
                <Tooltip title={noteData.pinned ? "Unpin" : "Pin"}>
                  <IconButton onClick={onModalPinClick}>
                    {noteData.pinned ? (
                      <PushPinIcon className="fs-4" />
                    ) : (
                      <PushPinOutlinedIcon className="fs-4 " />
                    )}{" "}
                  </IconButton>
                </Tooltip>
              </div>
            </div>

            <div className="input-group mb-3">
              {!isListNote ? (
                <textarea
                  className="form-control border-0 p-0 m-0 content"
                  name="content"
                  placeholder="Take a note..."
                  aria-label="Take a note..."
                  aria-describedby="basic-addon1"
                  style={{
                    backgroundColor: `${noteData.color}`,
                    resize: "none",
                    overflow: "hidden",
                    minHeight: "auto",
                  }}
                  value={noteData.content}
                  onChange={handleChange}
                  id="content"
                />
              ) : (
                <ListItemContent />
              )}
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
              id="collapsePalette"
              ref={colorPaletteRef}
            >
              <div
                className="card border-light z-1 position-absolute"
                style={{
                  width: "190px",
                  top: "95%",
                  left: "30%",
                  zIndex: "10",
                  boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div className="card-body align-items-center">
                  <ColorPalette
                    color={noteData.color}
                    onChangeColor={changeColorClick}
                  />
                </div>
              </div>
            </div>

            <div className="d-flex flex-row justify-content-between mt-1">
              <div className="col-1">
                <Tooltip title="Add Reminder">
                  <IconButton onClick={onReminderClick}>
                    <NotificationAddOutlinedIcon className="fs-6 " />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="col-1">
                <Tooltip title="Add Images">
                  <IconButton onClick={onImageClick}>
                    <PermMediaOutlinedIcon className="fs-6" />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="col-1">
                <Tooltip title="Add Collaborators">
                  <IconButton onClick={onCollaboratorClick}>
                    <PersonAddOutlinedIcon className="fs-6" />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="col-1">
                <Tooltip title="Archive note">
                  <IconButton onClick={onArchiveClick}>
                    <ArchiveOutlinedIcon className="fs-6" />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="col-1">
                <div
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsePalette"
                  aria-expanded="false"
                  aria-controls="collapsePalette"
                  className="col-2 position-relative"
                >
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
              </div>

              <div className="col-1">
                <Tooltip title="Delete note">
                  <IconButton onClick={onDeleteClick}>
                    <DeleteOutlinedIcon className="fs-6" />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="col-1">
                <Tooltip title="Add labels">
                  <IconButton onClick={onLabelAddIconClick}>
                    <AddLabelIcon
                      style={{
                        position: "relative",
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="col-1">
                <Tooltip title="Add List">
                  <IconButton onClick={onCheckboxIconClick}>
                    <LibraryAddCheckOutlinedIcon className="fs-6" />
                  </IconButton>
                </Tooltip>
              </div>
              <Tooltip title="Save note">
                <button type="submit" className="btn btn-sm fw-medium">
                  Save
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalNoteCard;
