import React from "react";
import {
  Grid,
  TextField,
  Paper,
  Typography,
  Divider,
  Checkbox,
  FormControlLabel,
  MenuItem,
} from "@mui/material";

const fields = [
  { name: "religion", label: "Religion" },
  { name: "nationality", label: "Nationality" },
  { name: "motherToungue", label: "Mother Tongue" },
  { name: "apaarId", label: "Apaar ID" },
  { name: "prevSchool", label: "Previous School" },
  { name: "prevEduBoard", label: "Previous Edu Board" },
  { name: "registrationNumber", label: "Registration No." },
  { name: "enrollmentNumber", label: "Enrollment No." },
];

const numericFields = ["apaarId", "registrationNumber", "enrollmentNumber"];
const textOnlyFields = [
  "religion",
  "nationality",
  "motherToungue",
  "prevSchool",
  "prevEduBoard",
  "disabilityType",
];

const casteOptions = ["General", "SC", "ST", "OBC"];
const medicalOptions = ["Yes", "No"];

const StuPersonalDltDlg = ({ data, onChange, errors = {}, setErrors }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    if (numericFields.includes(name)) {
      const numericOnly = value.replace(/[^0-9]/g, "");
      if (!numericOnly.trim()) {
        newErrors[name] = "This field is required and must be numeric";
      } else {
        delete newErrors[name];
      }
      setErrors(newErrors);
      onChange({ [name]: numericOnly });
    } else if (textOnlyFields.includes(name)) {
      const textOnly = value.replace(/[^a-zA-Z\s]/g, "");
      if (!textOnly.trim()) {
        newErrors[name] = "This field is required and must contain only letters";
      } else {
        delete newErrors[name];
      }
      setErrors(newErrors);
      onChange({ [name]: textOnly });
    } else {
      if (!value.trim()) {
        newErrors[name] = "This field is required";
      } else {
        delete newErrors[name];
      }
      setErrors(newErrors);
      onChange({ [name]: value });
    }
  };

  const handleCasteChange = (e) => {
    const value = e.target.value;
    let newErrors = { ...errors };

    if (!value) {
      newErrors["caste"] = "Caste is required";
    } else {
      delete newErrors["caste"];
    }

    setErrors(newErrors);
    onChange({ caste: value });
  };

  const handleMedicalChange = (e) => {
    const value = e.target.value;
    let newErrors = { ...errors };

    if (!value) {
      newErrors["medicalHistory"] = "Medical history is required";
    } else {
      delete newErrors["medicalHistory"];
    }

    setErrors(newErrors);
    onChange({ medicalHistory: value });
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Personal Details
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2}>
        {/* Caste Dropdown */}
        <Grid item>
          <TextField
            select
            variant="outlined"
            label="Caste"
            name="caste"
            value={data.caste || ""}
            onChange={handleCasteChange}
            error={!!errors["caste"]}
            helperText={errors["caste"] || ""}
            sx={{ width: "200px" }}
          >
            {casteOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* All Form Fields */}
        {fields.map(({ name, label }) => (
          <Grid item key={name}>
            <TextField
              variant="outlined"
              label={label}
              name={name}
              value={data[name] || ""}
              onChange={handleInputChange}
              error={!!errors[name]}
              helperText={errors[name] || ""}
              inputProps={{
                inputMode: numericFields.includes(name) ? "numeric" : "text",
                maxLength: 20,
              }}
              sx={{ width: "200px" }}
            />
          </Grid>
        ))}

        {/* Medical History Dropdown */}
        <Grid item>
          <TextField
            select
            variant="outlined"
            label="Medical History"
            name="medicalHistory"
            value={data.medicalHistory || ""}
            onChange={handleMedicalChange}
            error={!!errors["medicalHistory"]}
            helperText={errors["medicalHistory"] || ""}
            sx={{ width: "200px" }}
          >
            {medicalOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Disability Type Field (conditional) */}
        {data.isDisable && (
          <Grid item>
            <TextField
              variant="outlined"
              label="Disability Type"
              name="disabilityType"
              value={data.disabilityType || ""}
              onChange={handleInputChange}
              error={!!errors["disabilityType"]}
              helperText={errors["disabilityType"] || ""}
              inputProps={{ maxLength: 20 }}
              sx={{ width: "200px" }}
            />
          </Grid>
        )}

        {/* Disabled Checkbox */}
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={!!data.isDisable}
                onChange={(e) => onChange({ isDisable: e.target.checked })}
                name="isDisable"
              />
            }
            label="Is Disabled?"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default StuPersonalDltDlg;
