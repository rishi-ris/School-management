import React from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  Dialog,
  DialogContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import UseCommonText from "../CommonFile/UseCommonText";
const StudentFeesReceipt = ({ student, method, onClose, showPrint }) => {
  const navigate = useNavigate();
  console.log("🔍 StudentFeesReceipt component rendered with student:", student);

  const handlePrint = () => {
    navigate("/paymentReceipt", {
      state: {
        name: student.studentName,
        className: student.className,
        rollNo: student.rollNumber,
        totalFees: student.totalFees,
        paidFees: student.totalPaid,
        dueFees: student.dueFees,
        amountPaid: student.fees,
        paymentMode: method,
        dateTime: new Date().toLocaleString(),
      }
    }
      );
  };
const headerText = UseCommonText ("--headerText");
const addressText = UseCommonText ("--addressText");
const contactNumber = UseCommonText ("--contactNumber");
  return (
    <>
      <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
        <Paper
          elevation={3}
          sx={{
            p: 0,
            position: "relative",
            overflow: "hidden",
            "::before": {
              content: '""',
              position: "absolute",
              bottom: 8,
              left: 40,
              width: "90%",
              height: "100%",
              background:
                "url(ProjectIMG/chandrashekhar-azad-watermark.png.png) center center/60% no-repeat",
              opacity: 0.14,
              zIndex: 0,
              pointerEvents: "none",
            },
          }}
        >
          {/* School Navbar/Header */}
          <Box
            textAlign="center"
            py={2}
            sx={{
             backgroundColor: "var(--header-bg-color)",
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
            }}
          >
             <Typography
      variant="h5"
      sx={{ fontWeight: "bold", color: "white", letterSpacing: 1 }}
    >
      {headerText}
    </Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: "#e3f2fd", fontWeight: 500, letterSpacing: 1 }}
            >
             {addressText}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#e3f2fd",
                fontWeight: 400,
                letterSpacing: 1,
                mt: 0.5,
              }}
            >
              {contactNumber}
            </Typography>
          </Box>

          <Typography
            sx={{
              fontWeight: "bold",
              borderTopRightRadius: "50px",
              borderBottomRightRadius: "50px",
              width: "145px",
              mt: 2,
              ml: 2,
              pl: 1,
              color: "white",
           backgroundColor: "var(--header-bg-color)",
            }}
          >
            Payment Recipt
          </Typography>

          {/* Receipt Content */}
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1">
              <strong>Name:</strong> {student.studentName}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Class:</strong> {student.className}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Roll No:</strong> {student.rollNumber}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Total Fees:</strong> ₹{student.totalFees}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Paid Fees (after payment):</strong> ₹
              {parseInt(student.totalPaid || 0) + parseInt(student.fees || 0)}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Due Fees (after payment):</strong> ₹
              {parseInt(student.dueFees || 0) - parseInt(student.fees || 0)}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Amount Paid:</strong> ₹{student.fees}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Payment Mode:</strong> {method}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Date & Time:</strong> {new Date().toLocaleString()}
            </Typography>

            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" align="center" color="green">
              Payment Successful!
            </Typography>

            {/* Close/Print Buttons */}
            <Box textAlign="center" mt={3} className="no-print">
              <Button variant="contained" color="primary" onClick={onClose} sx={{ mr: 2, backgroundColor: "var(--button-bg-color)", }}>
                Close Receipt
              </Button>
              {showPrint && (
                <Button variant="outlined" color="secondary" onClick={handlePrint}>
                  Print Receipt
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      </Dialog>

      {/* Print style rule */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default StudentFeesReceipt;
