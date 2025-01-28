import { useUpdateNote } from "contexts/hooks/useUpdateNote";
import { UpdateNoteType } from "notetypes";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import useCardTypeActive from "./useCardTypeActive";
import useColor from "./useColor";

import { useUpdateNoteMutation } from "api/notesApi";

const useModalNoteCard = () => {
  const updateNoteContext = useUpdateNote();
  const [updateNote, result] = useUpdateNoteMutation();
  const [noteData, setNoteData] = useState<UpdateNoteType>(
    updateNoteContext?.noteData
  );
  const dispatch = useDispatch<AppDispatch>();
  const [isListNote, setIsListNote] = useState<Boolean>(
    updateNoteContext?.isListNote
  );
  const [isUpdateCardActive, setIsUpdateCardActive] = useState<Boolean>(
    updateNoteContext?.isUpdateCardActive
  );
  const colorPaletteRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const pinIconRef = useRef<HTMLDivElement>(null);
  const loggedInUserData = useSelector(
    (state: RootState) => state.auth.authUserData
  );
  const [isOpenMoreTooltip, setIsOpenMoreTooltip] = useState(
    updateNoteContext?.isOpenMoreTooltip
  );
  const activeMenu = useSelector((state: RootState) => state.menus.activeMenu);
  const { activeCard, changeActiveCard } = useCardTypeActive();

  const {
    isOpenColorTooltip,
    handleColorTooltipClose,
    handleColorTooltipOpen,
  } = useColor();

  const onModalPinClick = useCallback(() => {
    setNoteData((prevValues) => ({
      ...prevValues,
      pinned: !prevValues.pinned,
      archived: false,
      trashed: false,
    }));
  }, []);

  useEffect(() => {
    setNoteData(updateNoteContext?.noteData);
  }, [updateNoteContext.noteData]);

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

  return {
    activeCard,
    updateNoteContext,
    changeActiveCard,
    noteRef,
    noteData,
    loggedInUserData,
    onModalPinClick,
    iconsRef,
    pinIconRef,
    isListNote,
    isUpdateCardActive,
    activeMenu,
    colorPaletteRef,
    handleColorTooltipClose,
    handleColorTooltipOpen,
    isOpenColorTooltip,
    isOpenMoreTooltip,
  };
};

export default useModalNoteCard;
