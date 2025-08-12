import React, { useState, useEffect, useContext } from "react";
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
import Network from "../Application/Network";
import LoadingPage from "../CommonFile/LoadingPage";
import { AuthContext } from "../auth/AuthProvider";
import TeacherDashboardside from "./TeacherDasboardside";

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
  transition: "transform 0.4s ease, box-shadow 0.4s ease",
  transformStyle: "preserve-3d",
  "&:hover": {
    transform: "rotateX(3deg) rotateY(3deg) scale(1.03)",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
    backgroundImage:
      "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(0,0,0,0.1))",
  },
}));

const DashboardCard = ({ count, label, bgcolor, icon, onClick }) => {
  return (
    <StyledCard bgcolor={bgcolor} onClick={onClick} sx={{ width: "30vh" }}>
      <CardContent sx={{ width: "100%" }}>
        <Box
          title={count}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
            width: "100%",
          }}
        >
          {count}
        </Box>
        <Typography variant="subtitle1">{label}</Typography>
        <Box mt={1}>{icon}</Box>
      </CardContent>
    </StyledCard>
  );
};

const Dashboard = ({ stats, navigate }) => {
  const cardData = stats
    ? [
      
        {
          count: stats.totalPendingFees.amount,
          label: "Pending Fees",
          bgcolor: "#fbc02d",
          icon: <Payment />,
          onClick: () =>
            navigate("/TotalFeecard", {
              state: stats.totalPendingFees,
            }),
        },
    
   
     
        {
          count: stats.studentBirthdaysToday.count,
          label: "Student Birthdays",
          bgcolor: "#ab47bc",
          icon: <CalendarToday />,
          onClick: () =>
            navigate("/TeacherStuBday", {
              state: stats.studentBirthdaysToday,
            }),
        },
        {
          count: stats.teacherBirthdaysToday.count,
          label: "Teacher Birthdays",
          bgcolor: "#7e57c2",
          icon: <CalendarToday />,
          onClick: () =>
            navigate("/TeacherBdayTeacher", {
              state: stats.teacherBirthdaysToday,
            }),
        },
      ]
    : [];

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" mb={3} fontWeight="bold">
     Teacher Dashboard
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

const TeacherDasboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    Network.getDashboardStats(user.data.data.schoolId)
      .then((data) => {
        setStats(data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error("Failed to load dashboard stats", e);
        setIsLoading(false);
      });
  }, []);

  if (isLoading)
    return (
      <Typography>
        <LoadingPage />
      </Typography>
    );

  return (
    <Box>
     <TeacherDashboardside/>
      <Box p={2} sx={{ marginTop: "50px" }}>
        <Dashboard stats={stats} navigate={navigate} />
      </Box>
    </Box>
  );
};

export default TeacherDasboard;
