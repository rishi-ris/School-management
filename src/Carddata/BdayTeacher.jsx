import React from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
} from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import Sidekick from "../component/Sidekick";

const TeacherBirthday = () => {
  // Static sample data
  const teacherBirthdays = [
    { id: 1, name: "Mr. Arjun Patel", subject: "Mathematics" },
    { id: 2, name: "Ms. Sneha Verma", subject: "English" },
    { id: 3, name: "Mrs. Komal Singh", subject: "Biology" },
  ];

  return (
    <>
    <Sidekick/>
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #fbc2eb, #fdfdfdff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: "20px",
          width: 420,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#333" }}
        >
          🎉 Teacher Birthdays
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          {teacherBirthdays.map((teacher) => (
            <ListItem key={teacher.id}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "#ff8fab" }}>
                  <CakeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={teacher.name}
                secondary={teacher.subject}
                primaryTypographyProps={{ fontWeight: 600 }}
                secondaryTypographyProps={{ color: "#666" }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
    </>
  );
};

export default TeacherBirthday;
