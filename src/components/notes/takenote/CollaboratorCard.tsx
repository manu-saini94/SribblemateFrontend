import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { IconButton } from "@mui/material";
import useCollaboratorCreateCard from "hooks/useCollaboratorCreateCard";
import { CollaboratorCardPropsType, CreateCollaboratorType } from "notetypes";
import React from "react";

import Collaborator from "./Collaborator";

const CollaboratorCard = ({ changeActiveCard }: CollaboratorCardPropsType) => {
  const {
    handleCollaboratorSubmit,
    loggedInUserData,
    collaboratorArray,
    handleDoneClick,
    currentCollaborator,
    collaboratorError,
    handleCollaboratorChange,
    handleCancelClick,
    newCollaboratorArray,
  } = useCollaboratorCreateCard({ changeActiveCard });

  return (
    <form onSubmit={handleCollaboratorSubmit}>
      <div
        className="card "
        style={{
          height: "auto",
          width: "35rem",
        }}
      >
        <div className="card-header " style={{ fontWeight: "2px" }}>
          Collaborators
        </div>
        <div className="card-body pb-2">
          <Collaborator collaborator={loggedInUserData} />
          {collaboratorArray.length > 0 &&
            collaboratorArray.map((collaborator: CreateCollaboratorType) => {
              return (
                <div className="mt-2" key={collaborator.email}>
                  <Collaborator collaborator={collaborator} />
                </div>
              );
            })}
          {newCollaboratorArray.length > 0 &&
            newCollaboratorArray.map((collaborator: CreateCollaboratorType) => {
              return (
                <div className="mt-2" key={collaborator.email}>
                  <Collaborator collaborator={collaborator} />
                </div>
              );
            })}
          <div className="d-flex mb-1">
            <PersonAddOutlinedIcon
              className="col-2 me-2 mt-2 fs-3"
              style={{ color: "gray" }}
            />
            <div className="input-group input-group-sm mt-2">
              <input
                type="text"
                placeholder="Person email to share with"
                aria-label="Add new label"
                aria-describedby="addon-wrapping"
                className="form-control border-none "
                id="label"
                name="label"
                value={currentCollaborator?.email}
                onChange={handleCollaboratorChange}
                style={{ border: "none" }}
              />
            </div>
            {currentCollaborator?.email?.length > 0 && (
              <div className="">
                <IconButton onClick={handleDoneClick}>
                  <CheckOutlinedIcon
                    className="col-2 me-2 mt-1 fs-5"
                    style={{ color: "green" }}
                  />
                </IconButton>
              </div>
            )}
          </div>
          <div
            style={{ marginLeft: "43px", marginTop: "-9px" }}
            className="fs-6 text-danger"
          >
            {" "}
            {collaboratorError}
          </div>
        </div>
        <div className="d-flex justify-content-end mx-2 my-2">
          <button
            onClick={(event) => handleCancelClick(event)}
            className="btn btn-sm fw-medium card-button mx-2"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-sm fw-medium card-button">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default CollaboratorCard;
