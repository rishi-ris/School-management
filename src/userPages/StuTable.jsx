import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Box, Button, Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const StuTable = ({ students, onEdit, documentsDetails, payFees }) => {
  const navigate = useNavigate();
  // const gotoTCpage = () => navigate("/tcPage");
  const gotoTCpage = (id) => navigate(`/tcPage/${id}`);
const gotoMarksheetPage = (id) => {
  console.log("Navigating to marksheet for student ID:", id);
  navigate("/studentMarksheet", { state: { studentId: id } });
}

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
              <TableCell sx={{ color: "white" }}>Total Fees</TableCell>
              <TableCell sx={{ color: "white" }}>Balance Fees</TableCell>
              <TableCell sx={{ color: "white" }}>Action</TableCell>
              <TableCell sx={{ color: "white" }}>Document</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={index}>
                <TableCell>{student.studentName}</TableCell>
                <TableCell>{student.className}</TableCell>
                <TableCell>{student.totalFees}</TableCell>
                <TableCell>{student.dueFees}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    color="success"
                    onClick={() => onEdit(student.studentId)} // Assuming onDetails is passed as a prop
                    sx={{ mx: 1,backgroundColor: "var(--button-bg-color)", }}
                  >
                    Details
                  </Button>
                  <Button
                    // onClick={gotoTCpage}
                     onClick={() => gotoTCpage(student.studentId)} 
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
                    disabled={student.dueFees < 0}
                    onClick={() => payFees(student)}
                    sx={{backgroundColor: "var(--button-bg-color)",}}
                  >
                    Pay Fees
                  </Button>
                  <Button
                    // onClick={gotoTCpage}
                     onClick={() => gotoMarksheetPage(student.studentId)} 
                    variant="outlined"
                    size="small"
                    color="info"
                    sx={{ mx: 1 }}
                  >
                    MARKSHEET
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    color="success"
                    onClick={() => documentsDetails(student.studentId)}
                    sx={{backgroundColor: "var(--button-bg-color)",}}
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