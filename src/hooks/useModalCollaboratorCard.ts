import { useUpdateNote } from "contexts/hooks/useUpdateNote";
import { UpdateCollaboratorType } from "notetypes";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { NoteCardType } from "utility/miscsUtils";
import { validateEmail } from "utility/validationutils/authValidationUtils";
import { addCollaborator } from "../redux/asyncThunks";
import {
  setCollaboratorUpdateError,
  updateUserNote,
} from "../redux/notes/noteSlice";

const useModalCollaboratorCard = () => {
  const updateNoteContext = useUpdateNote();

  const [collaboratorArray, setCollaboratorArray] = useState<
    UpdateCollaboratorType[]
  >(updateNoteContext.noteData.collaboratorList);

  const collaboratorUpdateError = useSelector(
    (state: RootState) => state.notes.noteUpdateError
  );

  const dispatch = useDispatch<AppDispatch>();

  const [currentCollaborator, setCurrentCollaborator] =
    useState<UpdateCollaboratorType>({} as UpdateCollaboratorType);

  const validateForm = (): string => {
    const error = validateEmail(currentCollaborator.email);
    return error;
  };

  const handleBackClick = () => {
    updateNoteContext.changeActiveCard(NoteCardType.NOTE);
  };

  const handleCollaboratorSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const error = validateForm();
    if (error) {
      dispatch(setCollaboratorUpdateError(error));
    } else if (checkAlreadyExist()) {
      dispatch(setCollaboratorUpdateError("This email already exists"));
    } else dispatchAddCollaborator();
  };

  const dispatchAddCollaborator = () => {
    const noteId = updateNoteContext?.noteData?.id;
    dispatch(
      addCollaborator({
        collaboratorEmail: currentCollaborator.email,
        noteId: noteId,
      })
    ).then(() => {
      dispatch(updateUserNote());
    });
  };

  const handleCancelClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    //  dispatch(deleteCollaborator({noteId:id,collaboratorId:}))
  };

  const handleCloseClick = () => {
    setCurrentCollaborator({ id: 0, email: "", name: "" });
    dispatch(setCollaboratorUpdateError(""));
  };

  const checkExistence = (collabArray: UpdateCollaboratorType[]) => {
    return (
      collabArray.some(
        (collaborator) => collaborator.email === currentCollaborator.email
      ) ||
      currentCollaborator.email === updateNoteContext.noteData.createdBy.email
    );
  };

  const checkAlreadyExist = () => {
    return checkExistence(collaboratorArray);
  };

  const handleCollaboratorChange = (event: { target: { value: any } }) => {
    const { value } = event.target;
    const collaborator: UpdateCollaboratorType = {
      id: 0,
      email: value,
      name: "",
    };
    setCurrentCollaborator(collaborator);
    if (value.trim() !== "") {
      dispatch(setCollaboratorUpdateError(""));
    }
  };

  const moveNoteOwnerToTop = useMemo(() => {
    const owner = updateNoteContext.noteData.createdBy;
    const collabList = updateNoteContext.noteData.collaboratorList;
    const filteredList = collabList.filter(
      (collab) => collab.email !== owner.email
    );
    filteredList.unshift(owner);
    return filteredList;
  }, [
    updateNoteContext.noteData.collaboratorList,
    updateNoteContext.noteData.createdBy,
  ]);

  useEffect(() => {
    return () => {
      const collaborator: UpdateCollaboratorType = {
        id: 0,
        email: "",
        name: "",
      };
      setCurrentCollaborator(collaborator);
      dispatch(setCollaboratorUpdateError(""));
    };
  }, [dispatch]);

  useEffect(() => {
    setCollaboratorArray(moveNoteOwnerToTop);
  }, [moveNoteOwnerToTop, updateNoteContext.noteData.collaboratorList]);

  return {
    collaboratorArray,
    handleBackClick,
    handleCollaboratorSubmit,
    collaboratorUpdateError,
    dispatch,
    currentCollaborator,
    handleCancelClick,
    handleCloseClick,
    handleCollaboratorChange,
  };
};

export default useModalCollaboratorCard;
