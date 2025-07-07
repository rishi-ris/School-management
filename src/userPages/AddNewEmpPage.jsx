import React, { useState } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import RoleDropdown from "../component/RoleDropdown";
import Network from "../Application/Network";

// 🟦 Initial form state (used for resetting)
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

const AddNewEmpPage = () => {
  const [form, setForm] = useState(initialFormState);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const genders = ["male", "female"];
  const statuses = ["active", "inactive"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onRolesSelect = (roleId) => {
    setForm({ ...form, roleId });
  };

  // ✅ Format date from yyyy-mm-dd to dd/MM/yyyy
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async () => {
    const payload = {
      username: form.username,
      password: form.password,
      role: {
        roleId: form.roleId?.roleId || form.roleId, // support object or ID directly
      },
      gender: form.gender,
      firstName: form.firstName,
      lastName: form.lastName,
      contactNumber: form.contactNumber,
      dOB: (form.dOB),
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
        setForm(initialFormState); // 🔄 Reset the form here
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
    <Grid container spacing={2} sx={{ marginTop: "20px" }}>
      {/* Custom Role Dropdown */}
      <Grid item xs={12} sm={6}>
        <RoleDropdown onSelect={onRolesSelect} selectedRole={form.roleId} />
      </Grid>

      {/* Dynamic Form Fields */}
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

      <Grid item xs={12}>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>

      {/* Snackbar Feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Grid>
  );
};

export default AddNewEmpPage;
