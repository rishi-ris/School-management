import React from "react";
import { Box, Button } from "@mui/material";

const AddStuButton = ({ onClick }) => (
  <Box display="flex" justifyContent="flex-end">
    <Button variant="contained" color="success" onClick={onClick}>
      + Add New Student
    </Button>
  </Box>
);

export default AddStuButton;
