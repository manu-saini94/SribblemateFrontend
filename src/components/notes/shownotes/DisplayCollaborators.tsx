import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { DisplayCollaboratorTypes } from "userstypes";

const DisplayCollaborators = (props: DisplayCollaboratorTypes) => {
  const { collaboratorList, onCollabClick } = props;
  const loggedInUserData = useSelector(
    (state: RootState) => state.auth.loggedInUserData
  );
  return (
    <div className="d-flex column flex-wrap" style={{ marginLeft: "-10px" }}>
      {collaboratorList?.map((collaborator) => {
        if (loggedInUserData?.userDto.email !== collaborator.email)
          return (
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
              <IconButton onClick={onCollabClick}>
                <AccountCircleRoundedIcon
                  className="col-2"
                  style={{ color: "gray" }}
                />
              </IconButton>
            </Tooltip>
          );
        else return "";
      })}
    </div>
  );
};

export default DisplayCollaborators;
