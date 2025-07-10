import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  TextField,
  FormControl,
  InputLabel,
  Paper,
  Snackbar,
  Alert,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Network from "../Application/Network";
import ClassDropDown from "../component/ClassDropDown";

const TeacherTimeTablePage = () => {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState({
    teacherId: "",
    subjectId: "",
    classId: "",
    dayOfWeek: "",
    period: "",
    timeSlot: "",
  });
  const [selectedClass, setSelectedClass] = useState("");
  const [timetable, setTimetable] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  const periods = Array.from({ length: 10 }, (_, i) => i + 1);

  useEffect(() => {
    Network.getAllUsersByRoleId(3).then(setTeachers).catch(console.error);
    Network.getAllClasses().then(setClasses).catch(console.error);
  }, []);

  useEffect(() => {
    if (form.classId) {
      Network.getAllSubjectsByClassId(form.classId)
        .then((res) => {
          const subjectArray = Array.isArray(res.data) ? res.data : res;
          setSubjects(subjectArray);
        })
        .catch(() => setSubjects([]));
    }
  }, [form.classId]);

  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClassSelect = (cls) => {
    setForm((prev) => ({ ...prev, classId: cls.classId }));
  };

  const handleSubmit = () => {
    Network.addTimeTable(form)
      .then(() => {
        setSnackbar({ open: true, message: "Timetable added successfully!", severity: "success" });
        handleClose();
        setForm({ teacherId: "", subjectId: "", classId: "", dayOfWeek: "", period: "", timeSlot: "" });
      })
      .catch(() => setSnackbar({ open: true, message: "Failed to add timetable.", severity: "error" }));
  };

  const handleTimetableClassChange = async (cls) => {
    const classId = cls.classId;
    setSelectedClass(classId);
    try {
      const response = await Network.getTimeTableByClass(classId);
      setTimetable(response);
    } catch (error) {
      console.error("Failed to load timetable", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Teacher Timetable</Typography>
      <Paper sx={{ p: 3 }}>
        <Button variant="contained" onClick={handleOpen}>Add Timetable</Button>

        <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Add Timetable</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Teacher</InputLabel>
                  <Select name="teacherId" value={form.teacherId} onChange={handleChange} label="Teacher">
                    {teachers.map((t) => (
                      <MenuItem key={t.id} value={t.id}>{t.firstName} {t.lastName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ClassDropDown onSelect={handleClassSelect} selectedClass={form.classId} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Subject</InputLabel>
                  <Select name="subjectId" value={form.subjectId} onChange={handleChange} label="Subject">
                    {Array.isArray(subjects) && subjects.map((s) => (
                      <MenuItem key={s.subjectId} value={s.subjectId}>{s.title}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Day</InputLabel>
                  <Select name="dayOfWeek" value={form.dayOfWeek} onChange={handleChange} label="Day">
                    {days.map((d) => (
                      <MenuItem key={d} value={d}>{d}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Period</InputLabel>
                  <Select name="period" value={form.period} onChange={handleChange} label="Period">
                    {periods.map((p) => (
                      <MenuItem key={p} value={p}>{p}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Time Slot"
                  name="timeSlot"
                  fullWidth
                  placeholder="e.g., 09:00 - 09:45"
                  value={form.timeSlot}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>

        {/* Class Selection and Timetable Table */}
        <Grid container direction="column" spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6}>
            <ClassDropDown onSelect={handleTimetableClassChange} selectedClass={selectedClass} />
          </Grid>

          {selectedClass && timetable.length > 0 && (
            <Grid item xs={12}>
              <Paper elevation={4} sx={{ padding: 3, overflowX: "auto" }}>
                <Typography variant="h5" gutterBottom textAlign="center">
                  Timetable for Class {selectedClass}
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Day</strong></TableCell>
                      <TableCell><strong>Period</strong></TableCell>
                      <TableCell><strong>Time Slot</strong></TableCell>
                      <TableCell><strong>Subject</strong></TableCell>
                      <TableCell><strong>Teacher</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {timetable.map((row, idx) => (
                      <TableRow key={idx} sx={{ backgroundColor: row.isTeacherPresent ? "inherit" : "red" }}>
                        <TableCell>{row.dayOfWeek}</TableCell>
                        <TableCell>{row.period}</TableCell>
                        <TableCell>{row.timeSlot}</TableCell>
                        <TableCell>{row.subjectName}</TableCell>
                        <TableCell>{row.teacherName}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default TeacherTimeTablePage;
