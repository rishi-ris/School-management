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
} from "@mui/material";
import Network from "../Application/Network";
import ClassDropDown from "../component/ClassDropDown";

const MarksEntryPage = () => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [academicYears, setAcademicYears] = useState([{ year: "2024 - 2025", id: 1 },
    { year: "2025 - 2026", id: 2 }
  ]);

  const [selectedClassId, setSelectedClassId] = useState(""); // classId from ClassDropDown
  const [selectedStudent, setSelectedStudent] = useState(""); // studentPin
  const [selectedYear, setSelectedYear] = useState("");
  const [rollNumber, setRollNumber] = useState("");

  const [subjectMarks, setSubjectMarks] = useState([]);

  // Fetch academic years
  useEffect(() => {
    // Network.getAcademicYears()
    //   .then((res) => setAcademicYears(res.data))
    //   .catch(() => setAcademicYears([]));
  }, []);

  // Fetch students & subjects when class changes
  useEffect(() => {
    if (selectedClassId) {
      Network.getAllDetailsByClass(selectedClassId)
        .then((res) => {
          console.log("Fetched students and subjects:", res.subjects);
          setStudents(res.students);
          setSubjects(res.subjects);
        })
        .catch(() => {
          setStudents([]);
          setSubjects([]);
        });

      Network.getAllSubjectsByClassId(selectedClassId)
        .then((res) => {
          setSubjects(res.data);
          const initialMarks = res.data.map((sub) => ({
            subjectId: sub.subjectId,
            subjectName: sub.subjectName,
            totalTheoryMarks: sub.totalTheoryMarks,
            totalInternalMarks: sub.totalInternalMarks,
            passingTheoryMarks: sub.passingTheoryMarks,
            passingInternalMarks: sub.passingInternalMarks,
            obtainedTheoryMarks: "",
            obtainedInternalMarks: "",
          }));
          setSubjectMarks(initialMarks);
        })
        .catch(() => {
          setSubjects([]);
          setSubjectMarks([]);
        });
    } else {
      setStudents([]);
      setSubjects([]);
      setSubjectMarks([]);
    }
  }, [selectedClassId]);

  // Handle class selection
  const handleClassSelect = (cls) => {
    setSelectedClassId(cls.classId);
    setSelectedStudent("");
    setRollNumber("");
    setSubjectMarks([]);
  };

  // Handle student selection
  const handleStudentSelect = (studentPin) => {
    const selected = students.find((s) => s.studentPin === studentPin);
    if (selected) {
      setSelectedStudent(studentPin);
      setRollNumber(selected.rollNumber);

      const resetMarks = subjects.map((sub) => ({
        subjectId: sub.subjectId,
        totalTheoryMarks: sub.totalTheoryMarks,
        totalInternalMarks: sub.totalInternalMarks,
        passingTheoryMarks: sub.passingTheoryMarks,
        passingInternalMarks: sub.passingInternalMarks,
        obtainedTheoryMarks: "",
        obtainedInternalMarks: "",
      }));
      setSubjectMarks(resetMarks);
    } else {
      setSelectedStudent("");
      setRollNumber("");
      setSubjectMarks([]);
    }
  };

  // Handle subject marks change
  const handleMarksChange = (index, field, value) => {
    const updated = [...subjectMarks];
    updated[index][field] = value;
    setSubjectMarks(updated);
  };

  // Submit form
  const handleSubmit = () => {
    const payload = {
      studentId: (selectedStudent),
      classId: (selectedClassId),
      academicYear: (selectedYear),
      grade: (selectedClassId),
      rollNumber: (rollNumber),
      subjects: subjectMarks.map((m) => ({
        subjectId: parseInt(m.subjectId),
        totalTheoryMarks: parseInt(m.totalTheoryMarks),
        totalInternalMarks: parseInt(m.totalInternalMarks),
        passingTheoryMarks: parseInt(m.passingTheoryMarks),
        passingInternalMarks: parseInt(m.passingInternalMarks),
        obtainedTheoryMarks: parseInt(m.obtainedTheoryMarks),
        obtainedInternalMarks: parseInt(m.obtainedInternalMarks),
      })),
    };

    Network.submitMarks(payload)
      .then(() => alert("Marks submitted successfully"))
      .catch((err) => {
        console.error(err);
        alert("Error submitting marks");
      });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Enter Student Marks
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={2}>
          {/* Class Dropdown */}
          <Grid item xs={12} sm={6}>
            <ClassDropDown onSelect={handleClassSelect} />
          </Grid>

          {/* Student Dropdown */}
          <Grid item xs={12} sm={6}>
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
                  {s.firstName + " " + s.lastName}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          {/* Academic Year */}
          <Grid item xs={12} sm={6}>
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

          {/* Roll Number (readonly) */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Roll Number"
              fullWidth
              type="number"
              value={rollNumber}
              disabled
            />
          </Grid>
        </Grid>

        {/* Subjects Table */}
        <Box mt={4}>
          <Typography variant="h6">Subject Marks</Typography>
          {subjectMarks.map((sub, index) => (
            <Grid container spacing={2} key={sub.subjectId} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={4}>
                <Typography>
                <b>{sub.subjectName}</b>
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  label="Total Theory Marks"
                  type="number"
                  fullWidth
                  value={sub.totalTheoryMarks}
                  onChange={(e) =>
                    handleMarksChange(index, "totalTheoryMarks", e.target.value)
                  }
                />
              </Grid>
               <Grid item xs={6} sm={4}>
                <TextField
                  label="Passing Theory Marks"
                  type="number"
                  fullWidth
                  value={sub.passingTheoryMarks}
                  onChange={(e) =>
                    handleMarksChange(index, "passingTheoryMarks", e.target.value)
                  }
                />
              </Grid>
             
              <Grid item xs={6} sm={4}>
                <TextField
                  label="Obtained Theory Marks"
                  type="number"
                  fullWidth
                  value={sub.obtainedTheoryMarks}
                  onChange={(e) =>
                    handleMarksChange(index, "obtainedTheoryMarks", e.target.value)
                  }
                />
              </Grid>
               <Grid item xs={6} sm={4}>
                <TextField
                  label="Total Internal Marks"
                  type="number"
                  fullWidth
                  value={sub.totalInternalMarks}
                  onChange={(e) =>
                    handleMarksChange(index, "totalInternalMarks", e.target.value)
                  }
                />
              </Grid>
               <Grid item xs={6} sm={4}>
                <TextField
                  label="Passing Theory Marks"
                  type="number"
                  fullWidth
                  value={sub.passingInternalMarks}
                  onChange={(e) =>
                    handleMarksChange(index, "passingInternalMarks", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  label="Obtained Internal Marks"
                  type="number"
                  fullWidth
                  value={sub.obtainedInternalMarks}
                  onChange={(e) =>
                    handleMarksChange(index, "obtainedInternalMarks", e.target.value)
                  }
                />
              </Grid>
            </Grid>
          ))}
        </Box>

        {/* Submit */}
        <Box mt={3} textAlign="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={
              !selectedStudent || !selectedYear || subjectMarks.length === 0
            }
          >
            Submit Marks
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default MarksEntryPage;
