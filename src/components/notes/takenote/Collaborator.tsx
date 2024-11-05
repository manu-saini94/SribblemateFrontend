import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Divider } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { CreateCollaboratorPropsType } from "../../../types/notetypes";

const Collaborator = ({ collaborator }: CreateCollaboratorPropsType) => {
  const loggedInUserData = useSelector(
    (state: RootState) => state.auth.loggedInUserData
  );

  return (
    <>
      <div className="d-flex mb-1">
        <AccountCircleRoundedIcon
          className="col-2 me-2 fs-1 mt-1"
          style={{ color: "gray" }}
        />
        <div className="d-flex flex-column">
          <div className="col" style={{ fontSize: "12px", marginTop: "7px" }}>
            {collaborator?.name}
            {loggedInUserData?.userDto?.email === collaborator?.email
              ? " (owner)"
              : ""}
          </div>
          <div className="col" style={{ fontSize: "12px", marginTop: "-1px" }}>
            {collaborator?.email}
          </div>
        </div>
      </div>
      <Divider
        orientation="horizontal"
        variant="middle"
        textAlign="left"
        sx={{ opacity: 1, borderColor: "lightgray" }}
      />
    </>
  );
};

export default Collaborator;
