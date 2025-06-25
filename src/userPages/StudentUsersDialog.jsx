import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Grid
} from "@mui/material";

const StudentUsersDialog = ({ open, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    roll: "",
    fees: "",
    class: "",
    attendance: "",
    holidays: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(form);
    setForm({ name: "", roll: "", fees: "", class: "", attendance: "", holidays: "" });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Register New Student</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={1}>
          {["name", "roll", "fees", "class", "attendance", "holidays"].map((field) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                fullWidth
                label={field[0].toUpperCase() + field.slice(1)}
                name={field}
                value={form[field]}
                onChange={handleChange}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentUsersDialog;
