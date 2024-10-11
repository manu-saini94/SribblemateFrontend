import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Lightlogo from "../../assets/SM-logo-lgt.png";

const MenuButton = () => {
  const [isCollapse, setIsCollapse] = useState<Boolean>(false);
  const onMenuIconClick = () => {
    setIsCollapse((prev) => !prev);
  };
  return (
    <>
      <div
        data-bs-toggle="collapse"
        data-bs-target="#collapseSideBar"
        aria-expanded="false"
        aria-controls="collapseSideBar"
      >
        {isCollapse ? (
          <IconButton onClick={onMenuIconClick}>
            <ArrowForwardIosOutlinedIcon />
          </IconButton>
        ) : (
          <IconButton onClick={onMenuIconClick}>
            <ArrowBackIosNewOutlinedIcon />
          </IconButton>
        )}
      </div>
      <Link to="/note" style={{ textDecoration: "none" }}>
        <div className="navbar-brand px-3 py-1">
          <img height="35px" width="75px" src={Lightlogo} alt="Scribble Mate" />
        </div>
      </Link>
    </>
  );
};

export default MenuButton;
