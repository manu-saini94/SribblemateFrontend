import useAddLabelCard from "hooks/useAddLabelCard";
import { LabelCardPropsType } from "notetypes";
import React from "react";

const LabelsCard = ({ changeActiveCard }: LabelCardPropsType) => {
  const { handleLabelSubmit } = useAddLabelCard({ changeActiveCard });

  return (
    <form onSubmit={handleLabelSubmit}>
      <div
        className="card "
        style={{
          height: "auto",
          width: "35rem",
        }}
      >
        <div className="card-header " style={{ fontWeight: "2px" }}>
          Add Labels
        </div>
        <div className="card-body pb-2">
          <button type="submit" className="btn btn-sm fw-medium card-button">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default LabelsCard;
