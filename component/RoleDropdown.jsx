import React, { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Network from "../Application/Network";

const RoleDropdown = ({ onSelect, selectedRoleId }) => {
  const [allRoles, setAllRoles] = useState([]);
  const [localSelectedId, setLocalSelectedId] = useState("");

  // Load all roles once
  useEffect(() => {
    Network.getAllRoles()
      .then((response) => setAllRoles(response.data))
      .catch((err) => console.error("⚠️ Error fetching roles", err));
  }, []);

  // Set initial selectedRoleId and trigger onSelect on edit
  useEffect(() => {
    if (selectedRoleId && allRoles.length > 0) {
      setLocalSelectedId(selectedRoleId);
      const selectedRoleObj = allRoles.find(role => role.roleId === selectedRoleId);
      if (selectedRoleObj) {
        onSelect(selectedRoleObj); // ✅ Fire onSelect on edit
      }
    }
  }, [selectedRoleId, allRoles]);

  const handleChange = (event) => {
    const selectedId = event.target.value;
    setLocalSelectedId(selectedId);

    const selectedRoleObj = allRoles.find(role => role.roleId === selectedId);
    if (selectedRoleObj) {
      onSelect(selectedRoleObj); // Trigger on user change
    }
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="role-select-label">Select Role</InputLabel>
        <Select
          labelId="role-select-label"
          id="role-select"
          value={localSelectedId}
          label="Select Role"
          onChange={handleChange}
        >
          {allRoles.map((role) => (
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
