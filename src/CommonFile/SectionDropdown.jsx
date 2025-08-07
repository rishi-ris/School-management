import React from "react";
import { TextField, MenuItem } from "@mui/material";

const SectionDropdown = ({ label, value, onChange, required }) => {
  const sections = ["A", "B", "C", "D", "E"];

  return (
    <TextField
      select
      label={label}
      value={value}
      onChange={onChange}
      fullWidth
      required={required}
    >
      {sections.map((section) => (
        <MenuItem key={section} value={section}>
          {section}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SectionDropdown;
