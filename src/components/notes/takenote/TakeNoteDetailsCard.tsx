import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import LibraryAddCheckOutlinedIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { IconButton } from "@mui/material";
import useTakeNoteDetails from "hooks/useTakeNoteDetails";
import { TakeNoteDetailsPropsType } from "notetypes";
import React from "react";
import ColorPalette from "../colorpalette/ColorPalette";

const TakeNoteDetailsCard = ({
  toggleTakeNoteActive,
  changeActiveCard,
}: TakeNoteDetailsPropsType) => {
  const {
    colorPaletteRef,
    noteData,
    handleChange,
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
  } = useTakeNoteDetails({ toggleTakeNoteActive, changeActiveCard });

  return (
    <form onSubmit={handleNoteSubmit}>
      <div
        className="card "
        style={{
          height: "auto",
          backgroundColor: `${noteData.color}`,
          width: "35rem",
        }}
        ref={takeNoteDetailsRef}
      >
        <div className="card-body pb-2">
          <div className="d-flex flex-row">
            <div className="input-group mb-3 ">
              <input
                type="text"
                className="form-control border-0 p-0 m-0"
                name="title"
                placeholder="Title"
                aria-label="Title"
                aria-describedby="basic-addon1"
                style={{ backgroundColor: `${noteData.color}` }}
                value={noteData.title}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <IconButton onClick={onPinClick}>
                {noteData.pinned ? (
                  <PushPinIcon className="fs-6 mt-n4" />
                ) : (
                  <PushPinOutlinedIcon className="fs-6 " />
                )}{" "}
              </IconButton>
            </div>
          </div>

          <div className="input-group mb-3">
            <textarea
              className="form-control border-0 p-0 m-0"
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
              onChange={handleContentChange}
              id="content"
              ref={textareaRef}
            />
          </div>

          <div className="collapse" id="collapsePalette" ref={colorPaletteRef}>
            <div className="card border-light">
              <div className="card-body align-items-center">
                <ColorPalette />
              </div>
            </div>
          </div>

          <div className="d-flex flex-row justify-content-between mt-1">
            <div className="col-1">
              <IconButton onClick={onReminderIconClick}>
                <NotificationAddOutlinedIcon className="fs-6 " />
              </IconButton>
            </div>
            <div className="col-1">
              <IconButton onClick={onImageIconClick}>
                <PermMediaOutlinedIcon className="fs-6" />
              </IconButton>
            </div>
            <div className="col-1">
              <IconButton onClick={onCollaboratorIconClick}>
                <PersonAddOutlinedIcon className="fs-6" />
              </IconButton>
            </div>
            <div className="col-1">
              <IconButton onClick={onArchiveClick}>
                <ArchiveOutlinedIcon className="fs-6" />
              </IconButton>
            </div>
            <div className="col-1">
              <div
                data-bs-toggle="collapse"
                data-bs-target="#collapsePalette"
                aria-expanded="false"
                aria-controls="collapsePalette"
              >
                <IconButton onClick={toggleColorPalette}>
                  <PaletteOutlinedIcon className="fs-6" />
                </IconButton>
              </div>
            </div>

            <div className="col-1">
              <IconButton onClick={onDeleteIconClick}>
                <DeleteOutlinedIcon className="fs-6" />
              </IconButton>
            </div>
            <div className="col-1">
              <IconButton onClick={onLabelAddIconClick}>
                <LabelOutlinedIcon className="fs-6" />
              </IconButton>
            </div>
            <div className="col-1">
              <IconButton onClick={onCheckboxIconClick}>
                <LibraryAddCheckOutlinedIcon className="fs-6" />
              </IconButton>
            </div>

            <button type="submit" className="btn btn-sm fw-medium">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TakeNoteDetailsCard;
