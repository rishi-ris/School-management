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
} from "@mui/material";
import StudentPaymentDlg from "./StudentPaymentDlg";

const StudentFeesDetails = ({ student }) => {
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paid, setPaid] = useState(parseInt(student.paid, 10));
  const [due, setDue] = useState(parseInt(student.due, 10));
  const [lastPayment, setLastPayment] = useState(null);

  if (!student) return null;

  const handlePayClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPaymentMethod("");
  };

  const handleConfirm = (amount, method) => {
    const amt = parseInt(amount, 10);
    const newPaid = paid + amt;
    const newDue = due - amt;
    setPaid(newPaid);
    setDue(newDue);
    setLastPayment({
      amount: amt,
      method,
      date: new Date().toLocaleDateString(),
    });
    setOpen(false);
    setPaymentMethod("");
  };

  return (
    <Box width="100%" >
      <Typography variant="h6" padding="20px" gutterBottom>
        Student Fees Details
      </Typography>
      <TableContainer component={Paper }>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell>{student.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Roll No</strong></TableCell>
              <TableCell>{student.roll}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Class</strong></TableCell>
              <TableCell>{student.class}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Section</strong></TableCell>
              <TableCell>{student.section || "-"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Total Fees</strong></TableCell>
              <TableCell>₹{student.total}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Paid</strong></TableCell>
              <TableCell>₹{paid}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Due</strong></TableCell>
              <TableCell>₹{due}</TableCell>
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
      <Box textAlign="right" m={2}>
        <Button variant="contained" color="primary" onClick={handlePayClick} disabled={due <= 0}>
          Pay Fees
        </Button>
      </Box>
      <StudentPaymentDlg
        open={open}
        onClose={handleClose}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        onConfirm={handleConfirm}
        student={{ ...student, paid, due }}
      />
    </Box>
  );
};

export default StudentFeesDetails;
