import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

const useCollaboratorCreateCard = () => {
  const loggedInUserData = useSelector(
    (state: RootState) => state.auth.loggedInUserData
  );

  useEffect(() => {
    console.log("data => ", loggedInUserData);
  }, [loggedInUserData]);

  const handleCollaboratorSubmit = () => {};

  return { handleCollaboratorSubmit, loggedInUserData };
};

export default useCollaboratorCreateCard;
