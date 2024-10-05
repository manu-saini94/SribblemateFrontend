import useCollaboratorCreateCard from "hooks/useCollaboratorCreateCard";
import React from "react";
import Collaborator from "./Collaborator";

const CollaboratorCard = () => {
  const { handleCollaboratorSubmit, loggedInUserData } =
    useCollaboratorCreateCard();

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
          <Collaborator loggedInUserData={loggedInUserData} />
        </div>
      </div>
    </form>
  );
};

export default CollaboratorCard;
