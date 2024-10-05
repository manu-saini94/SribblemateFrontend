import { CreateNoteType, TakeNoteDetailsPropsType } from "notetypes";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { NoteCardType } from "utility/miscsUtils";
import {
  hasNoteChanged,
  initialCreateNoteValue,
} from "utility/reduxutils/noteUtils";
import { createNote } from "../redux/asyncThunks";
import { insertNewNote } from "../redux/notes/noteSlice";
import useAutoResizeTextArea from "./useAutoResizeTextArea";
import { useColor } from "./useColor";

const useTakeNoteDetails = ({
  toggleTakeNoteActive,
  changeActiveCard,
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
  const { textareaRef, handleContentChange } =
    useAutoResizeTextArea(handleChange);

  const onPinClick = () => {
    setNoteData((prevValues) => ({
      ...prevValues,
      pinned: !prevValues.pinned,
      archived: false,
    }));
  };

  const onArchiveClick = () => {
    const updatedNote: CreateNoteType = {
      ...noteData,
      archived: true,
      pinned: false,
    };
    setNoteData(updatedNote);
    dispatchCreatedNote(updatedNote);
    toggleTakeNoteActive();
  };

  const handleNoteSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedNote: CreateNoteType = {
      ...noteData,
    };
    dispatchCreatedNote(updatedNote);
    toggleTakeNoteActive();
  };

  const dispatchCreatedNote = useCallback(
    (updatedNote: CreateNoteType) => {
      if (hasNoteChanged(updatedNote)) {
        dispatch(createNote(updatedNote)).then(() => dispatch(insertNewNote()));
      }
    },
    [dispatch]
  );

  const toggleColorPalette = () => {
    colorPaletteRef.current?.classList.toggle("show");
  };

  const onCheckboxIconClick = (): void => {};

  const onDeleteIconClick = (): void => {};

  const onLabelAddIconClick = (): void => {};

  const onReminderIconClick = (): void => {};

  const onImageIconClick = (): void => {};

  const onCollaboratorIconClick = (): void => {
    changeActiveCard(NoteCardType.COLLABORATOR);
  };

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

        dispatchCreatedNote(noteData);
        toggleTakeNoteActive();
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
  return {
    dispatch,
    handleChange,
    noteData,
    takeNoteDetailsRef,
    toggleTakeNoteActive,
    dispatchCreatedNote,
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
    colorPaletteRef,
  };
};

export default useTakeNoteDetails;
