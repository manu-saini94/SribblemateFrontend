import { CreateNoteType, TakeNoteDetailsPropsType } from "notetypes";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import ArchiveIcon from "../../assets/archive.svg";
import BellIcon from "../../assets/bell.svg";
import ColorPalleteIcon from "../../assets/colorpallete.svg";
import ImageIcon from "../../assets/image.svg";
import MoreIcon from "../../assets/more.svg";
import PinIcon from "../../assets/pin.svg";
import UnpinIcon from "../../assets/unpin.svg";
import IconImage from "../global/IconImage";
import ColorPalette from "./colorpalette/ColorPalette";

const TakeNoteDetails = ({
  toggleTakeNoteActive,
}: TakeNoteDetailsPropsType) => {
  const noteColor = useSelector((state: RootState) => state.noteColor.color);

  const [noteData, setNoteData] = useState<CreateNoteType>(
    {} as CreateNoteType
  );

  const colorPaletteRef = useRef<HTMLDivElement>(null);
  const takeNoteDetailsRef = useRef<HTMLDivElement>(null);
  const [openPalette, setOpenPalette] = useState<Boolean>(false);

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setNoteData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    if (name === "content") {
      adjustTextareaHeight(event.target);
    }
  };

  const adjustTextareaHeight = (textarea: {
    name?: string;
    value?: string;
    style?: any;
    scrollHeight?: string;
  }) => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const onPinClick = () => {
    console.log("pin");

    setNoteData((prevValues) => ({
      ...prevValues,
      isPinned: !prevValues.isPinned,
    }));
  };

  const onArchiveClick = () => {
    setNoteData((prevValues) => ({
      ...prevValues,
      isArchived: true,
    }));
  };

  const onPaletteIconClick = () => {
    setOpenPalette(true);
  };

  const handleNoteSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    setNoteData((prevValues) => ({
      ...prevValues,
      color: noteColor,
    }));
  }, [noteColor]);

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
        toggleTakeNoteActive();
      }
    }
    document.addEventListener("mousedown", handleClickOutsideNote);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideNote);
    };
  }, [takeNoteDetailsRef, toggleTakeNoteActive]);

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
            <div className="input-group mb-3">
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

              <IconImage
                x={0}
                y={0}
                src={noteData.isPinned ? UnpinIcon : PinIcon}
                onClick={onPinClick}
              />
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
              onChange={handleChange}
              id="content"
            />
          </div>

          <div className="d-flex justify-content-between">
            <div>
              <IconImage
                x={0}
                y={0}
                src={BellIcon}
                onClick={onPaletteIconClick}
              />

              <IconImage
                x={5}
                y={0}
                src={ImageIcon}
                onClick={onPaletteIconClick}
              />
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

              <IconImage
                x={0}
                y={0}
                src={MoreIcon}
                onClick={onPaletteIconClick}
              />
            </div>
            <div>
              <button type="submit" className="btn btn-sm fw-medium">
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
    </form>
  );
};

export default TakeNoteDetails;
