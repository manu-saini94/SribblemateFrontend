import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { DisplayCollaboratorTypes } from "userstypes";

const DisplayCollaborator = (props: DisplayCollaboratorTypes) => {
  const { collaborator, onCollabClick } = props;
  const loggedInUserData = useSelector(
    (state: RootState) => state.auth.loggedInUserData
  );
  return (
    <>
      {loggedInUserData?.userDto?.email !== collaborator?.email && (
        <Tooltip
          title={
            <span>
              {collaborator.name}
              <br />
              {collaborator.email}
            </span>
          }
          key={collaborator.email}
        >
          <IconButton onClick={onCollabClick} disableRipple>
            <AccountCircleRoundedIcon
              className="col-2"
              style={{ color: "gray" }}
              fontSize="medium"
            />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};

export default DisplayCollaborator;
