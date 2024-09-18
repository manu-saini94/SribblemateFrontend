import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import { IconButton } from "@mui/material";
import React from "react";

const SearchBar = () => {
  const onPaletteIconClick = () => {};
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="addon-wrapping"
      />
      <span
        className="input-group-text bg-light bg-opacity-75"
        id="basic-addon1"
      >
        <IconButton style={{ margin: "-6px" }}>
          <ManageSearchOutlinedIcon style={{ fontSize: "25px" }} />
        </IconButton>
      </span>
    </div>
  );
};

export default SearchBar;
