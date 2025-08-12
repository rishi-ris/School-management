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

const StudentInfoTabs = (props) => {
  console.log("props*", props.studentDetails);
  const [tabIndex, setTabIndex] = useState(0);
  const [studentDetails, setStudentDetails] = useState(props.studentDetails);
  const theme = useTheme();

  // 🔴 Optional: Store API response if needed
  const [apiData, setApiData] = useState(null);

  // ✅ Call API on tab change or on first render
  useEffect(() => {
    axios
      .get("http://192.168.1.6:8080/marksheets/evaluate/1")
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
            <InfoItem label="Class" value={studentDetails.className} />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Role" value="Student" />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Username" value={studentDetails.username} />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Password" value={studentDetails.password} />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Gender" value={studentDetails.gender} />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Roll No" value={studentDetails.rollNumber} />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Scholar No" value={studentDetails.scholarNumber} />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="First Name" value={studentDetails.firstName} />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Last Name" value={studentDetails.lastName} />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem
              label="Contact Number"
              value={studentDetails.contactNumber}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="DOB" value={studentDetails.dob} />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Address" value={studentDetails.address} />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="City" value={studentDetails.city} />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="State" value={studentDetails.state} />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Pincode" value={studentDetails.pinCode} />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Country" value={studentDetails.country} />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Status" value={studentDetails.status} />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem
              label="Fees Discount"
              value={studentDetails.feesDiscount}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <InfoItem label="Total Fees" value={studentDetails.totalFees} />
          </Grid>
        </Grid>
      </TabPanel>
      {/* Placeholder Panels */}
      <TabPanel value={tabIndex} index={1}>
        <Grid container spacing={2}>
  <Grid item xs={12} md={4}>
    <InfoItem
      label="Student Photo"
      value={
        studentDetails?.photos?.studentPhoto || studentDetails?.documentsList?.some(doc => doc.docType === "studentPhoto")
          ? "Submitted"
          : "Not Submitted"
      }
    />
  </Grid>
  <Grid item xs={12} md={4}>
    <InfoItem
      label="Father Photo"
      value={
        studentDetails?.photos?.fatherPhoto || studentDetails?.documentsList?.some(doc => doc.docType === "fatherPhoto")
          ? "Submitted"
          : "Not Submitted"
      }
    />
  </Grid>
  <Grid item xs={12} md={4}>
    <InfoItem
      label="Mother Photo"
      value={
        studentDetails?.photos?.motherPhoto || studentDetails?.documentsList?.some(doc => doc.docType === "motherPhoto")
          ? "Submitted"
          : "Not Submitted"
      }
    />
  </Grid>
  <Grid item xs={12} md={4}>
    <InfoItem
      label="Guardian Photo"
      value={
        studentDetails?.photos?.guardianPhoto || studentDetails?.documentsList?.some(doc => doc.docType === "guardianPhoto")
          ? "Submitted"
          : "Not Submitted"
      }
    />
  </Grid>
</Grid>

      </TabPanel>
      
      <TabPanel value={tabIndex} index={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <InfoItem label="Transfer Certificate" value="Submitted" />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoItem label="Migration Certificate" value="Submitted" />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoItem label="Character Certificate" value="Submitted" />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoItem label="Previous Marksheet" value="Submitted" />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoItem label="Admission Form" value="Submitted" />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={tabIndex} index={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <InfoItem label="Aadhar Card" value="Submitted" />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoItem label="Pan Card" value="Submitted" />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoItem label="Sssmid" value="Submitted" />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoItem label="Caste Certificate" value="Submitted" />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoItem label="Income Certificate" value="Submitted" />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoItem label="Domicile Certificate" value="Submitted" />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoItem label="Disability Certificate" value="Submitted" />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoItem label="Ration Card" value="Submitted" />
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoItem label="Passbook" value="Submitted" />
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default StudentInfoTabs;