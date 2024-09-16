import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import { IconButton } from "@mui/material";
import React from "react";

const SearchBar = () => {
  const onPaletteIconClick = () => {};
  return (
    <div className="input-group">
      <span className="input-group-text" id="basic-addon1">
        <IconButton style={{ margin: "-6px" }}>
          <ManageSearchOutlinedIcon style={{ fontSize: "25px" }} />
        </IconButton>
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="addon-wrapping"
      />
    </div>
  );
};

export default SearchBar;
