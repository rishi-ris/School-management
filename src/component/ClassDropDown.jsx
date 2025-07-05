import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const ClassDropDown = ({ roles, onSelect }) => {
  const [selectedClassId, setSelectedClassId] = useState('');

  const handleChange = (event) => {
    const selectedId = event.target.value;
    const selectedClassObj = roles.find(cls => cls.classId === selectedId);
    
    setSelectedClassId(selectedId);
    if (selectedClassObj) {
      onSelect(selectedClassObj); // ✅ Send full object
    }
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="class-select-label">Select Class</InputLabel>
        <Select
          labelId="class-select-label"
          id="class-select"
          value={selectedClassId}
          label="Select Class"
          onChange={handleChange}
        >
          {roles.map((cls) => (
            <MenuItem key={cls.classId} value={cls.classId}>
              {cls.className} - {cls.section}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ClassDropDown;
