import { CreateLabelType } from "labeltypes";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { initialCreateLabelValue } from "utility/reduxutils/labelUtils";
import { createLabel } from "../redux/asyncThunks";
import { insertNewLabel } from "../redux/labels/labelSlice";
const useAddLabel = () => {
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
      important: false,
    }));
  };

  const handleImportantClick = () => {
    setLabelData((prevValues) => ({
      ...prevValues,
      important: !prevValues.important,
    }));
  };

  const dispatchCreateLabel = useCallback(() => {
    if (labelData.labelName !== "") {
      dispatch(createLabel(labelData)).then(() => dispatch(insertNewLabel()));
    }
  }, [labelData, dispatch]);

  const handleLabelSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatchCreateLabel();
    handleCloseClick();
  };

  return {
    labelData,
    handleChange,
    handleCloseClick,
    handleImportantClick,
    handleLabelSubmit,
  };
};

export default useAddLabel;
