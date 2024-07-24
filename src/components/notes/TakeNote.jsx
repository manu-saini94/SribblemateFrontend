import React from "react";
import ImageIcon from "../../assets/imageicon.svg";
import IconImage from "../IconImage";

const TakeNote = () => {
  return (
    <div className="card" style={{ height: "50px" }}>
      <div className="card-body">
        <div className="d-flex flex-row ">
          <div className="d-flex input-group align-middle">
            <input
              type="text"
              className="form-control border-0 p-0 m-0"
              placeholder="Take a note..."
              aria-label="Take a note..."
              aria-describedby=""
              style={{
                width: "28rem",
              }}
            />
          </div>
          <IconImage x={3} y={0} src={ImageIcon} />
        </div>
      </div>
    </div>
  );
};

export default TakeNote;