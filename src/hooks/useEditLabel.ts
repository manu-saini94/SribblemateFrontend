import { UpdateLabelCardPropsType, UpdateLabelType } from "labeltypes";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import {
  hasLabelChanged,
  initialLabelValue,
} from "utility/reduxutils/labelUtils";
import { deleteLabel, updateLabel } from "../redux/asyncThunks";
import {
  deleteCurrentLabel,
  updateCurrentLabel,
} from "../redux/labels/labelSlice";

const useEditLabel = ({ label, index }: UpdateLabelCardPropsType) => {
  const [isEditOn, setIsEditOn] = useState<Boolean>(false);
  const [labelData, setLabelData] =
    useState<UpdateLabelType>(initialLabelValue);

  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleCloseClick = useCallback(() => {
    setLabelData((prevValues) => ({
      ...prevValues,
      labelName: label.labelName,
      isImportant: label.important,
    }));
    setIsEditOn(false);
  }, [label.important, label.labelName]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsEditOn(false);
        handleCloseClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, handleCloseClick]);

  useEffect(() => {
    if (isEditOn && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditOn]);

  useEffect(() => {
    setLabelData(label);
  }, [label]);

  const handleImportantClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event?.preventDefault();
    dispatchImportantUpdate();
  };

  const handleDeleteClick = () => {
    dispatchDeleteLabel();
  };

  const dispatchDeleteLabel = () => {
    const id = labelData.id;
    dispatch(deleteLabel(id)).then(() => {
      dispatch(deleteCurrentLabel(index));
    });
  };

  const dispatchImportantUpdate = () => {
    const updatedValues = {
      ...labelData,
      important: !labelData.important,
    };
    dispatch(updateLabel(updatedValues)).then(() => {
      dispatch(updateCurrentLabel(index));
    });
  };

  const handleChange = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setLabelData((prevValues) => ({
      ...prevValues,
      labelName: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditOn(true);
  };

  const handleLabelSubmit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    dispatchLabelUpdate();
  };

  const checkForLabelChange = useCallback(() => {
    return hasLabelChanged(labelData, label);
  }, [label, labelData]);

  const dispatchLabelUpdate = () => {
    const updatedValues = {
      ...labelData,
      labelName: labelData.labelName,
    };
    if (checkForLabelChange())
      dispatch(updateLabel(updatedValues)).then(() => {
        dispatch(updateCurrentLabel(index));
        handleCloseClick();
      });
  };

  return {
    isEditOn,
    inputRef,
    wrapperRef,
    labelData,
    setLabelData,
    handleImportantClick,
    handleDeleteClick,
    handleChange,
    handleCloseClick,
    handleEditClick,
    handleLabelSubmit,
    checkForLabelChange,
  };
};

export default useEditLabel;
