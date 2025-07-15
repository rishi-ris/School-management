import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Network from '../Application/Network';

const ClassDropDown = ({ onSelect, selectedClassId }) => {
  const [allClasses, setAllClasses] = useState([]);
  const [localSelectedId, setLocalSelectedId] = useState('');

  useEffect(() => {
    Network.getAllClasses()
      .then((response) => setAllClasses(response.data))
      .catch((err) => console.error('⚠️ Error fetching classes', err));
  }, []);

  // ✅ Trigger selection on edit
  useEffect(() => {
    if (selectedClassId && allClasses.length > 0) {
      setLocalSelectedId(selectedClassId);
      const selectedClassObj = allClasses.find(cls => cls.classId === selectedClassId);
      if (selectedClassObj) {
        onSelect(selectedClassObj); // ✅ Fire onSelect on edit
      }
    }
  }, [selectedClassId, allClasses]);

  const handleChange = (event) => {
    const selectedId = event.target.value;
    setLocalSelectedId(selectedId);

    const selectedClassObj = allClasses.find(cls => cls.classId === selectedId);
    console.log("Selected class:", selectedClassObj);
    if (selectedClassObj) {
      onSelect(selectedClassObj); // Trigger on user change
    }
  };

  return (
    <Box item xs={12} sm={6}  sx={{ }}>
      <FormControl fullWidth>
        <InputLabel id="class-select-label">Select Class</InputLabel>
        <Select
          labelId="class-select-label"
          id="class-select"
          value={localSelectedId}
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
