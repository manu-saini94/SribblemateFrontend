import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { Divider, IconButton, Tooltip } from "@mui/material";
import useModalCollaboratorCard from "hooks/useModalCollaboratorCard";
import { UpdateCollaboratorType } from "notetypes";
import React from "react";
import CollaboratorUpdate from "./CollaboratorUpdate";

const CollaboratorUpdateCard = () => {
  const {
    collaboratorArray,
    handleCollaboratorChange,
    handleCollaboratorSubmit,
    collaboratorUpdateError,
    currentCollaborator,
    handleBackClick,
    handleCloseClick,
  } = useModalCollaboratorCard();

  return (
    <form onSubmit={handleCollaboratorSubmit}>
      <div
        className="card "
        style={{
          height: "auto",
          width: "35rem",
        }}
      >
        <div className="card-header d-flex" style={{ fontWeight: "2px" }}>
          <div style={{ marginLeft: "-8px" }}>
            <Tooltip title={"Back To Note"}>
              <IconButton onClick={handleBackClick}>
                <ArrowBackRoundedIcon />
              </IconButton>
            </Tooltip>
          </div>
          <span style={{ marginTop: "8px", marginLeft: "2px" }}>
            Collaborators
          </span>
        </div>
        <div className="card-body pb-2">
          {collaboratorArray.length > 0 &&
            collaboratorArray.map((collaborator: UpdateCollaboratorType) => {
              return (
                <div className="mt-2" key={collaborator.email}>
                  <CollaboratorUpdate collaborator={collaborator} />
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
                  <IconButton type="submit">
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
            style={{
              marginLeft: "43px",
              marginTop: "-1px",
              marginBottom: "30px",
              fontSize: "13px",
            }}
            className="text-danger"
          >
            {" "}
            {collaboratorUpdateError}
          </div>
        </div>
      </div>
    </form>
  );
};

export default CollaboratorUpdateCard;
