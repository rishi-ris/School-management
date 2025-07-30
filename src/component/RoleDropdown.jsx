import React, { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Network from "../Application/Network";

const RoleDropdown = ({ onSelect, selectedRoleId, excludeRoleIds = [] }) => {
  const [allRoles, setAllRoles] = useState([]);
  const [localSelectedId, setLocalSelectedId] = useState("");

  useEffect(() => {
    Network.getAllRoles()
      .then((response) => setAllRoles(response.data))
      .catch((err) => console.error("⚠ Error fetching roles", err));
  }, []);

  useEffect(() => {
    if (selectedRoleId && allRoles.length > 0) {
      setLocalSelectedId(selectedRoleId);
      const selectedRoleObj = allRoles.find(role => role.roleId === selectedRoleId);
      if (selectedRoleObj) {
        onSelect(selectedRoleObj);
      }
    }
  }, [selectedRoleId, allRoles]);

  const handleChange = (event) => {
    const selectedId = event.target.value;
    setLocalSelectedId(selectedId);

    const selectedRoleObj = allRoles.find(role => role.roleId === selectedId);
    if (selectedRoleObj) {
      onSelect(selectedRoleObj);
    }
  };

  return (
    <Box item xs={12} sm={6}>
      <FormControl fullWidth>
        <InputLabel id="role-select-label">Select Role</InputLabel>
        <Select
          labelId="role-select-label"
          id="role-select"
          value={localSelectedId}
          label="Select Role"
          onChange={handleChange}
        >
          {allRoles
            .filter(role => !excludeRoleIds.includes(role.roleId)) // ✅ filter here
            .map((role) => (
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