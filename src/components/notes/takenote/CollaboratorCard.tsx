import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { IconButton } from "@mui/material";
import useCollaboratorCreateCard from "hooks/useCollaboratorCreateCard";
import { CreateCollaboratorType } from "notetypes";
import React from "react";
import Collaborator from "./Collaborator";

const CollaboratorCard = () => {
  const {
    handleCollaboratorSubmit,
    loggedInUserData,
    collaboratorArray,
    handleDoneClick,
    currentCollaborator,
    collaboratorError,
    handleCollaboratorChange,
  } = useCollaboratorCreateCard();

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
          {collaboratorArray?.map((collaborator: CreateCollaboratorType) => {
            return <Collaborator collaborator={collaborator} />;
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
                value={currentCollaborator}
                onChange={handleCollaboratorChange}
                style={{ border: "none" }}
              />
            </div>
            {currentCollaborator.length > 0 && (
              <div className="">
                <IconButton>
                  <CheckOutlinedIcon
                    className="col-2 me-2 mt-1 fs-5"
                    style={{ color: "green" }}
                    onClick={handleDoneClick}
                  />
                </IconButton>
              </div>
            )}
          </div>
          <div className="font text-danger"> {collaboratorError}</div>
        </div>
      </div>
    </form>
  );
};

export default CollaboratorCard;
