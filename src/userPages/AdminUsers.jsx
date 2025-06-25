import React from "react";
import {
  AppBar,
  Box,
  Card,
  CardContent,
  Container,
  CssBaseline,
  Grid,
  Typography,
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

// Dashboard Component
const dashboardData = [
  { count: 3600, label: "Fees Collected", bgcolor: "#26a69a", icon: <Payment /> },
  { count: 14, label: "Student", bgcolor: "#ef5350", icon: <School /> },
  { count: 9, label: "Teacher", bgcolor: "#1e88e5", icon: <Group /> },
  { count: 11, label: "Todays Attendance", bgcolor: "#43a047", icon: <CalendarToday /> },
  { count: 12, label: "Parent", bgcolor: "#ab47bc", icon: <AccountCircle /> },
  { count: 4, label: "Available Classes", bgcolor: "#424242", icon: <ClassIcon /> },
  { count: 2, label: "Unpaid Fees", bgcolor: "#8d6e63", icon: <Payment /> },
  { count: 1, label: "Inbox", bgcolor: "#ec407a", icon: <Mail /> },
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
  return (
    <Box>
      <CssBaseline />
      <AppBar position="static" />
      <Box p={2}>
        <Dashboard />
      </Box>
    </Box>
  );
};

export default AdminUsers;
