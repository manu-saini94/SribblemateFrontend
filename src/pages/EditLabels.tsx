import AddLabel from "components/labels/AddLabel";
import UpdateLabel from "components/labels/UpdateLabel";
import React from "react";
import "../scss/labels.scss";
import "../scss/main.scss";

const EditLabels = () => {
  return (
    <>
      <AddLabel />
      <UpdateLabel />
    </>
  );
};

export default EditLabels;
