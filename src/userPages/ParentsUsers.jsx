import React from "react";
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const parentsData = [
  {
    parentName: "Rajesh Kumar",
    contact: "9876543210",
    email: "rajesh@example.com",
    address: "Delhi",
    childName: "Aman Kumar",
  },
  {
    parentName: "Rashi Gupta",
    contact: "9876543210",
    email: "rajesh@example.com",
    address: "Delhi",
    childName: "Sneha Gupta",
  },
];

const ParentsUsers = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Parents Table
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#2c2b3f" }}>
              <TableCell sx={{ color: "white" }}>Parent Name</TableCell>
              <TableCell sx={{ color: "white" }}>Contact</TableCell>
              <TableCell sx={{ color: "white" }}>Email</TableCell>
              <TableCell sx={{ color: "white" }}>Address</TableCell>
              <TableCell sx={{ color: "white" }}>Child Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parentsData.map((parent, index) => (
              <TableRow key={index}>
                <TableCell>{parent.parentName}</TableCell>
                <TableCell>{parent.contact}</TableCell>
                <TableCell>{parent.email}</TableCell>
                <TableCell>{parent.address}</TableCell>
                <TableCell>{parent.childName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ParentsUsers;
