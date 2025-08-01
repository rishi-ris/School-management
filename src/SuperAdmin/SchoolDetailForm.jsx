import React, { useState } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Snackbar,
  Alert,
  Box,
  Typography,
  Divider,
  Paper,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import Network from "../Application/Network";
import AddNewEmpPage from "../userPages/AddNewEmpPage";
import { useTheme, useMediaQuery } from "@mui/material";

const initialFormState = {

  schoolName: "",
  registrationNumber: "",
  schoolCode: "",
  boardAffiliation: "",
  affiliationNumber: "",
  establishedYear: "",
  type: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  district: "",
  state: "",
  pinCode: "",
  country: "India",
  contactNumber: "",
  email: "",
  website: "",
  principalName: "",
  principalContact: "",
  logo: null,
  schoolMotto: "",
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

const SchoolDetailsForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [response, setSavedResponse] = useState({})
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const schoolTypes = [
    "Public",
    "Private",
    "Government-aided",
    "International",
  ];
  const boardTypes = ["CBSE", "ICSE", "State Board", "IB", "Other"];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") {
      setFormData({ ...formData, logo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    const requiredFields = [
      "schoolName",
      "registrationNumber",
      "schoolCode",
      "boardAffiliation",
      "type",
      "addressLine1",
      "city",
      "district",
      "state",
      "pinCode",
      "contactNumber",
      "email",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].toString().trim() === "") {
        newErrors[field] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) =>
        formDataToSend.append(key, formData[key])
      );

      const resp = await Network.createSchool(formDataToSend);
      console.log('SAVEDID', resp.id);
      setSavedResponse(resp);
      setSnackbar({
        open: true,
        message: "School details submitted successfully!",
        severity: "success",
      });
      setFormData(initialFormState);
      setErrors({});
    } catch (err) {
      console.error("Error submitting school details:", err);
      setSnackbar({
        open: true,
        message: "Failed to submit school details.",
        severity: "error",
      });
    }
  };

  // function to render fields with responsive width
  const renderFields = (fields) => (
    <Grid
      container
      spacing={2}
      sx={{ justifyContent: { xs: "center", sm: "flex-start" } }}
    >
      {fields.map(({ name, label, select, options, type }) => (
        <Grid
          item
          key={name}
          sx={{
            width: { xs: "100%", sm: "245px" },
            flexGrow: { xs: 1, sm: 0 },
          }}
        >
          <TextField
            fullWidth
            label={label}
            name={name}
            type={type || "text"}
            value={formData[name]}
            onChange={handleChange}
            select={!!select}
            error={Boolean(errors[name])}
            helperText={errors[name]}
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#1976d2" },
                "&.Mui-focused fieldset": { borderColor: "#42a5f5" },
              },
            }}
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
    </Grid>
  );

  const sections = [
    {
      title: "Basic Info",
      fields: [
        { name: "schoolName", label: "School Name" },
        { name: "registrationNumber", label: "Registration Number" },
        { name: "schoolCode", label: "School Code" },
        {
          name: "boardAffiliation",
          label: "Board Affiliation",
          select: true,
          options: boardTypes,
        },
        { name: "affiliationNumber", label: "Affiliation Number" },
        { name: "establishedYear", label: "Established Year", type: "number" },
        {
          name: "type",
          label: "School Type",
          select: true,
          options: schoolTypes,
        },
      ],
    },
    {
      title: "Address",
      fields: [
        { name: "addressLine1", label: "Address Line 1" },
        { name: "addressLine2", label: "Address Line 2" },
        { name: "city", label: "City" },
        { name: "district", label: "District" },
        { name: "state", label: "State" },
        { name: "pinCode", label: "Pin Code", type: "number" },
        { name: "country", label: "Country" },
      ],
    },
    {
      title: "Contact",
      fields: [
        { name: "contactNumber", label: "Contact Number" },
        { name: "email", label: "Email", type: "email" },
        { name: "website", label: "Website" },
      ],
    },
    {
      title: "Principal",
      fields: [
        { name: "principalName", label: "Principal Name" },
        { name: "principalContact", label: "Principal Contact" },
      ],
    },
    {
      title: "Other",
      fields: [{ name: "schoolMotto", label: "School Motto" }],
    },
  ];

  return (
    <>
      {
        response.id ? 
     

      <Box sx={{ mt: 4 }}><AddNewEmpPage schoolRespose={response}/></Box> : 

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: { xs: "95%", sm: "90%", md: "80%", lg: "65%" },
          margin: "auto",
          mt: { xs: 4, md: 6 },
          mb: 4,
          animation: `${fadeInUp} 0.8s ease-out`,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#333", mb: 3 }}
        >
          School Details
        </Typography>

        {sections.map((sec, i) => (
          <Paper
            key={i}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              background: "linear-gradient(to right,#fdfdfd,#f7f7f7)",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#444", mb: 2 }}
            >
              {sec.title}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {renderFields(sec.fields)}
          </Paper>
        ))}

        <Paper
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            background: "linear-gradient(to right,#fdfdfd,#f7f7f7)",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#444", mb: 2 }}
          >
            Upload Logo
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box
            sx={{
              border: "2px dashed #aaa",
              borderRadius: 2,
              p: 2,
              textAlign: "center",
              backgroundColor: "#fafafa",
              "&:hover": { backgroundColor: "#f0f0f0" },
              cursor: "pointer",
            }}
          >
            <Button variant="text" component="label" fullWidth>
              Click or Drag to Upload Logo
              <input
                type="file"
                hidden
                name="logo"
                accept="image/*"
                onChange={handleChange}
              />
            </Button>
            {formData.logo && typeof formData.logo === "object" && (
              <Typography sx={{ mt: 1 }}>
                Selected file: {formData.logo.name}
              </Typography>
            )}
          </Box>
        </Paper>

        <Box sx={{ textAlign: "center" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              mb: "10px",
              px: 5,
              py: 1.5,
              borderRadius: 3,
              fontWeight: "bold",
              textTransform: "none",
              background: "linear-gradient(45deg, #42a5f5, #1e88e5)",
              boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
              "&:hover": {
                transform: "scale(1.05)",
                background: "linear-gradient(45deg, #1e88e5, #42a5f5)",
              },
            }}
          >
            Submit
          </Button>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{
            vertical: isMobile ? "center" : "top",
            horizontal: "center",
          }}
        >
          <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>
      </Box>

}
    </>
  );
};

export default SchoolDetailsForm;