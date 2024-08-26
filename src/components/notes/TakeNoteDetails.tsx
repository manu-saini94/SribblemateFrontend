import { useColor } from "hooks/useColor";
import { CreateNoteType, TakeNoteDetailsPropsType } from "notetypes";
import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import {
  hasNoteChanged,
  initialCreateNoteValue,
} from "utility/reduxutils/noteUtils";
import ArchiveIcon from "../../assets/archive.svg";
import BellIcon from "../../assets/bell.svg";
import ColorPalleteIcon from "../../assets/colorpallete.svg";
import ImageIcon from "../../assets/image.svg";
import MoreIcon from "../../assets/more.svg";
import PinIcon from "../../assets/pin.svg";
import UnpinIcon from "../../assets/unpin.svg";
import { createNote } from "../../redux/asyncThunks";
import { insertNewNote } from "../../redux/notes/noteSlice";
import IconImage from "../global/IconImage";
import ColorPalette from "./colorpalette/ColorPalette";

const TakeNoteDetails = ({
  toggleTakeNoteActive,
}: TakeNoteDetailsPropsType) => {
  const dispatch = useDispatch<AppDispatch>();
  const colorPaletteRef = useRef<HTMLDivElement>(null);
  const takeNoteDetailsRef = useRef<HTMLDivElement>(null);
  const colorContext = useColor();
  const [noteData, setNoteData] = useState<CreateNoteType>(
    initialCreateNoteValue
  );

  useEffect(() => {
    setNoteData((prevValues) => ({
      ...prevValues,
      color: colorContext.color,
    }));
  }, [colorContext.color]);

  const dispatchCreatedNote = useCallback(() => {
    if (hasNoteChanged(noteData)) {
      dispatch(createNote(noteData)).then(() => dispatch(insertNewNote()));
    }
  }, [noteData, dispatch]);

  useEffect(() => {
    const handleClickOutsideNote = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isClickInsideNote = takeNoteDetailsRef.current?.contains(target);
      const isClickInsidePalette = colorPaletteRef.current?.contains(target);
      const palette = colorPaletteRef.current;
      if (!isClickInsideNote) {
        if (palette?.classList.contains("show")) {
          palette.classList.remove("show");
        }
        toggleTakeNoteActive();
        dispatchCreatedNote();
      } else if (!isClickInsidePalette) {
        if (palette?.classList.contains("show")) {
          palette.classList.remove("show");
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutsideNote);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideNote);
    };
  }, [
    dispatch,
    noteData,
    takeNoteDetailsRef,
    toggleTakeNoteActive,
    dispatchCreatedNote,
  ]);

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

  const handleNoteSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatchCreatedNote();
    toggleTakeNoteActive();
  };

  const toggleColorPalette = () => {
    colorPaletteRef.current?.classList.toggle("show");
  };

  const onReminderIconClick = (): void => {};

  const onImageIconClick = (): void => {};

  const onMoreIconClick = (): void => {};

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

          <div className="collapse" id="collapsePalette" ref={colorPaletteRef}>
            <div className="card border-dark">
              <div className="card-body align-items-center">
                <ColorPalette />
              </div>
            </div>
          </div>

          <div className="d-flex flex-row justify-content-between mt-1">
            <IconImage
              x={0}
              y={0}
              src={BellIcon}
              onClick={onReminderIconClick}
            />

            <IconImage x={0} y={0} src={ImageIcon} onClick={onImageIconClick} />
            <div
              data-bs-toggle="collapse"
              data-bs-target="#collapsePalette"
              aria-expanded="false"
              aria-controls="collapsePalette"
            >
              <IconImage
                x={0}
                y={0}
                src={ColorPalleteIcon}
                onClick={toggleColorPalette}
              />
            </div>
            <IconImage x={0} y={0} src={ArchiveIcon} onClick={onArchiveClick} />

            <IconImage x={0} y={0} src={MoreIcon} onClick={onMoreIconClick} />

            <button type="submit" className="btn btn-sm fw-medium">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TakeNoteDetails;
