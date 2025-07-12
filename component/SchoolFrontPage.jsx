import React from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  Container,
  Paper,
} from "@mui/material";
import CssIcon from "@mui/icons-material/Css";
import HtmlIcon from "@mui/icons-material/Html";
import StorageIcon from "@mui/icons-material/Storage";
import CodeIcon from "@mui/icons-material/Code";

const SchoolFrontPage = () => {
  const navigate = useNavigate();
  const goTologin = () => {
    navigate("/logify");
  };
  const goTosign = () => {
    navigate("/signUp");
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: "100vh",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        color: "white",
      }}
    >
      {/* Top Bar */}
      <AppBar position="static" sx={{ backgroundColor: 'var(--header-bg-color)', }}>
  <Toolbar>
    <Typography variant="h6" sx={{ flexGrow: 1 }}>
      <span style={{ fontWeight: "bold", color: "#fcd303" }}>
        🎓 MANISH
      </span>
    </Typography>

  

    <Box
      display="flex"
      justifyContent="space-between"
      sx={{ width: "160px" }}
    >
      <Button
        variant="contained"
        color="error"
        onClick={goTologin}
        sx={{ ":hover": { backgroundColor: "#FF0606" } }}
      >
        Login
      </Button>
      <Button
        variant="text"
        color="error"
        onClick={goTosign}
        sx={{ ":hover": { backgroundColor: "white", color: "black" } }}
      >
        Sign Up
      </Button>
    </Box>
  </Toolbar>
</AppBar>


      {/* Hero Section */}
      <Container maxWidth="md" sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          <span style={{ color: "#ffff00" }}>School Management</span>
        </Typography>
      </Container>
    </Box>
  );
};

export default SchoolFrontPage;
