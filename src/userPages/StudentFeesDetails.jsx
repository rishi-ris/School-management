import React, { useState, useEffect } from "react";
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
import Network from "../Application/Network";
import UseCommonText from "../CommonFile/UseCommonText";

const StudentFeesDetails = ({ student }) => {
  console.log("🔍 StudentFeesDetails component rendered with student:", student);
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paid, setPaid] = useState(0);
  const [due, setDue] = useState(0);
  const [lastPayment, setLastPayment] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptInfo, setReceiptInfo] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!student) return null;

  // ✅ Normalize backend student object
  const normalizedStudent = {
    studentName: student.studentName,
    fatherName: student.fatherName,
    rollNumber: student.rollNumber,
    scholarNumber: student.scholarNumber,
    className: student.className || "-",
    section: student.section || "-",
    totalFees: parseFloat(student.totalFees || 0, 10),
    paidFees: parseFloat(student.totalPaid || 0, 10),
    dueFees: parseFloat(student.dueFees || 0, 10),
  };

  // useEffect(() => {
  //   setPaid(normalizedStudent.paid);
  //   setDue(normalizedStudent.due);
  //   setLastPayment(null);
  //   setPaymentMethod("");
  //   setOpen(false);
  //   setShowReceipt(false);
  //   setReceiptInfo(null);
  //   setShowSuccess(false);
  // }, [student]);

  const handlePayClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPaymentMethod("");
  };

  const handleConfirm = async (amount, method) => {
  setOpen(false);
  setPaymentMethod("");

  const paymentPayload = {
    totalFees: student.totalFees,
    paymentMode: method,
    paymentRefNum: "",
    receivedBy: "Admin",
    paidAmount: amount,
    status: "Paid",
    studentId: student.studentId,
    paymentDate: new Date().toISOString(),
  };

  try {
    await Network.saveStudentPayment(paymentPayload);
    setReceiptInfo({
      amount,
      method,
      date: new Date().toLocaleString(),
    });
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setShowReceipt(true);
    }, 1500);
  } catch (error) {
    console.error("❌ Failed to save payment:", error);
    alert("Error saving payment. Please try again.");
  }
};


  const handleReceiptClose = () => {
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

   const headerText = UseCommonText ("--headerText");
    const addressText = UseCommonText ("--addressText");
  return (
    <Box width="100%" bgcolor="#f4f8fb"  pb={4} >
      
      <Box height="100vh" display="flex" justifyContent="center">
        <Paper
          elevation={0}
          sx={{ width: "100%", maxWidth: "100vw",  background: "#fff" }}
        >
          <Box
            textAlign="center"
            mt={0}
            p={2}
            sx={{
            backgroundColor: "var(--header-bg-color)",
            }}
          >
             <Typography
      variant="h5"
      sx={{ fontWeight: "bold", color: "white", letterSpacing: 1 }}
    >
      {headerText}
    </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "white", letterSpacing: 1 }}
            >
             {addressText}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#e3f2fd", mt: 1 }}>
              Session: 2025-2026
            </Typography>
          </Box>

          <Box px={3} pb={0} pt={0}>
            <Box>
              <Typography
                width={180}
                sx={{
                  fontWeight: "bold",
                  borderTopRightRadius: "50px",
                  borderBottomRightRadius: "50px",
                  padding: "5px",
                  mt: 2,
                  color: "white",
                  backgroundColor: "var(--header-bg-color)",
                }}
              >
                Student Fees Details
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell>{normalizedStudent.studentName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Father Name</strong></TableCell>
                    <TableCell>{normalizedStudent.fatherName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Roll No</strong></TableCell>
                    <TableCell>{normalizedStudent.rollNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Class</strong></TableCell>
                    <TableCell>{normalizedStudent.className}</TableCell>
                  </TableRow>
                  
                  <TableRow>
                    <TableCell><strong>Total Fees</strong></TableCell>
                    <TableCell>₹{normalizedStudent.totalFees}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Paid</strong></TableCell>
                    <TableCell sx={{ color: "green", fontWeight: 600 }}>
                      ₹{normalizedStudent.totalPaid}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Due</strong></TableCell>
                    <TableCell sx={{ color: due > 0 ? "red" : "green", fontWeight: 600 }}>
                      ₹{normalizedStudent.dueFees}
                    </TableCell>
                  </TableRow>
                  {lastPayment && (
                    <TableRow>
                      <TableCell colSpan={2}>
                        <Typography variant="body2" color="success.main">
                          Last Payment: ₹{lastPayment.amount} by {lastPayment.method} on {lastPayment.date}
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
                disabled={due > 0}
                sx={{ borderRadius: 2, fontWeight: 600, px: 4, py: 1, backgroundColor: "var(--button-bg-color)",}}
              >
                Pay Fees
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Payment Dialog */}
      <StudentPaymentDlg
        open={open}
        onClose={handleClose}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        onConfirm={handleConfirm}
        student={{ ...normalizedStudent, paid, due }}
      />

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Payment Successful!
        </Alert>
      </Snackbar>

      {/* Receipt Dialog */}
      {showReceipt && receiptInfo && (
        <StudentFeesReceipt
          student={{
            ...normalizedStudent,
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
