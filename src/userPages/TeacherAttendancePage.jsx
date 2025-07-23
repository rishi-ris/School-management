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

  const todayDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

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
            : "absent"; // default if no record
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
    <Box>
   <Sidekick/>
    
    <Container maxWidth="md" sx={{marginTop: "80px"}}>
      <Typography variant="h4" gutterBottom>
        Teacher Attendance
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} width={200}>
            <RoleDropdown onSelect={onRolesSelect} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

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
                <Grid item xs={6}>
                  <Typography>
                    {teacher.firstName} {teacher.lastName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <RadioGroup
                    row
                    value={attendance[teacher.id]}
                    onChange={(e) =>
                      handleAttendanceChange(teacher.id, e.target.value)
                    }
                  >
                    <FormControlLabel
                      value="present"
                      control={<Radio />}
                      label="Present"
                    />
                    <FormControlLabel
                      value="absent"
                      control={<Radio />}
                      label="Absent"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
            ))}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              sx={{ mt: 2, backgroundColor: "var(--button-bg-color)", }}
            >
              Submit Attendance
            </Button>
          </>
        ) : (
          <Typography variant="body1" sx={{ mt: 2 }}>
            Please select a role to load teachers.
          </Typography>
        )}
      </Paper>
    </Container>
    </Box>
  );
};

export default TeacherAttendancePage;
