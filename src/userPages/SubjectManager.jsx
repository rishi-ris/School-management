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
  Checkbox,
  FormControlLabel,
  Grid,
} from '@mui/material';
import MultiSelClassDropD from '../component/MultiSelClassDropD';
import Network from '../Application/Network';
import Sidekick from '../component/Sidekick';
import ClassDropDown from '../component/ClassDropDown';

const SubjectManager = () => {
  const [open, setOpen] = useState(false);
  const [subjectName, setSubjectName] = useState('');
  const [selectedClass, setSelectedClass] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [totalTheoryMarks, setTotalTheoryMarks] = useState('');
  const [passingTheoryMarks, setPassingTheoryMarks] = useState('');
  const [hasInternal, setHasInternal] = useState(false);
  const [totalInternalMarks, setTotalInternalMarks] = useState('');
  const [passingInternalMarks, setPassingInternalMarks] = useState('');

  // Fetch all subjects on load
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await Network.getAllSubjects();
      if (Array.isArray(response.data)) {
        const formatted = response.data.map((subj) => ({
          title: subj.title,
          className: subj.classes?.map(cls => `${cls.className} - ${cls.section}`).join(', ') || '',
          totalTheoryMarks: subj.totalTheoryMarks,
          passingTheoryMarks: subj.passingTheoryMarks,
          hasInternal: subj.hasInternal,
          totalInternalMarks: subj.totalInternalMarks,
          passingInternalMarks: subj.passingInternalMarks,
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
    resetForm();
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setSubjectName('');
    setSelectedClass([]);
    setTotalTheoryMarks('');
    setPassingTheoryMarks('');
    setHasInternal(false);
    setTotalInternalMarks('');
    setPassingInternalMarks('');
  };

  const handleSave = async () => {
    if (!subjectName || selectedClass.length === 0 || !totalTheoryMarks || !passingTheoryMarks) {
      alert('Please fill all required fields');
      return;
    }

    const payload = {
      title: subjectName.trim(),
      classIds: selectedClass.map(cls => (cls.classId )),
      totalTheoryMarks: parseInt(totalTheoryMarks),
      passingTheoryMarks: parseInt(passingTheoryMarks),
      hasInternal: hasInternal,
      totalInternalMarks: hasInternal ? parseInt(totalInternalMarks || 0) : 0,
      passingInternalMarks: hasInternal ? parseInt(passingInternalMarks || 0) : 0,
    };

    try {
      const response = await Network.addSubject(payload);
      if (!response.data) {
        throw new Error(`Failed to save subject: ${response.statusText}`);
      }

      await fetchSubjects();
      handleClose();
    } catch (err) {
      console.error('❌ Error saving subject:', err);
      alert('Failed to save subject.');
    }
  };
  const handleClassFilter = async (classId) => {
    setSubjects([]);
    if (!classId) {
      alert('Please select a class to filter subjects.');
      return;
    }
    try {
      const response = await Network.getAllSubjectsByClassId(classId.classId);
      if (Array.isArray(response.data)) {
        const formatted = response.data.map((subj) => ({
          title: subj.title,
          className: subj.classes?.map(cls => `${cls.className} - ${cls.section}`).join(', ') || '',
          totalTheoryMarks: subj.totalTheoryMarks,
          passingTheoryMarks: subj.passingTheoryMarks,
          hasInternal: subj.hasInternal,
          totalInternalMarks: subj.totalInternalMarks,
          passingInternalMarks: subj.passingInternalMarks,
        
        }));
        setSubjects(formatted);
      }
    } catch (err) {
      console.error('❌ Failed to filter subjects:', err);
      alert('Error filtering subjects by class.');
    }
  };  

  return (
    <Box>
      <Sidekick />

      <Box p={3}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Button variant="contained" onClick={handleOpen}>
              Add Subject
            </Button>
          </Grid>
          <Grid item>
            <ClassDropDown onSelect={handleClassFilter} />
          </Grid>
        </Grid>

        {/* Dialog Box */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Add Subject</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Subject Name"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              fullWidth
              required
            />

            <MultiSelClassDropD
              onSelect={setSelectedClass}
              selectedClassIds={selectedClass.map(cls => cls.classId)}
            />

            <TextField
              label="Total Theory Marks"
              type="number"
              value={totalTheoryMarks}
              onChange={(e) => setTotalTheoryMarks(e.target.value)}
              fullWidth
              required
            />

            <TextField
              label="Passing Theory Marks"
              type="number"
              value={passingTheoryMarks}
              onChange={(e) => setPassingTheoryMarks(e.target.value)}
              fullWidth
              required
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={hasInternal}
                  onChange={(e) => setHasInternal(e.target.checked)}
                />
              }
              label="Has Internal Marks"
            />

            {hasInternal && (
              <>
                <TextField
                  label="Total Internal Marks"
                  type="number"
                  value={totalInternalMarks}
                  onChange={(e) => setTotalInternalMarks(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Passing Internal Marks"
                  type="number"
                  value={passingInternalMarks}
                  onChange={(e) => setPassingInternalMarks(e.target.value)}
                  fullWidth
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleSave} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Table Section */}
        <Box mt={4}>
          <Table>
  <TableHead>
    <TableRow>
      <TableCell>Subject Name</TableCell>
      <TableCell>Classes</TableCell>
      <TableCell>Total Theory Marks</TableCell>
      <TableCell>Passing Theory Marks</TableCell>
      <TableCell>Has Internal</TableCell>
      <TableCell>Total Internal Marks</TableCell>
      <TableCell>Passing Internal Marks</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {subjects.length > 0 ? (
      subjects.map((subj, index) => (
        <TableRow key={index}>
          <TableCell>{subj.title}</TableCell>
          <TableCell>{subj.className}</TableCell>
          <TableCell>{subj.totalTheoryMarks}</TableCell>
          <TableCell>{subj.passingTheoryMarks}</TableCell>
          <TableCell>{subj.hasInternal ? "Yes" : "No"}</TableCell>
          <TableCell>{subj.totalInternalMarks}</TableCell>
          <TableCell>{subj.passingInternalMarks}</TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={7} align="center">
          No subjects found for the selected class. Please add subject or select another class.
        </TableCell>
      </TableRow>
    )}
  </TableBody>
</Table>

        </Box>
      </Box>
    </Box>
  );
};

export default SubjectManager;
