import React from "react";
import { Box, Button } from "@mui/material";

const AddStudentButton = ({ onClick }) => (
  <Box display="flex" justifyContent="flex-end" mb={2}>
    <Button variant="contained" color="success" onClick={onClick}>
      + Add New Student
    </Button>
  </Box>
);

export default AddStudentButton;
