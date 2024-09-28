import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import { IconButton } from "@mui/material";
import React from "react";

const ViewSettingsAvatar = () => {
  const onPaletteIconClick = () => {};
  return (
    <div className="col-sm-4 d-flex justify-content-end px-1 py-1 ">
      {" "}
      <div className="px-3">
        <IconButton>
          <DnsOutlinedIcon />
        </IconButton>
      </div>
      <div className="px-3">
        <IconButton>
          <GridViewOutlinedIcon />
        </IconButton>
      </div>
      <div className="px-3 ">
        <IconButton>
          <AccountCircleOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ViewSettingsAvatar;
