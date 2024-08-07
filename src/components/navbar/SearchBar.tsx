import React from "react";
import Search from "../../assets/search.svg";

import IconImage from "../global/IconImage";

const SearchBar = () => {
  return (
    <div className="input-group">
      <span
        className="input-group-text bg-secondary bg-opacity-10"
        id="basic-addon1"
      >
        <IconImage x={1} y={1} src={Search} />
      </span>
      <input
        type="text"
        className="form-control bg-secondary bg-opacity-10"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="addon-wrapping"
      />
    </div>
  );
};

export default SearchBar;
