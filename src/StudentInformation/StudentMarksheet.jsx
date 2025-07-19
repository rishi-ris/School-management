import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Divider,
  Grid,
} from "@mui/material";
import StudentDashboard from "./StudentDashboard";
import UseCommonText from "../CommonFile/UseCommonText";
// import Network from "../Application/Network";
// import Endpoints from "../Application/Endpoints";

const StudentMarksheet = () => {
  const headerText = UseCommonText ("--headerText");
 
  const [data, setData] = useState(null);
//  const response = await Network.StudentMarksheet();
  useEffect(() => {
    axios.get("http://192.168.10.16:8080/marksheets/evaluate/1")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.error("Failed to load marksheet:", err);
      });
  }, []);

  if (!data) return <Typography>Loading...</Typography>;

  const { student, overallPass, subjectResults } = data;

  const totalTheory = subjectResults.reduce(
    (sum, s) => sum + (s.obtainedTheory || 0),
    0
  );
  const totalInternal = subjectResults.reduce(
    (sum, s) => sum + (s.obtainedInternal || 0),
    0
  );
  const totalMarks = totalTheory + totalInternal;
  const maxTheory = subjectResults.length * 100; // assuming 100 per subject theory
  const maxInternal =
    subjectResults.filter((s) => s.obtainedInternal !== null).length * 20; // assuming 20 internal
  const maxTotal = maxTheory + maxInternal;
  const percentage = ((totalMarks / maxTotal) * 100).toFixed(2);

  return (
    <Box
      sx={{
        maxWidth: 900,
        margin: "80px auto",
       
        bgcolor: "#fff",
        border: "1px solid #ccc",
        fontFamily: "Arial, sans-serif",
       
      }}
    >
      <StudentDashboard/>
      <Paper
        elevation={3}
        sx={{
          p: 0,
          position: "relative",
          overflow: "hidden",
          "::before": {
            content: '""',
            position: "absolute",
            top: 30,
            left: 40,
            width: "90%",
            height: "100%",
            background:
              "url(ProjectIMG/chandrashekhar-azad-watermark.png.png) center center/60% no-repeat",
            opacity: 0.14,
            zIndex: 0,
            pointerEvents: "none",
            
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "5px",
            
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color="error"
            letterSpacing={1}
          >
           {headerText}
          </Typography>
          <Typography fontSize={16} color="text.secondary">
            Jakhakhedi Jod, Distt. – Sehore (M.P.) – 466001
          </Typography>
          <Typography fontSize={15} color="text.secondary">
            Mobile : 9165918557, 9301054099 | Email:
            ChandraShekharAzad2003@gmail.com
          </Typography>
          <Typography fontWeight="bold" fontSize={15} color="primary.dark">
            Affiliated to M.P. Board of Secondary Education
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              display: "inline-block",

              borderBottom: "3px double #1976d2",
              px: 2,
              color: "#1976d2",
              letterSpacing: 2,
              mb: 1,
            }}
          >
            FINAL EXAMMINATION MARKSHEET
          </Typography>
        </Box>
        {/* Student Info */}
        <Box sx={{padding: "15px",}}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
          STUDENT DETAILS
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>
              <strong>Name:</strong> {student.firstName} {student.lastName}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Roll Number:</strong> {student.rollNumber}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Father's Name:</strong> {student.fatherName || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Mother's Name:</strong> {student.motherName || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>DOB:</strong> {student.dob}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Scholar No:</strong> {student.scholarNumber}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Enrollment No:</strong> {student.enrollmentNumber}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Class:</strong> {student.className}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Section:</strong> {student.section}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Board:</strong> {student.currentEduBoard}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Subjects Table */}
        
        <Table component={Paper} sx={{ mb: 3 }}>
          <TableHead sx={{ bgcolor: "#e3f2fd" }}>
            <TableRow>
              <TableCell>
                <strong>Subject</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Theory</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Internal</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Total</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Status</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjectResults.map((subject, index) => {
              const total =
                (subject.obtainedTheory || 0) + (subject.obtainedInternal || 0);
              return (
                <TableRow key={index}>
                  <TableCell>{subject.subjectTitle}</TableCell>
                  <TableCell align="center">
                    {subject.obtainedTheory ?? "-"}
                  </TableCell>
                  <TableCell align="center">
                    {subject.obtainedInternal ?? "-"}
                  </TableCell>
                  <TableCell align="center">{total}</TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: subject.passed ? "green" : "red" }}
                  >
                    {subject.passed ? "PASS" : "FAIL"}
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell>
                <strong>Total</strong>
              </TableCell>
              <TableCell align="center">
                <strong>{totalTheory}</strong>
              </TableCell>
              <TableCell align="center">
                <strong>{totalInternal}</strong>
              </TableCell>
              <TableCell align="center">
                <strong>{totalMarks}</strong>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>

        {/* Summary */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={4}>
            <Typography>
              <strong>Total Marks:</strong> {totalMarks} / {maxTotal}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              <strong>Percentage:</strong> {percentage}%
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              <strong>Result:</strong>{" "}
              <span
                style={{
                  color: overallPass ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {overallPass ? "PASS" : "FAIL"}
              </span>
            </Typography>
          </Grid>
        </Grid>

        {/* Signatures */}
        <Grid container justifyContent="space-between" sx={{ mt: 5 }}>
          <Grid item>
            <Typography>____________________</Typography>
            <Typography>Principal’s Signature</Typography>
          </Grid>
          <Grid item>
            <Typography>____________________</Typography>
            <Typography>Examiner’s Signature</Typography>
          </Grid>
        </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default StudentMarksheet;
