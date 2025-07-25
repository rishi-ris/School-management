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
  Box,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import Network from "../Application/Network";
import ClassDropDown from "../component/ClassDropDown";
import TeacherDashboardside from "./TeacherDasboardside";

const TeacherDasTable = () => {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [periods, setPeriods] = useState(
    Array.from({ length: 8 }, (_, i) => ({
      period: i + 1,
      startTime: "",
      endTime: "",
      subjectId: "",
      teacherId: "",
    }))
  );
  const [timetable, setTimetable] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

  useEffect(() => {
    Network.getAllUsersByRoleId(3).then(setTeachers).catch(console.error);
    Network.getAllClasses()
      .then((res) => setSelectedClass(res[0]))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedClass?.classId) {
      Network.getAllSubjectsByClassId(selectedClass.classId)
        .then((res) => {
          const subjectArray = Array.isArray(res.data) ? res.data : res;
          setSubjects(subjectArray);
        })
        .catch(() => setSubjects([]));
    }
  }, [selectedClass]);

  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  const handlePeriodChange = (index, key, value) => {
    setPeriods((prev) => {
      const updated = [...prev];
      updated[index][key] = value;
      return updated;
    });
  };

  const handleTimetableClassChange = async (cls) => {
    const classId = cls.classId;
    setSelectedClass(cls);
    try {
      const response = await Network.getTimeTableByClass(classId);
      setTimetable(response);
    } catch (error) {
      console.error("Failed to load timetable", error);
    }
  };

  const handleSubmit = () => {
    const payload = {
      classId: selectedClass.classId,
      dayOfWeek,
      periods: periods.map((p) => ({
        period: p.period,
        timeSlot: `${p.startTime}-${p.endTime}`,
        subjectId: p.subjectId,
        teacherId: p.teacherId,
      })),
    };
    Network.addTimeTable(payload)
      .then(() => {
        setSnackbar({ open: true, message: "Timetable added successfully!", severity: "success" });
        handleClose();
        setDayOfWeek("");
        setPeriods(Array.from({ length: 8 }, (_, i) => ({
          period: i + 1,
          startTime: "",
          endTime: "",
          subjectId: "",
          teacherId: "",
        })));
      })
      .catch(() => setSnackbar({ open: true, message: "Failed to add timetable.", severity: "error" }));
  };

  return (
    <Box>
      <TeacherDashboardside />
      <Container maxWidth={false} sx={{ mt: 2 }}>
        <Typography variant="h4" gutterBottom>Teacher Timetable</Typography>

        <Box sx={{ display: "flex", gap: 3 }}>
          <Grid item xs={12} sm={6} sx={{ width: '280px' }}>
            <ClassDropDown onSelect={handleTimetableClassChange} selectedClass={selectedClass} />
          </Grid>
        </Box>

        <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="lg">
          <DialogTitle sx={{ backgroundColor: "#1976d2", color: "white" }}>Add Timetable</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", gap: 2, my: 2 }}>
              <ClassDropDown onSelect={setSelectedClass} selectedClass={selectedClass?.classId} />
              <FormControl fullWidth sx={{ minWidth: 200 }}>
                <InputLabel>Day</InputLabel>
                <Select value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} label="Day">
                  {days.map((d) => (
                    <MenuItem key={d} value={d}>{d}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {periods.map((p, index) => (
              <Grid container spacing={2} alignItems="center" key={p.period} sx={{ mb: 1 }}>
                <Grid item xs={12} sm={1.2}>
                  <TextField label="Period" value={p.period} disabled fullWidth />
                </Grid>
                <Grid item xs={12} sm={2.5}>
                  <TextField
                    type="time"
                    label="Start Time"
                    value={p.startTime}
                    onChange={(e) => handlePeriodChange(index, "startTime", e.target.value)}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={2.5}>
                  <TextField
                    type="time"
                    label="End Time"
                    value={p.endTime}
                    onChange={(e) => handlePeriodChange(index, "endTime", e.target.value)}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth sx={{ minWidth: 200 }}>
                    <InputLabel>Subject</InputLabel>
                    <Select
                      value={p.subjectId}
                      onChange={(e) => handlePeriodChange(index, "subjectId", e.target.value)}
                      label="Subject"
                    >
                      {subjects.map((s) => (
                        <MenuItem key={s.subjectId} value={s.subjectId}>{s.title}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth sx={{ minWidth: 200 }}>
                    <InputLabel>Teacher</InputLabel>
                    <Select
                      value={p.teacherId}
                      onChange={(e) => handlePeriodChange(index, "teacherId", e.target.value)}
                      label="Teacher"
                    >
                      {teachers.map((t) => (
                        <MenuItem key={t.id} value={t.id}>{t.firstName} {t.lastName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>

        <Grid container direction="column" spacing={3} sx={{ mt: 1 }}>
          {selectedClass && timetable.length > 0 && (
            <Grid item xs={12}>
              <Paper elevation={4} sx={{ overflowX: "auto", width: '100%' }}>
                <Typography variant="h5" gutterBottom textAlign="center" sx={{ m: 2 }}>
                  Timetable for Class {selectedClass?.classId}
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#1976d2" }}>
                      <TableCell sx={{ color: "white", fontWeight: "bold" }}>Day</TableCell>
                      {periods.map((p) => (
                        <TableCell
                          key={p.period}
                          align="center"
                          sx={{ color: "white", fontWeight: "bold" }}
                        >
                          Period {p.period}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {days.map((day) => (
                      <TableRow key={day}>
                        <TableCell sx={{ fontWeight: "bold" }}>{day}</TableCell>
                        {periods.map((p) => {
                          const entry = timetable.find(
                            (item) => item.dayOfWeek === day && item.period === p.period
                          );
                          return (
                            <TableCell key={`${day}-${p.period}`}>
                              {entry ? (
                                <Paper
                                  elevation={3}
                                  sx={{
                                    height: "110px",
                                    width:"150px",
                                    backgroundColor: entry.isTeacherPresent ? "#e0f7fa" : "#ffcdd2",
                                    p: 0.3,
                                    borderRadius: 1,
                                  }}
                                >
                                  <Typography variant="subtitle2">
                                    <LocalLibraryIcon /> {entry.subjectName}
                                  </Typography >
                                  <Typography variant="body2" >
                                    <PersonIcon sx={{fontSize:"20px"}}/> {entry.teacherName}
                                  </Typography>
                                  <Typography variant="caption">
                                    <AccessTimeIcon /> {entry.timeSlot}
                                  </Typography>
                                </Paper>
                              ) : (
                                <Typography variant="body2" color="textSecondary" align="center">
                                  -
                                </Typography>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          )}
        </Grid>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default TeacherDasTable;