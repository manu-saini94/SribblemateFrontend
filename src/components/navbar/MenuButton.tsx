import React from "react";
import Menu from "../../assets/menu.svg";
import IconImage from "../global/IconImage";

const MenuButton = () => {
  const onPaletteIconClick = () => {};
  return (
    <>
      <div
        data-bs-toggle="collapse"
        data-bs-target="#collapseSideBar"
        aria-expanded="false"
        aria-controls="collapseSideBar"
      >
        <IconImage x={3} y={1} src={Menu} onClick={onPaletteIconClick} />
      </div>
      <a className="navbar-brand px-3 py-1" href="https://www.google.com">
        Notesy
      </a>
    </>
  );
};

export default MenuButton;
