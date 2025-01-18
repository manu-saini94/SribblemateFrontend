import LabelImportantTwoToneIcon from "@mui/icons-material/LabelImportantTwoTone";
import { useGetAllLabelsQuery } from "api/labelsApi";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { MenuItemType } from "sidebartypes";
import { menuList } from "utility/miscsUtils";

const useTransformedMenuList = (): MenuItemType[] => {
  const [transformedMenuList, setTransformedMenuList] =
    useState<MenuItemType[]>(menuList);

  const { data, error, isLoading } = useGetAllLabelsQuery();
  useEffect(() => {
    console.log("Data=> ", data, "Err =>", error, "Loading => ", isLoading);
  }, [data, error, isLoading]);

  const userLabels = useSelector((state: RootState) => state.allLabels.labels);

  const transformLabels = useCallback(() => {
    const labelMap = userLabels?.map((label): MenuItemType => {
      return {
        name: label.labelName,
        path: `/label/${label.id}`,
        iconSrc: () => (
          <LabelImportantTwoToneIcon
            style={{ color: label.important ? "#ffc61a" : "" }}
          />
        ),
      };
    });
    const updatedMenuList = [...menuList, ...labelMap];
    setTransformedMenuList(updatedMenuList);
  }, [userLabels]);

  useEffect(() => {
    transformLabels();
  }, [transformLabels]);
  return transformedMenuList;
};

export default useTransformedMenuList;
