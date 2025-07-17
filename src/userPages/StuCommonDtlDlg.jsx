import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Paper,
  Typography,
  Divider,
  MenuItem,
} from "@mui/material";
import ClassDropDown from "../component/ClassDropDown";
import RoleDropdown from "../component/RoleDropdown";
import Network from "../Application/Network"; // Make sure this has getAllRoles()

const StuCommonDtlDlg = ({
  data,
  onChange,
  onClassSelect,
  onRoleSelect,
  errors = {},
  setErrors,
}) => {
  const [touched, setTouched] = useState({});

  // Set student role automatically on mount
  useEffect(() => {
    const fetchStudentRole = async () => {
      try {
        const res = await Network.getAllRoles();
        const studentRole = res?.data?.find(
          (role) => role.name?.toLowerCase() === "student"
        );
        if (studentRole) {
          onRoleSelect({ roleId: studentRole.id });
        }
      } catch (err) {
        console.error("Error fetching roles:", err);
      }
    };
    fetchStudentRole();
  }, [onRoleSelect]);

  const requiredCommonFields = [
    "username", "password", "gender", "rollNumber", "scholarNumber",
    "firstName", "lastName", "contactNumber", "address",
    "city", "state", "pinCode", "country", "status",
    "feesDiscount", "totalFees",
  ];

  const numericFields = [
    "rollNumber", "contactNumber", "scholarNumber", "pinCode", "feesDiscount", "totalFees"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const isNumeric = numericFields.includes(name);
    let cleanValue = value;

    if (isNumeric) {
      cleanValue = value.replace(/[^0-9]/g, "");
      if (name === "contactNumber") {
        cleanValue = cleanValue.slice(0, 10);
      } else if (name === "pinCode") {
        cleanValue = cleanValue.slice(0, 6);
      } else {
        cleanValue = cleanValue.slice(0, 20);
      }
    } else {
      cleanValue = value.slice(0, 20);
    }

    setTouched((prev) => ({ ...prev, [name]: true }));

    // Contact number validation
    if (name === "contactNumber") {
      if (cleanValue.length !== 10) {
        setErrors?.((prev) => ({ ...prev, [name]: "Only use 10 digits" }));
      } else if (!/^[6-9]/.test(cleanValue)) {
        setErrors?.((prev) => ({
          ...prev,
          [name]: "You can use only numbers starting with 6, 7, 8 or 9",
        }));
      } else {
        if (
          errors[name] === "Only use 10 digits" ||
          errors[name] === "You can use only numbers starting with 6, 7, 8 or 9"
        ) {
          setErrors?.((prev) => {
            const newErr = { ...prev };
            delete newErr[name];
            return newErr;
          });
        }
      }
    }

    // Pincode validation
    if (name === "pinCode") {
      if (cleanValue.length !== 6) {
        setErrors?.((prev) => ({ ...prev, [name]: "Only use 6 digits" }));
      } else if (errors[name] === "Only use 6 digits") {
        setErrors?.((prev) => {
          const newErr = { ...prev };
          delete newErr[name];
          return newErr;
        });
      }
    }

    // Max length
    if (cleanValue.length > 20) {
      setErrors?.((prev) => ({ ...prev, [name]: "Maximum 20 characters allowed" }));
      return;
    } else if (errors[name] === "Maximum 20 characters allowed") {
      setErrors?.((prev) => {
        const newErr = { ...prev };
        delete newErr[name];
        return newErr;
      });
    }

    onChange({ [name]: cleanValue });
  };

  const handleClassSelect = (cls) => {
    onClassSelect({ classId: cls });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Common Details
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2}>
        {/* Class Dropdown */}
        <Grid item xs={12} sm={6} sx={{ minWidth: 200 }}>
          <ClassDropDown
            selectedClassId={data?.classId || ""}
            onSelect={handleClassSelect}
            value={data?.classId || ""}
          />
        </Grid>

        {/* RoleDropdown is hidden since we auto-select student */}
        {/* You can keep this for debugging:
        <Grid item xs={12} sm={6} sx={{ minWidth: 200 }}>
          <RoleDropdown
            selectedRoleId={data?.roleId || ""}
            onSelect={(role) => onRoleSelect({ roleId: role })}
            value={data?.roleId || ""}
          />
        </Grid> */}

        {/* Other Fields */}
        {requiredCommonFields.map((field) => (
          <Grid item xs={12} sm={6} key={field}>
            {field === "gender" ? (
              <TextField
                select
                fullWidth
                sx={{ minWidth: 200 }}
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
            ) : (
              <TextField
                fullWidth
                sx={{ minWidth: 200 }}
                label={field
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (c) => c.toUpperCase())}
                name={field}
                value={data?.[field] || ""}
                onChange={handleInputChange}
                error={!!errors[field]}
                helperText={errors[field] || ""}
                inputProps={{
                  inputMode: numericFields.includes(field) ? "numeric" : "text",
                  pattern: numericFields.includes(field) ? "\\d*" : undefined,
                  maxLength:
                    field === "contactNumber"
                      ? 10
                      : field === "pinCode"
                      ? 6
                      : 20,
                }}
                onKeyPress={
                  numericFields.includes(field)
                    ? (e) => {
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }
                    : undefined
                }
              />
            )}
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default StuCommonDtlDlg;
