import {
  useUpdateArchiveMutation,
  useUpdateColorMutation,
  useUpdateNoteMutation,
  useUpdatePinMutation,
  useUpdateTrashMutation,
} from "api/notesApi";
import { DateTime } from "luxon";
import { NoteCardPropsType, UpdateColorType, UpdateNoteType } from "notetypes";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { NoteCardType } from "utility/miscsUtils";
import useCardTypeActive from "./useCardTypeActive";
import useColor from "./useColor";

const useNoteCard = ({ noteCardValues }: NoteCardPropsType) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);
  const [isListNote, setIsListNote] = useState<Boolean>(false);
  const [isUpdateCardActive, setIsUpdateCardActive] = useState<Boolean>(false);
  const [noteData, setNoteData] = useState<UpdateNoteType>(
    {} as UpdateNoteType
  );
  const [updateNote, { isLoading, error, isSuccess }] = useUpdateNoteMutation();
  const [
    updatePin,
    { isLoading: pinLoading, error: pinError, isSuccess: pinSuccess },
  ] = useUpdatePinMutation();
  const [
    updateArchive,
    {
      isLoading: archiveLoading,
      error: archiveError,
      isSuccess: archiveSuccess,
    },
  ] = useUpdateArchiveMutation();
  const [
    updateTrash,
    { isLoading: trashLoading, error: trashError, isSuccess: trashSuccess },
  ] = useUpdateTrashMutation();

  const [
    updateColor,
    { isLoading: colorLoading, error: colorError, isSuccess: colorSuccess },
  ] = useUpdateColorMutation();

  const colorPaletteRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const pinIconRef = useRef<HTMLDivElement>(null);
  const loggedInUserData = useSelector(
    (state: RootState) => state.auth.authUserData
  );
  const [isOpenMoreTooltip, setIsOpenMoreTooltip] = useState(false);
  const activeMenu = useSelector((state: RootState) => state.menus.activeMenu);
  const { activeCard, changeActiveCard } = useCardTypeActive();

  useEffect(() => {
    setNoteData(noteCardValues);
    setLoading(false);
  }, [noteCardValues]);

  const {
    isOpenColorTooltip,
    handleColorTooltipClose,
    handleColorTooltipOpen,
  } = useColor();

  const handleNoteSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (checkForChange()) {
      updateNote(noteData);
      setNoteData((prevValues) => ({
        ...noteData,
      }));
    }
    handleNoteCardClose();
  };

  const checkForChange = useCallback((): Boolean => {
    const { title, content, pinned } = noteCardValues;
    return (
      title !== noteData.title ||
      content !== noteData.content ||
      pinned !== noteData.pinned
    );
  }, [noteCardValues, noteData.content, noteData.pinned, noteData.title]);

  const getEditedDate = useCallback(() => {
    const updatedDate = DateTime.fromISO(noteData?.updatedAt);
    const now = DateTime.local();

    if (updatedDate.hasSame(now, "day")) {
      return `Today ${updatedDate.toFormat("HH:mm")}`;
    } else if (updatedDate.hasSame(now.minus({ days: 1 }), "day")) {
      return `Yesterday ${updatedDate.toFormat("HH:mm")}`;
    } else {
      return updatedDate.toFormat("MMM dd, HH:mm");
    }
  }, [noteData?.updatedAt]);

  const handleChange = useCallback(
    (event: { target: { name: any; value: any } }) => {
      const { name, value } = event.target;
      setNoteData((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    },
    []
  );

  const handleNoteCardClick = useCallback(() => {
    setIsUpdateCardActive(true);
    changeActiveCard(NoteCardType.NOTE);
  }, [changeActiveCard]);

  const handleNoteCardClose = useCallback(() => {
    setIsUpdateCardActive(false);
    changeActiveCard(NoteCardType.NOTE);
  }, [changeActiveCard]);

  const handleMoreTooltipClose = () => {
    setIsOpenMoreTooltip(false);
  };

  const handleMoreTooltipOpen = () => {
    setIsOpenMoreTooltip(true);
  };

  const onPinClick = useCallback(() => {
    setNoteData((prevValues) => ({
      ...noteData,
      pinned: !prevValues.pinned,
      archived: false,
      trashed: false,
    }));
    updatePin({ noteId: noteData.id });
  }, [noteData, updatePin]);

  const onModalPinClick = useCallback(() => {
    setNoteData((prevValues) => ({
      ...prevValues,
      pinned: !prevValues.pinned,
      archived: false,
      trashed: false,
    }));
  }, []);

  const onCollaboratorClick = () => {
    setIsUpdateCardActive(true);
    changeActiveCard(NoteCardType.COLLABORATOR);
  };

  const onReminderClick = () => {};

  const onArchiveClick = useCallback(() => {
    setNoteData((prevValues) => ({
      ...noteData,
      pinned: false,
      trashed: false,
      archived: !prevValues.archived,
    }));
    updateArchive({ noteId: noteData.id });
  }, [noteData, updateArchive]);

  const onDeleteClick = useCallback(() => {
    setNoteData((prevValues) => ({
      ...noteData,
      pinned: false,
      archived: false,
      trashed: !prevValues.trashed,
    }));
    updateTrash({ noteId: noteData.id });
  }, [noteData, updateTrash]);

  const onMoreClick = () => {
    handleMoreTooltipClose();
  };

  const onLabelRemoveClick = (id: number) => {};

  const onImageClick = () => {};

  const onLabelAddIconClick = () => {
    setIsUpdateCardActive(true);
    changeActiveCard(NoteCardType.LABEL);
  };

  const onCheckboxIconClick = () => {};

  const changeColorClick = useCallback(
    (color: string) => {
      const colorDetails: UpdateColorType = {
        noteId: noteData.id,
        color: color,
      };
      setNoteData((prevValues) => ({
        ...noteData,
        color,
      }));
      updateColor(colorDetails);
    },
    [noteData, updateColor]
  );

  const toggleColorPalette = () => {
    colorPaletteRef.current?.classList.toggle("show");
    handleColorTooltipClose();
  };

  const handleAddLabel = useCallback(() => {
    setIsUpdateCardActive(true);
    changeActiveCard(NoteCardType.LABEL);
  }, [changeActiveCard]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      const palette = colorPaletteRef.current;
      const isClickInsidePalette = palette?.contains(target);
      if (!isClickInsidePalette) {
        if (palette?.classList.contains("show")) {
          palette.classList.remove("show");
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [colorPaletteRef]);

  useEffect(() => {
    function handleClickInsideNote(event: MouseEvent) {
      const target = event.target as HTMLElement;
      const palette = colorPaletteRef.current;
      const isClickInsidePalette = palette?.contains(target);
      const iconsRefCurrent = iconsRef.current;
      const isIconsDivClicked = iconsRefCurrent?.contains(target);
      const pinIconRefCurrent = pinIconRef.current;
      const pinIconDivClicked = pinIconRefCurrent?.contains(target);
      const noteRefCurrent = noteRef.current;
      const isNoteRefDivClicked = noteRefCurrent?.contains(target);

      if (
        !isIconsDivClicked &&
        !pinIconDivClicked &&
        !isClickInsidePalette &&
        isNoteRefDivClicked
      ) {
        handleNoteCardClick();
      }
    }
    document.addEventListener("mousedown", handleClickInsideNote);
    return () => {
      document.removeEventListener("mousedown", handleClickInsideNote);
    };
  }, [colorPaletteRef, handleNoteCardClick]);

  return {
    loading,
    activeCard,
    changeActiveCard,
    noteRef,
    onLabelRemoveClick,
    noteData,
    loggedInUserData,
    onModalPinClick,
    iconsRef,
    pinIconRef,
    onCheckboxIconClick,
    isListNote,
    onLabelAddIconClick,
    handleChange,
    handleNoteSubmit,
    isUpdateCardActive,
    handleNoteCardClose,
    handleNoteCardClick,
    activeMenu,
    changeColorClick,
    onDeleteClick,
    colorPaletteRef,
    onPinClick,
    onCollaboratorClick,
    onReminderClick,
    onArchiveClick,
    onMoreClick,
    onImageClick,
    toggleColorPalette,
    handleColorTooltipClose,
    handleColorTooltipOpen,
    handleMoreTooltipClose,
    handleMoreTooltipOpen,
    isOpenColorTooltip,
    isOpenMoreTooltip,
    checkForChange,
    getEditedDate,
    handleAddLabel,
  };
};

export default useNoteCard;
