import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  FormControlLabel,
  RadioGroup,
  Radio,
  Paper,
  Button,
  Divider,
} from "@mui/material";

import Network from "../Application/Network";
import Sidekick from "../component/Sidekick";

const TeacherAttendancePage = () => {
  const [teachers, setTeachers] = useState([]);
  const [attendance, setAttendance] = useState({});

  const todayDate = new Date().toISOString().split("T")[0];
  const teacherRoleId = "3"; // Replace with actual Teacher role ID

  const handleAttendanceChange = (teacherId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [teacherId]: status,
    }));
  };

  const handleSubmit = () => {
    const payload = teachers.map((teacher) => ({
      teacherId: teacher.id,
      date: todayDate,
      isPresent: attendance[teacher.id] === "present",
    }));

    console.log("Submitting Attendance Payload:", payload);

    Network.submitTeacherAttendance(payload)
      .then(() => alert("Attendance submitted successfully"))
      .catch(() => alert("Error submitting attendance"));
  };

  const loadTeachers = () => {
    Network.getAllUsersByRoleId(teacherRoleId)
      .then((res) => {
        setTeachers(res);

        const initialAttendance = res.reduce((acc, teacher) => {
          const todayAttendance = teacher.attendance?.find(
            (a) => a.date === todayDate
          );

          acc[teacher.id] = todayAttendance
            ? todayAttendance.isPresent
              ? "present"
              : "absent"
            : "absent";
          return acc;
        }, {});

        setAttendance(initialAttendance);
      })
      .catch((err) => {
        console.error("Error loading teachers:", err);
        setTeachers([]);
        setAttendance({});
      });
  };

  // Auto-load teachers on component mount
  useEffect(() => {
    loadTeachers();
  }, []);

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh", pb: 4 }}>
      <Sidekick />

      <Container
        maxWidth={false}
        sx={{
          mt: 10,
          display: "flex",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "90%",
              md: "70%",
              lg: "60%",
              xl: "50%",
            },
          }}
        >
          <Typography variant="h4" align="center" gutterBottom fontWeight={600}>
            Teacher Attendance
          </Typography>

          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Divider sx={{ mb: 3 }} />

            {teachers.length > 0 ? (
              <>
                {teachers.map((teacher) => (
                  <Grid
                    container
                    spacing={2}
                    key={teacher.id}
                    alignItems="center"
                    sx={{ mb: 2 }}
                  >
                    <Grid item xs={12} sm={6}>
                      <Typography fontWeight={500}>
                        {teacher.firstName} {teacher.lastName}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <RadioGroup
                        row
                        value={attendance[teacher.id]}
                        onChange={(e) =>
                          handleAttendanceChange(teacher.id, e.target.value)
                        }
                      >
                        <FormControlLabel
                          value="present"
                          control={
                            <Radio
                              sx={{
                                color: "green",
                                "&.Mui-checked": {
                                  color: "green",
                                },
                              }}
                            />
                          }
                          label={
                            <Typography
                              sx={{ color: "green", fontWeight: 600 }}
                            >
                              Present
                            </Typography>
                          }
                        />
                        <FormControlLabel
                          value="absent"
                          control={
                            <Radio
                              sx={{
                                color: "red",
                                "&.Mui-checked": {
                                  color: "red",
                                },
                              }}
                            />
                          }
                          label={
                            <Typography sx={{ color: "red", fontWeight: 600 }}>
                              Absent
                            </Typography>
                          }
                        />
                      </RadioGroup>
                    </Grid>
                  </Grid>
                ))}

                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit}
                  sx={{
                    mt: 3,
                    py: 1.5,
                    backgroundColor: "var(--button-bg-color)",
                    fontWeight: 600,
                    fontSize: "1rem",
                    ":hover": { backgroundColor: "#2e7d32" },
                  }}
                >
                  Submit Attendance
                </Button>
              </>
            ) : (
              <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                Loading teachers...
              </Typography>
            )}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default TeacherAttendancePage;
