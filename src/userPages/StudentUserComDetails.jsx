// File: StudentUsersComDetail.jsx
import React from "react";
import { Grid, TextField } from "@mui/material";

const fields = [
  "userName", "password", "role", "gender", "rollNumber", "scholarNumber",
  "stu_class", "section", "firstName", "lastName", "contactNumber", "dOB",
  "address", "city", "state", "pinCode", "country", "status", "feesDiscount"
];

const StudentUsersComDetail = ({ data, onChange }) => {
  const handleInputChange = (e) => {
    onChange({ [e.target.name]: e.target.value });
  };

  return (
    <Grid container spacing={2} mt={1}>
      {fields.map((field) => (
        <Grid item xs={12} sm={6} key={field}>
          <TextField
            fullWidth
            label={field.replace(/([A-Z])/g, " $1").replace(/^\w/, c => c.toUpperCase())}
            name={field}
            value={data[field] || ""}
            onChange={handleInputChange}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default StudentUsersComDetail;
