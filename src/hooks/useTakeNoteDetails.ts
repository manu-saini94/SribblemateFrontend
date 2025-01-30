import { useCreateNoteMutation } from "api/notesApi";
import { CreateNoteType, TakeNoteDetailsPropsType } from "notetypes";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { NoteCardType } from "utility/miscsUtils";
import { useCreateNote } from "../contexts/hooks/useCreateNote";
import { setCollaboratorError } from "../redux/users/usersSlice";
import useAutoResizeTextArea from "./useAutoResizeTextArea";
import useColor from "./useColor";

const useTakeNoteDetails = ({
  toggleTakeNoteActive,
  changeActiveCard,
}: TakeNoteDetailsPropsType) => {
  const dispatch = useDispatch<AppDispatch>();
  const colorPaletteRef = useRef<HTMLDivElement>(null);
  const takeNoteDetailsRef = useRef<HTMLDivElement>(null);
  const createNoteContext = useCreateNote();
  const [isListNote, setIsListNote] = useState<Boolean>(false);
  const {
    isOpenColorTooltip,
    handleColorTooltipClose,
    handleColorTooltipOpen,
  } = useColor();

  const [createNote, { data, isLoading, isError, error, isSuccess }] =
    useCreateNoteMutation();
  const collaboratorArray = useSelector(
    (state: RootState) => state.users.collaboratorArray
  );

  const labelArray = useSelector((state: RootState) => state.labels.labelArray);

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
      collaboratorList: collaboratorArray,
      labelSet: labelArray,
    };
    dispatchCreatedNote(updatedNote);
    toggleTakeNoteActive();
  };

  const dispatchCreatedNote = useCallback(
    (updatedNote: CreateNoteType) => {
      createNote(updatedNote);
    },
    [createNote]
  );

  const toggleColorPalette = () => {
    colorPaletteRef.current?.classList.toggle("show");
    handleColorTooltipClose();
  };

  const onCheckboxIconClick = (): void => {
    createNoteContext.onCheckboxClick();
  };

  const onDeleteIconClick = (): void => {
    createNoteContext.onDeleteClick();
  };

  const onLabelAddIconClick = (): void => {
    changeActiveCard(NoteCardType.LABEL);
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
        const updatedNote: CreateNoteType = {
          ...createNoteContext.noteData,
          collaboratorList: collaboratorArray,
        };
        dispatchCreatedNote(updatedNote);
        dispatch(setCollaboratorError(""));
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
    collaboratorArray,
  ]);
  return {
    isListNote,
    labelArray,
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
    collaboratorArray,
    isOpenColorTooltip,
    handleColorTooltipClose,
    handleColorTooltipOpen,
  };
};

export default useTakeNoteDetails;
