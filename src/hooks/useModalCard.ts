import { ModalNotePropsType } from "notetypes";
import { useRef, useState } from "react";

const useModalCard = (props: ModalNotePropsType) => {
  const colorPaletteRef = useRef<HTMLDivElement>(null);
  const [isListNote, setIsListNote] = useState<Boolean>(false);
  const [isOpenColorTooltip, setIsOpenColorTooltip] = useState<Boolean>(false);

  const handleNoteSubmit = () => {};
  const handleTitleChange = () => {};

  const onPinClick = () => {};
  const handleContentChange = () => {};

  const onCollaboratorIconClick = () => {};

  const changeColorClick = () => {};

  const onReminderIconClick = () => {};

  const onImageIconClick = () => {};

  const onArchiveClick = () => {};

  const handleColorTooltipClose = () => {};

  const handleColorTooltipOpen = () => {};

  const toggleColorPalette = () => {};

  const onDeleteIconClick = () => {};

  const onLabelAddIconClick = () => {};

  const onCheckboxIconClick = () => {};

  return {
    isListNote,
    colorPaletteRef,
    handleNoteSubmit,
    handleTitleChange,
    onPinClick,
    handleContentChange,
    onCollaboratorIconClick,
    changeColorClick,
    onReminderIconClick,
    onImageIconClick,
    onArchiveClick,
    isOpenColorTooltip,
    handleColorTooltipClose,
    handleColorTooltipOpen,
    toggleColorPalette,
    onDeleteIconClick,
    onLabelAddIconClick,
    onCheckboxIconClick,
  };
};

export default useModalCard;
