import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import StudentPaymentDlg from "./StudentPaymentDlg";
import StudentFeesReceipt from "./StudentFeesRecipt";

const StudentFeesDetails = ({ student }) => {
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paid, setPaid] = useState(parseInt(student.paid, 10));
  const [due, setDue] = useState(parseInt(student.due, 10));
  const [lastPayment, setLastPayment] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptInfo, setReceiptInfo] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  React.useEffect(() => {
    setPaid(parseInt(student.paid, 10));
    setDue(parseInt(student.due, 10));
    setLastPayment(null);
    setPaymentMethod("");
    setOpen(false);
    setShowReceipt(false);
    setReceiptInfo(null);
    setShowSuccess(false);
  }, [student]);

  if (!student) return null;

  const handlePayClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPaymentMethod("");
  };

  const handleConfirm = (amount, method) => {
    setOpen(false);
    setPaymentMethod("");
    setReceiptInfo({
      amount,
      method,
      date: new Date().toLocaleString(),
    });
    setShowSuccess(true);
    // After 1.5s, show the receipt
    setTimeout(() => {
      setShowSuccess(false);
      setShowReceipt(true);
    }, 1500);
  };

  const handleReceiptClose = () => {
    // Update paid/due only after receipt is closed
    if (receiptInfo) {
      const amt = parseInt(receiptInfo.amount, 10);
      const newPaid = paid + amt;
      const newDue = due - amt;
      setPaid(newPaid);
      setDue(newDue);
      setLastPayment({
        amount: amt,
        method: receiptInfo.method,
        date: receiptInfo.date,
      });
    }
    setShowReceipt(false);
    setReceiptInfo(null);
  };

  return (
    <Box width="100%" bgcolor="#f4f8fb" minHeight="100vh" pb={4}>
      <Box height="100vh" display="flex" justifyContent="center">
        <Paper
          elevation={0}
          sx={{ width: "100%", maxWidth: "100vw", background: "#fff" }}
        >
          {/* Merged header and table */}
          <Box
            textAlign="center"
            mt={0}
            p={2}
            sx={{
              background: "linear-gradient(90deg, #1976D2 60%, #42a5f5 100%)",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "white", letterSpacing: 1 }}
            >
              CHANDRA SEKHAR AZAD HR. SEC SCHOOL
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "white", letterSpacing: 1 }}
            >
              SEMLI KHURD SEHORE
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#e3f2fd", mt: 1 }}>
              Session: 2024-2025
            </Typography>
          </Box>
          <Box px={3} pb={0} pt={0}>
            <Box>
              <Typography
                width={180}
                sx={{
                  fontWeight: 600,
                  fontWeight: "bold",
                  borderTopRightRadius: "50px",
                  borderBottomRightRadius: "50px",
                  padding: "5px",
                  mt: 2,
                  color: "white",
                  backgroundColor: "#1976D2",
                }}
              >
                Student Fees Details
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <strong>Name</strong>
                    </TableCell>
                    <TableCell>{student.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Roll No</strong>
                    </TableCell>
                    <TableCell>{student.roll}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Class</strong>
                    </TableCell>
                    <TableCell>{student.class}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Section</strong>
                    </TableCell>
                    <TableCell>{student.section || "-"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Total Fees</strong>
                    </TableCell>
                    <TableCell>₹{student.total}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Paid</strong>
                    </TableCell>
                    <TableCell sx={{ color: "green", fontWeight: 600 }}>
                      ₹{paid}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Due</strong>
                    </TableCell>
                    <TableCell
                      sx={{ color: due > 0 ? "red" : "green", fontWeight: 600 }}
                    >
                      ₹{due}
                    </TableCell>
                  </TableRow>
                  {lastPayment && (
                    <TableRow>
                      <TableCell colSpan={2}>
                        <Typography variant="body2" color="success.main">
                          Last Payment: ₹{lastPayment.amount} by{" "}
                          {lastPayment.method} on {lastPayment.date}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Box textAlign="right" mt={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePayClick}
                disabled={due <= 0}
                sx={{ borderRadius: 2, fontWeight: 600, px: 4, py: 1 }}
              >
                Pay Fees
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
      <StudentPaymentDlg
        open={open}
        onClose={handleClose}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        onConfirm={handleConfirm}
        student={{ ...student, paid, due }}
      />
      <Snackbar
        open={showSuccess}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Payment Successful!
        </Alert>
      </Snackbar>
      {showReceipt && receiptInfo && (
        <StudentFeesReceipt
          student={{
            ...student,
            fees: receiptInfo.amount,
            paid: paid + parseInt(receiptInfo.amount, 10),
            due: due - parseInt(receiptInfo.amount, 10),
          }}
          method={receiptInfo.method}
          onClose={handleReceiptClose}
          showPrint={true}
        />
      )}
    </Box>
  );
};

export default StudentFeesDetails;
