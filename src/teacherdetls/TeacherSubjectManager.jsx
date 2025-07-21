import React, { useState, useEffect } from "react";
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
  Typography,
} from "@mui/material";
import MultiSelClassDropD from "../component/MultiSelClassDropD";
import Network from "../Application/Network";
import ClassDropDown from "../component/ClassDropDown";
import TeacherDashboardside from "./TeacherDasboardside";

const TeacherSubjectManager = () => {
  const [open, setOpen] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [selectedClass, setSelectedClass] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [errors, setErrors] = useState({});

  const [totalTheoryMarks, setTotalTheoryMarks] = useState("");
  const [passingTheoryMarks, setPassingTheoryMarks] = useState("");
  const [hasInternal, setHasInternal] = useState(false);
  const [totalInternalMarks, setTotalInternalMarks] = useState("");
  const [passingInternalMarks, setPassingInternalMarks] = useState("");

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await Network.getAllSubjects();
      if (Array.isArray(response.data)) {
        const formatted = response.data.map((subj) => ({
          title: subj.title,
          className:
            subj.classes
              ?.map((cls) => `${cls.className} - ${cls.section}`)
              .join(", ") || "",
          totalTheoryMarks: subj.totalTheoryMarks,
          passingTheoryMarks: subj.passingTheoryMarks,
          hasInternal: subj.hasInternal,
          totalInternalMarks: subj.totalInternalMarks,
          passingInternalMarks: subj.passingInternalMarks,
        }));
        setSubjects(formatted);
      }
    } catch (err) {
      console.error("❌ Failed to load subjects:", err);
      alert("Error loading subject list.");
    }
  };

  const resetForm = () => {
    setSubjectName("");
    setSelectedClass([]);
    setTotalTheoryMarks("");
    setPassingTheoryMarks("");
    setHasInternal(false);
    setTotalInternalMarks("");
    setPassingInternalMarks("");
    setErrors({});
  };

  const handleOpen = () => {
    resetForm();
    setOpen(true);
  };

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  const validate = () => {
    const err = {};
    if (!subjectName.trim()) err.subjectName = "Subject Name is required";
    if (selectedClass.length === 0)
      err.selectedClass = "Please select at least one class";

    if (totalTheoryMarks === "") err.totalTheoryMarks = "Required";
    else if (totalTheoryMarks < 0 || totalTheoryMarks > 100)
      err.totalTheoryMarks = "0–100 only";

    if (passingTheoryMarks === "") err.passingTheoryMarks = "Required";
    else if (passingTheoryMarks < 0 || passingTheoryMarks > 100)
      err.passingTheoryMarks = "0–100 only";

    if (hasInternal) {
      if (totalInternalMarks === "") err.totalInternalMarks = "Required";
      else if (totalInternalMarks < 0 || totalInternalMarks > 100)
        err.totalInternalMarks = "0–100 only";

      if (passingInternalMarks === "") err.passingInternalMarks = "Required";
      else if (passingInternalMarks < 0 || passingInternalMarks > 100)
        err.passingInternalMarks = "0–100 only";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    const payload = {
      title: subjectName.trim(),
      classIds: selectedClass.map((cls) => cls.classId),
      totalTheoryMarks: parseInt(totalTheoryMarks),
      passingTheoryMarks: parseInt(passingTheoryMarks),
      hasInternal,
      totalInternalMarks: hasInternal ? parseInt(totalInternalMarks || 0) : 0,
      passingInternalMarks: hasInternal
        ? parseInt(passingInternalMarks || 0)
        : 0,
    };

    try {
      const response = await Network.addSubject(payload);
      if (!response.data) throw new Error("Save failed");
      await fetchSubjects();
      handleClose();
    } catch (err) {
      console.error(
        "❌ Error saving subject:",
        err.response.data.errors.unique_constraint
      );
      alert(err.response.data.errors.unique_constraint);
    }
  };

  const handleClassFilter = async (classId) => {
    setSubjects([]);
    if (!classId) return;
    try {
      const response = await Network.getAllSubjectsByClassId(classId.classId);
      if (Array.isArray(response.data)) {
        const formatted = response.data.map((subj) => ({
          title: subj.title,
          className:
            subj.classes
              ?.map((cls) => `${cls.className} - ${cls.section}`)
              .join(", ") || "",
          totalTheoryMarks: subj.totalTheoryMarks,
          passingTheoryMarks: subj.passingTheoryMarks,
          hasInternal: subj.hasInternal,
          totalInternalMarks: subj.totalInternalMarks,
          passingInternalMarks: subj.passingInternalMarks,
        }));
        setSubjects(formatted);
      }
    } catch (err) {
      console.error("❌ Failed to filter subjects:", err);
      alert("Error filtering subjects by class.");
    }
  };

  return (
    <Box>
      <TeacherDashboardside />
      <Box p={3}>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              onClick={handleOpen}
              sx={{ backgroundColor: "var(--button-bg-color)",  }}
            >
              Add Subject
            </Button>
          </Grid>
          <Grid item sx={{ width: "200px" }}>
            <ClassDropDown onSelect={handleClassFilter} />
          </Grid>
        </Grid>

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Add Subject</DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
          >
            <TextField
              label="Subject Name"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              error={!!errors.subjectName}
              helperText={errors.subjectName}
              fullWidth
            />

            <MultiSelClassDropD
              onSelect={setSelectedClass}
              selectedClassIds={selectedClass.map((cls) => cls.classId)}
              
            />
            {errors.selectedClass && (
              <Typography color="error" variant="caption">
                {errors.selectedClass}
              </Typography>
            )}

            <TextField
              label="Total Theory Marks"
              type="number"
              value={totalTheoryMarks}
              onChange={(e) => setTotalTheoryMarks(e.target.value)}
              error={!!errors.totalTheoryMarks}
              helperText={errors.totalTheoryMarks}
              fullWidth
            />

            <TextField
              label="Passing Theory Marks"
              type="number"
              value={passingTheoryMarks}
              onChange={(e) => setPassingTheoryMarks(e.target.value)}
              error={!!errors.passingTheoryMarks}
              helperText={errors.passingTheoryMarks}
              fullWidth
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
                  error={!!errors.totalInternalMarks}
                  helperText={errors.totalInternalMarks}
                  fullWidth
                />
                <TextField
                  label="Passing Internal Marks"
                  type="number"
                  value={passingInternalMarks}
                  onChange={(e) => setPassingInternalMarks(e.target.value)}
                  error={!!errors.passingInternalMarks}
                  helperText={errors.passingInternalMarks}
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
                    No subjects found
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
export default TeacherSubjectManager;
