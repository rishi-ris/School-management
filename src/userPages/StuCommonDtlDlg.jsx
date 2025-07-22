import React from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Paper,
  Typography,
  Divider,
} from "@mui/material";
import ClassDropDown from "../component/ClassDropDown";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const StuCommonDtlDlg = ({
  data,
  onChange,
  onClassSelect,
  onRoleSelect,
  errors = {},
  setErrors,
}) => {
  const requiredCommonFields = [
    "username", "password", "gender", "rollNumber", "scholarNumber",
    "firstName", "lastName", "contactNumber", "dob", "address",
    "city", "state", "pinCode", "country", "status", "feesDiscount", "totalFees"
  ];

  const numericFields = [
    "rollNumber", "contactNumber", "scholarNumber", "pinCode", "feesDiscount", "totalFees"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const isNumeric = numericFields.includes(name);
    let cleanValue = isNumeric
      ? value.replace(/[^0-9]/g, "").slice(0, name === "pinCode" ? 6 : 10)
      : value.slice(0, 20);

    if (isNumeric && name !== "contactNumber" && name !== "pinCode") {
      cleanValue = cleanValue.slice(0, 20);
    }

    if (name === "contactNumber") {
      if (cleanValue.length !== 10) {
        setErrors?.((prev) => ({ ...prev, [name]: "Only use 10 digits" }));
      } else if (!/^[6-9]/.test(cleanValue)) {
        setErrors?.((prev) => ({
          ...prev,
          [name]: "Start number with 6, 7, 8 or 9",
        }));
      } else {
        const newErr = { ...errors };
        delete newErr[name];
        setErrors(newErr);
      }
    }

    if (name === "pinCode") {
      if (cleanValue.length !== 6) {
        setErrors?.((prev) => ({ ...prev, [name]: "Only use 6 digits" }));
      } else {
        const newErr = { ...errors };
        delete newErr[name];
        setErrors(newErr);
      }
    }

    onChange({ [name]: cleanValue });
  };

  const handleDOBChange = (newValue) => {
    const formatted = dayjs(newValue).format("DD/MM/YYYY");
    const isFuture = dayjs(newValue).isAfter(dayjs());
    const age = dayjs().diff(dayjs(newValue), "year");

    onChange({ dob: formatted });

    if (!newValue || !dayjs(newValue).isValid()) {
      setErrors?.((prev) => ({ ...prev, dob: "DOB is required" }));
    } else if (isFuture) {
      setErrors?.((prev) => ({ ...prev, dob: "DOB cannot be in the future" }));
    } else if (age < 3 || age > 20) {
      setErrors?.((prev) => ({
        ...prev,
        dob: "Age must be between 3 and 20",
      }));
    } else {
      setErrors?.((prev) => {
        const newErr = { ...prev };
        delete newErr.dob;
        return newErr;
      });
    }
  };

  const handleClassSelect = (cls) => {
    onClassSelect({ classId: cls });
    onRoleSelect({ roleId: 4 });
    onChange({ roleId: 4 });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Common Details
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} sx={{ width: "200px" }}>
          <ClassDropDown
            selectedClassId={data?.classId || ""}
            onSelect={handleClassSelect}
            value={data?.classId || ""}
          />
          {errors.classId && (
            <Typography color="error" variant="caption">
              {errors.classId}
            </Typography>
          )}
        </Grid>

        {requiredCommonFields.map((field) => (
          <Grid item xs={12} sm={6} key={field}>
            {field === "gender" ? (
              <TextField
                sx={{ width: "200px" }}
                select
                fullWidth
                name="gender"
                label="Gender"
                value={data?.gender || ""}
                onChange={(e) => onChange({ gender: e.target.value })}
                error={!!errors.gender}
                helperText={errors.gender || ""}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </TextField>
            ) : field === "status" ? (
              <TextField
                sx={{ width: "200px" }}
                select
                fullWidth
                name="status"
                label="Status"
                value={data?.status || ""}
                onChange={(e) => onChange({ status: e.target.value })}
                error={!!errors.status}
                helperText={errors.status || ""}
              >
                <MenuItem value="ACTIVE">Active</MenuItem>
                <MenuItem value="INACTIVE">Inactive</MenuItem>
              </TextField>
            ) : field === "dob" ? (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: "200px" }}
                  label="Date of Birth"
                  value={data?.dob ? dayjs(data.dob, "DD/MM/YYYY") : null}
                  onChange={handleDOBChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      name: "dob",
                      error: !!errors.dob,
                      helperText: errors.dob || "",
                    },
                  }}
                />
              </LocalizationProvider>
            ) : (
              <TextField
                fullWidth
                label={field
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (c) => c.toUpperCase())}
                name={field}
                value={data?.[field] || ""}
                onChange={handleInputChange}
                error={!!errors[field]}
                helperText={errors[field] || ""}
                inputProps={{
                  maxLength:
                    field === "contactNumber"
                      ? 10
                      : field === "pinCode"
                      ? 6
                      : 20,
                }}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default StuCommonDtlDlg;
