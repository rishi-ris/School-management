import React, { useState } from "react";
import {
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Typography,
  Divider,
  Paper,
  Box,
} from "@mui/material";

const classOptions = [
  "1st", "2nd", "3rd", "4th", "5th",
  "6th", "7th", "8th", "9th", "10th",
];

const studentNames = ["Rashi", "Rishi", "Vishal", "Shainu", "Prachi"];

const numericFields = [
  "fatherPhone", "motherPhone", "guardianPhone",
  "fatherAadharNum", "motherAadharNum", "guardianAadharNum",
];

const textOnlyFields = [
  "fatherName", "fatherEducation", "fatherOccupation",
  "motherName", "motherEducation", "motherOccupation",
  "guardianName", "guardianEducation", "guardianOccupation",
];

const StuFamilyDltDlg = ({ data, onChange, errors = {}, setErrors }) => {
  const [showSiblingFields, setShowSiblingFields] = useState(data.isSibling || false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    if (name === "isSibling") {
      setShowSiblingFields(val);
      onChange({ [name]: val });
      return;
    }

    // Numeric Validation
    if (numericFields.includes(name)) {
      const numericOnly = value.replace(/[^0-9]/g, "");

      if (name.includes("Phone") && numericOnly.length !== 10) {
        setErrors((prev) => ({
          ...prev,
          [`family_${name}`]: "Phone number must be 10 digits",
        }));
      } else if (name.includes("Aadhar") && numericOnly.length !== 12) {
        setErrors((prev) => ({
          ...prev,
          [`family_${name}`]: "Aadhar number must be 12 digits",
        }));
      } else {
        const newErrors = { ...errors };
        delete newErrors[`family_${name}`];
        setErrors(newErrors);
      }

      onChange({ [name]: numericOnly });
    }

    // Text Validation
    else if (textOnlyFields.includes(name)) {
      const textOnly = value.replace(/[^a-zA-Z\s]/g, "");
      if (value !== textOnly) {
        setErrors((prev) => ({
          ...prev,
          [`family_${name}`]: "Only alphabets allowed",
        }));
      } else {
        const newErrors = { ...errors };
        delete newErrors[`family_${name}`];
        setErrors(newErrors);
      }
      onChange({ [name]: textOnly });
    }

    // Default
    else {
      onChange({ [name]: val });
    }
  };

  const renderTextField = (field) => (
    <Grid item xs={12} sm={6} key={field}>
      <TextField
        fullWidth
        variant="outlined"
        label={field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
        name={field}
        value={data[field] || ""}
        onChange={handleInputChange}
        error={!!errors[`family_${field}`]}
        helperText={errors[`family_${field}`] || ""}
        inputProps={{
          inputMode: numericFields.includes(field) ? "numeric" : "text",
          maxLength: field.includes("Aadhar") ? 12 : field.includes("Phone") ? 10 : 50,
        }}
      />
    </Grid>
  );

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>Family Details</Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Father Section */}
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>Father Details</Typography>
        <Grid container spacing={3}>
          {[
            "fatherName", "fatherPhone","fatherOccupation", "fatherEmail",
            "fatherAadharNum", "fatherEducation", 
          ].map(renderTextField)}
        </Grid>
      </Paper>

      {/* Mother Section */}
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>Mother Details</Typography>
        <Grid container spacing={3}>
          {[
            "motherName", "motherPhone",  "motherOccupation",
            "motherEmail",
            "motherAadharNum", "motherEducation", 
          ].map(renderTextField)}
        </Grid>
      </Paper>

      {/* Guardian Section */}
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>Guardian Details</Typography>
        <Grid container spacing={3}>
          {[
            "guardianName", "guardianPhone", "guardianEmail",
            "guardianAadharNum", "guardianEducation", "guardianOccupation",
          ].map(renderTextField)}
        </Grid>
      </Paper>

      {/* Sibling Checkbox */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="isSibling"
                checked={data.isSibling || false}
                onChange={handleInputChange}
              />
            }
            label="Is Sibling?"
          />
        </Grid>

        {/* Sibling Fields */}
        {showSiblingFields && (
          <Grid item xs={12}>
            <Box display="flex" gap={3} flexWrap="wrap">
              <TextField
                select
                variant="outlined"
                label="Sibling Class"
                name="siblingClass"
                value={data.siblingClass || ""}
                onChange={handleInputChange}
                sx={{ width: 200 }}
              >
                {classOptions.map((cls) => (
                  <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                ))}
              </TextField>

              <TextField
                select
                variant="outlined"
                label="Sibling Name"
                name="siblingName"
                value={data.siblingName || ""}
                onChange={handleInputChange}
                sx={{ width: 200 }}
              >
                {studentNames.map((name) => (
                  <MenuItem key={name} value={name}>{name}</MenuItem>
                ))}
              </TextField>
            </Box>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default StuFamilyDltDlg;
