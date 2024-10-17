import { CreateNoteType, TakeNoteDetailsPropsType } from "notetypes";
import { FormEvent, useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { NoteCardType } from "utility/miscsUtils";
import { hasNoteChanged } from "utility/reduxutils/noteUtils";
import { createNote } from "../redux/asyncThunks";
import { insertNewNote } from "../redux/notes/noteSlice";
import useAutoResizeTextArea from "./useAutoResizeTextArea";
import { useCreateNote } from "./useCreateNote";

const useTakeNoteDetails = ({
  toggleTakeNoteActive,
  changeActiveCard,
}: TakeNoteDetailsPropsType) => {
  const dispatch = useDispatch<AppDispatch>();
  const colorPaletteRef = useRef<HTMLDivElement>(null);
  const takeNoteDetailsRef = useRef<HTMLDivElement>(null);
  const createNoteContext = useCreateNote();

  const { textareaRef, handleContentChange } = useAutoResizeTextArea(
    createNoteContext.handleChange
  );

  const onPinClick = () => {
    createNoteContext.onPinClick();
  };

  const onArchiveClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const updatedNote: CreateNoteType = {
      ...createNoteContext.noteData,
      archived: true,
    };
    dispatchCreatedNote(updatedNote);
    toggleTakeNoteActive();
  };

  const handleNoteSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedNote: CreateNoteType = {
      ...createNoteContext.noteData,
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

  const onCheckboxIconClick = (): void => {
    createNoteContext.onCheckboxClick();
  };

  const onDeleteIconClick = (): void => {
    createNoteContext.onDeleteClick();
  };

  const onLabelAddIconClick = (): void => {
    createNoteContext.onLabelAddClick();
  };

  const onReminderIconClick = (): void => {
    createNoteContext.onReminderClick();
  };

  const onImageIconClick = (): void => {
    createNoteContext.onImageClick();
  };

  const onCollaboratorIconClick = (): void => {
    changeActiveCard(NoteCardType.COLLABORATOR);
  };

  // useEffect(() => {
  //   setNoteData((prevValues) => ({
  //     ...prevValues,
  //     color: colorContext.color,
  //   }));
  // }, [colorContext.color]);

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

        dispatchCreatedNote(createNoteContext.noteData);
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
    createNoteContext.noteData,
    takeNoteDetailsRef,
    toggleTakeNoteActive,
    dispatchCreatedNote,
  ]);
  return {
    dispatch,
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
    createNoteContext,
  };
};

export default useTakeNoteDetails;
