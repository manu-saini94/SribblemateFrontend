import UpdateNoteContext from "contexts/UpdateNoteContext";
import { UpdateNoteContextProps } from "global";
import useNoteCard from "hooks/useNoteCard";
import React, { useMemo } from "react";

const UpdateNoteProvider = ({
  children,
  noteCardValues,
}: UpdateNoteContextProps) => {
  const {
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
  } = useNoteCard({ noteCardValues });

  const noteContextValue = useMemo(
    () => ({
      noteData,
      loggedInUserData,
      onModalPinClick,
      isListNote,
      onLabelRemoveClick,
      handleChange,
      handleNoteSubmit,
      onLabelAddIconClick,
      onCheckboxIconClick,
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
    }),
    [
      noteData,
      loggedInUserData,
      onModalPinClick,
      isListNote,
      onLabelRemoveClick,
      handleChange,
      handleNoteSubmit,
      onLabelAddIconClick,
      onCheckboxIconClick,
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
    ]
  );

  return (
    <UpdateNoteContext.Provider value={noteContextValue}>
      {children}
    </UpdateNoteContext.Provider>
  );
};

export default UpdateNoteProvider;