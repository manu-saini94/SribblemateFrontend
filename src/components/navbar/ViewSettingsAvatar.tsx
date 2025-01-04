import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import { Button, IconButton } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { logoutUser } from "../../redux/asyncThunks";

const ViewSettingsAvatar = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(logoutUser());
  };

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
        {/* <AccountCircleOutlinedIcon /> */}
        <Button
          sx={{
            textTransform: "none",
            color: "#FF6FB5",
            fontSize: "1rem",
            fontWeight: "bold",
            fontFamily: "inherit",
          }}
          onClick={handleLogout}
        >
          logout
        </Button>
      </div>
    </div>
  );
};

export default ViewSettingsAvatar;
