import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DoneIcon from "@mui/icons-material/Done";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LabelImportantTwoToneIcon from "@mui/icons-material/LabelImportantTwoTone";
import { IconButton, Tooltip } from "@mui/material";
import useEditLabel from "hooks/useEditLabel";
import { UpdateLabelCardPropsType } from "labeltypes";
import React from "react";
import { getDateTime } from "utility/datetimeutils/dateTime";

const UpdateLabelCard = ({ label, index }: UpdateLabelCardPropsType) => {
  const {
    isEditOn,
    labelData,
    inputRef,
    wrapperRef,
    handleImportantClick,
    handleChange,
    handleCloseClick,
    handleEditClick,
  } = useEditLabel({ label, index });

  const getLabelDateTime = (timestamp: string) => {
    console.log("Getting label datetime for", timestamp);
    return getDateTime(timestamp);
  };

  const handleDeleteClick = () => {};
  return (
    <div className="p-2 g-col-2 mb-2">
      <div className="align-content-center edit-label-card ">
        <div className="input-group input-group-sm mt-2" ref={wrapperRef}>
          <span
            className="input-group-text bg-light bg-opacity-75"
            id="basic-addon1"
          >
            <LabelImportantTwoToneIcon
              style={{
                color: label.important ? "#ffc61a" : "",
              }}
              fontSize="inherit"
            />
          </span>

          <input
            type="text"
            placeholder="Enter labelname ..."
            aria-label="Enter labelname"
            aria-describedby="addon-wrapping"
            className="form-control border-opacity-75 input-box-border edit-label-input"
            id="label"
            name="label"
            value={label.labelName}
            onChange={handleChange}
            ref={inputRef}
            readOnly={!isEditOn}
          />

          {isEditOn && (
            <>
              <span
                className="input-group-text bg-light bg-opacity-75"
                id="basic-addon1"
              >
                <Tooltip title={"Done"}>
                  <IconButton type="submit">
                    <DoneIcon style={{ fontSize: "16px", color: "green" }} />
                  </IconButton>
                </Tooltip>
              </span>
              <span
                className="input-group-text bg-light bg-opacity-75"
                id="basic-addon1"
              >
                <Tooltip
                  title={
                    !label.important ? "Mark as Important" : "Mark as Basic"
                  }
                >
                  <IconButton onClick={(event) => handleImportantClick(event)}>
                    <LabelImportantTwoToneIcon
                      style={{
                        fontSize: "16px",
                        color: !label.important ? "#ffc61a" : "",
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </span>

              <span
                className="input-group-text bg-light bg-opacity-75"
                id="basic-addon1"
              >
                <Tooltip title={"Reject"}>
                  <IconButton onClick={handleCloseClick}>
                    <CloseOutlinedIcon
                      style={{ fontSize: "16px", color: "red" }}
                    />
                  </IconButton>
                </Tooltip>
              </span>
            </>
          )}

          <span
            className="input-group-text bg-light bg-opacity-75"
            id="basic-addon1"
          >
            <Tooltip
              title={
                <span>
                  Created: {getLabelDateTime(label.createdAt)}
                  <br />
                  Updated:{getLabelDateTime(label.updatedAt)}
                </span>
              }
            >
              <IconButton>
                <InfoOutlinedIcon style={{ color: "blue", fontSize: "15px" }} />
              </IconButton>
            </Tooltip>
          </span>

          <span
            className="input-group-text bg-light bg-opacity-75"
            id="basic-addon1"
          >
            <Tooltip title={"Reject"}>
              <IconButton onClick={handleDeleteClick}>
                <DeleteOutlinedIcon style={{ fontSize: "15px" }} />
              </IconButton>
            </Tooltip>
          </span>
          {!isEditOn && (
            <span
              className="input-group-text bg-light bg-opacity-75"
              id="basic-addon1"
            >
              <Tooltip title={"Edit"}>
                <IconButton onClick={handleEditClick}>
                  <EditOutlinedIcon style={{ fontSize: "15px" }} />
                </IconButton>
              </Tooltip>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateLabelCard;
