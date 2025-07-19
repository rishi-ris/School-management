import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  SchoolOutlined as DescriptionIcon ,
  AssignmentOutlined as AssignmentOutlinedIcon,
  LogoutOutlined as LogoutOutlinedIcon,
  GridViewOutlined as GridViewOutlinedIcon,
  CurrencyRupeeOutlined as CurrencyRupeeOutlinedIcon,
} from "@mui/icons-material";
import UseCommonText from "../CommonFile/UseCommonText";

// ✅ ONLY these 4 items will be displayed
const drawerItems = [
  {
    label: "Profile",
    icon: <GridViewOutlinedIcon />,
    path: "/home",
  },
  {
    label: "FeesPanel",
    icon: <CurrencyRupeeOutlinedIcon />,
    path: "/studentfeespanel",
  },
  {
    label: "Marksheet",
    icon: <DescriptionIcon />,
    path: "/studentMarksheet",
  },
  
  {
    label: "Result",
    icon: <AssignmentOutlinedIcon />,
    path: "/result",
  },
  
];

const StudentDashboard = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const toggleDrawer = (state) => () => setOpen(state);
const headerText = UseCommonText ("--headerText");
  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "var(--header-bg-color)",
          width: "100%",
          top: 0,
          left: 0,
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
                      variant="h5"
                      fontWeight="bold"
                      color="white"
                      marginLeft={40}
                      letterSpacing={1}
                    >
                     {headerText}
                    </Typography>
        </Toolbar>
      </AppBar>
      <Box>
        
      </Box>

      {/* Drawer */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 280,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            bgcolor: theme.palette.background.default,
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <Typography
            variant="h6"
            sx={{
              px: 3,
              py: 2,
              fontWeight: "bold",
              color: theme.palette.primary.main,
            }}
          >
            Menu
          </Typography>

          <Divider />

          <List sx={{ mt: 1 }}>
            {drawerItems.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => navigate(item.path)}
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  mx: 2,
                  mb: 1,
                  transition: "all 0.25s ease-in-out",
                  "&:hover": {
                    bgcolor: theme.palette.primary.main,
                    color: "#fff",
                    "& .MuiSvgIcon-root": {
                      color: "#fff",
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    mr: 2,
                    display: "flex",
                    alignItems: "center",
                    color: theme.palette.primary.main,
                  }}
                >
                  {item.icon}
                </Box>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>

          <Box sx={{ flexGrow: 1 }} />

          {/* Logout Button */}
          <Divider />
          <List sx={{ mb: 2 }}>
            <ListItem
              button
              onClick={() => navigate("/")}
              sx={{
                px: 3,
                py: 1.5,
                mx: 2,
                mt: 1.5,
                borderRadius: 2,
                color: theme.palette.error.main,
                transition: "all 0.25s ease-in-out",
                "&:hover": {
                  bgcolor: theme.palette.error.light,
                  color: "#fff",
                  "& .MuiSvgIcon-root": {
                    color: "#fff",
                  },
                },
              }}
            >
              <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
                <LogoutOutlinedIcon />
              </Box>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default StudentDashboard;
