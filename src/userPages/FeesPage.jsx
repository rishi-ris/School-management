import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

const dummyData = [
  {
    roll: "101",
    name: "Rishi",
    class: "10",
    total: "5000",
    paid: "3000",
    due: "2000",
  },
  {
    roll: "102",
    name: "Anshika",
    class: "9",
    total: "4500",
    paid: "4500",
    due: "0",
  },
  {
    roll: "103",
    name: "Vishal",
    class: "8",
    total: "4500",
    paid: "2000",
    due: "2500",
  },
  {
    roll: "104",
    name: "Manisha",
    class: "7",
    total: "4500",
    paid: "500",
    due: "4000",
  },
  {
    roll: "105",
    name: "Ju",
    class: "6",
    total: "4500",
    paid: "4500",
    due: "0",
  },
  // add more data
];

const FeesPage = () => {
  const [roll, setRoll] = useState("");
  const [className, setClassName] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = () => {
    const filtered = dummyData.find(
      (item) =>
        item.roll === roll.trim() &&
        item.class === className.trim() &&
        item.name.toLowerCase() === name.trim().toLowerCase()
    );
    setResult(filtered || "not-found");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Search Student Fees
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Roll Number"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Class"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Search
        </Button>

        {result === "not-found" && (
          <Typography color="error" sx={{ mt: 2 }}>
            No student found.
          </Typography>
        )}

        {result && result !== "not-found" && (
          <Box mt={3}>
            <Typography variant="subtitle1">
              Student Name: {result.name}
            </Typography>
            <Typography>Roll: {result.roll}</Typography>
            <Typography>Class: {result.class}</Typography>
            <Typography>Total Fees: ₹{result.total}</Typography>
            <Typography>Paid: ₹{result.paid}</Typography>
            <Typography>Due: ₹{result.due}</Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default FeesPage;
