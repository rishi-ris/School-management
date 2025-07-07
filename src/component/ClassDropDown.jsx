import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Network from '../Application/Network';

const ClassDropDown = ({  onSelect }) => {
  const [selectedClassId, setSelectedClassId] = useState('');
    const [allClasses, setAllClasses] = useState([]);

  const handleChange = (event) => {
    const selectedId = event.target.value;
    const selectedClassObj = allClasses.find(cls => cls.classId === selectedId);

    setSelectedClassId(selectedId);
    if (selectedClassObj) {
      onSelect(selectedClassObj); // ✅ Send full object
    }
  };

   useEffect(() => {
        Network.getAllClasses()
          .then((response) => setAllClasses(response.data))
          .catch((err) => console.error("⚠️ Error fetching classes", err));
    
      }, []); // ← runs only once

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
          {allClasses.map((cls) => (
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
