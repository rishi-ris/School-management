import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import Network from "../Application/Network";
import TeacherDashboardside from "./TeacherDasboardside";
import { AuthContext } from "../auth/AuthProvider";

const TeacherDasboardAttendance = () => {
  const { user } = useContext(AuthContext);
  const [teachers, setTeachers] = useState([]);
  const [attendance, setAttendance] = useState({});

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

  useEffect(() => {
    if (!user?.data?.data?.id) return;

    console.log("User ID:", user.data.data.id);

    Network.getAttendanceByTeacher(user.data.data.id)
      .then((res) => {
        console.log("API Teacher Data:", res);

        const teacherList = Array.isArray(res) ? res : [res];
        setTeachers(teacherList);

        const initialAttendance = teacherList.reduce((acc, teacher) => {
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
  }, [user]);

  if (!user?.data?.data?.id) {
    return <Typography>Loading user data...</Typography>;
  }

  return (
    <Box>
      <TeacherDashboardside />

      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Teacher Attendance
        </Typography>

        <Paper sx={{ p: 3 }}>
          <Divider sx={{ my: 3 }} />

          {teachers.length === 0 ? (
            <Typography>No teacher data found.</Typography>
          ) : (
            <>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>ID</strong></TableCell>
                      <TableCell><strong>Name</strong></TableCell>
                      <TableCell><strong>Contact</strong></TableCell>
                      <TableCell><strong>Attendance</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {teachers.map((teacher) => (
                      <TableRow key={teacher.id}>
                        <TableCell>{teacher.id}</TableCell>
                        <TableCell>
                          {teacher.firstName} {teacher.lastName}
                        </TableCell>
                        <TableCell>{teacher.contactNumber}</TableCell>
                        <TableCell>
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
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
                sx={{ mt: 2 }}
              >
                Submit Attendance
              </Button>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default TeacherDasboardAttendance;