import { Box, Skeleton } from "@mui/material";
import React from "react";

const NoteSkeletonLoader = () => {
  return (
    <Box sx={{ width: "15.625rem", marginRight: 0.5, my: 5 }}>
      <Skeleton
        variant="rectangular"
        width="100%"
        height="9rem"
        animation="wave"
        style={{ marginBottom: "10px" }}
      />
      <Skeleton />
      <Skeleton width="80%" />
      <Skeleton width="55%" />
    </Box>
  );
};

export default NoteSkeletonLoader;
