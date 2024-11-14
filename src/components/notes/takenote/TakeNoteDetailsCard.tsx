import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import LabelImportantTwoToneIcon from "@mui/icons-material/LabelImportantTwoTone";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { Chip, IconButton, Tooltip } from "@mui/material";
import AddLabelIcon from "components/icons/AddLabelIcon";
import useTakeNoteDetails from "hooks/useTakeNoteDetails";
import { TakeNoteDetailsPropsType } from "notetypes";
import React from "react";
import ColorPalette from "../colorpalette/ColorPalette";
import ListItemContent from "./ListItemContent";

const TakeNoteDetailsCard = ({
  toggleTakeNoteActive,
  changeActiveCard,
}: TakeNoteDetailsPropsType) => {
  const {
    isListNote,
    labelArray,
    colorPaletteRef,
    takeNoteDetailsRef,
    toggleColorPalette,
    onCheckboxIconClick,
    onDeleteIconClick,
    onLabelAddIconClick,
    onReminderIconClick,
    onImageIconClick,
    onCollaboratorIconClick,
    onArchiveClick,
    onPinClick,
    handleNoteSubmit,
    textareaRef,
    handleContentChange,
    createNoteContext,
    collaboratorArray,
    isOpenColorTooltip,
    handleColorTooltipClose,
    handleColorTooltipOpen,
  } = useTakeNoteDetails({ toggleTakeNoteActive, changeActiveCard });

  return (
    <form onSubmit={handleNoteSubmit}>
      <div
        className="card "
        style={{
          height: "auto",
          backgroundColor: `${createNoteContext.noteData?.color}`,
          width: "35rem",
        }}
        ref={takeNoteDetailsRef}
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
                  backgroundColor: `${createNoteContext.noteData?.color}`,
                }}
                value={createNoteContext.noteData?.title}
                onChange={createNoteContext.handleChange}
              />
            </div>
            <div className="">
              <Tooltip
                title={createNoteContext.noteData?.pinned ? "Unpin" : "Pin"}
              >
                <IconButton onClick={onPinClick}>
                  {createNoteContext.noteData?.pinned ? (
                    <PushPinIcon className="fs-4 mt-n4" />
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
                  backgroundColor: `${createNoteContext.noteData?.color}`,
                  resize: "none",
                  overflow: "hidden",
                  minHeight: "auto",
                }}
                value={createNoteContext.noteData?.content}
                onChange={handleContentChange}
                id="content"
                ref={textareaRef}
              />
            ) : (
              <ListItemContent />
            )}
          </div>
          <div className="d-flex">
            {collaboratorArray?.map((collaborator) => {
              return (
                <Tooltip
                  title={
                    <span>
                      {collaborator?.name}
                      <br />
                      {collaborator?.email}
                    </span>
                  }
                  key={collaborator.email}
                >
                  <IconButton onClick={onCollaboratorIconClick}>
                    <AccountCircleRoundedIcon
                      className="col-2 fs-1 "
                      style={{ color: "gray" }}
                    />
                  </IconButton>
                </Tooltip>
              );
            })}
          </div>
          <div className="d-flex column flex-wrap">
            {labelArray.map((label) => {
              return (
                <Chip
                  icon={
                    <LabelImportantTwoToneIcon
                      style={{
                        color: label.important ? "#ffc61a" : "",
                      }}
                      fontSize="small"
                    />
                  }
                  label={label.labelName}
                  sx={{
                    marginLeft: "4px",
                    marginBottom: "4px",
                  }}
                  key={label.labelName}
                />
              );
            })}
          </div>

          <div className="collapse" id="collapsePalette" ref={colorPaletteRef}>
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
                  color={createNoteContext.noteData?.color}
                  onChangeColor={createNoteContext.changeColorClick}
                />
              </div>
            </div>
          </div>

          <div className="d-flex flex-row justify-content-between mt-1">
            <div className="col-1">
              <Tooltip title="Add Reminder">
                <IconButton onClick={onReminderIconClick}>
                  <NotificationAddOutlinedIcon className="fs-6 " />
                </IconButton>
              </Tooltip>
            </div>
            <div className="col-1">
              <Tooltip title="Add Images">
                <IconButton onClick={onImageIconClick}>
                  <PermMediaOutlinedIcon className="fs-6" />
                </IconButton>
              </Tooltip>
            </div>
            <div className="col-1">
              <Tooltip title="Add Collaborators">
                <IconButton onClick={onCollaboratorIconClick}>
                  <PersonAddOutlinedIcon className="fs-6" />
                </IconButton>
              </Tooltip>
            </div>
            <div className="col-1">
              <Tooltip title="Archive note">
                <IconButton onClick={(event) => onArchiveClick(event)}>
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
                <IconButton onClick={onDeleteIconClick}>
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
  );
};

export default TakeNoteDetailsCard;
