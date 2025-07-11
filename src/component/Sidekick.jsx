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
} from "@mui/material";
import {
  Menu as MenuIcon,
  SchoolOutlined as SchoolOutlinedIcon,
  PeopleAltOutlined as PeopleAltOutlinedIcon,
  PersonAddAltOutlined as PersonAddAltOutlinedIcon,
  CalendarMonthOutlined as CalendarMonthOutlinedIcon,
  MenuBookOutlined as MenuBookOutlinedIcon,
  AssignmentOutlined as AssignmentOutlinedIcon,
  EventAvailableOutlined as EventAvailableOutlinedIcon,
  LogoutOutlined as LogoutOutlinedIcon,
  GridViewOutlined as GridViewOutlinedIcon,
  CurrencyRupeeOutlined as CurrencyRupeeOutlinedIcon,
} from "@mui/icons-material";

const drawerItems = [
  { label: "Dashboard", icon: <GridViewOutlinedIcon />, path: "/adminUser" },
  { label: "Fees", icon: <CurrencyRupeeOutlinedIcon />, path: "/fees" },
  { label: "Students", icon: <SchoolOutlinedIcon />, path: "/StudentUser" },
  { label: "Teachers", icon: <PeopleAltOutlinedIcon />, path: "/teachersUser" },
  {
    label: "Add New Employee",
    icon: <PersonAddAltOutlinedIcon />,
    path: "/newEmployee",
  },
  {
    label: "Timetable",
    icon: <CalendarMonthOutlinedIcon />,
    path: "/timetable",
  },
  { label: "Subject", icon: <MenuBookOutlinedIcon />, path: "/subjectManager" },
  {
    label: "Marks Entry",
    icon: <AssignmentOutlinedIcon />,
    path: "/marksEntryPage",
  },
  {
    label: "Teacher Attendance",
    icon: <EventAvailableOutlinedIcon />,
    path: "/teacherAttendancePage",
  },
];

const Sidekick = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };
  return (
    <Box>
      {/* AppBar */}
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 2 }}>
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 260,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            bgcolor: "#f9f9f9",
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List sx={{ mt: 2 }}>
            {drawerItems.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => navigate(item.path)}
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: 1,
                  mx: 2,
                  mb: 1,
                  transition: "0.3s",
                  "&:hover": {
                    bgcolor: "primary.light",
                    color: "white",
                  },
                }}
              >
                <Box sx={{ mr: 2, color: "primary.main" }}>{item.icon}</Box>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>

          <Box sx={{ flexGrow: 1 }} />

          {/* Divider and Logout */}
          <Divider sx={{ mt: 2 }} />
          <List sx={{ mb: 2 }}>
            <ListItem
              button
              onClick={() => navigate("/")}
              sx={{
                px: 3,
                py: 1.5,
                mx: 2,
                mt: 1,
                borderRadius: 1,
                color: "error.main",
                "&:hover": {
                  bgcolor: "error.light",
                  color: "white",
                },
              }}
            >
              <Box sx={{ mr: 2 }}>
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

export default Sidekick;
