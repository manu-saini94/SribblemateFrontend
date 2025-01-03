import CreateNoteContext from "contexts/CreateNoteContext";
import { NoteContextProps } from "global";
import { CreateNoteType } from "notetypes";
import React, { ReactNode, useCallback, useMemo, useState } from "react";
import { initialCreateNoteValue } from "utility/reduxutils/noteUtils";

const CreateNoteProvider = ({ children }: NoteContextProps): ReactNode => {
  const [noteData, setNoteData] = useState<CreateNoteType>(
    initialCreateNoteValue
  );

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

  const onPinClick = useCallback(() => {
    setNoteData((prevValues) => ({
      ...prevValues,
      pinned: !prevValues.pinned,
      archived: false,
    }));
  }, []);

  const changeColorClick = useCallback((color: string) => {
    setNoteData((prevValues) => ({
      ...prevValues,
      color: color,
    }));
  }, []);

  const onCheckboxClick = useCallback((): void => {}, []);

  const onDeleteClick = useCallback((): void => {}, []);

  const onReminderClick = useCallback((): void => {}, []);

  const onImageClick = useCallback((): void => {}, []);

  const noteContextValue = useMemo(
    () => ({
      noteData,
      changeColorClick,
      handleChange,
      onPinClick,
      onCheckboxClick,
      onDeleteClick,
      onReminderClick,
      onImageClick,
    }),
    [
      handleChange,
      noteData,
      onCheckboxClick,
      onDeleteClick,
      onImageClick,
      onPinClick,
      onReminderClick,
      changeColorClick,
    ]
  );

  return (
    <CreateNoteContext.Provider value={noteContextValue}>
      {children}
    </CreateNoteContext.Provider>
  );
};

export default CreateNoteProvider;
