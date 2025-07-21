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

const StudentPaymentDlg = ({
  open,
  onClose,
  paymentMethod,
  setPaymentMethod,
  onConfirm,
  student,
}) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [methodError, setMethodError] = useState("");

  const due = student ? parseFloat(student.dueFees, 10) : 0;
  const paid = student ? parseFloat(student.totalPaid, 10) : 0;
  const total = student ? parseFloat(student.totalFees, 10) : 0;
  const entered = amount ? parseFloat(amount, 10) : 0;
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
    if (!paymentMethod) {
      setMethodError("Please select a payment method");
      return;
    }
    if (entered > due) {
      setError("Amount exceeds due fees");
      return;
    }
    setError("");
    setMethodError("");
    onConfirm(entered, paymentMethod);
    setAmount("");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box
        width="100%"
        sx={{ backgroundColor: "var(--header-bg-color)", color: "white" }}
      >
        <DialogTitle>Pay Student Fees</DialogTitle>
      </Box>
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
        <FormControl component="fieldset" error={!!methodError} sx={{ mb: 1 }}>
          <RadioGroup
            value={paymentMethod}
            onChange={(e) => {
              setPaymentMethod(e.target.value);
              setMethodError("");
            }}
          >
            <FormControlLabel value="cash" control={<Radio />} label="Cash" />
            <FormControlLabel value="Other" control={<Radio />} label="Other" />
          </RadioGroup>
          {methodError && (
            <Typography variant="caption" color="error">{methodError}</Typography>
          )}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleConfirm} sx={{backgroundColor: "var(--button-bg-color)",}}>
          Confirm Payment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentPaymentDlg;
