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
import Sidekick from "./Sidekick";
import AddTimetableDialog from "./AddTimetableDialog"; // 👉 dialog moved to separate file

const TeacherTimeTablePage = () => {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [periods, setPeriods] = useState([
    { period: 1, startTime: "", endTime: "", subjectId: "", teacherId: "" },
    { period: 2, startTime: "", endTime: "", subjectId: "", teacherId: "" },
    { period: 3, startTime: "", endTime: "", subjectId: "", teacherId: "" },
    { period: 4, startTime: "", endTime: "", subjectId: "", teacherId: "" },
    { period: 5, startTime: "", endTime: "", subjectId: "", teacherId: "" },
    { period: 6, startTime: "", endTime: "", subjectId: "", teacherId: "" },
    { period: 7, startTime: "", endTime: "", subjectId: "", teacherId: "" },
    { period: 8, startTime: "", endTime: "", subjectId: "", teacherId: "" },
  ]);
  const [timetable, setTimetable] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const days = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  useEffect(() => {
    Network.getAllUsersByRoleId(3).then(setTeachers).catch(console.error);
    Network.getAllClasses()
      .then((res) => setSelectedClass(res[0]))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedClass?.classId) {
      Network.getAllSubjectsByClassId(selectedClass.classId)
        .then((res) => setSubjects(Array.isArray(res.data) ? res.data : res))
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
    setSelectedClass(cls);
    try {
      const response = await Network.getTimeTableByClass(cls.classId);
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
        setSnackbar({
          open: true,
          message: "Timetable added successfully!",
          severity: "success",
        });
        handleClose();
        setDayOfWeek("");
        setPeriods(
          periods.map((p) => ({
            ...p,
            startTime: "",
            endTime: "",
            subjectId: "",
            teacherId: "",
          }))
        );
      })
      .catch(() =>
        setSnackbar({
          open: true,
          message: "Failed to add timetable.",
          severity: "error",
        })
      );
  };

  return (
    <Box>
      <Sidekick />
      <Container maxWidth={false} sx={{ mt: 10 }}>
        <Typography variant="h4" gutterBottom>
          Teacher Timetable
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
          <Button variant="contained" onClick={handleOpen}>
            Add Timetable
          </Button>
          <Grid item xs={12} sm={6} sx={{ width: "280px" }}>
            <ClassDropDown
              onSelect={handleTimetableClassChange}
              selectedClass={selectedClass}
            />
          </Grid>
        </Box>

        {/* Dialog moved to separate file */}
        <AddTimetableDialog
          open={openDialog}
          onClose={handleClose}
          onSubmit={handleSubmit}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          dayOfWeek={dayOfWeek}
          setDayOfWeek={setDayOfWeek}
          periods={periods}
          setPeriods={setPeriods}
          subjects={subjects}
          teachers={teachers}
          handlePeriodChange={handlePeriodChange}
        />

        <Grid container direction="column" spacing={3} sx={{ mt: 1 }}>
          {selectedClass && timetable.length > 0 && (
            <Grid item xs={12}>
              <Paper
                elevation={4}
                sx={{
                  overflowX: "auto",
                  width: "100%",
                  p: 1,
                }}
              >
                <Typography
                  variant="h6"
                  textAlign="center"
                  sx={{ m: 2, fontWeight: "bold" }}
                >
                  Timetable for Class {selectedClass?.classId}
                </Typography>

                <Box sx={{ minWidth: "600px" }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#1976d2" }}>
                        <TableCell
                          sx={{
                            color: "white",
                            fontWeight: "bold",
                            minWidth: "80px",
                          }}
                        >
                          Day
                        </TableCell>
                        {periods.map((p) => (
                          <TableCell
                            key={p.period}
                            align="center"
                            sx={{
                              color: "white",
                              fontWeight: "bold",
                              minWidth: "120px",
                            }}
                          >
                            Period {p.period}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {days.map((day) => (
                        <TableRow key={day}>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            {day}
                          </TableCell>
                          {periods.map((p) => {
                            const entry = timetable.find(
                              (item) =>
                                item.dayOfWeek === day &&
                                item.period === p.period
                            );
                            return (
                              <TableCell key={`${day}-${p.period}`}>
                                {entry ? (
                                  <Paper
                                    elevation={3}
                                    sx={{
                                      height: "100px",
                                      backgroundColor: entry.isTeacherPresent
                                        ? "#0fdbf6ff"
                                        : "whitesmoke",
                                      p: 0.5,
                                      borderRadius: 3,
                                      border: "1px solid black",
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "space-evenly",
                                    }}
                                  >
                                    <Typography variant="subtitle2" noWrap>
                                      <LocalLibraryIcon fontSize="small" />{" "}
                                      {entry.subjectName}
                                    </Typography>
                                    <Typography variant="body2" noWrap>
                                      <PersonIcon fontSize="small" />{" "}
                                      {entry.teacherName}
                                    </Typography>
                                    <Typography variant="caption" noWrap>
                                      <AccessTimeIcon fontSize="small" />{" "}
                                      {entry.timeSlot}
                                    </Typography>
                                  </Paper>
                                ) : (
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    align="center"
                                  >
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
                </Box>
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

export default TeacherTimeTablePage;
