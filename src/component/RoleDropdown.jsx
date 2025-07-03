import React, { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const RoleDropdown = ({ roles, onSelect }) => {
  console.log("Available Roles:", roles);
  console.error("Available Roles:", roles);
  const [selectedRoleId, setSelectedRoleId] = useState("");

  const handleChange = (event) => {
    setSelectedRoleId(event.target.value);
    console.log("Selected Role ID:", event.target.value);
    onSelect(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="role-select-label">Select Role</InputLabel>
        <Select
          labelId="role-select-label"
          id="role-select"
          value={selectedRoleId}
          label="Select Role"
          onChange={handleChange}
        >
          {roles.map((role) => (
            <MenuItem key={role.roleId} value={role.roleId}>
              {role.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default RoleDropdown;
