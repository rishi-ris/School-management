import React, { useState } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import RoleDropdown from "../component/RoleDropdown";
import Network from "../Application/Network";
import Sidekick from "../component/Sidekick";

const initialFormState = {
  username: "",
  password: "",
  roleId: "",
  gender: "",
  firstName: "",
  lastName: "",
  contactNumber: "",
  dOB: "",
  address: "",
  city: "",
  state: "",
  pinCode: "",
  country: "",
  status: "",
};

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AddNewEmpPage = () => {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const genders = ["male", "female"];
  const statuses = ["active", "inactive"];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contactNumber" && !/^\d{0,10}$/.test(value)) return;
    if (name === "pinCode" && !/^\d{0,6}$/.test(value)) return;
    if ((name === "firstName" || name === "lastName") && /[^a-zA-Z\s]/.test(value)) return;
    if (value.length > 20) return;

    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const onRolesSelect = (roleId) => {
    setForm({ ...form, roleId });
    setErrors({ ...errors, roleId: "" });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const validate = () => {
    const newErrors = {};
    const requiredFields = Object.keys(initialFormState);

    requiredFields.forEach((field) => {
      if (!form[field] || (typeof form[field] === "string" && form[field].trim() === "")) {
        newErrors[field] = "This field is required";
      }
    });

    if (!/^[6-9]\d{9}$/.test(form.contactNumber)) {
      newErrors.contactNumber = "Must be 10 digits and start with 6-9";
    }

    if (!/^\d{6}$/.test(form.pinCode)) {
      newErrors.pinCode = "Must be 6 digit number";
    }

    if (!/^[a-zA-Z\s]+$/.test(form.firstName)) {
      newErrors.firstName = "Only alphabets allowed";
    }

    if (!/^[a-zA-Z\s]+$/.test(form.lastName)) {
      newErrors.lastName = "Only alphabets allowed";
    }

    if (!form.roleId) {
      newErrors.roleId = "Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = {
      username: form.username,
      password: form.password,
      role: {
        roleId: form.roleId?.roleId || form.roleId,
      },
      gender: form.gender,
      firstName: form.firstName,
      lastName: form.lastName,
      contactNumber: form.contactNumber,
      dOB: formatDate(form.dOB),
      address: form.address,
      city: form.city,
      state: form.state,
      pinCode: form.pinCode,
      country: form.country,
      status: form.status,
      createdBy: "system",
    };

    try {
      const response = await Network.addNewUser(payload);
      if (response.status === 200 || response.status === 201) {
        setSnackbar({
          open: true,
          message: "User created successfully!",
          severity: "success",
        });
        setForm(initialFormState);
        setErrors({});
      } else {
        setSnackbar({
          open: true,
          message: "Failed to create user.",
          severity: "error",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "API Error: " + error.message,
        severity: "error",
      });
    }
  };

  const formFields = [
    { name: "username", label: "Username" },
    { name: "password", label: "Password", type: "password" },
    { name: "gender", label: "Gender", select: true, options: genders },
    { name: "firstName", label: "First Name" },
    { name: "lastName", label: "Last Name" },
    { name: "contactNumber", label: "Contact Number" },
    { name: "dOB", label: "D O B", type: "date" },
    { name: "address", label: "Address" },
    { name: "city", label: "City" },
    { name: "state", label: "State" },
    { name: "pinCode", label: "Pin Code" },
    { name: "country", label: "Country" },
    { name: "status", label: "Status", select: true, options: statuses },
  ];

  return (
    <>
      <Sidekick />
      <Box
        sx={{
          maxWidth: "65%",
          margin: "auto",
          mt: 15,
          height: "400px",
          p: 3,
          borderRadius: 2,
          boxShadow: 8,
          backgroundColor: "#eeebebff",
          animation: `${fadeInUp} 0.8s ease-out`,
        }}
      >
        <Grid container spacing={2} sx={{ marginTop: "20px" }}>
          {/* Role Dropdown */}
          <Grid item xs={12} sm={6} sx={{ width: "200px" }}>
            <RoleDropdown onSelect={onRolesSelect} selectedRole={form.roleId} />
            {errors.roleId && (
              <span style={{ color: "red", fontSize: "12px" }}>{errors.roleId}</span>
            )}
          </Grid>

          {/* Form Fields */}
          {formFields.map(({ name, label, select, options, type }) => (
            <Grid item xs={12} sm={6} key={name}>
              <TextField
                sx={{ width: "200px" }}
                fullWidth
                label={label}
                name={name}
                type={type === "date" ? "date" : type || "text"}
                value={form[name]}
                onChange={handleChange}
                InputLabelProps={type === "date" ? { shrink: true } : {}}
                select={!!select}
                error={Boolean(errors[name])}
                helperText={errors[name]}
              >
                {select &&
                  options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
          ))}

          {/* Submit Button */}
          <Grid item xs={12} sx={{ fontWeight: "bold", fontSize: "40px" }}>
           <Button
                         variant="contained"
                         onClick={handleSubmit}
                         sx={{
                           backgroundColor: "var(--button-bg-color)",
                           mb: "10px",
                           height: "55px",
                           width: "200px",
                           fontWeight: "bold",
                           textTransform: "none",
                           "&:hover": {
                             transform: "scale(1.03)", // optional subtle zoom effect
                           },
                         }}
                       >
                         Add Subject
                       </Button>
          </Grid>
        </Grid>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default AddNewEmpPage;
