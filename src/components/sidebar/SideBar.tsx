import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuItemType } from "sidebartypes";
import { menuList } from "utility/miscsUtils";
import MenuItem from "./MenuItem";

const SideBar = () => {
  const [active, setActive] = useState("Notes");

  const navigate = useNavigate();

  const handleMenuItemClick = (path: string) => {
    navigate(path);
  };

  const onMenuItemClick = (menuItem: MenuItemType) => {
    const { name, path } = menuItem;
    setActive(name);
    handleMenuItemClick(path);
  };

  return (
    <div className="collapse collapse-horizontal show" id="collapseSideBar">
      <div
        className="card card-body border-0"
        style={{ minHeight: "100vh", width: "270px" }}
      >
        <ul className="list-group list-group-flush d-flex flex-column ">
          {menuList.map((menuItem) => {
            return (
              <MenuItem
                key={menuItem.name}
                itemProps={menuItem}
                onMenuItemClick={() => onMenuItemClick(menuItem)}
                active={
                  active === menuItem.name
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
