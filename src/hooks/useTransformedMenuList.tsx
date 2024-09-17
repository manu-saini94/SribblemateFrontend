import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { MenuItemType } from "sidebartypes";
import { menuList } from "utility/miscsUtils";
import LabelIcon from "../assets/labelicon.svg";

const useTransformedMenuList = (): MenuItemType[] => {
  const [transformedMenuList, setTransformedMenuList] =
    useState<MenuItemType[]>(menuList);

  const userLabels = useSelector((state: RootState) => state.allLabels.labels);

  const transformLabels = useCallback(() => {
    const labelMap = userLabels?.map((label): MenuItemType => {
      return {
        name: label.labelName,
        path: `/label/${label.id}`,
        iconSrc: LabelIcon,
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
