import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidekick from "../component/Sidekick";
import Network from "../Application/Network";
import { Fade } from "@mui/material";

const TeachersUser = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);

  const teacherRoleId = "3"; 

  const handleViewProfile = (id) => {
    alert(`Viewing profile of teacher ID: ${id}`);
    // navigate(/teacher/profile/${id});
  };

  const fetchTeachers = () => {
    Network.getAllUsersByRoleId(teacherRoleId)
      .then((res) => {
        setTeachers(res);
     
      })
      .catch((err) => {
        console.error("Error loading teachers:", err);
        setTeachers([]);
      });
  };

  useEffect(() => {
    fetchTeachers(); // ✅ Load on mount
  }, []);

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Sidekick />

      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 1250,
          width: "100%",
          boxShadow: 3,
          marginTop: "50px",
        }}
      >
        

        <Divider />

        <Table sx={{mt: 3  }}>
          <TableHead sx={{ backgroundColor: "var(--header-bg-color)" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Phone</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.length > 0 ? (
              teachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>{`${teacher.firstName || ""} ${
                    teacher.lastName || "" }`}</TableCell>
                  <TableCell>
                    {teacher.phone || teacher.contactNumber || "-"}
                  </TableCell>
                  <TableCell>
       <Button
  variant="contained"
  color="primary"
  size="small"
  sx={{
    m: 0.5,
    backgroundColor: "var(--button-bg-color)",
  }}
   onClick={() => navigate(`/TeacherProfile/${teacher.id}`)}
>
  View Profile
</Button>


                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No teacher data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TeachersUser;