import React, { useState, useEffect } from "react";
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
import Sidekick from "../component/Sidekick";
import Network from "../Application/Network";

const StyledCard = styled(Card)(({ bgcolor }) => ({
  backgroundColor: bgcolor,
  color: "#fff",
  height: 160,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  borderRadius: "12px",
  cursor: "pointer",
}));

const DashboardCard = ({ count, label, bgcolor, icon, onClick }) => {
  return (
    <StyledCard bgcolor={bgcolor} onClick={onClick} sx={{ width: "30vh" }}>
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

const Dashboard = ({ stats, navigate }) => {
  const cardData = [
    {
      count: stats.totalFeesCollectedToday.amount,
      label: "Today's Fees Collected",
      bgcolor: "#26a69a",
      icon: <Payment />,
      onClick: () => navigate("/fees-collected", { state: stats.totalFeesCollectedToday.transactions })
    },
    {
      count: stats.totalPendingFees.amount,
      label: "Pending Fees",
      bgcolor: "#fbc02d",
      icon: <Payment />,
      onClick: () => navigate("/pending-fees", { state: stats.totalPendingFees.students })
    },
    {
      count: stats.totalStudents.count,
      label: "Total Students",
      bgcolor: "#ef5350",
      icon: <School />,
      onClick: () => navigate("/students", { state: stats.totalStudents.ids })
    },
    {
      count: stats.totalTeachers.count,
      label: "Total Teachers",
      bgcolor: "#1e88e5",
      icon: <Group />,
      onClick: () => navigate("/teachers", { state: stats.totalTeachers.ids })
    },
    {
      count: stats.todaysAbsentTeachers.count,
      label: "Today's Absent Teachers",
      bgcolor: "#43a047",
      icon: <CalendarToday />,
      onClick: () => navigate("/absent-teachers", { state: stats.todaysAbsentTeachers.ids })
    },
    {
      count: stats.studentBirthdaysToday.count,
      label: "Student Birthdays",
      bgcolor: "#ab47bc",
      icon: <CalendarToday />,
      onClick: () => navigate("/birthdays/students", { state: stats.studentBirthdaysToday.students })
    },
    {
      count: stats.teacherBirthdaysToday.count,
      label: "Teacher Birthdays",
      bgcolor: "#7e57c2",
      icon: <CalendarToday />,
      onClick: () => navigate("/birthdays/teachers", { state: stats.teacherBirthdaysToday.students })
    },
  ];

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" mb={3} fontWeight="bold">
        Admin Dashboard
      </Typography>
      <Grid container spacing={2}>
        {cardData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <DashboardCard {...item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const AdminUsers = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    Network.getDashboardStats()
      .then(setStats)
      .catch((e) => console.error("Failed to load dashboard stats", e));
  }, []);

  if (!stats) return <Typography>Loading dashboard...</Typography>;

  return (
    <Box>
      <Sidekick />
      <Box p={2}>
        <Dashboard stats={stats} navigate={navigate} />
      </Box>
    </Box>
  );
};

export default AdminUsers;
