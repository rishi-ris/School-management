import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

const StudentUsersTable = ({ students }) => {
  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 1250,
          width: "100%",
          boxShadow: 3,
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#2c2a3d" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Student Name</TableCell>
              <TableCell sx={{ color: "white" }}>Roll Number</TableCell>
              <TableCell sx={{ color: "white" }}>Fees</TableCell>
              <TableCell sx={{ color: "white" }}>Class</TableCell>
              <TableCell sx={{ color: "white" }}>Attendance</TableCell>
              <TableCell sx={{ color: "white" }}>Holidays</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={index}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.roll}</TableCell>
                <TableCell>₹{parseFloat(student.fees).toFixed(2)}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>{student.attendance}</TableCell>
                <TableCell>{student.holidays}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StudentUsersTable;
