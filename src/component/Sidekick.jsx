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

// Drawer Items
const drawerItems = [
  {
    label: "Add Staff",
    icon: <PersonAddAltOutlinedIcon />,
    path: "/newEmployee",
  },
  {
    label: "Dashboard",
    icon: <GridViewOutlinedIcon />,
    path: "/adminUser",
  },
  {
    label: "Fee Panel",
    icon: <CurrencyRupeeOutlinedIcon />,
    path: "/fees",
  },
  {
    label: "Mark Sheet",
    icon: <AssignmentOutlinedIcon />,
    path: "/marksEntryPage",
  },
  {
    label: "Students",
    icon: <SchoolOutlinedIcon />,
    path: "/StudentUser",
  },
  {
    label: "Subjects",
    icon: <MenuBookOutlinedIcon />,
    path: "/subjectManager",
  },
  {
    label: "Attendance",
    icon: <EventAvailableOutlinedIcon />,
    path: "/teacherAttendancePage",
  },
  {
    label: "Teachers",
    icon: <PeopleAltOutlinedIcon />,
    path: "/teachersUser",
  },
  {
    label: "Timetable",
    icon: <CalendarMonthOutlinedIcon />,
    path: "/timetable",
  },
  // Uncomment to enable more items
  // {
  //   label: "teacherdetls",
  //   icon: <CalendarMonthOutlinedIcon />,
  //   path: "/TeacherDasboard",
  // },
  // {
  //   label: "StudentInfo",
  //   icon: <CalendarMonthOutlinedIcon />,
  //   path: "/studentinfo",
  // },
];

const Sidekick = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const toggleDrawer = (state) => () => setOpen(state);

  return (
    <Box>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "var(--header-bg-color)" }}
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
          <Typography variant="h6" fontWeight={600}>
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>

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

          {/* Logout */}
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

export default Sidekick;
