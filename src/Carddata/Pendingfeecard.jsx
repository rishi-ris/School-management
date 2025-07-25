import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  TableContainer,
} from "@mui/material";
import Sidekick from "../component/Sidekick";
import { useLocation } from "react-router-dom";

const TotalFeecard = () => {
  const navigate = useLocation();
  const [students, setStudents] = useState(navigate.state?.students || []);
  const [allSelected, setAllSelected] = useState(false);
  console.log(students)

  const handleFeeToggle = (id) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, feePaid: !student.feePaid } : student
      )
    );
  };

  const handleSelectAllToggle = (event) => {
    const checked = event.target.checked;
    setAllSelected(checked);
    setStudents((prevStudents) =>
      prevStudents.map((student) => ({
        ...student,
        feePaid: checked,
      }))
    );
  };

  useEffect(() => {
    const allChecked = students.length > 0 && students.every((s) => s.feePaid);
    setAllSelected(allChecked);
  }, [students]);

  return (
    <>
      <Sidekick />
      <Box p={4}>
        <Typography variant="h4" gutterBottom align="center">
          Student Fee Status
        </Typography>

        <TableContainer component={Paper} sx={{ maxWidth: 1200, mx: "auto" }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Student Name</TableCell>
                <TableCell sx={{ color: "white" }}>Father Number</TableCell>
                <TableCell sx={{ color: "white" }}>Father Name</TableCell>
                <TableCell sx={{ color: "white" }}>Pending Amount</TableCell>
                <TableCell sx={{ color: "white" }}>
                  <Checkbox
                    sx={{ color: "white" }}
                    checked={allSelected}
                    onChange={handleSelectAllToggle}
                  />
                  Fee Paid
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {students.map((student, index) => (
                <TableRow key={index}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.fatherPhone}</TableCell>
                  <TableCell>{student.fatherName}</TableCell>
                  <TableCell>₹{student.pendingAmount}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={student.feePaid || false}
                      onChange={() =>
                        handleFeeToggle(student.id || index)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default TotalFeecard;
