import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import { Button, IconButton, Stack } from "@mui/material";
import { AuthStoreType } from "authtypes";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "redux/store";
import { UserDetailsType } from "userstypes";
import { logoutUser } from "../../redux/asyncThunks";
import { setAuthUserData } from "../../redux/auth/authSlice";
import GradientCircularProgress from "./GradientCircularProgress";
import GradientCircularRefresh from "./GradientCircularRefresh";

const ViewSettingsAvatar = () => {
  const isUpdating = useSelector((state: RootState) => state.menus.isUpdating);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authUserData = useSelector(
    (state: RootState) => state.auth.authUserData
  );
  const navigateToLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const handleLogout = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(logoutUser())
      .unwrap()
      .then((response) => {
        const authState: AuthStoreType = {
          authLoading: false,
          authError: null,
          authUserData: {} as UserDetailsType,
          loginSuccess: false,
          logoutSuccess: true,
        };
        dispatch(setAuthUserData(authState));
        navigateToLogin();
      })
      .catch((error) => {
        const authState: AuthStoreType = {
          authLoading: false,
          authError: error,
          authUserData: authUserData,
          loginSuccess: true,
          logoutSuccess: false,
        };
        dispatch(setAuthUserData(authState));
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
