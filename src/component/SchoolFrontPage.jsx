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
      <AppBar
        position="static"
        sx={{ backgroundColor: "var(--header-bg-color)" }}
      >
       <Toolbar>
  <Typography variant="h6" sx={{ color: "black", fontWeight: "bold", }}>
    🎓 IES UNIVESITY
  </Typography>

  <Box
    component="ul"
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexGrow: 1,
      listStyle: "none",
      m: 0,
      p: 0,
      fontWeight: "bold",
    }}
  >
    <li style={{ margin: "0 20px", color: "white", cursor: "pointer" }}>Home</li>
    <li style={{ margin: "0 20px", color: "white", cursor: "pointer" }}>About Us</li>
    <li style={{ margin: "0 20px", color: "white", cursor: "pointer" }}>Academics</li>
    <li style={{ margin: "0 20px", color: "white", cursor: "pointer" }}>Admission</li>
    <li style={{ margin: "0 20px", color: "white", cursor: "pointer" }}>Contact</li>
  </Box>

  <Box display="flex" justifyContent="space-between" sx={{ width: "160px" }}>
    <Button
      variant="contained"
      color="error"
      
      onClick={goTologin}
      sx={{ fontWeight: "bold",":hover": { backgroundColor: "#FF0606" } }}
    >
      Login
    </Button>
    <Button
      variant="text"
     
      color="White"
      onClick={goTosign}
   sx={{
  fontWeight: "bold",
  ":hover": {
    backgroundColor: "white",
    color: "black",
  },
}}
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
