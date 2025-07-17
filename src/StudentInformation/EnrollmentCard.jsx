import React from "react";
import { Box, Typography, Button, Divider, Avatar } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import StudentInfoTabs from "./StudentInfoTabs";
import StudentDashboard from "./StudentDashboard";

const EnrollmentCard = () => {
  return (
    <Box
      sx={{
       
        marginTop: "70px",
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <StudentDashboard />
      <Box
        sx={{
          width: 360,

          // mx: "auto",
          my: 4,
          p: 3,
          borderRadius: 3,
          boxShadow: 3,
          bgcolor: "#fff",
          textAlign: "center",
          fontFamily: "sans-serif",
        }}
      >
        {/* Profile Photo */}
        <Avatar
          src="ProjectIMG/chandrashekhar-azad-watermark.png.png" // 🔁 Replace with actual image path
          alt="Rishi Sharma"
          sx={{
            width: 100,
            height: 100,
            mx: "auto",
            mb: 2,
            border: "4px solid #0d47a1",
          }}
        />

        {/* Name */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#0d47a1", mb: 1 }}
        >
          RISHI SHARMA
        </Typography>

        {/* Course & Branch */}
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          <strong>Course:</strong> Java
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          <strong>Branch:</strong> Sehore
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Info rows */}
        {[
          { label: "Admission Session", value: "2024–2025" },
          { label: "Admission Type", value: "EPravesh" },
          { label: "Fee Status", value: "Paid", color: "green" },
          { label: "Enrollment Form Status", value: "Filled", color: "green" },
          { label: "Enrollment Fee", value: "Paid", color: "green" },
          {
            label: "Enrollment No",
            value: "241713003027",
            color: "#1b5e20",
            bold: true,
          },
        ].map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
              fontSize: "14px",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>{item.label}:</Typography>
            <Typography
              sx={{
                color: item.color || "inherit",
                fontWeight: item.bold ? "bold" : "normal",
              }}
            >
              {item.value}
            </Typography>
          </Box>
        ))}
      </Box>
      <StudentInfoTabs />
    </Box>
  );
};

export default EnrollmentCard;
