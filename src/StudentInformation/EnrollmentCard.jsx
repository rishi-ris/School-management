import { useContext, useEffect, useState } from "react";
import { Box, Typography, Button, Divider, Avatar } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import StudentInfoTabs from "./StudentInfoTabs";
import StudentDashboard from "./StudentDashboard";
import Network from "../Application/Network";
import { AuthContext } from "../auth/AuthProvider";

const EnrollmentCard = () => {
  const [data, setData] = useState(null); 
     const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log('**user.data.data.id****', user.data.studentPin)
    Network.getStudentDetails(user.data.studentPin)
      .then((res) => {
        console.log('**STU**DETAILS***', res);
        setData(res); 
      })
      .catch((err) => {
        console.error("failed to load card:", err); 
      });
  }, []);

  if (!data) return <Typography>Loading...</Typography>;

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
          src="ProjectIMG/chandrashekhar-azad-watermark.png.png"
          alt="Rishi"
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
          {data.firstName} {data.lastName}
        </Typography>

        {/* Course & Branch */}
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          <strong>Course:</strong> {data.course || "Java"}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          <strong>Branch:</strong> {data.branch || "Sehore"}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Info rows */}
        {[
          { label: "Admission Session", value: data.admissionSession || "2024–2025" },
          { label: "Admission Type", value: data.admissionType || "EPravesh" },
          { label: "Fee Status", value: data.feeStatus || "Paid", color: "green" },
          { label: "Enrollment Form Status", value: "Filled", color: "green" },
          { label: "Enrollment Fee", value: "Paid", color: "green" },
          {
            label: "Enrollment No",
            value: data.enrollmentNumber || "241713003027",
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

      <StudentInfoTabs
      studentDetails={data} />
    </Box>
  );
};

export default EnrollmentCard;
