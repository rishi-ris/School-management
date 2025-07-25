import React, { useState } from "react";
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
import RoleDropdown from "../component/RoleDropdown";
import Sidekick from "../component/Sidekick";

const TeacherAttendancePage = () => {
  const [teachers, setTeachers] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [selectedRoleId, setSelectedRoleId] = useState("");

  const todayDate = new Date().toISOString().split("T")[0];

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

  const onRolesSelect = (roleObj) => {
    const roleId = roleObj.roleId;
    setSelectedRoleId(roleId);

    Network.getAllUsersByRoleId(roleId)
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
              xs: "100%",   // Mobile
              sm: "90%",
              md: "70%",
              lg: "60%",
              xl: "50%",    // Large screens
            },
          }}
        >
          <Typography variant="h4" align="center" gutterBottom fontWeight={600}>
            Teacher Attendance
          </Typography>

          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Grid container justifyContent="center" spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={8}>
                <RoleDropdown onSelect={onRolesSelect} />
              </Grid>
            </Grid>

            <Divider sx={{ mb: 3 }} />

            {teachers.length > 0 ? (
              <>
                {teachers.map((teacher) => (
                  <Grid
                    container
                    spacing={2}
                    key={teacher.id}
                    alignItems="center"
                    sx={{ mb: 2, px: 1 }}
                  >
                    <Grid item xs={12} sm={6}>
                      <Typography fontWeight={500}>
                        {teacher.firstName} {teacher.lastName}
                      </Typography>
                    </Grid>
                  <Grid item xs={12} sm={6}>
  <Box
    display="flex"
    justifyContent="flex-start"
    alignItems="center"
    fullWidth
    sx={{ pl: { xs: 0, sm: 22 } }}     // Padding to align with name
  >
    <RadioGroup
      row
      value={attendance[teacher.id]}
      onChange={(e) => handleAttendanceChange(teacher.id, e.target.value)}
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
          <Typography sx={{ color: "green", fontWeight: 600 }}>
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
  </Box>
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
                Please select a role to load teachers.
              </Typography>
            )}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default TeacherAttendancePage;
