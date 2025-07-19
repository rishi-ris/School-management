import React, { useContext, useEffect, useState } from "react";
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

import TeacherDashboardside from "./TeacherDasboardside";
import { AuthContext } from "../auth/AuthProvider";

const TeacherDasboardAttendance = () => {
   const { user } = useContext(AuthContext);
  const [teachers, setTeachers] = useState([]);
  const [attendance, setAttendance] = useState({});

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


useEffect(()=> {

  Network.getAttendanceByTeacher(user.data.data.id)
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
}, [])
  return (
    <Box>
    <TeacherDashboardside/>
    
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Teacher Attendance
      </Typography>

      <Paper sx={{ p: 3 }}>
  

        <Divider sx={{ my: 3 }} />

       
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
              sx={{ mt: 2,  }}
            >
              Submit Attendance
            </Button>
          </>
        
      </Paper>
    </Container>
    </Box>
  );
};

export default TeacherDasboardAttendance ;