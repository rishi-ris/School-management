import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Box,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClassDropDown from "../component/ClassDropDown";
import Network from "../Application/Network"; // ⬅️ use your existing API setup

const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

const AddTimetableDialog = ({
  open,
  onClose,
  onSubmit,
  selectedClass,
  setSelectedClass,
  dayOfWeek,
  setDayOfWeek,
  periods,
  setPeriods,
  teachers,
  handlePeriodChange,
}) => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (open) {
      Network.getAllSubjects()
        .then((res) => setSubjects(res?.data || []))
        .catch((err) => {
          console.error("Error fetching subjects:", err);
          setSubjects([]);
        });
    }
  }, [open]);

  const handleSubmit = () => {
    if (!selectedClass?.classId) {
      toast.error("Please select a class");
      return;
    }

    if (!dayOfWeek) {
      toast.error("Please select a day");
      return;
    }

    const subjectIds = new Set();
    const timeSlots = new Set();

    for (let i = 0; i < periods.length; i++) {
      const p = periods[i];
      if (!p.startTime || !p.endTime || !p.subjectId || !p.teacherId) {
        toast.error(`Please fill all fields for Period ${p.period}`);
        return;
      }

      if (subjectIds.has(p.subjectId)) {
        toast.error(`Duplicate subject selected in Period ${p.period}`);
        return;
      }
      subjectIds.add(p.subjectId);

      const slotKey = `${p.startTime}-${p.endTime}`;
      if (timeSlots.has(slotKey)) {
        toast.error(`Duplicate time slot in Period ${p.period}`);
        return;
      }
      timeSlots.add(slotKey);
    }

    onSubmit();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <ToastContainer position="top-right" autoClose={3000} />
      <DialogTitle
        width={160}
        sx={{
          borderTopRightRadius: "50px",
          borderBottomRightRadius: "50px",
          padding: "5px",
          fontSize: "15px",
          fontWeight: "bold",
          mt: 2,
          ml: 5.5,
          color: "white",
          backgroundColor: "var(--header-bg-color)",
        }}
      >
        Add New Timetable
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
          marginTop: "15px",
        }}
      >
        <Box width="100%" sx={{ display: "flex" }}>
          <Box
            width={420}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "24px",
            }}
          >
            <Grid item xs={12} sm={6} width={200}>
              <ClassDropDown
                onSelect={setSelectedClass}
                selectedClass={selectedClass?.classId}
              />
            </Grid>

            <Grid item xs={12} sm={6} width={200}>
              <FormControl fullWidth required>
                <InputLabel>Day</InputLabel>
                <Select
                  value={dayOfWeek}
                  onChange={(e) => setDayOfWeek(e.target.value)}
                  label="Day"
                >
                  {days.map((d) => (
                    <MenuItem key={d} value={d}>
                      {d}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Box>
        </Box>

        <Grid container spacing={2} sx={{ mt: 1, padding: 3 }}>
          {periods.map((p, index) => (
            <React.Fragment key={p.period}>
              <Grid item xs={12} sm={2} width={100}>
                <TextField label="Period" value={p.period} disabled fullWidth />
              </Grid>

              <Grid item xs={12} sm={2} width={150}>
                <TextField
                  type="time"
                  label="Start Time"
                  value={p.startTime}
                  onChange={(e) =>
                    handlePeriodChange(index, "startTime", e.target.value)
                  }
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={2} width={150}>
                <TextField
                  type="time"
                  label="End Time"
                  value={p.endTime}
                  onChange={(e) =>
                    handlePeriodChange(index, "endTime", e.target.value)
                  }
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={3} width={150}>
                <FormControl fullWidth required>
                  <InputLabel>Subject</InputLabel>
                  <Select
                    value={p.subjectId || ""}
                    onChange={(e) =>
                      handlePeriodChange(index, "subjectId", e.target.value)
                    }
                    label="Subject"
                    MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }}
                  >
                    {subjects.map((s) => (
                      <MenuItem key={s.subjectId} value={s.subjectId}>
                        {s.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={3} width={150}>
                <FormControl fullWidth required>
                  <InputLabel>Teacher</InputLabel>
                  <Select
                    value={p.teacherId || ""}
                    onChange={(e) =>
                      handlePeriodChange(index, "teacherId", e.target.value)
                    }
                    label="Teacher"
                  >
                    {Array.isArray(teachers) &&
                      teachers.map((t) => (
                        <MenuItem key={t.id} value={t.id}>
                          {t.firstName} {t.lastName}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddTimetableDialog.defaultProps = {
  teachers: [],
};

export default AddTimetableDialog;
