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
import useAutoResizeTextArea from "../../hooks/useAutoResizeTextArea";
import { createNote } from "../../redux/asyncThunks";
import { insertNewNote } from "../../redux/notes/noteSlice";
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

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setNoteData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const onPinClick = () => {
    setNoteData((prevValues) => ({
      ...prevValues,
      pinned: !prevValues.pinned,
      archived: false,
    }));
  };

  const onArchiveClick = () => {
    setNoteData((prevValues) => ({
      ...prevValues,
      archived: true,
      pinned: false,
    }));
    dispatchCreatedNote();
    toggleTakeNoteActive();
  };

  const handleNoteSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatchCreatedNote();
    toggleTakeNoteActive();
  };

  const dispatchCreatedNote = useCallback(() => {
    if (hasNoteChanged(noteData)) {
      dispatch(createNote(noteData)).then(() => dispatch(insertNewNote()));
    }
  }, [noteData, dispatch]);

  const toggleColorPalette = () => {
    colorPaletteRef.current?.classList.toggle("show");
  };

  const onCheckboxIconClick = (): void => {};

  const onDeleteIconClick = (): void => {};

  const onLabelAddIconClick = (): void => {};

  const onReminderIconClick = (): void => {};

  const onImageIconClick = (): void => {};

  const onCollaboratorIconClick = (): void => {};

  const { textareaRef, handleContentChange } =
    useAutoResizeTextArea(handleChange);

  useEffect(() => {
    setNoteData((prevValues) => ({
      ...prevValues,
      color: colorContext.color,
    }));
  }, [colorContext.color]);

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

export default TakeNoteDetails;
