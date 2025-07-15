import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Network from '../Application/Network';

const MultiSelClassDropD = ({ onSelect, selectedClassIds = [] }) => {
  const [allClasses, setAllClasses] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [tempSelectedIds, setTempSelectedIds] = useState([]);

  // Load classes
  useEffect(() => {
    Network.getAllClasses()
      .then((res) => {
        if (Array.isArray(res.data)) {
          setAllClasses(res.data);
        } else if (Array.isArray(res.data.classes)) {
          setAllClasses(res.data.classes);
        } else {
          console.error('Unexpected response format:', res.data);
          setAllClasses([]);
        }
      })
      .catch((err) => {
        console.error('Error loading classes:', err);
        setAllClasses([]);
      });
  }, []);

  // Set preselected values on edit
  useEffect(() => {
    setTempSelectedIds(selectedClassIds);
  }, [selectedClassIds]);

  const handleToggle = (classId) => {
    setTempSelectedIds((prev) =>
      prev.includes(classId)
        ? prev.filter((id) => id !== classId)
        : [...prev, classId]
    );
  };

  const handleConfirm = () => {
    const selectedObjects = allClasses.filter(cls =>
      tempSelectedIds.includes(cls.classId)
    );
    onSelect(selectedObjects);
    setAnchorEl(null); // close dropdown
  };

  const displayText = allClasses
    .filter((cls) => tempSelectedIds.includes(cls.classId))
    .map((cls) => `${cls.className}-${cls.section}`)
    .join(', ');

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel shrink>Select Classes</InputLabel>
        <TextField
          value={displayText}
          onClick={(e) => setAnchorEl(e.currentTarget)}
          placeholder="Select Classes"
          InputProps={{
            endAdornment: <ArrowDropDownIcon />,
            readOnly: true,
          }}
        />
      </FormControl>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {allClasses.map((cls) => (
          <MenuItem
            key={cls.classId}
            onClick={() => handleToggle(cls.classId)}
          >
            <Checkbox checked={tempSelectedIds.includes(cls.classId)} />
            <ListItemText primary={`${cls.className} - ${cls.section}`} />
          </MenuItem>
        ))}
        <MenuItem>
          <Button variant="contained" fullWidth onClick={handleConfirm}>
            OK
          </Button>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default MultiSelClassDropD;
