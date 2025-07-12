import React from "react";
import { Box, Typography, Paper, Divider, Button } from "@mui/material";

const PaymentReceipt = ({
  name = "First Student",
  className = "1 - A",
  rollNo = 1,
  totalFees = 5000,
  paidFees = 323,
  dueFees = 1886,
  amountPaid = 323,
  paymentMode = "cash",
  paymentDateTime = "12/07/2025, 22:02:19",
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Box>
     

      {/* Receipt Content */}
      <Paper
        elevation={6}
        sx={{
          maxWidth: 600,
          mx: "auto",
          my: 2,
          p: 4,
          borderRadius: 4,
          border: "2px solid #bdbdbd",
          background: "#fff",
        }}
      >
        {/* Header */}
        <Box textAlign="center" mb={3}>
          <Typography variant="h6" fontWeight="bold" color="error">
            CHANDRA SEKHAR AZAD HR. SEC SCHOOL
          </Typography>
          <Typography fontSize={14}>SEMLI KHURD SEHORE</Typography>
          <Typography fontSize={14} color="text.secondary">
            Contact: 9165918557, 9301054099
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              borderBottom: "2px solid #1976d2",
              display: "inline-block",
              px: 2,
              color: "#1976d2",
            }}
          >
            Payment Receipt
          </Typography>
        </Box>

        {/* Payment Info */}
        <Box sx={{ lineHeight: 2, fontSize: 16 }}>
          <Typography><strong>Name:</strong> {name}</Typography>
          <Typography><strong>Class:</strong> {className}</Typography>
          <Typography><strong>Roll No:</strong> {rollNo}</Typography>
          <Typography><strong>Total Fees:</strong> ₹{totalFees}</Typography>
          <Typography><strong>Paid Fees (after payment):</strong> ₹{paidFees}</Typography>
          <Typography><strong>Due Fees (after payment):</strong> ₹{dueFees}</Typography>
          <Typography><strong>Amount Paid:</strong> ₹{amountPaid}</Typography>
          <Typography><strong>Payment Mode:</strong> {paymentMode}</Typography>
          <Typography><strong>Date & Time:</strong> {paymentDateTime}</Typography>
        </Box>

        {/* Footer */}
        <Box textAlign="right" mt={6}>
          <Typography fontWeight="bold" fontSize={14}>Signature</Typography>
          <Divider sx={{ width: 120, ml: "auto", mt: 4, borderColor: "#bdbdbd" }} />
        </Box>
      </Paper>

       {/* Print Button (hidden when printing) */}
      <Box textAlign="center" my={2} sx={{ displayPrint: "none" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePrint}
        >
          Print Receipt
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentReceipt;
