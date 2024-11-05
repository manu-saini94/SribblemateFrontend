import useTransformedMenuList from "hooks/useTransformedMenuList";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "redux/store";
import { MenuItemType } from "sidebartypes";
import { setCurrentActiveMenu } from "../../redux/global/globalSlice";
import MenuItem from "./MenuItem";

const SideBar = () => {
  const activeMenu = useSelector((state: RootState) => state.menus.activeMenu);

  const dispatch = useDispatch<AppDispatch>();

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

  return (
    <div className="collapse collapse-horizontal show" id="collapseSideBar">
      <div
        className="card card-body border-0"
        style={{ minHeight: "100vh", width: "270px" }}
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
