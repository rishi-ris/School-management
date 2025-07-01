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
  Button
} from "@mui/material";
import {useNavigate } from "react-router-dom";

const StuTable = ({ students }) => {
  const navigate = useNavigate();
  const gotoTCpage =() => {
    navigate("/tcPage");
  };
  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <TableContainer component={Paper} sx={{ maxWidth: 1250, width: "100%", boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#2c2a3d" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>User Name</TableCell>
              <TableCell sx={{ color: "white" }}>Password</TableCell>
              <TableCell sx={{ color: "white" }}>Gender</TableCell>
              <TableCell sx={{ color: "white" }}>Roll Number</TableCell>
              <TableCell sx={{ color: "white" }}>Contact Number</TableCell>
              <TableCell sx={{ color: "white" }}>Class</TableCell>
              <TableCell sx={{ color: "white" }}>Section</TableCell>
              <TableCell sx={{ color: "white" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={index}>
                <TableCell>{student.userName}</TableCell>
                <TableCell>{student.password}</TableCell>
                <TableCell>{student.gender}</TableCell>
                <TableCell>{student.rollNumber}</TableCell>
                <TableCell>{student.contactNumber}</TableCell>
                <TableCell>{student.stu_class}</TableCell>
                <TableCell>{student.section}</TableCell>
                <TableCell>
                  <Button onClick={gotoTCpage} variant="outlined" size="small" color="info" sx={{ mr: 1 }}>
                    Generate TC
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="success"
                    disabled={student.feesPaid}
                  >
                    Pay Fees
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StuTable;
