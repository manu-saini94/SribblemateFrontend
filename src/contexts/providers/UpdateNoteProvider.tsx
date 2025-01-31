import UpdateNoteContext from "contexts/UpdateNoteContext";
import { UpdateNoteContextProps } from "global";
import useNoteCard from "hooks/useNoteCard";
import React, { useCallback } from "react";

const UpdateNoteProvider = ({
  children,
  noteCardValues,
}: UpdateNoteContextProps) => {
  const {
    activeCard,
    loading,
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
  } = useNoteCard({ noteCardValues });

  const noteContextValue = useCallback(
    () => ({
      activeCard,
      loading,
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
    }),
    [
      activeCard,
      loading,
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
    ]
  );

  return (
    <UpdateNoteContext.Provider value={noteContextValue()}>
      {children}
    </UpdateNoteContext.Provider>
  );
};

export default UpdateNoteProvider;
