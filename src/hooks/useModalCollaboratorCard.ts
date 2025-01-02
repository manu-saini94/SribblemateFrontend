import { useUpdateNote } from "contexts/hooks/useUpdateNote";
import { UpdateCollaboratorType } from "notetypes";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { validateEmail } from "utility/validationutils/authValidationUtils";
import { checkCollaboratorExist } from "../redux/asyncThunks";
import {
  setCollaboratorError,
  setCurrentCollaborator,
} from "../redux/users/usersSlice";

const useModalCollaboratorCard = () => {
  const updateNoteContext = useUpdateNote();

  const [collaboratorArray, setCollaboratorArray] = useState<
    UpdateCollaboratorType[]
  >(updateNoteContext.noteData.collaboratorList);

  const collaboratorExistError = useSelector(
    (state: RootState) => state.users.collaboratorExistError
  );

  const dispatch = useDispatch<AppDispatch>();

  const currentCollaborator = useSelector(
    (state: RootState) => state.users.currentCollaborator
  );

  const validateForm = (): string => {
    const error = validateEmail(currentCollaborator.email);
    return error;
  };

  const handleCollaboratorSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatchUpdateCollaborator();
  };

  const dispatchUpdateCollaborator = () => {
    //   if (newCollaboratorArray.length > 0) {
    //     dispatch(addCollaborators(newCollaboratorArray));
    //     changeActiveCard(NoteCardType.NOTE);
    //   }
  };

  const handleCancelClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    //   dispatch(setNewCollaboratorArray([]));
    //   dispatch(setCurrentCollaborator({} as CreateCollaboratorType));
    //   dispatch(setCollaboratorError(""));
    //   changeActiveCard(NoteCardType.NOTE);
  };

  const handleCloseClick = () => {
    dispatch(setCurrentCollaborator({ id: 0, email: "", name: "" }));
  };

  const handleDoneClick = async () => {
    const error = validateForm();
    if (error) {
      dispatch(setCollaboratorError(error));
    } else if (checkAlreadyExist()) {
      dispatch(setCollaboratorError("This email already exists"));
    } else dispatch(checkCollaboratorExist(currentCollaborator));
  };

  const checkExistence = (collabArray: UpdateCollaboratorType[]) => {
    return collabArray.some(
      (collaborator) => collaborator.email === currentCollaborator.email
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
    dispatch(setCurrentCollaborator(collaborator));
    if (value.trim() !== "") {
      dispatch(setCollaboratorError(""));
    }
  };

  return {
    collaboratorArray,
    handleCollaboratorSubmit,
    collaboratorExistError,
    dispatch,
    currentCollaborator,
    handleDoneClick,
    handleCancelClick,
    handleCloseClick,
    handleCollaboratorChange,
  };
};

export default useModalCollaboratorCard;
