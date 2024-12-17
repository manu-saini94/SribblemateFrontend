import LabelImportantTwoToneIcon from "@mui/icons-material/LabelImportantTwoTone";
import { Chip } from "@mui/material";
import { DisplayLabelTypes } from "labeltypes";
import React from "react";

const DisplayLabel = (props: DisplayLabelTypes) => {
  const { label, onLabelRemoveClick } = props;
  // const [isOverChip, setIsOverChip] = useState<Boolean>(false);

  // const onMouseOver = () => {
  //   setIsOverChip(true);
  // };

  // const onMouseExit = () => {
  //   setIsOverChip(false);
  // };

  return (
    <Chip
      icon={
        <LabelImportantTwoToneIcon
          style={{
            color: label.important ? "#ffc61a" : "",
            fontSize: "16px",
          }}
        />
      }
      label={label.labelName}
      sx={{
        marginLeft: "4px",
        marginBottom: "4px",
      }}
      key={label.labelName}
      size="small"
      onDelete={onLabelRemoveClick}
    />
  );
};

export default DisplayLabel;
