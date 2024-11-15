import { NoteCardPropsType, UpdateColorType, UpdateNoteType } from "notetypes";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import {
  updateArchiveForNote,
  updateColorForNote,
  updatePinForNote,
  updateTrashForNote,
} from "../redux/asyncThunks";
import { updateUserNote } from "../redux/notes/noteSlice";
import useColor from "./useColor";

const useNoteCard = ({ noteCardValues }: NoteCardPropsType) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isUpdateCardActive, setIsUpdateCardActive] = useState<Boolean>(false);
  const [updateNote, setUpdateNote] = useState<UpdateNoteType>(
    {} as UpdateNoteType
  );
  const colorPaletteRef = useRef<HTMLDivElement>(null);
  const takeNoteDetailsRef = useRef<HTMLDivElement>(null);
  const [isOpenMoreTooltip, setIsOpenMoreTooltip] = useState(false);
  const activeMenu = useSelector((state: RootState) => state.menus.activeMenu);

  useEffect(() => {
    setUpdateNote(noteCardValues);
  }, [noteCardValues]);

  const {
    isOpenColorTooltip,
    handleColorTooltipClose,
    handleColorTooltipOpen,
  } = useColor();

  const handleNoteCardClick = useCallback(() => {
    setIsUpdateCardActive(true);
  }, []);

  const handleNoteCardClose = useCallback(() => {
    setIsUpdateCardActive(false);
  }, []);

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

  const onCollaboratorClick = () => {};

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

  const onImageClick = () => {};

  const changeColorClick = useCallback(
    (color: string) => {
      const colorDetails: UpdateColorType = {
        noteId: updateNote.id,
        color: color,
      };
      dispatch(updateColorForNote(colorDetails)).then(() => {
        dispatch(updateUserNote());
      });
    },
    [dispatch, updateNote.id]
  );

  const toggleColorPalette = () => {
    colorPaletteRef.current?.classList.toggle("show");
    handleColorTooltipClose();
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      const isClickInsidePalette = colorPaletteRef.current?.contains(target);
      const palette = colorPaletteRef.current;
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

  return {
    updateNote,
    isUpdateCardActive,
    handleNoteCardClose,
    handleNoteCardClick,
    activeMenu,
    changeColorClick,
    onDeleteClick,
    setUpdateNote,
    colorPaletteRef,
    takeNoteDetailsRef,
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
  };
};

export default useNoteCard;
