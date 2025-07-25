import { Box, Typography, Paper, List, ListItem, ListItemText, Divider } from "@mui/material";
import { useState } from "react";
import Sidekick from "../component/Sidekick";
import { useLocation } from "react-router-dom";

const BdayStudents = () => {
  const navigate = useLocation();
  console.log("state", );
  const [students, setStudents] = useState(navigate.state.students);
  console.log(students)


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
            🎂 Today's Birthdays
          </Typography>
          <Divider sx={{ my: 2 }} />

          {Array.isArray(students) && students.some(s => s?.name) ? (
            <List>
              {students.map((student) => (
                <ListItem key={student.id}>
                  <ListItemText
                    primary={student.name}
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
              No birthdays today.
            </Typography>
          )}
        </Paper>
      </Box>
    </>
  );
};

export default BdayStudents;

