import { UpdateLabelCardPropsType, UpdateLabelType } from "labeltypes";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { updateLabel } from "../redux/asyncThunks";
import { updateCurrentLabel } from "../redux/labels/labelSlice";

const useEditLabel = ({ label, index }: UpdateLabelCardPropsType) => {
  const [isEditOn, setIsEditOn] = useState<Boolean>(false);
  const [labelData, setLabelData] = useState<UpdateLabelType>(
    {} as UpdateLabelType
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isEditOn && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditOn]);

  useEffect(() => {
    setLabelData(label);
  }, [label]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsEditOn(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleImportantClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event?.preventDefault();
    dispatchImportantUpdate();
  };

  const dispatchImportantUpdate = () => {
    setLabelData((prevValues) => {
      const updatedValues = {
        ...prevValues,
        important: !prevValues.important,
      };
      dispatch(updateLabel(updatedValues)).then(() => {
        console.log("val =>", updatedValues);

        dispatch(updateCurrentLabel(index));
      });

      return updatedValues;
    });
  };

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
      isImportant: false,
    }));
    setIsEditOn(false);
  };

  const handleEditClick = () => {
    setIsEditOn(true);
  };

  return {
    isEditOn,
    inputRef,
    wrapperRef,
    labelData,
    setLabelData,
    handleImportantClick,
    handleChange,
    handleCloseClick,
    handleEditClick,
  };
};

export default useEditLabel;
