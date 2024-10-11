import { CollaboratorCardPropsType, CreateCollaboratorType } from "notetypes";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { NoteCardType } from "utility/miscsUtils";
import { validateEmail } from "utility/validationutils/authValidationUtils";

const useCollaboratorCreateCard = ({
  changeActiveCard,
}: CollaboratorCardPropsType) => {
  const loggedInUserData = useSelector(
    (state: RootState) => state.auth.loggedInUserData
  );
  const isExist = useSelector((state: RootState) => state.users.isExist);

  const dispatch = useDispatch<AppDispatch>();
  const [currentCollaborator, setCurrentCollaborator] =
    useState<CreateCollaboratorType>({ email: "" });

  const collaboratorArray = useSelector(
    (state: RootState) => state.users.collaboratorArray
  );

  const [newCollaboratorArray, setNewCollaboratorArray] = useState<
    CreateCollaboratorType[]
  >([]);

  const [collaboratorError, setCollaboratorError] = useState<string>("");

  useEffect(() => {
    setNewCollaboratorArray([]);
  }, []);

  const validateForm = (): string => {
    const error = validateEmail(currentCollaborator.email);
    return error;
  };

  const handleCollaboratorSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatchCreateCollaborator();
  };

  const dispatchCreateCollaborator = () => {
    // dispatch(createCollaborator());
  };

  const handleCancelClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    changeActiveCard(NoteCardType.NOTE);
  };

  const handleDoneClick = () => {
    const error = validateForm();
    if (error) {
      setCollaboratorError(error);
      return;
    }
    // dispatch(checkCollaboratorExist(currentCollaborator)).then(() =>
    //   dispatch(insertCurrentCollaborator(currentCollaborator))
    // );
    setNewCollaboratorArray((prevValues) => [
      ...prevValues,
      currentCollaborator,
    ]);
  };

  const handleCollaboratorChange = (event: { target: { value: any } }) => {
    const { value } = event.target;
    const collaborator: CreateCollaboratorType = { email: value };
    setCurrentCollaborator(collaborator);
    if (value.trim() !== "") {
      setCollaboratorError("");
    }
  };

  return {
    handleCollaboratorSubmit,
    loggedInUserData,
    collaboratorArray,
    handleCollaboratorChange,
    currentCollaborator,
    handleDoneClick,
    collaboratorError,
    handleCancelClick,
    newCollaboratorArray,
  };
};

export default useCollaboratorCreateCard;
