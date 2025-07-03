import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';



const ClassDropDown = ({ roles, onSelect  }) => {
  const [selectedRoleId, setSelectedRoleId] = useState('');

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
          {roles.map((c) => (
            <MenuItem key={c.classId} value={c.classId}>
              {c.className} - {c.section}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ClassDropDown;
