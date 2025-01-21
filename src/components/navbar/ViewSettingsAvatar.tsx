import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import { Button, IconButton, Stack } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "redux/store";
import { logoutUser } from "../../redux/asyncThunks";
import GradientCircularProgress from "./GradientCircularProgress";
import GradientCircularRefresh from "./GradientCircularRefresh";

const ViewSettingsAvatar = () => {
  const isUpdating = useSelector((state: RootState) => state.menus.isUpdating);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const loggedInUserData = useSelector(
    (state: RootState) => state.auth.loggedInUserData
  );

  const navigateToLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    if (loggedInUserData?.userDto?.id === -1) navigateToLogin();
  }, [loggedInUserData?.userDto?.id, navigateToLogin]);

  const handleLogout = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(logoutUser()).catch((error) => {
      console.error("Logout failed: ", error);
    });
  };

  return (
    <div className="col-sm-4 d-flex justify-content-end px-1 py-1 ">
      {" "}
      {isUpdating ? (
        <div className="px-4">
          <Stack spacing={1} sx={{ flexGrow: 1 }}>
            <GradientCircularProgress />
          </Stack>
        </div>
      ) : (
        <div
          style={{
            paddingTop: "3px",
            paddingLeft: "3px",
            paddingRight: "18px",
          }}
        >
          <Stack spacing={0} sx={{ flexGrow: 1 }}>
            <GradientCircularRefresh />
          </Stack>
        </div>
      )}
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
