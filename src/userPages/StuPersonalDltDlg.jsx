import React from "react";
import {
  Grid,
  TextField,
  Paper,
  Typography,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const fields = [
  { name: "caste", label: "Caste" },
  { name: "religion", label: "Religion" },
  { name: "nationality", label: "Nationality" },
  { name: "motherToungue", label: "Mother Tongue" },
  { name: "medicalHistory", label: "Medical History" },
  { name: "hospitalName", label: "Hospital Name" },
  { name: "apaarId", label: "Apaar ID" },
  { name: "prevSchool", label: "Previous School" },
  { name: "prevEduBoard", label: "Previous Edu Board" },
  { name: "registrationNumber", label: "Registration No." },
  { name: "enrollmentNumber", label: "Enrollment No." },
  { name: "scholarNumber", label: "Scholar Number" },
  { name: "pincode", label: "Pincode" },
  { name: "contactNumber", label: "Contact Number" },
  { name: "rollNumber", label: "Roll Number" },
  { name: "feesDiscount", label: "Fees Discount" },
  { name: "totalFees", label: "Total Fees" },
];

const numericFields = [
  "apaarId",
  "registrationNumber",
  "enrollmentNumber",
  "scholarNumber",
  "pincode",
  "contactNumber",
  "rollNumber",
  "feesDiscount",
  "totalFees",
];

const textOnlyFields = [
  "caste",
  "religion",
  "nationality",
  "motherToungue",
  "medicalHistory",
  "hospitalName",
  "prevSchool",
  "prevEduBoard",
];

const StuPersonalDltDlg = ({ data, onChange, errors = {}, setErrors }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (numericFields.includes(name)) {
      const numericOnly = value.replace(/[^0-9]/g, "");
      if (value !== numericOnly) {
        setErrors((prev) => ({
          ...prev,
          [`personal_${name}`]: "Only numbers are allowed",
        }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[`personal_${name}`];
          return newErrors;
        });
      }
      onChange({ [name]: numericOnly });
    } else if (textOnlyFields.includes(name)) {
      const textOnly = value.replace(/[^a-zA-Z\s]/g, "");
      if (value !== textOnly) {
        setErrors((prev) => ({
          ...prev,
          [`personal_${name}`]: "Only alphabets are allowed",
        }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[`personal_${name}`];
          return newErrors;
        });
      }
      onChange({ [name]: textOnly });
    } else {
      onChange({ [name]: value });
    }
  };

  const handleDateChange = (value) => {
    onChange({ dob: value });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper elevation={3} sx={{ p: 4, mt: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Personal Details
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Date of Birth"
              value={data.dob || null}
              onChange={handleDateChange}
              maxDate={new Date()}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  variant="outlined"
                  error={!!errors.personal_dob}
                  helperText={errors.personal_dob || ""}
                />
              )}
            />
          </Grid>

          {/* Is Disabled Checkbox */}
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

          {/* Disability Type - Conditional */}
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

          {/* Form Fields */}
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
                  inputMode: numericFields.includes(name)
                    ? "numeric"
                    : "text",
                  pattern: numericFields.includes(name) ? "\\d*" : undefined,
                  maxLength: 20,
                }}
                onKeyPress={
                  numericFields.includes(name)
                    ? (e) => {
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }
                    : textOnlyFields.includes(name)
                    ? (e) => {
                        if (!/[a-zA-Z\s]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }
                    : undefined
                }
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </LocalizationProvider>
  );
};

export default StuPersonalDltDlg;
