import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import React from "react";

const GradientCircularRefresh = () => {
  return (
    <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="icon_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF66B3" />
            <stop offset="100%" stopColor="#8B73FF" />
          </linearGradient>
        </defs>
      </svg>
      <RefreshRoundedIcon
        sx={{
          fontSize: 35,
          fill: "url(#icon_gradient)",
        }}
      />
    </React.Fragment>
  );
};

export default GradientCircularRefresh;
