import React from "react";
import Menu from "../../assets/menu.svg";
import IconImage from "../IconImage";

const MenuButton = () => {
  return (
    <>
      <IconImage
        x={3}
        y={1}
        src={Menu}
        data-bs-toggle="collapse"
        data-bs-target="#collapseSideBar"
        aria-expanded="false"
        aria-controls="collapseSideBar"
      />

      <a className="navbar-brand px-3 py-1" href="https://www.google.com">
        Notesy
      </a>
    </>
  );
};

export default MenuButton;
