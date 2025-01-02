import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Divider } from "@mui/material";
import { useUpdateNote } from "contexts/hooks/useUpdateNote";
import { CollaboratorPropsType } from "notetypes";
import React from "react";

const CollaboratorUpdate = ({ collaborator }: CollaboratorPropsType) => {
  const updateNoteContext = useUpdateNote();
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
            {updateNoteContext?.noteData?.createdBy?.email ===
            collaborator?.email
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

export default CollaboratorUpdate;
