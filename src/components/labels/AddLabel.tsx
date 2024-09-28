import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DoneIcon from "@mui/icons-material/Done";
import LabelImportantTwoToneIcon from "@mui/icons-material/LabelImportantTwoTone";
import { IconButton, Tooltip } from "@mui/material";
import useAddLabel from "hooks/useAddLabel";
import React from "react";

const AddLabel = () => {
  const {
    labelData,
    handleChange,
    handleImportantClick,
    handleLabelSubmit,
    handleCloseClick,
  } = useAddLabel();

  return (
    <div className="d-flex flex-column">
      <form onSubmit={handleLabelSubmit}>
        <div
          className="d-flex justify-content-center px-3 mx-auto mt-4 mb-3"
          style={{ width: "45rem" }}
        >
          <div className="input-group input-group-sm mt-2">
            <span
              className="input-group-text bg-light bg-opacity-75"
              id="basic-addon1"
            >
              <LabelImportantTwoToneIcon
                style={{
                  color: labelData.important ? "#ffc61a" : "",
                }}
                fontSize="small"
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
              value={labelData.labelName}
              onChange={handleChange}
            />
            <span
              className="input-group-text bg-light bg-opacity-75"
              id="basic-addon1"
            >
              <Tooltip title={" Create"}>
                <IconButton type="submit">
                  <DoneIcon
                    style={{
                      color: "green",
                    }}
                    fontSize="small"
                  />
                </IconButton>
              </Tooltip>
            </span>
            <span
              className="input-group-text bg-light bg-opacity-75"
              id="basic-addon1"
            >
              <Tooltip
                title={
                  !labelData.important ? "Mark as Important" : "Mark as Basic"
                }
              >
                <IconButton onClick={handleImportantClick}>
                  <LabelImportantTwoToneIcon
                    style={{
                      color: !labelData.important ? "#ffc61a" : "",
                    }}
                    fontSize="small"
                  />
                </IconButton>
              </Tooltip>
            </span>

            <span
              className="input-group-text bg-light bg-opacity-75"
              id="basic-addon1"
            >
              {" "}
              <Tooltip title={" Reject"}>
                <IconButton onClick={handleCloseClick}>
                  <CloseOutlinedIcon
                    style={{
                      color: "red",
                    }}
                    fontSize="small"
                  />
                </IconButton>
              </Tooltip>
            </span>
          </div>
        </div>
      </form>
      <div className="d-flex flex-row flex-wrap"></div>
    </div>
  );
};

export default AddLabel;
