import { CreateCollaboratorType } from "notetypes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { validateEmail } from "utility/validationutils/authValidationUtils";

const useCollaboratorCreateCard = () => {
  const loggedInUserData = useSelector(
    (state: RootState) => state.auth.loggedInUserData
  );
  const dispatch = useDispatch<AppDispatch>();
  const [currentCollaborator, setCurrentCollaborator] = useState<string>("");
  const [collaboratorArray, setCollaboratorArray] = useState<
    CreateCollaboratorType[]
  >([]);
  const [collaboratorError, setCollaboratorError] = useState<string>("");

  useEffect(() => {
    console.log("data => ", loggedInUserData);
  }, [loggedInUserData]);

  const validateForm = (): string => {
    const error = validateEmail(currentCollaborator);
    return error;
  };

  const handleCollaboratorSubmit = () => {
    dispatchCreateCollaborator();
  };

  const dispatchCreateCollaborator = () => {
    // dispatch(createCollaborator());
  };

  const handleDoneClick = () => {
    const error = validateForm();
    if (error !== null || error !== undefined || error !== "") {
      setCollaboratorError(error);
      return;
    }
    setCollaboratorArray((prevValues) => ({
      ...prevValues,
      currentCollaborator,
    }));
  };
  const handleCollaboratorChange = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setCurrentCollaborator(value);
  };

  return {
    handleCollaboratorSubmit,
    loggedInUserData,
    collaboratorArray,
    handleCollaboratorChange,
    currentCollaborator,
    handleDoneClick,
    collaboratorError,
  };
};

export default useCollaboratorCreateCard;
