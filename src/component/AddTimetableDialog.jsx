import React from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Grid, Select, MenuItem, FormControl, InputLabel,
  TextField, Box,
} from "@mui/material";
import ClassDropDown from "../component/ClassDropDown";

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
  subjects,
  teachers,
  handlePeriodChange,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Add Timetable</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} sx={{ mt: 1 }}>

          {/* Class & Day Selection (Moved to Top) */}
          
          <Grid item xs={12} sm={6}>
            <ClassDropDown onSelect={setSelectedClass} selectedClass={selectedClass?.classId} />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Day</InputLabel>
              <Select
                value={dayOfWeek}
                onChange={(e) => setDayOfWeek(e.target.value)}
                label="Day"
              >
                {days.map((d) => (
                  <MenuItem key={d} value={d}>{d}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          

          {/* Period Rows */}
          {periods.map((p, index) => (
            <React.Fragment key={p.period}>
              <Grid item xs={12} sm={2}>
                <TextField label="Period" value={p.period} disabled fullWidth />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  type="time"
                  label="Start Time"
                  value={p.startTime}
                  onChange={(e) => handlePeriodChange(index, "startTime", e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
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
                <FormControl fullWidth>
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
                <FormControl fullWidth>
                  <InputLabel>Teacher</InputLabel>
                  <Select
                    value={p.teacherId}
                    onChange={(e) => handlePeriodChange(index, "teacherId", e.target.value)}
                    label="Teacher"
                  >
                    {teachers.map((t) => (
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
        <Button variant="contained" onClick={onSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTimetableDialog;
