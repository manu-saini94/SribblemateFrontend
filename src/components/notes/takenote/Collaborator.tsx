import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Divider from "@mui/material/Divider";
import { CollaboratorPropsType } from "notetypes";
import React from "react";
const Collaborator = ({ loggedInUserData }: CollaboratorPropsType) => {
  return (
    <>
      <div className="d-flex mb-1">
        <AccountCircleRoundedIcon
          className="col-2 me-2"
          style={{ fontSize: "38px" }}
        />
        <div className="d-flex flex-column">
          <div className="col" style={{ fontSize: "12px", marginTop: "2px" }}>
            {/* {loggedInUserData?.userDto?.fullName} */}
            Manu Saini (owner)
          </div>
          <div className="col" style={{ fontSize: "12px", marginTop: "-2px" }}>
            {/* {loggedInUserData?.userDto?.email} */}
            manu.saini94@gmail.com
          </div>
        </div>
      </div>
      <Divider
        orientation="horizontal"
        variant="middle"
        textAlign="left"
        sx={{ opacity: 1, borderColor: "lightgray" }}
        style={{}}
      />
      <div className="col" style={{ fontSize: "12px", marginTop: "-2px" }}>
        manu.saini94@gmail.com
      </div>
    </>
  );
};

export default Collaborator;
