import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from '@mui/material';
import MultiSelClassDropD from '../component/MultiSelClassDropD';
import Network from '../Application/Network';
import Sidekick from '../component/Sidekick';

const SubjectManager = () => {
  const [open, setOpen] = useState(false);
  const [subjectName, setSubjectName] = useState('');
  const [selectedClass, setSelectedClass] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // ✅ Fetch all subjects on mount
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await Network.getAllSubjects(); // 🔁 Make sure this method exists
      if (Array.isArray(response.data)) {
        const formatted = response.data.map((subj) => ({
          subjectName: subj.subjectName,
          className: subj.classes?.map(cls => `${cls.className} - ${cls.section}`).join(', ') || '',
        }));
        setSubjects(formatted);
      }
    } catch (err) {
      console.error('❌ Failed to load subjects:', err);
      alert('Error loading subject list.');
    }
  };

  const handleOpen = () => {
    setOpen(true);
    setSubjectName('');
    setSelectedClass([]);
  };

  const handleClose = () => {
    setOpen(false);
    setSubjectName('');
    setSelectedClass([]);
  };

  const handleSave = async () => {
    if (!subjectName || selectedClass.length === 0) {
      alert('Please enter subject name and select at least one class');
      return;
    }

    const payload = {
      subjectName: subjectName.trim(),
      classes: selectedClass.map(cls => ({ classId: cls.classId })),
    };

    try {
      const response = await Network.addSubject(payload);
      if (!response.data) {
        throw new Error(`Failed to save subject: ${response.statusText}`);
      }

      // Refresh subject list after adding
      await fetchSubjects();
      handleClose();
    } catch (err) {
      console.error('❌ Error saving subject:', err);
      alert('Failed to save subject.');
    }
  };

  return (
    <Box>
       <Sidekick/>
    
    <Box p={3}>
     
      <Button variant="contained" onClick={handleOpen}>
        Add Subject
      </Button>

      {/* Dialog Box */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Subject</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Subject Name"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            fullWidth
          />
          <MultiSelClassDropD
            onSelect={setSelectedClass}
            selectedClassIds={selectedClass.map(cls => cls.classId)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Table Section */}
      <Box mt={4}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject Name</TableCell>
              <TableCell>Classes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjects.map((subj, index) => (
              <TableRow key={index}>
                <TableCell>{subj.subjectName}</TableCell>
                <TableCell>{subj.className}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
    </Box>
  );
};

export default SubjectManager;
