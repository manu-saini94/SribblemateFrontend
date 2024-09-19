import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import { IconButton } from "@mui/material";
import { CreateLabelType } from "labeltypes";
import React, { FormEvent, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { initialCreateLabelValue } from "utility/reduxutils/labelUtils";
import { createLabel } from "../redux/asyncThunks";
import { insertNewLabel } from "../redux/labels/labelSlice";
import "../scss/main.scss";
const EditLabels = () => {
  const [labelData, setLabelData] = useState<CreateLabelType>(
    initialCreateLabelValue
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setLabelData((prevValues) => ({
      ...prevValues,
      labelName: value,
    }));
  };

  const handleCloseClick = () => {
    setLabelData((prevValues) => ({
      ...prevValues,
      labelName: "",
    }));
  };

  const handleLabelSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatchCreateLabel();
    handleCloseClick();
  };

  const dispatchCreateLabel = useCallback(() => {
    if (labelData.labelName !== "") {
      dispatch(createLabel(labelData)).then(() => dispatch(insertNewLabel()));
    }
  }, [labelData, dispatch]);

  return (
    <div className="d-flex flex-column">
      <form onSubmit={handleLabelSubmit}>
        <div
          className="d-flex justify-content-center px-3 mx-auto mt-4 mb-3"
          style={{ width: "45rem" }}
        >
          <div className="input-group mt-2">
            <span
              className="input-group-text bg-light bg-opacity-75"
              id="basic-addon1"
            >
              <IconButton>
                <LabelOutlinedIcon
                  style={{
                    fontSize: "25px",
                    marginTop: "2px",
                    marginBottom: "2px",
                  }}
                />
              </IconButton>
            </span>

            <input
              type="text"
              placeholder="Add new label..."
              aria-label="Add new label"
              aria-describedby="addon-wrapping"
              className="form-control border-opacity-75 input-box-border"
              id="label"
              name="label"
              value={labelData.labelName}
              onChange={handleChange}
            />
            <span
              className="input-group-text bg-light bg-opacity-75"
              id="basic-addon1"
            >
              <IconButton type="submit">
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
              <IconButton onClick={handleCloseClick}>
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
      </form>
      <div className="d-flex flex-row flex-wrap"></div>
    </div>
  );
};

export default EditLabels;
