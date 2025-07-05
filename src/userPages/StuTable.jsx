import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Box, Button, Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const StuTable = ({ students, onEdit, documentsDetails }) => {
  const navigate = useNavigate();
  const gotoTCpage = () => navigate("/tcPage");

  if (!Array.isArray(students) || students.length === 0) {
    return <Typography>No students found.</Typography>;
  }

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <TableContainer component={Paper} sx={{ maxWidth: 1250, width: "100%", boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#2c2a3d" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Student Name</TableCell>
              <TableCell sx={{ color: "white" }}>Class</TableCell>
              <TableCell sx={{ color: "white" }}>Paid Fees</TableCell>
              <TableCell sx={{ color: "white" }}>Balance Fees</TableCell>
              <TableCell sx={{ color: "white" }}>Action</TableCell>
              <TableCell sx={{ color: "white" }}>Document</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={index}>
                <TableCell>{student.fullName}</TableCell>
                <TableCell>{student.className}</TableCell>
                <TableCell>{student.totalFeesPaid}</TableCell>
                <TableCell>{student.pendingFees}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    color="success"
                    onClick={() => onEdit(student.studentPin)} // Assuming onDetails is passed as a prop
                    sx={{ mx: 1 }}
                  >
                    Details
                  </Button>
                  <Button
                    onClick={gotoTCpage}
                    variant="outlined"
                    size="small"
                    color="info"
                    sx={{ mx: 1 }}
                  >
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
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    color="success"
                    onClick={() => documentsDetails(student.studentPin)}
                  >
                    Document
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