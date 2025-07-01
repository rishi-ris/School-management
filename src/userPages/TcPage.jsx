import React from "react";
import {
  Box,
  Typography,
  Grid,
  Divider,
  Paper,
} from "@mui/material";

const TcPage = () => {
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
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        position: "relative",
        overflow: "hidden",
        background: "#fff",
        zIndex: 0,
        '::after': {
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
      {/* Header */}
      <Box textAlign="center" mb={2}>
        <Typography variant="h5" fontWeight="bold" color="error" letterSpacing={1}>
          CHANDRA SHEKHAR AZAD HIGHER SECONDARY SCHOOL
        </Typography>
        <Typography fontSize={16} color="text.secondary">
          Jakhakhedi Jod, Distt. – Sehore (M.P.) – 466001
        </Typography>
        <Typography fontSize={15} color="text.secondary">
          Mobile : 9165918557, 9301054099 | Email: ChandraShekharAzad2003@gmail.com
        </Typography>
        <Typography fontWeight="bold" fontSize={15} color="primary.dark">
          Affiliated to M.P. Board of Secondary Education
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

      {/* Main Details */}
      <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <Typography mb={1}>1. Name of Pupil: <strong>AZAAN</strong></Typography>
          <Typography mb={1}>2. Father's Name: <strong>RIZWAN KHAN</strong></Typography>
          <Typography mb={1}>3. Mother's Name: <strong>SHABANA</strong></Typography>
          <Typography mb={1}>4. Nationality: <strong>INDIAN</strong></Typography>
          <Typography mb={1}>5. Category: <strong>GEN</strong></Typography>
          <Typography mb={1}>6. Admission Date: <strong>01/07/2024 (12TH)</strong></Typography>
          <Typography mb={1}>7. Date of Birth: <strong>06/11/2007</strong></Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography mb={1}>8. Last Class Studied: <strong>12TH</strong></Typography>
          <Typography mb={1}>9. Exam Result: <strong>PASS</strong></Typography>
          <Typography mb={1}>10. Promotion: <strong>HIGHER EDUCATION</strong></Typography>
          <Typography mb={1}>11. Total Working Days: <strong>201</strong></Typography>
          <Typography mb={1}>12. Conduct: <strong>GOOD</strong></Typography>
        </Grid>
      </Grid>

      {/* Footer Section */}
      <Box mt={3} mb={2}>
        <Typography variant="body1" fontSize={16}>
          This is to certify that <strong>AZAAN</strong> S/o/D/o <strong>RIZWAN KHAN</strong> & <strong>SHABANA</strong>,
          caste <strong>GEN</strong>, attended this school from <strong>01/07/2024</strong> to <strong>30/04/2025</strong>.
          He/She passed the exam of class <strong>12TH</strong> in year <strong>2025</strong>.
        </Typography>
        <Typography mt={2} fontSize={15} color="text.secondary">
          Date of issue: <strong>20/06/2025</strong>
        </Typography>
      </Box>

      {/* Signatures */}
      <Grid container justifyContent="space-between" alignItems="flex-end" sx={{ mt: 6 }}>
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
              Chandra Shekhar Azad School
            </Typography>
            <Typography fontSize={14} color="text.secondary">
              Semli Khurd, Sehore – 642140
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

