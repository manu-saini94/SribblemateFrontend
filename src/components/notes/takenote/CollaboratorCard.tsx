import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { Divider, IconButton, Tooltip } from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import useCollaboratorCreateCard from "hooks/useCollaboratorCreateCard";
import { CollaboratorCardPropsType, CreateCollaboratorType } from "notetypes";
import React from "react";

import Collaborator from "./Collaborator";

const CollaboratorCard = ({ changeActiveCard }: CollaboratorCardPropsType) => {
  const {
    owner,
    handleCollaboratorSubmit,
    collaboratorArray,
    handleDoneClick,
    currentCollaborator,
    collaboratorExistError,
    handleCollaboratorChange,
    handleCancelClick,
    newCollaboratorArray,
    handleCloseClick,
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
          <Collaborator collaborator={owner} />
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
              className="col-2 me-2 mt-2 fs-2"
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
              <div className="d-flex mt-1">
                <Tooltip title={"Done"}>
                  <IconButton onClick={handleDoneClick}>
                    <CheckOutlinedIcon
                      className="col-2 fs-5"
                      style={{ color: "green" }}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Cancel"}>
                  <IconButton onClick={handleCloseClick}>
                    <CloseOutlinedIcon
                      className="col-2 fs-5"
                      style={{
                        color: "red",
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </div>
            )}
          </div>
          <Divider
            orientation="horizontal"
            variant="middle"
            textAlign="left"
            sx={{ opacity: 1, borderColor: "lightgray" }}
          />
          <div
            style={{ marginLeft: "43px", marginTop: "-1px", fontSize: "13px" }}
            className="text-danger"
          >
            {" "}
            {collaboratorExistError}
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
