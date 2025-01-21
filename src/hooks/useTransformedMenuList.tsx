import LabelImportantTwoToneIcon from "@mui/icons-material/LabelImportantTwoTone";
import { labelsApi } from "api/labelsApi";
import React, { useCallback, useEffect, useState } from "react";
import { MenuItemType } from "sidebartypes";
import { menuList } from "utility/miscsUtils";

const useTransformedMenuList = (): MenuItemType[] => {
  const [transformedMenuList, setTransformedMenuList] =
    useState<MenuItemType[]>(menuList);

  const {
    data: userLabels,
    isLoading: isLabelsLoading,
    error: labelsError,
    isUninitialized,
    isFetching,
  } = labelsApi.endpoints.getAllLabels.useQueryState(undefined);

  const transformLabels = useCallback(() => {
    const labelMap = userLabels
      ? userLabels?.map((label): MenuItemType => {
          return {
            name: label.labelName,
            path: `/label/${label.id}`,
            iconSrc: () => (
              <LabelImportantTwoToneIcon
                style={{ color: label.important ? "#ffc61a" : "" }}
              />
            ),
          };
        })
      : [];
    const updatedMenuList = [...menuList, ...labelMap];
    setTransformedMenuList(updatedMenuList);
  }, [userLabels]);

  useEffect(() => {
    transformLabels();
  }, [transformLabels]);
  return transformedMenuList;
};

export default useTransformedMenuList;
