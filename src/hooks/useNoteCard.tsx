import { NoteCardPropsType, UpdateNoteType } from "notetypes";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { updatePinForNote } from "../redux/asyncThunks";
import { updateUserNote } from "../redux/notes/noteSlice";

const useNoteCard = ({ noteCardValues }: NoteCardPropsType) => {
  const dispatch = useDispatch<AppDispatch>();
  const [updateNote, setUpdateNote] = useState<UpdateNoteType>(noteCardValues);
  const colorPaletteRef = useRef<HTMLDivElement>(null);
  const takeNoteDetailsRef = useRef<HTMLDivElement>(null);
  const [openPalette, setOpenPalette] = useState(false);

  const onPinClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // setPin(!pin);
    dispatchPinNote();
  };

  const dispatchPinNote = () => {
    dispatch(updatePinForNote(noteCardValues.id)).then(() => {
      dispatch(updateUserNote());
    });
  };

  const handleTitleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    const target = event.target as HTMLElement;
    // event.preventDefault();
  };

  const handleContentClick = (event: React.MouseEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const target = event.target as HTMLElement;
    // event.preventDefault();
  };

  const onCollaboratorClick = () => {};

  const onReminderClick = () => {};

  const onArchiveClick = () => {
    // setArchive(true);
  };

  const onMoreClick = () => {};

  const onImageClick = () => {};

  const toggleColorPalette = () => {
    colorPaletteRef.current?.classList.toggle("show");
  };

  useEffect(() => {});

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (
        colorPaletteRef.current &&
        !colorPaletteRef.current.contains(target)
      ) {
        setOpenPalette(false);
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
    setUpdateNote,
    colorPaletteRef,
    takeNoteDetailsRef,
    openPalette,
    setOpenPalette,
    onPinClick,
    handleTitleClick,
    handleContentClick,
    onCollaboratorClick,
    onReminderClick,
    onArchiveClick,
    onMoreClick,
    onImageClick,
    toggleColorPalette,
  };
};

export default useNoteCard;
