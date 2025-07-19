import React from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  Badge,
  Container,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/system";


// Curved AppBar styling
const CurvedAppBar = styled(AppBar)(() => ({
backgroundColor: "var(--header-bg-color)",
  height: 240,
  clipPath: 'ellipse(100% 85% at 50% 0%)',
  position: 'relative',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
}));

const SchoolFrontPage = () => {
  const navigate = useNavigate();
  const goTologin = () => {
    navigate("/logify");
  };
  const goTosign = () => {
    navigate("/signUp");
  };

  const iconUrl = 'https://static.thenounproject.com/png/327516-200.png';

  return (
    <Box sx={{ flexGrow: 1, minHeight: "100vh", background: " #2575fc)", color: "white" }}>
      <CurvedAppBar position="static" elevation={0}>
        <Toolbar sx={{ height: '100%', px: 2, pt: 2 }}>
          
          {/* <IconButton edge="start" color="inherit"><MenuIcon /></IconButton> */}

          {/* Title & tagline */}
          <Box sx={{ ml: 2 }}>
            <Typography variant="h6">
              <span style={{ fontWeight: "bold", color: "#fcd303" }}>🎓 ArpSol Tech</span>
            </Typography>
            <Box component="p" sx={{ m: 0, color: '#ccc', fontSize: 14 }}>
              Welcome to our site
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* <Search>
            <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
            <StyledInputBase placeholder="Search…" />
          </Search> */}

          <IconButton color="inherit" sx={{ mr: 1 }}>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Login and Sign Up Buttons */}
          <Box display="flex" justifyContent="space-between" sx={{ gap: 1 }}>
            <Button
              variant="contained"
              color="error"
              onClick={goTologin}
              sx={{ ":hover": { backgroundColor: "#FF0606" } }}
            >
              Login
            </Button>
     
          </Box>

          {/* <Avatar
            sx={{ ml: 2, width: 40, height: 40 }}
            src="https://i.pravatar.cc/40"
            alt="Profile"
          /> */}
        </Toolbar>

        {/* Decorative graduation cap */}
        {/* <Box
          component="img"
          src={iconUrl}
          alt="Graduation cap"
          sx={{
            position: 'absolute',
            right: 60,
            top: 80,
            width: 120,
            height: 120,
            opacity: 0.85,
          }}
        /> */}
      </CurvedAppBar>
      {/* Dashboard content placeholder */}
      <Box sx={{ p: 3 }}>
        {/* Charts/cards/content will go here */}
      </Box>
    </Box>
  );
};

export default SchoolFrontPage;


  