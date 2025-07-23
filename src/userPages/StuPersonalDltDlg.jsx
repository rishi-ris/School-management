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
  "hospitalName",
  "prevSchool",
  "prevEduBoard",
  "disabilityType",
];
 
const casteOptions = ["General", "SC", "ST", "OBC"];
 
const StuPersonalDltDlg = ({ data, onChange, errors = {}, setErrors }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };
 
    if (numericFields.includes(name)) {
      const numericOnly = value.replace(/[^0-9]/g, "");
      if (!numericOnly) {
        newErrors[`personal_${name}`] = "This field is required and must be numeric";
      } else {
        delete newErrors[`personal_${name}`];
      }
      setErrors(newErrors);
      onChange({ [name]: numericOnly });
 
    } else if (textOnlyFields.includes(name)) {
      // Hospital Name validation only if medicalHistory === "Yes"
      if (name === "hospitalName" && data.medicalHistory !== "Yes") {
        onChange({ [name]: null });
        delete newErrors[`personal_${name}`];
        setErrors(newErrors);
        return;
      }
 
      const textOnly = value.replace(/[^a-zA-Z\s]/g, "");
      if (!textOnly.trim()) {
        newErrors[`personal_${name}`] = "This field is required and must contain only letters";
      } else {
        delete newErrors[`personal_${name}`];
      }
      setErrors(newErrors);
      onChange({ [name]: textOnly });
 
    } else {
      if (!value.trim()) {
        newErrors[`personal_${name}`] = "This field is required";
      } else {
        delete newErrors[`personal_${name}`];
      }
      setErrors(newErrors);
      onChange({ [name]: value });
    }
  };
 
  const handleMedicalChange = (e) => {
    const value = e.target.value;
    let newErrors = { ...errors };
 
    if (!value) {
      newErrors.personal_medicalHistory = "Medical History is required";
    } else {
      delete newErrors.personal_medicalHistory;
    }
 
    if (value === "No") {
      delete newErrors.personal_hospitalName;
      onChange({ medicalHistory: "No", hospitalName: null });
    } else {
      onChange({ medicalHistory: "Yes" });
    }
 
    setErrors(newErrors);
  };
 
  const handleCasteChange = (e) => {
    const value = e.target.value;
    let newErrors = { ...errors };
 
    if (!value) {
      newErrors.personal_caste = "Caste is required";
    } else {
      delete newErrors.personal_caste;
    }
 
    setErrors(newErrors);
    onChange({ caste: value });
  };
 
  return (
    <Paper elevation={3} sx={{ p: 4, mt: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Personal Details
      </Typography>
      <Divider sx={{ mb: 3 }} />
 
      <Grid container spacing={3}>
        {/* Caste Dropdown */}
        <Grid item xs={12} sm={6}>
          <TextField
            select
            sx={{ width: "200px" }}
            variant="outlined"
            label="Caste"
            name="caste"
            value={data.caste || ""}
            onChange={handleCasteChange}
            error={!!errors.personal_caste}
            helperText={errors.personal_caste || ""}
          >
            {casteOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
 
        {/* Other fields */}
        {fields.map(({ name, label }) => (
          <Grid item xs={12} sm={6} key={name}>
            <TextField
              fullWidth
              variant="outlined"
              label={label}
              name={name}
              value={data[name] || ""}
              onChange={handleInputChange}
              error={!!errors[`personal_${name}`]}
              helperText={errors[`personal_${name}`] || ""}
              inputProps={{
                inputMode: numericFields.includes(name) ? "numeric" : "text",
                maxLength: 20,
              }}
            />
          </Grid>
        ))}
 
        {/* Medical History Dropdown */}
        <Grid item xs={12} sm={6}>
          <TextField
            select
            sx={{ width: "200px" }}
            variant="outlined"
            label="Medical History"
            name="medicalHistory"
            value={data.medicalHistory || ""}
            onChange={handleMedicalChange}
            error={!!errors.personal_medicalHistory}
            helperText={errors.personal_medicalHistory || ""}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
        </Grid>
 
        {/* Hospital Name only if Medical History is Yes */}
        {data.medicalHistory === "Yes" && (
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Hospital Name"
              name="hospitalName"
              value={data.hospitalName || ""}
              onChange={handleInputChange}
              error={!!errors.personal_hospitalName}
              helperText={errors.personal_hospitalName || ""}
              inputProps={{ maxLength: 20 }}
            />
          </Grid>
        )}
 
        {/* Disability Type if isDisable is true */}
        {data.isDisable && (
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Disability Type"
              name="disabilityType"
              value={data.disabilityType || ""}
              onChange={handleInputChange}
              error={!!errors.personal_disabilityType}
              helperText={errors.personal_disabilityType || ""}
              inputProps={{ maxLength: 20 }}
            />
          </Grid>
        )}
 
        {/* Checkbox */}
        <Grid item xs={12} sm={6}>
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