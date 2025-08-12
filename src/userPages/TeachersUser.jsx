import React, { useState, useEffect, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidekick from "../component/Sidekick";
import Network from "../Application/Network";
import { AuthContext } from "../auth/AuthProvider";

const TeachersUser = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const { user } = useContext(AuthContext);

  const teacherRoleId = "3";

  const fetchTeachers = () => {
    Network.getAllUsersByRoleId(teacherRoleId, user.data.data.schoolId)
      .then((res) => {
        setTeachers(res);
      })
      .catch((err) => {
        console.error("Error loading teachers:", err);
        setTeachers([]);
      });
  };

  useEffect(() => {
    fetchTeachers();
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

        <Table sx={{ mt: 3 }}>
          <TableHead sx={{ backgroundColor: "var(--header-bg-color)" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.length > 0 ? (
              teachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>{`${teacher.firstName || ""} ${
                    teacher.lastName || ""
                  }`}</TableCell>
                  <TableCell>
                    {teacher.phone || teacher.contactNumber || "-"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} align="center">
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
