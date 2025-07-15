import React from "react";
import { Grid, TextField } from "@mui/material";

const fields = [
  { name: "caste", label: "Caste" },
  { name: "religion", label: "Religion" },
  { name: "nationality", label: "Nationality" },
  { name: "motherToungue", label: "Mother Tongue" },
  { name: "isDisabile", label: "Is Disabled?" },
  { name: "disabilityType", label: "Disability Type" },
  { name: "medicalHistory", label: "Medical History" },
  { name: "apaarId", label: "Apaar ID" },
  { name: "prevSchool", label: "Previous School" },
  { name: "prevEduBoard", label: "Previous Edu Board" },
  { name: "registrationNumber", label: "Registration No." },
  { name: "enrollmentNumber", label: "Enrollment No." },
  { name: "bloodGroup", label: "Blood Group" },
];

const StuPersonalDltDlg = ({ data, onChange }) => {
  const handleInputChange = (e) => {
    onChange({ [e.target.name]: e.target.value });
  };

  return (
    <Grid container spacing={2} mt={1}>
      {fields.map(({ name, label }) => (
        <Grid item xs={12} sm={6} key={name}>
          <TextField
            fullWidth
            label={label}
            name={name}
            value={data[name] || ""}
            onChange={handleInputChange}
          />
        </Grid>
        
      ))}
    </Grid>
  );
};

export default StuPersonalDltDlg;
