import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Divider } from "@mui/material";
import { CollaboratorPropsType } from "notetypes";
import React from "react";

const Collaborator = ({ collaborator }: CollaboratorPropsType) => {
  return (
    <>
      <div className="d-flex mb-1">
        <AccountCircleRoundedIcon
          className="col-2 me-2 fs-3"
          style={{ color: "gray" }}
        />
        <div className="d-flex flex-column">
          <div className="col" style={{ fontSize: "12px", marginTop: "2px" }}>
            {/* {collaborator?.name} */}
            {/* Manu Saini (owner) */}
          </div>
          <div className="col" style={{ fontSize: "12px", marginTop: "-2px" }}>
            manu.saini94@gmail.com (owner)
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
