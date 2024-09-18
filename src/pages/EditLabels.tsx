import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import "../scss/main.scss";
const EditLabels = () => {
  const [labelName, setLabelName] = useState<string>("");
  const handleChange = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setLabelName(value);
  };
  return (
    <div className="d-flex flex-column">
      <div
        className="d-flex justify-content-center px-3 mx-auto mt-4 mb-3"
        style={{ width: "45rem" }}
      >
        <div className="input-group mt-2">
          <span
            className="input-group-text bg-light bg-opacity-75"
            id="basic-addon1"
          >
            <LabelOutlinedIcon
              style={{
                fontSize: "25px",
                marginTop: "2px",
                marginBottom: "2px",
              }}
            />
          </span>
          <input
            type="text"
            placeholder="Add new label..."
            aria-label="Add new label"
            aria-describedby="addon-wrapping"
            className="form-control border-opacity-75 input-box-border"
            id="label"
            name="label"
            value={labelName}
            onChange={handleChange}
          />
          <span
            className="input-group-text bg-light bg-opacity-75"
            id="basic-addon1"
          >
            <IconButton>
              <DoneOutlineOutlinedIcon
                style={{
                  fontSize: "25px",
                  color: "green",
                }}
              />
            </IconButton>
          </span>
          <span
            className="input-group-text bg-light bg-opacity-75"
            id="basic-addon1"
          >
            <IconButton>
              <CloseOutlinedIcon
                style={{
                  fontSize: "25px",
                  color: "red",
                }}
              />
            </IconButton>
          </span>
        </div>
      </div>
      <div className="d-flex flex-row flex-wrap"></div>
    </div>
  );
};

export default EditLabels;
