import React, { useEffect, useState } from "react";
import {
  Container,
  MenuItem,
  Select,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Paper,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import Network from "../Application/Network";
import ClassDropDown from "../component/ClassDropDown";
import Sidekick from "../component/Sidekick";

const MarksEntryPage = () => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [academicYears] = useState([
    { year: "2024 - 2025", id: 1 },
    { year: "2025 - 2026", id: 2 },
  ]);

  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [subjectMarks, setSubjectMarks] = useState([]);

  useEffect(() => {
    if (selectedClassId) {
      Network.getAllDetailsByClass(selectedClassId)
        .then((res) => {
          setStudents(res.students);
          setSubjects(res.subjects);
        })
        .catch(() => {
          setStudents([]);
          setSubjects([]);
        });
    }
  }, [selectedClassId]);

  const handleClassSelect = (cls) => {
    setSelectedClassId(cls.classId);
    setSelectedStudent("");
    setRollNumber("");
    setSubjectMarks([]);
  };

  const handleStudentSelect = (studentPin) => {
    const selected = students.find((s) => s.studentPin === studentPin);
    if (selected) {
      setSelectedStudent(studentPin);
      setRollNumber(selected.rollNumber);

      const initialMarks = subjects.map((sub) => ({
        subjectId: sub.subjectId,
        subjectName: sub.subjectName,
        totalTheoryMarks: sub.totalTheoryMarks,
        totalInternalMarks: sub.totalInternalMarks,
        passingTheoryMarks: sub.passingTheoryMarks,
        passingInternalMarks: sub.passingInternalMarks,
        obtainedTheoryMarks: "",
        obtainedInternalMarks: "",
        hasInternal: sub.hasInternal,
      }));
      setSubjectMarks(initialMarks);
    }
  };

  const handleMarksChange = (index, field, value) => {
    const updated = [...subjectMarks];
    updated[index][field] = value;
    setSubjectMarks(updated);
  };

  const handleSubmit = () => {
    const isAnyEmpty = subjectMarks.some((m) => {
      return (
        m.obtainedTheoryMarks === "" ||
        (m.hasInternal && m.obtainedInternalMarks === "")
      );
    });

    if (isAnyEmpty) {
      alert("Please enter all marks before submitting.");
      return;
    }

    const payload = {
      studentId: selectedStudent,
      academicYear: selectedYear,
      classId: selectedClassId,
      grade: selectedClassId,
      rollNumber: rollNumber,
      subjects: subjectMarks.map((m) => ({
        subjectId: parseInt(m.subjectId),
        totalTheoryMarks: parseInt(m.totalTheoryMarks),
        totalInternalMarks: parseInt(m.totalInternalMarks),
        passingTheoryMarks: parseInt(m.passingTheoryMarks),
        passingInternalMarks: parseInt(m.passingInternalMarks),
        obtainedTheoryMarks: parseInt(m.obtainedTheoryMarks),
        obtainedInternalMarks: m.hasInternal
          ? parseInt(m.obtainedInternalMarks)
          : 0,
      })),
    };

    Network.submitMarks(payload)
      .then(() => alert("Marks submitted successfully"))
      .catch((err) => {
        console.error(err);
        alert("Error submitting marks");
      });
  };

  const isAnyInvalid = subjectMarks.some(
    (sub) =>
      (sub.obtainedTheoryMarks !== "" &&
        (Number(sub.obtainedTheoryMarks) < 0 ||
          Number(sub.obtainedTheoryMarks) > sub.totalTheoryMarks)) ||
      (sub.obtainedInternalMarks !== "" &&
        (Number(sub.obtainedInternalMarks) < 0 ||
          Number(sub.obtainedInternalMarks) > sub.totalInternalMarks))
  );

  return (
    <Box>
      <Sidekick />

      <Container maxWidth="lg" sx={{mt: "80px"}}>
        
        <Typography variant="h4" gutterBottom mt={2}>
          Enter Student Marks
        </Typography>

        <Paper elevation={3} sx={{ p: 3, width: "65%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3} sx={{ width: "150px" }}>
              <ClassDropDown onSelect={handleClassSelect} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Select
                fullWidth
                value={selectedStudent}
                onChange={(e) => handleStudentSelect(e.target.value)}
                displayEmpty
                disabled={!students.length}
              >
                <MenuItem value="" disabled>
                  Select Student
                </MenuItem>
                {students.map((s) => (
                  <MenuItem key={s.studentPin} value={s.studentPin}>
                    {s.firstName} {s.lastName}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Select
                fullWidth
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Academic Year
                </MenuItem>
                {academicYears.map((y) => (
                  <MenuItem key={y.id} value={y.id}>
                    {y.year}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Roll Number"
                fullWidth
                type="number"
                value={rollNumber}
                disabled
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Subject Marks
          </Typography>

          <Grid container spacing={3}>
            {subjectMarks.map((sub, index) => (
              <Grid item xs={12} md={6} key={sub.subjectId}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      <b>{sub.subjectName}</b>
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          label="Total Theory Marks"
                          type="number"
                          fullWidth
                          value={sub.totalTheoryMarks}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Passing Theory Marks"
                          type="number"
                          fullWidth
                          value={sub.passingTheoryMarks}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Obtained Theory Marks"
                          type="number"
                          fullWidth
                          value={sub.obtainedTheoryMarks}
                          onChange={(e) =>
                            handleMarksChange(
                              index,
                              "obtainedTheoryMarks",
                              e.target.value
                            )
                          }
                          error={
                            sub.obtainedTheoryMarks !== "" &&
                            (Number(sub.obtainedTheoryMarks) < 0 ||
                              Number(sub.obtainedTheoryMarks) >
                                sub.totalTheoryMarks)
                          }
                          helperText={
                            sub.obtainedTheoryMarks !== "" &&
                            Number(sub.obtainedTheoryMarks) >
                              sub.totalTheoryMarks
                              ? `Marks cannot be more than ${sub.totalTheoryMarks}`
                              : ""
                          }
                        />
                      </Grid>
                    </Grid>

                    {sub.hasInternal && (
                      <Grid container spacing={2} mt={1}>
                        <Grid item xs={6}>
                          <TextField
                            label="Total Internal Marks"
                            type="number"
                            fullWidth
                            value={sub.totalInternalMarks}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="Passing Internal Marks"
                            type="number"
                            fullWidth
                            value={sub.passingInternalMarks}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Obtained Internal Marks"
                            type="number"
                            fullWidth
                            value={sub.obtainedInternalMarks}
                            onChange={(e) =>
                              handleMarksChange(
                                index,
                                "obtainedInternalMarks",
                                e.target.value
                              )
                            }
                            error={
                              sub.obtainedInternalMarks !== "" &&
                              (Number(sub.obtainedInternalMarks) < 0 ||
                                Number(sub.obtainedInternalMarks) >
                                  sub.totalInternalMarks)
                            }
                            helperText={
                              sub.obtainedInternalMarks !== "" &&
                              Number(sub.obtainedInternalMarks) >
                                sub.totalInternalMarks
                                ? `Marks cannot be more than ${sub.totalInternalMarks}`
                                : ""
                            }
                          />
                        </Grid>
                      </Grid>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box mt={4} textAlign="center">
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={handleSubmit}
              disabled={
                !selectedStudent ||
                !selectedYear ||
                subjectMarks.length === 0 ||
                isAnyInvalid
              }
              sx={{backgroundColor: "var(--button-bg-color)",}}
            >
              Submit Marks
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default MarksEntryPage;