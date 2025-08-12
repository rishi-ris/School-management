import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import Sidekick from "../component/Sidekick";
import { useLocation } from "react-router-dom";

const TeacherTable = () => {
  const navigate = useLocation();
  const [teachers, setTeachers] = useState(navigate.state?.ids || []);
  console.log("teachers array:", teachers); // 👀 confirm structure

  return (
    <>
      <Sidekick />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(to right, #f4f4f5ff, #f2f5f7ff)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            padding: 4,
            borderRadius: "20px",
            width: "380px",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            👨‍🏫 Teacher List
          </Typography>

          <Divider sx={{ my: 2 }} />

          {Array.isArray(teachers) && teachers.length > 0 ? (
            <List>
              {teachers.map((teacher, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={teacher}
                    primaryTypographyProps={{
                      fontSize: "1.1rem",
                      fontWeight: 500,
                    }}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography align="center" sx={{ color: "#777", mt: 2 }}>
              No teachers found.
            </Typography>
          )}
        </Paper>
      </Box>
    </>
  );
};

export default TeacherTable;
