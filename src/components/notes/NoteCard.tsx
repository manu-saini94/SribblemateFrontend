import IconImage from "components/global/IconImage";
import { NoteCardPropsType, UpdateNoteType } from "notetypes";
import React, { useEffect, useRef, useState } from "react";
import ArchiveIcon from "../../assets/archive.svg";
import BellIcon from "../../assets/bell.svg";
import ColorPalleteIcon from "../../assets/colorpallete.svg";
import ImageIcon from "../../assets/image.svg";
import MoreIcon from "../../assets/more.svg";
import PinIcon from "../../assets/pin.svg";
import UnpinIcon from "../../assets/unpin.svg";
import ColorPalette from "./colorpalette/ColorPalette";

function NoteCard(
  { noteCardValues }: NoteCardPropsType,
  props: { setIsTakeNoteActive: any }
) {
  const [updateNote, setUpdateNote] = useState<UpdateNoteType>(
    noteCardValues as UpdateNoteType
  );

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

  const onArchiveClick = () => {
    // setArchive(true);
  };

  const { setIsTakeNoteActive } = props;

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

  useEffect(() => {
    function handleClickOutsideNote(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (
        takeNoteDetailsRef.current &&
        !takeNoteDetailsRef.current.contains(target)
      ) {
        setIsTakeNoteActive(true);
      }
    }
    document.addEventListener("mousedown", handleClickOutsideNote);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideNote);
    };
  }, [takeNoteDetailsRef, setIsTakeNoteActive]);

  return (
    <div
      className="card "
      style={{
        height: "auto",
        backgroundColor: `${updateNote.color}`,
        width: "20rem",
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
              placeholder="Title"
              aria-label="Title"
              aria-describedby="basic-addon1"
              style={{ backgroundColor: `${updateNote.color}` }}
              value={updateNote.title}
              onClick={handleTitleClick}
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
            onClick={handleContentClick}
          />
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <IconImage x={0} y={0} src={BellIcon} />

            <IconImage x={5} y={0} src={ImageIcon} />
            <IconImage
              x={0}
              y={0}
              src={ColorPalleteIcon}
              onClick={() => onPaletteIconClick()}
            />

            <IconImage
              x={5}
              y={0}
              src={ArchiveIcon}
              onClick={() => onArchiveClick()}
            />

            <IconImage x={0} y={0} src={MoreIcon} />
          </div>
          <div>
            <button type="button" className="btn btn-sm fw-medium">
              Save
            </button>
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
