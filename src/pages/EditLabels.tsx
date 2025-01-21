import AddLabel from "components/labels/AddLabel";
import React from "react";
import DisplayLabels from "../components/labels/DisplayLabels";
import "../scss/labels.scss";
import "../scss/main.scss";

const EditLabels = () => {
  return (
    <>
      <AddLabel />
      <DisplayLabels />
    </>
  );
};

export default EditLabels;
