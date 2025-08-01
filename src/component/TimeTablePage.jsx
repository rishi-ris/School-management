import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
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
import AddTimetableDialog from "./AddTimetableDialog";
import { AuthContext } from "../auth/AuthProvider";

const TeacherTimeTablePage = () => {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [dayOfWeek, setDayOfWeek] = useState("");
  const { user } = useContext(AuthContext);
  const [periods, setPeriods] = useState([]);
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
    Network.getAllUsersByRoleId(3, user.data.data.schoolId)
      .then(setTeachers)
      .catch(console.error);

    Network.getAllClasses()
      .then((res) => setSelectedClass(res[0]))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedClass?.classId) {
      Network.getAllSubjectsByClassId(
        selectedClass.classId,
        user.data.data.schoolId
      )
        .then((res) => {
          const subjectList = Array.isArray(res.data) ? res.data : res;
          setSubjects(subjectList);

          // dynamically adjust periods length based on subjects
          const periodCount = subjectList.length;
          const updatedPeriods = Array.from({ length: periodCount }, (_, i) => ({
            period: i + 1,
            startTime: "",
            endTime: "",
            subjectId: "",
            teacherId: "",
          }));
          setPeriods(updatedPeriods);
        })
        .catch(() => {
          setSubjects([]);
          setPeriods([]);
        });
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
      const response = await Network.getTimeTableByClass(cls.classId, user.data.data.schoolId, "TUESDAY");
      setTimetable(response);
    } catch (error) {
      console.error("Failed to load timetable", error);
    }
  };

  const handleSubmit = () => {
    const payload = {
      classId: selectedClass.classId,
      dayOfWeek,
      schoolId: user.data.data.schoolId,
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
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{
              backgroundColor: "var(--button-bg-color)",
              height: "55px",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                transform: "scale(1.03)",
              },
            }}
          >
            Add Timetable
          </Button>

          <Grid item xs={12} sm={6} sx={{ width: "280px" }}>
            <ClassDropDown
              onSelect={handleTimetableClassChange}
              selectedClass={selectedClass}
            />
          </Grid>
        </Box>

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
              <Paper elevation={4} sx={{ overflowX: "auto", width: "100%", p: 1 }}>
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
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                          Day
                        </TableCell>
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
                                        ? "#93e0eaff"
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
