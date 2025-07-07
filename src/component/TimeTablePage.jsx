import React, { useState } from "react";
import {
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import Sidekick from "./Sidekick";

const classList = ["1st", "2nd", "3rd", "4th", "5th"];
const subjects = ["Hindi", "English", "Maths", "Science", "SST", "IT"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const teacherAssignments = {
  "1st": {
    Hindi: "Mrs. Sharma",
    English: "Absent",
    Maths: "Ms. Gupta",
    Science: "Mr. Joshi",
    SST: "Ms. Ritu",
    IT: "Mr. Khan",
  },
  "2nd": {
    Hindi: "Mrs. Awasthi",
    English: "Mr. Saxena",
    Maths: "Ms. Gupta",
    Science: "Mr. Sinha",
    SST: "Absent",
    IT: "Mr. Imran",
  },
  "3rd": {
    Hindi: "Mr. Mahesh",
    English: "Ms. Neha",
    Maths: "Mr. Ravi",
    Science: "Ms. Lata",
    SST: "Mr. Gopal",
    IT: "Ms. Zoya",
  },
  "4th": {
    Hindi: "Mr. Vivek",
    English: "Ms. Aarti",
    Maths: "Mr. Jatin",
    Science: "Ms. Anjali",
    SST: "Mr. Mohan",
    IT: "Ms. Farah",
  },
  "5th": {
    Hindi: "Ms. Sneha",
    English: "Mr. Nikhil",
    Maths: "Ms. Divya",
    Science: "Mr. Arjun",
    SST: "Ms. Rekha",
    IT: "Mr. Ramesh",
  },
};

// 🎨 Assign background color per subject
const subjectColors = {
  Hindi: "#FFEBEE",
  English: "#E3F2FD",
  Maths: "#E8F5E9",
  Science: "#FFF3E0",
  SST: "#F3E5F5",
  IT: "#F1F8E9",
};

const TimeTablePage = () => {
  const [selectedClass, setSelectedClass] = useState("");

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const getTimetableForClass = (className) => {
    const teachers = teacherAssignments[className];
    if (!teachers) return [];

    return days.map((day) => ({
      day,
      schedule: subjects.map((subj) => ({
        subject: subj,
        teacher: teachers[subj] || "Absent",
      })),
    }));
  };

  const timetable = selectedClass ? getTimetableForClass(selectedClass) : [];

  return (
    <Box>
      <Sidekick/>
    
    <Grid container direction="column" spacing={3} sx={{ padding: 4 }}>
      {/* Class Selection */}
      <Grid item xs={12} sm={6} md={4} sx={{ border: "1px solid #ccc" }}>
        <FormControl fullWidth>
          <InputLabel>Select Class</InputLabel>
          <Select value={selectedClass} label="Select Class" onChange={handleClassChange}>
            {classList.map((cls) => (
              <MenuItem key={cls} value={cls}>
                {cls}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Timetable */}
      {selectedClass && (
        <Grid item xs={12}>
          <Paper elevation={4} sx={{ padding: 3, overflowX: "auto" }}>
            <Typography variant="h5" gutterBottom textAlign="center">
              Timetable for Class {selectedClass}
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Day</strong></TableCell>
                  {subjects.map((subj) => (
                    <TableCell key={subj} align="center">
                      <strong>{subj}</strong>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {timetable.map((row) => (
                  <TableRow key={row.day}>
                    <TableCell><strong>{row.day}</strong></TableCell>
                    {row.schedule.map((entry) => (
                      <TableCell
                        key={entry.subject}
                        align="center"
                        sx={{
                          backgroundColor: subjectColors[entry.subject],
                          color: entry.teacher.toLowerCase() === "absent" ? "red" : "black",
                          fontWeight: entry.teacher.toLowerCase() === "absent" ? "bold" : "normal",
                        }}
                      >
                        {entry.teacher}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      )}
    </Grid>
    </Box>
  );
};

export default TimeTablePage;
