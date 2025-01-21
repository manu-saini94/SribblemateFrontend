import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { IconButton, Tooltip } from "@mui/material";
import AddLabelIcon from "components/icons/AddLabelIcon";
import useModalNoteCard from "hooks/useModalNoteCard";
import React from "react";
import ColorPalette from "../colorpalette/ColorPalette";
import DisplayCollaborator from "../shownotes/DisplayCollaborator";
import DisplayLabel from "../shownotes/LabelChip";
import ListItemContent from "../takenote/ListItemContent";

const NoteUpdateCard = () => {
  const {
    activeCard,
    updateNoteContext,
    changeActiveCard,
    noteRef,
    onLabelRemoveClick,
    noteData,
    loggedInUserData,
    onModalPinClick,
    iconsRef,
    pinIconRef,
    onCheckboxIconClick,
    isListNote,
    onLabelAddIconClick,
    handleChange,
    handleNoteSubmit,
    isUpdateCardActive,
    handleNoteCardClose,
    handleNoteCardClick,
    activeMenu,
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
    checkForChange,
    getEditedDate,
  } = useModalNoteCard();
  return (
    <form onSubmit={updateNoteContext?.handleNoteSubmit}>
      <div
        className="card "
        style={{
          height: "auto",
          backgroundColor: `${noteData?.color}`,
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
                  backgroundColor: `${updateNoteContext?.noteData?.color}`,
                }}
                value={updateNoteContext?.noteData?.title}
                onChange={updateNoteContext?.handleChange}
              />
            </div>
            <div className="">
              <Tooltip
                title={updateNoteContext?.noteData?.pinned ? "Unpin" : "Pin"}
              >
                <IconButton onClick={updateNoteContext?.onModalPinClick}>
                  {updateNoteContext?.noteData?.pinned ? (
                    <PushPinIcon className="fs-4" />
                  ) : (
                    <PushPinOutlinedIcon className="fs-4 " />
                  )}{" "}
                </IconButton>
              </Tooltip>
            </div>
          </div>

          <div className="input-group mb-3">
            {!updateNoteContext?.isListNote ? (
              <textarea
                className="form-control border-0 p-0 m-0 content"
                name="content"
                placeholder="Take a note..."
                aria-label="Take a note..."
                aria-describedby="basic-addon1"
                style={{
                  backgroundColor: `${updateNoteContext?.noteData?.color}`,
                  resize: "none",
                  overflow: "hidden",
                  minHeight: "auto",
                }}
                value={updateNoteContext?.noteData?.content}
                onChange={updateNoteContext?.handleChange}
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
            id="collapsePalette"
            ref={updateNoteContext?.colorPaletteRef}
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
                  color={updateNoteContext?.noteData?.color}
                  onChangeColor={updateNoteContext?.changeColorClick}
                />
              </div>
            </div>
          </div>

          {updateNoteContext?.noteData?.updatedAt !== null && (
            <div
              className="d-flex justify-content-end"
              style={{ fontSize: "10px", color: "#212529" }}
            >
              <div className="column">
                <span>Edited:</span>
                <span>{updateNoteContext?.getEditedDate()}</span>
              </div>
              {/* <div className="column">
        <span>by:</span>
        <span>{noteData?.updatedBy?.email}</span>
      </div> */}
            </div>
          )}

          <div className="d-flex flex-row justify-content-between mt-1">
            <div className="col-1">
              <Tooltip title="Add Reminder">
                <IconButton onClick={updateNoteContext?.onReminderClick}>
                  <NotificationAddOutlinedIcon className="fs-6 " />
                </IconButton>
              </Tooltip>
            </div>
            <div className="col-1">
              <Tooltip title="Add Images">
                <IconButton onClick={updateNoteContext?.onImageClick}>
                  <PermMediaOutlinedIcon className="fs-6" />
                </IconButton>
              </Tooltip>
            </div>
            <div className="col-1">
              <Tooltip title="Add Collaborators">
                <IconButton onClick={updateNoteContext?.onCollaboratorClick}>
                  <PersonAddOutlinedIcon className="fs-6" />
                </IconButton>
              </Tooltip>
            </div>
            <div className="col-1">
              <Tooltip title="Archive note">
                <IconButton onClick={updateNoteContext?.onArchiveClick}>
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
                  open={!!updateNoteContext?.isOpenColorTooltip}
                  onClose={updateNoteContext?.handleColorTooltipClose}
                  onOpen={updateNoteContext?.handleColorTooltipOpen}
                  title="Change color"
                >
                  <IconButton onClick={updateNoteContext?.toggleColorPalette}>
                    <PaletteOutlinedIcon className="fs-6" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>

            <div className="col-1">
              <Tooltip title="Delete note">
                <IconButton onClick={updateNoteContext?.onDeleteClick}>
                  <DeleteOutlinedIcon className="fs-6" />
                </IconButton>
              </Tooltip>
            </div>
            <div className="col-1">
              <Tooltip title="Add labels">
                <IconButton onClick={updateNoteContext?.onLabelAddIconClick}>
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
                <IconButton onClick={updateNoteContext?.onCheckboxIconClick}>
                  <LibraryAddCheckOutlinedIcon className="fs-6" />
                </IconButton>
              </Tooltip>
            </div>
            <Tooltip
              title={
                updateNoteContext?.checkForChange() ? "Save Note" : "Close Note"
              }
            >
              <button
                type={updateNoteContext?.checkForChange() ? "submit" : "button"}
                className="btn btn-sm fw-medium"
                onClick={
                  updateNoteContext?.checkForChange()
                    ? () => {}
                    : updateNoteContext?.handleNoteCardClose
                }
              >
                {updateNoteContext?.checkForChange() ? "Save" : "Close"}
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NoteUpdateCard;
