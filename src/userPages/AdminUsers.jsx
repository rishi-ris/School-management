import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Card,
  CardContent,
  Container,
  CssBaseline,
  Grid,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  AccountCircle,
  School,
  Group,
  CalendarToday,
  Payment,
  Mail,
  Announcement,
  Class as ClassIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";

// Styled Card Component
const StyledCard = styled(Card)(({ bgcolor }) => ({
  backgroundColor: bgcolor,
  color: "#fff",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  borderRadius: "12px",
}));

const DashboardCard = ({ count, label, bgcolor, icon }) => {
  return (
    <StyledCard bgcolor={bgcolor}>
      <CardContent>
        <Typography variant="h4" fontWeight="bold">
          {count}
        </Typography>
        <Typography variant="subtitle1">{label}</Typography>
        <Box mt={1}>{icon}</Box>
      </CardContent>
    </StyledCard>
  );
};

// Dashboard Data
const dashboardData = [
  {
    count: 3600,
    label: "Today's Fees Collected",
    bgcolor: "#26a69a",
    icon: <Payment />,
  },
  {
    count: 3600,
    label: "Pandding Fees",
    bgcolor: "#26a69a",
    icon: <Payment />,
  },
  { count: 14, label: "Total Students", bgcolor: "#ef5350", icon: <School /> },
  { count: 9, label: "Total Teachers", bgcolor: "#1e88e5", icon: <Group /> },
  {
    count: 11,
    label: "Todays Absent Teachers",
    bgcolor: "#43a047",
    icon: <CalendarToday />,
  },
  {
    count: 4,
    label: "Unscheduled Class",
    bgcolor: "#424242",
    icon: <ClassIcon />,
  },
  { count: 1, label: "Notice", bgcolor: "#00bcd4", icon: <Announcement /> },
];

const Dashboard = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" mb={3} fontWeight="bold">
        Admin Dashboard
      </Typography>
      <Grid container spacing={2}>
        {dashboardData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ width: "300px" }}>
            <DashboardCard {...item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

// Final Page Component
const AdminUsers = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };
  const navigate = useNavigate();

  return (
    <Box>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{
          
          backgroundColor: "var(--header-bg-color)",
        }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 2 }}>
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidekick Drawer */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            <ListItem button onClick={() => navigate("/adminUser")}>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => navigate("/fees")}>
              <ListItemText primary="Fees" />
            </ListItem>

            <ListItem button onClick={() => navigate("/StudentUser")}>

            {/* <ListItem button onClick={() => navigate("/StudentPage")}> */}

              <ListItemText primary="Students" />
            </ListItem>
            <ListItem button onClick={() => navigate("/teachersUser")}>
              <ListItemText primary="Teachers" />
            </ListItem>
             <ListItem button onClick={() => navigate("/newEmployee")}>
              <ListItemText primary="Add New Employee" />
            </ListItem>
            <ListItem button  onClick={() => navigate("/")}>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box p={2}>
        <Dashboard />
      </Box>
    </Box>
  );
};

export default AdminUsers;
