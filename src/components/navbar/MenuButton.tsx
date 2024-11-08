import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { IconButton } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "redux/store";
import Lightlogo from "../../assets/SM-logo-lgt.png";
import { setSideBarCollapse } from "../../redux/global/globalSlice";

const MenuButton = () => {
  const isSideBarCollapsed = useSelector(
    (state: RootState) => state.menus.isSideBarCollapsed
  );

  const dispatch = useDispatch<AppDispatch>();

  const onMenuIconClick = () => {
    dispatch(setSideBarCollapse());
  };
  return (
    <>
      <div
        data-bs-toggle="collapse"
        data-bs-target="#collapseSideBar"
        aria-expanded="false"
        aria-controls="collapseSideBar"
      >
        {isSideBarCollapsed ? (
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
