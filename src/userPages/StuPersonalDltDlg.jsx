import React from "react";
import { Grid, TextField, Checkbox, FormControlLabel } from "@mui/material";

const fields = [
  { name: "caste", label: "Caste" },
  { name: "religion", label: "Religion" },
  { name: "nationality", label: "Nationality" },
  { name: "motherToungue", label: "Mother Tongue" },
  { name: "disabilityType", label: "Disability Type" },
  { name: "medicalHistory", label: "Medical History" },
  { name: "apaarId", label: "Apaar ID" },
  { name: "prevSchool", label: "Previous School" },
  { name: "prevEduBoard", label: "Previous Edu Board" },
  { name: "registrationNumber", label: "Registration No." },
  { name: "enrollmentNumber", label: "Enrollment No." },
  { name: "bloodGroup", label: "Blood Group" },
  { name: "isDisabile", label: "Is Disabled?" },
];

const StuPersonalDltDlg = ({ data, onChange }) => {
  const handleInputChange = (e) => {
    onChange({ [e.target.name]: e.target.value });
  };
  const handleCheckboxChange = (e) => {
    onChange({ [e.target.name]: e.target.checked });
  };

  return (
    <Grid container spacing={2} mt={1}>
      {fields.map(({ name, label }) => (
        <Grid item xs={12} sm={6} key={name}>
          {name === "isDisabile" ? (
            <FormControlLabel
              control={
                <Checkbox
                  name={name}
                  checked={!!data[name]}
                  onChange={handleCheckboxChange}
                  color="primary"
                />
              }
              label={label}
            />
          ) : (
            <TextField
              fullWidth
              label={label}
              name={name}
              value={data[name] || ""}
              onChange={handleInputChange}
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default StuPersonalDltDlg;
