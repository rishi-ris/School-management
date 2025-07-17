import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
  Paper,
  useTheme,
} from "@mui/material";

const TabPanel = ({ value, index, children }) => {
  return value === index && <Box sx={{ p: 2 }}>{children}</Box>;
};

const InfoItem = ({ label, value }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2,
      borderRadius: 2,
      bgcolor: "#f9f9f9",
      fontSize: "14px",
      fontWeight: "bold",
    }}
  >
    <Typography sx={{ color: "#0d47a1" }}>{label}:</Typography>
    <Typography sx={{ fontWeight: "normal", mt: 0.5 }}>{value}</Typography>
  </Paper>
);

const StudentInfoTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const theme = useTheme();

  // 🔴 Optional: Store API response if needed
  const [apiData, setApiData] = useState(null);

  // ✅ Call API on tab change or on first render
  useEffect(() => {
    axios
      .get("http://localhost:8080/marksheets/evaluate/1")
      .then((res) => {
        console.log("📦 API Response:", res.data);
        setApiData(res.data); // Optional: store if you want to use it
      })
      .catch((err) => {
        console.error("❌ API Error:", err);
      });
  }, [tabIndex]); // 👈 called every time tabIndex changes

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box
      sx={{
        p: 3,
        width: 750,
        bgcolor: "#f1f4f9",
        borderRadius: 2,
       
      
        height: "100%",
       
      }}
    >
      {/* Tabs */}
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        textColor="primary"
        indicatorColor="primary"
        sx={{
          bgcolor: "#e3eaf2",
          borderRadius: 1,
          mb: 2,
          "& .Mui-selected": {
            fontWeight: "bold",
            bgcolor: "#fff",
            borderRadius: 1,
          },
        }}
      >
        <Tab label="Personal Info" />
        <Tab label="Professional Info" />
        <Tab label="Academic Info" />
        <Tab label="Documents" />
      </Tabs>

      {/* Personal Info Tab */}
      <TabPanel value={tabIndex} index={0}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <InfoItem label="Class" value="10th A" />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Role" value="Student" />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Username" value="rishi-ris" />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Password" value="********" />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Gender" value="Male" />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Roll No" value="24" />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Scholar No" value="2024SCH123" />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="First Name" value="Rishi" />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Last Name" value="Sharma" />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Contact Number" value="9876543210" />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="DOB" value="2006-08-15" />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Address" value="123 School Lane" />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="City" value="Delhi" />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="State" value="Delhi" />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Pincode" value="110001" />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Country" value="India" />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Status" value="Active" />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Fees Discount" value="15%" />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Total Fees" value="₹50,000" />
          </Grid>
        </Grid>
      </TabPanel>

      {/* Placeholder Panels */}
      <TabPanel value={tabIndex} index={1}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <InfoItem label="Department" value="Science" />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Job Title" value="Student Intern" />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Experience" value="0 Years" />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Working Shift" value="Morning" />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Employee Type" value="Full-Time" />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Joining Date" value="2022-06-01" />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Reporting Manager" value="Mr. Sharma" />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Work Location" value="School Campus" />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Official Email" value="rishi@school.edu" />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Previous School" value="Sunrise Public School" />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Employment Status" value="Active" />
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabIndex} index={2}>
        <Box>
          <Typography sx={{ fontWeight: "bold" }}>1st</Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={4}>
              <InfoItem label="School" value="School......." />
            </Grid>
            <Grid item xs={12} md={4}>
              <InfoItem label="Board" value="MP Board" />
            </Grid>
            <Grid item xs={12} md={4}>
              <InfoItem label="Passing Year" value="2022" />
            </Grid>
            <Grid item xs={12} md={4}>
              <InfoItem label="Max. Marks" value="500" />
            </Grid>
            <Grid item xs={12} md={4}>
              <InfoItem label="Marks Obtained" value="314" />
            </Grid>
            <Grid item xs={12} md={4}>
              <InfoItem label="Percentage" value="62.80%" />
            </Grid>
            <Grid item xs={12} md={4}>
              <InfoItem label="Roll No" value="00000604" />
            </Grid>
          </Grid>

          <Typography sx={{ fontWeight: "bold", mt: 2 }}>2nd</Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={4}>
              <InfoItem label="School" value="Govt HS School Bareli MP" />
            </Grid>
            <Grid item xs={12} md={4}>
              <InfoItem label="Board" value="MP Board " />
            </Grid>
            <Grid item xs={12} md={4}>
              <InfoItem label="Passing Year" value="2024" />
            </Grid>
            <Grid item xs={12} md={4}>
              <InfoItem label="Max. Marks" value="500" />
            </Grid>
            <Grid item xs={12} md={4}>
              <InfoItem label="Marks Obtained" value="286" />
            </Grid>
            <Grid item xs={12} md={4}>
              <InfoItem label="Percentage" value="57.20%" />
            </Grid>
            <Grid item xs={12} md={4}>
              <InfoItem label="Roll No" value="246531929" />
            </Grid>
          </Grid>
        </Box>
      </TabPanel>

      <TabPanel value={tabIndex} index={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <InfoItem label="Aadhaar Card" value="Submitted" />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoItem label="Birth Certificate" value="Submitted" />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoItem label="10th Marksheet" value="Submitted" />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoItem label="12th Marksheet" value="Submitted" />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoItem label="Caste Certificate" value="Not Submitted" />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoItem label="Transfer Certificate" value="Submitted" />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoItem label="Passport Size Photo" value="Submitted" />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoItem label="Signature" value="Submitted" />
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default StudentInfoTabs;
