import { CollaboratorCardPropsType, CreateCollaboratorType } from "notetypes";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { NoteCardType } from "utility/miscsUtils";
import { validateEmail } from "utility/validationutils/authValidationUtils";
import { checkCollaboratorExist } from "../redux/asyncThunks";
import {
  addCollaborators,
  setCollaboratorError,
  setCurrentCollaborator,
  setNewCollaboratorArray,
} from "../redux/users/usersSlice";

const useCollaboratorCreateCard = ({
  changeActiveCard,
}: CollaboratorCardPropsType) => {
  const loggedInUserData = useSelector(
    (state: RootState) => state.auth.loggedInUserData
  );
  const collaboratorExistError = useSelector(
    (state: RootState) => state.users.collaboratorExistError
  );

  const dispatch = useDispatch<AppDispatch>();

  const currentCollaborator = useSelector(
    (state: RootState) => state.users.currentCollaborator
  );

  const [owner, setOwner] = useState<CreateCollaboratorType>(
    {} as CreateCollaboratorType
  );

  const collaboratorArray = useSelector(
    (state: RootState) => state.users.collaboratorArray
  );

  const newCollaboratorArray = useSelector(
    (state: RootState) => state.users.newCollaboratorArray
  );

  useEffect(() => {
    dispatch(setNewCollaboratorArray([]));
    const ownerObject: CreateCollaboratorType = {
      name: loggedInUserData?.userDto?.fullName,
      email: loggedInUserData?.userDto?.email,
    };
    setOwner(ownerObject);
  }, [
    dispatch,
    loggedInUserData?.userDto?.email,
    loggedInUserData?.userDto?.fullName,
  ]);

  const validateForm = (): string => {
    const error = validateEmail(currentCollaborator.email);
    return error;
  };

  const handleCollaboratorSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatchCreateCollaborator();
  };

  const dispatchCreateCollaborator = () => {
    if (newCollaboratorArray.length > 0) {
      dispatch(addCollaborators(newCollaboratorArray));
      changeActiveCard(NoteCardType.NOTE);
    }
  };

  const handleCancelClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(setNewCollaboratorArray([]));
    dispatch(setCurrentCollaborator({} as CreateCollaboratorType));
    dispatch(setCollaboratorError(""));
    changeActiveCard(NoteCardType.NOTE);
  };

  const handleCloseClick = () => {
    dispatch(setCurrentCollaborator({ email: "", name: "" }));
  };

  const handleDoneClick = async () => {
    const error = validateForm();
    if (error) {
      dispatch(setCollaboratorError(error));
    } else if (checkAlreadyExist()) {
      dispatch(setCollaboratorError("This email already exists"));
    } else dispatch(checkCollaboratorExist(currentCollaborator));
  };

  const checkExistence = (collabArray: CreateCollaboratorType[]) => {
    return collabArray.some(
      (collaborator) => collaborator.email === currentCollaborator.email
    );
  };

  const checkAlreadyExist = () => {
    return (
      checkExistence(collaboratorArray) || checkExistence(newCollaboratorArray)
    );
  };

  const handleCollaboratorChange = (event: { target: { value: any } }) => {
    const { value } = event.target;
    const collaborator: CreateCollaboratorType = { email: value, name: "" };
    dispatch(setCurrentCollaborator(collaborator));
    if (value.trim() !== "") {
      dispatch(setCollaboratorError(""));
    }
  };

  return {
    owner,
    collaboratorExistError,
    handleCollaboratorSubmit,
    loggedInUserData,
    collaboratorArray,
    handleCollaboratorChange,
    currentCollaborator,
    handleDoneClick,
    handleCancelClick,
    newCollaboratorArray,
    handleCloseClick,
  };
};

export default useCollaboratorCreateCard;
