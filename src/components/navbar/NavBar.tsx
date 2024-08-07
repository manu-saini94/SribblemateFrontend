import React from "react";
import MenuButton from "./MenuButton";
import SearchBar from "./SearchBar";
import ViewSettingsAvatar from "./ViewSettingsAvatar";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg border-bottom">
      <div className="container-fluid row d-flex">
        <div className="col-sm-8 d-flex justify-content-start">
          {" "}
          <MenuButton />
          <SearchBar />
        </div>
        <ViewSettingsAvatar />
      </div>
    </nav>
  );
};

export default NavBar;