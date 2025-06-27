import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Typography,
  Box,
} from "@mui/material";

const StudentPaymentDlg = ({ open, onClose, paymentMethod, setPaymentMethod, onConfirm, student }) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const due = student ? parseInt(student.due, 10) : 0;
  const paid = student ? parseInt(student.paid, 10) : 0;
  const total = student ? parseInt(student.total, 10) : 0;
  const entered = amount ? parseInt(amount, 10) : 0;
  const remaining = due - entered >= 0 ? due - entered : due;

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setError("");
  };

  const handleConfirm = () => {
    if (!amount || entered <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    if (entered > due) {
      setError("Amount exceeds due fees");
      return;
    }
    setError("");
    onConfirm(entered, paymentMethod);
    setAmount("");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Pay Student Fees</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Typography variant="body2">
            <b>Due Fees:</b> ₹{due}
          </Typography>
          <Typography variant="body2">
            <b>Paid Fees:</b> ₹{paid}
          </Typography>
          <Typography variant="body2">
            <b>Total Fees:</b> ₹{total}
          </Typography>
        </Box>
        <TextField
          label="Amount to Pay"
          type="number"
          fullWidth
          value={amount}
          onChange={handleAmountChange}
          inputProps={{ min: 1, max: due }}
          error={!!error}
          helperText={error}
          sx={{ mb: 2 }}
        />
        <Typography variant="body2" sx={{ mb: 2 }}>
          <b>Remaining Due after Payment:</b> ₹{remaining}
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel value="netbanking" control={<Radio />} label="Net Banking" />
            <FormControlLabel value="cash" control={<Radio />} label="Cash" />
            <FormControlLabel value="upi" control={<Radio />} label="UPI" />
            <FormControlLabel value="card" control={<Radio />} label="Debit/Credit Card" />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleConfirm}>
          Confirm Payment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentPaymentDlg;
