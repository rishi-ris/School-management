import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Grid, Divider, Paper } from "@mui/material";
import UseCommonText from "../CommonFile/UseCommonText";
import Network from "../Application/Network"; // 🟢 Cleaned network logic

const TcPage = () => {
  const [student, setStudent] = useState(null);
  const { id } = useParams();

  const headerText = UseCommonText("--headerText");
  const addressText = UseCommonText("--addressText");
  const contactNumber = UseCommonText("--contactNumber");
  const emailText = UseCommonText("--emailText");
  const schoolBoardAddress = UseCommonText("--schoolBoardAddress");

  useEffect(() => {
    Network.getStudentDetails(id)
      .then((data) => setStudent(data))
      .catch((error) => console.error("Error fetching student details", error));
  }, [id]);

  if (!student) return <Typography>Loading...</Typography>;

  return (
    <Paper
      elevation={6}
      sx={{
        maxWidth: 800,
        mx: "auto",
        my: 6,
        p: { xs: 2, sm: 4 },
        borderRadius: 4,
        border: "2px solid #bdbdbd",
        background: "#fff",
        position: "relative",
        overflow: "hidden",
        zIndex: 0,
        "::after": {
          content: '""',
          position: "absolute",
          top: 60,
          left: 0,
          width: "100%",
          height: "80%",
          backgroundImage: 'url("/chandrashekhar-azad-watermark.png.png")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "350px",
          opacity: 0.08,
          zIndex: -1,
        },
      }}
    >
      <Box textAlign="center" mb={2}>
        <Typography
          variant="h5"
          fontWeight="bold"
          color="error"
          letterSpacing={1}
        >
          {headerText}
        </Typography>
        <Typography fontSize={16} color="text.secondary">
          {addressText }
        </Typography>
        <Typography fontSize={15} color="text.secondary">
          {contactNumber }  
        </Typography>
         <Typography fontSize={15} color="text.secondary">
         {emailText}
        </Typography>
        <Typography fontWeight="bold" fontSize={15} color="primary.dark">
          {schoolBoardAddress }
        </Typography>
        <Divider sx={{ my: 2, borderColor: "#bdbdbd" }} />
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            display: "inline-block",
            borderBottom: "3px double #1976d2",
            px: 2,
            color: "#1976d2",
            letterSpacing: 2,
            mb: 1,
          }}
        >
          TRANSFER CERTIFICATE
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <Typography mb={1}>
  1. Name of Pupil:{" "}
  <strong>{student.firstName} {student.lastName}</strong>
</Typography>
<Typography mb={1}>
  2. Father's Name: <strong>{student.family?.[0]?.fatherName || "N/A"}</strong>
</Typography>
<Typography mb={1}>
  3. Mother's Name: <strong>{student.family?.[0]?.motherName || "N/A"}</strong>
</Typography>
<Typography mb={1}>
  4. Nationality: <strong>{student.nationality || "N/A"}</strong>
</Typography>
<Typography mb={1}>
  5. Category: <strong>{student.caste || "N/A"}</strong>
</Typography>
<Typography mb={1}>
  6. Admission Date: <strong>{student.admissionDate || "N/A"}</strong> {/* Add this field if missing */}
</Typography>
<Typography mb={1}>
  7. Date of Birth: <strong>{student.dob || "N/A"}</strong>
</Typography>

        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography mb={1}>
  8. Last Class Studied: <strong>{student.className || "N/A"} {student.section}</strong>
</Typography>
<Typography mb={1}>
  9. Exam Result: <strong>{student.result || "Pass"}</strong> {/* Add logic if needed */}
</Typography>
<Typography mb={1}>
  10. Promotion: <strong>{student.promotionReason || "Promoted"}</strong>
</Typography>
<Typography mb={1}>
  11. Total Working Days: <strong>{student.totalDays || "N/A"}</strong>
</Typography>
<Typography mb={1}>
  12. Conduct: <strong>{student.conduct || "Good"}</strong>
</Typography>

        </Grid>
      </Grid>

      <Box mt={3} mb={2}>
        <Typography variant="body1" fontSize={16}>
  This is to certify that <strong>{student.firstName}</strong> S/o/D/o{" "}
  <strong>{student.family?.[0]?.fatherName || "N/A"}</strong> &{" "}
  <strong>{student.family?.[0]?.motherName || "N/A"}</strong>, caste{" "}
  <strong>{student.caste || "N/A"}</strong>, attended this school from{" "}
  <strong>{student.admissionDate || "N/A"}</strong> to{" "}
  <strong>{student.tcDate || "N/A"}</strong>. He/She passed the exam of
  class <strong>{student.className || "N/A"}</strong> in year{" "}
  <strong>{student.passoutYear || "N/A"}</strong>.
</Typography>

        <Typography mt={2} fontSize={15} color="text.secondary">
          Date of issue: <strong>{student.tcDate || "N/A"}</strong>
        </Typography>
      </Box>

      <Grid
        container
        justifyContent="space-between"
        alignItems="flex-end"
        sx={{ mt: 6 }}
      >
        <Grid item>
          <Box textAlign="center">
            <Typography fontWeight="bold" fontSize={15}>
              Signature
            </Typography>
            <Box mt={5} />
            <Divider sx={{ width: 120, mx: "auto", borderColor: "#bdbdbd" }} />
          </Box>
        </Grid>
        <Grid item>
          <Box textAlign="center">
            <Typography fontWeight="bold" fontSize={15}>
              Principal
            </Typography>
            <Typography fontSize={14} color="text.secondary">
              {headerText || "N/A"}
            </Typography>
            <Typography fontSize={14} color="text.secondary">
              {addressText || "N/A"}
            </Typography>
            <Box mt={5} />
            <Divider sx={{ width: 120, mx: "auto", borderColor: "#bdbdbd" }} />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TcPage;
