import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { IconButton } from "@mui/material";
import IconImage from "components/global/IconImage";
import { NoteCardPropsType, UpdateNoteType } from "notetypes";
import React, { useEffect, useRef, useState } from "react";
import PinIcon from "../../assets/pin.svg";
import UnpinIcon from "../../assets/unpin.svg";
import "../../scss/notecard.scss";
import ColorPalette from "./colorpalette/ColorPalette";

function NoteCard({ noteCardValues, onNoteClick }: NoteCardPropsType) {
  const [updateNote, setUpdateNote] = useState<UpdateNoteType>(noteCardValues);

  const colorPaletteRef = useRef<HTMLDivElement>(null);
  const takeNoteDetailsRef = useRef<HTMLDivElement>(null);
  const [openPalette, setOpenPalette] = useState(false);

  const onPaletteIconClick = () => {
    setOpenPalette(true);
  };

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
            {updateNote.isPinned ? (
              <IconImage x={0} y={0} src={UnpinIcon} onClick={onPinClick} />
            ) : (
              <IconImage x={0} y={0} src={PinIcon} onClick={onPinClick} />
            )}
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
        <div className="row">
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
            <IconButton onClick={onPaletteIconClick}>
              <PaletteOutlinedIcon className="fs-6" />
            </IconButton>
          </div>
          <div className="col-2">
            <IconButton onClick={onMoreClick}>
              <MoreVertOutlinedIcon className="fs-6" />
            </IconButton>
          </div>
        </div>
        {openPalette && (
          <div className="position-relative" ref={colorPaletteRef}>
            <ColorPalette />
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteCard;
