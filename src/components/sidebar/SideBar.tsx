import useTransformedMenuList from "hooks/useTransformedMenuList";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "redux/store";
import { MenuItemType } from "sidebartypes";
import { setCurrentActiveMenu } from "../../redux/global/globalSlice";
import MenuItem from "./MenuItem";

const SideBar = () => {
  const activeMenu = useSelector((state: RootState) => state.menus.activeMenu);

  const dispatch = useDispatch<AppDispatch>();

  const [isScrollOn, setIsScrollOn] = useState<Boolean>(false);

  const transformedMenuList = useTransformedMenuList();

  const navigate = useNavigate();

  const handleMenuItemClick = (path: string) => {
    navigate(path);
  };

  const onMenuItemClick = (menuItem: MenuItemType) => {
    const { name, path } = menuItem;
    dispatch(setCurrentActiveMenu(name));
    handleMenuItemClick(path);
  };

  const showScrollHandle = () => {
    setIsScrollOn(true);
  };

  const hideScrollHandle = () => {
    setIsScrollOn(false);
  };

  return (
    <div
      className="collapse collapse-horizontal show position-fixed"
      id="collapseSideBar"
    >
      <div
        className={`card card-body border-0 custom-scrollbar ${
          isScrollOn ? "scroll-overflow" : ""
        }`}
        style={{
          minHeight: "100vh",
          width: "270px",
          padding: "5px 0px 0px 4px",
        }}
        onMouseEnter={showScrollHandle}
        onMouseLeave={hideScrollHandle}
      >
        <ul className="list-group list-group-flush d-flex flex-column ">
          {transformedMenuList.map((menuItem) => {
            return (
              <MenuItem
                key={menuItem.name}
                itemProps={menuItem}
                onMenuItemClick={() => onMenuItemClick(menuItem)}
                active={
                  activeMenu === menuItem.name
                    ? "active custom-active-bg"
                    : "custom-hover-bg"
                }
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
