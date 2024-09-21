import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { IconButton } from "@mui/material";
import { NoteCardPropsType, UpdateNoteType } from "notetypes";
import React, { useEffect, useRef, useState } from "react";
import "../../scss/notecard.scss";

import ColorPalette from "./colorpalette/ColorPalette";

function NoteCard({ noteCardValues, onNoteClick }: NoteCardPropsType) {
  const [updateNote, setUpdateNote] = useState<UpdateNoteType>(noteCardValues);

  const colorPaletteRef = useRef<HTMLDivElement>(null);
  const takeNoteDetailsRef = useRef<HTMLDivElement>(null);
  const [openPalette, setOpenPalette] = useState(false);

  const onPinClick = () => {
    // setPin(!pin);
  };

  const handleTitleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    const target = event.target as HTMLElement;
    // event.preventDefault();
  };

  const handleContentClick = (event: React.MouseEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const target = event.target as HTMLElement;
    // event.preventDefault();
  };

  const onCollaboratorClick = () => {};

  const onReminderClick = () => {};

  const onArchiveClick = () => {
    // setArchive(true);
  };

  const onMoreClick = () => {};

  const onImageClick = () => {};

  const toggleColorPalette = () => {
    colorPaletteRef.current?.classList.toggle("show");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (
        colorPaletteRef.current &&
        !colorPaletteRef.current.contains(target)
      ) {
        setOpenPalette(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [colorPaletteRef]);

  // useEffect(() => {
  //   function handleClickOutsideNote(event: MouseEvent) {
  //     const target = event.target as HTMLElement;
  //     if (
  //       takeNoteDetailsRef.current &&
  //       !takeNoteDetailsRef.current.contains(target)
  //     ) {
  //       setIsTakeNoteActive(true);
  //     }
  //   }
  //   document.addEventListener("mousedown", handleClickOutsideNote);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutsideNote);
  //   };
  // }, [takeNoteDetailsRef, setIsTakeNoteActive]);

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
          {updateNote.isPinned ? (
            <IconButton onClick={onPinClick}>
              {" "}
              <PushPinIcon className="fs-6 mt-n4" />
            </IconButton>
          ) : (
            <IconButton onClick={onPinClick}>
              {" "}
              <PushPinOutlinedIcon className="fs-6 " />
            </IconButton>
          )}
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
        <div className="collapse" id="collapsePalette" ref={colorPaletteRef}>
          <div className="card border-light">
            <div className="card-body align-items-center">
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
