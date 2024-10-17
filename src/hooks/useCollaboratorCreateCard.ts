import { CollaboratorCardPropsType, CreateCollaboratorType } from "notetypes";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { NoteCardType } from "utility/miscsUtils";
import { validateEmail } from "utility/validationutils/authValidationUtils";
import { checkCollaboratorExist } from "../redux/asyncThunks";

const useCollaboratorCreateCard = ({
  changeActiveCard,
}: CollaboratorCardPropsType) => {
  const loggedInUserData = useSelector(
    (state: RootState) => state.auth.loggedInUserData
  );
  const isExist = useSelector((state: RootState) => state.users.isExist);

  const dispatch = useDispatch<AppDispatch>();
  const [currentCollaborator, setCurrentCollaborator] =
    useState<CreateCollaboratorType>({} as CreateCollaboratorType);

  const [owner, setOwner] = useState<CreateCollaboratorType>(
    {} as CreateCollaboratorType
  );

  const collaboratorArray = useSelector(
    (state: RootState) => state.users.collaboratorArray
  );

  const [newCollaboratorArray, setNewCollaboratorArray] = useState<
    CreateCollaboratorType[]
  >([]);

  const [collaboratorError, setCollaboratorError] = useState<string>("");

  useEffect(() => {
    setNewCollaboratorArray([]);
    const ownerObject: CreateCollaboratorType = {
      name: loggedInUserData.userDto.fullName,
      email: loggedInUserData.userDto.email,
    };
    setOwner(ownerObject);
  }, [loggedInUserData.userDto.email, loggedInUserData.userDto.fullName]);

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

  const handleDoneClick = async () => {
    const error = validateForm();

    if (error) {
      setCollaboratorError(error);
      return;
    }

    try {
      const response = await dispatch(
        checkCollaboratorExist(currentCollaborator)
      ); // Await the async operation
      if (response) {
        console.log("res", response);

        // Only update the collaborator array if the collaborator exists and no error occurred
        setNewCollaboratorArray((prevValues) => [
          ...prevValues,
          currentCollaborator,
        ]);
      }
    } catch (error) {
      console.error("Error checking collaborator:", error);
      setCollaboratorError(JSON.stringify(error));
      // You can set an error state if needed here
    }
  };

  const handleCollaboratorChange = (event: { target: { value: any } }) => {
    const { value } = event.target;
    const collaborator: CreateCollaboratorType = { email: value, name: "" };
    setCurrentCollaborator(collaborator);
    if (value.trim() !== "") {
      setCollaboratorError("");
    }
  };

  return {
    owner,
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
