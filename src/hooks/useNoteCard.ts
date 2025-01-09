import { DateTime } from "luxon";
import { NoteCardPropsType, UpdateColorType, UpdateNoteType } from "notetypes";
import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { NoteCardType } from "utility/miscsUtils";
import {
  updateArchiveForNote,
  updateColorForNote,
  updateNote,
  updatePinForNote,
  updateTrashForNote,
} from "../redux/asyncThunks";
import { updateUserNote } from "../redux/notes/noteSlice";
import useCardTypeActive from "./useCardTypeActive";
import useColor from "./useColor";

const useNoteCard = ({ noteCardValues }: NoteCardPropsType) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isListNote, setIsListNote] = useState<Boolean>(false);
  const [isUpdateCardActive, setIsUpdateCardActive] = useState<Boolean>(false);
  const [noteData, setNoteData] = useState<UpdateNoteType>(
    {} as UpdateNoteType
  );
  const colorPaletteRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const pinIconRef = useRef<HTMLDivElement>(null);
  const loggedInUserData = useSelector(
    (state: RootState) => state.auth.loggedInUserData
  );
  const [isOpenMoreTooltip, setIsOpenMoreTooltip] = useState(false);
  const activeMenu = useSelector((state: RootState) => state.menus.activeMenu);
  const { activeCard, changeActiveCard } = useCardTypeActive();

  useEffect(() => {
    setNoteData(noteCardValues);
  }, [noteCardValues]);

  const {
    isOpenColorTooltip,
    handleColorTooltipClose,
    handleColorTooltipOpen,
  } = useColor();

  const handleNoteSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (checkForChange()) {
      try {
        dispatch(updateNote(noteData)).then(() => {
          dispatch(updateUserNote());
        });
      } finally {
        handleNoteCardClose();
      }
    } else {
      handleNoteCardClose();
    }
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

  const onPinClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(updatePinForNote(noteCardValues.id)).then(() => {
      dispatch(updateUserNote());
    });
  };

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

  const onArchiveClick = () => {
    dispatch(updateArchiveForNote(noteCardValues.id)).then(() => {
      dispatch(updateUserNote());
    });
  };

  const onDeleteClick = () => {
    dispatch(updateTrashForNote(noteCardValues.id)).then(() => {
      dispatch(updateUserNote());
    });
  };

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
      dispatch(updateColorForNote(colorDetails)).then(() => {
        dispatch(updateUserNote());
      });
    },
    [dispatch, noteData.id]
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
