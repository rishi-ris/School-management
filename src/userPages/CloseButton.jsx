import React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CloseButton = ({ onClick }) => (
  <IconButton onClick={onClick} sx={{ position: "absolute", right: 8, top: 8 }}>
    <CloseIcon />
  </IconButton>
);

export default CloseButton;
