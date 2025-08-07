import React from "react";
import { TextField, MenuItem } from "@mui/material";

const ClassLevelDropdown = ({ label, value, onChange, required }) => {
  const classLevels = [
    "Nursery", "LKG", "UKG",
    "1st", "2nd", "3rd", "4th", "5th",
    "6th", "7th", "8th", "9th", "10th",
    "11th", "12th"
  ];

  return (
    <TextField
      select
      label={label}
      value={value}
      onChange={onChange}
      fullWidth
      required={required}
    >
      {classLevels.map((level) => (
        <MenuItem key={level} value={level}>
          {level}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default ClassLevelDropdown;
