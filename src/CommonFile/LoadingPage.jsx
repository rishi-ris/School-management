import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingPage = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f9f9f9",
      }}
    >
      <CircularProgress size={70} thickness={5} />
     <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
  Loading, please wait...
</Typography>

    </Box>
  );
};

export default LoadingPage;
