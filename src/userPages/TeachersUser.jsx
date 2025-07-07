import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Grow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Sidekick from "../component/Sidekick";

// Mock data for demonstration
const initialTeachers = [
  {
    id: 1,
    name: "Mr. Sharma",
    class: "5A",
    qualities: ["Punctual", "Experienced", "Friendly"],
  },
  { id: 2, name: "Ms. Gupta", class: "6B", qualities: ["Creative", "Patient"] },
  { id: 3, name: "Mr. Khan", class: "7C", qualities: ["Strict", "Organized"] },
];

const allClasses = ["5A", "6B", "7C", "8A", "9B"];

function getQualitiesSummary(teachers) {
  const count = {};
  teachers.forEach((t) =>
    t.qualities.forEach((q) => {
      count[q] = (count[q] || 0) + 1;
    })
  );
  return Object.entries(count).sort((a, b) => b[1] - a[1]);
}

const TeachersUser = () => {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [search, setSearch] = useState("");
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    class: "",
    qualities: "",
  });
  const [editId, setEditId] = useState(null);
  const [editTeacher, setEditTeacher] = useState({
    name: "",
    class: "",
    qualities: "",
  });
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("asc");

  const assignedClasses = teachers.map((t) => t.class);
  const unassignedClasses = allClasses.filter(
    (cls) => !assignedClasses.includes(cls)
  );

  let filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.class.toLowerCase().includes(search.toLowerCase())
  );

  filteredTeachers = filteredTeachers.sort((a, b) => {
    let valA = a[sortBy].toString().toLowerCase();
    let valB = b[sortBy].toString().toLowerCase();
    if (valA < valB) return sortDir === "asc" ? -1 : 1;
    if (valA > valB) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const handleAddTeacher = (e) => {
    e.preventDefault();
    if (!newTeacher.name || !newTeacher.class) return;
    if (assignedClasses.includes(newTeacher.class)) {
      alert("This class already has a teacher assigned.");
      return;
    }
    setTeachers([
      ...teachers,
      {
        id: teachers.length ? Math.max(...teachers.map((t) => t.id)) + 1 : 1,
        name: newTeacher.name,
        class: newTeacher.class,
        qualities: newTeacher.qualities
          .split(",")
          .map((q) => q.trim())
          .filter(Boolean),
      },
    ]);
    setNewTeacher({ name: "", class: "", qualities: "" });
  };

  const handleRemoveTeacher = (id) => {
    if (window.confirm("Are you sure you want to remove this teacher?")) {
      setTeachers(teachers.filter((t) => t.id !== id));
    }
  };

  const handleEdit = (teacher) => {
    setEditId(teacher.id);
    setEditTeacher({
      name: teacher.name,
      class: teacher.class,
      qualities: teacher.qualities.join(", "),
    });
  };

  const handleEditSave = (id) => {
    if (!editTeacher.name || !editTeacher.class) return;
    if (teachers.some((t) => t.class === editTeacher.class && t.id !== id)) {
      alert("This class already has a teacher assigned.");
      return;
    }
    setTeachers(
      teachers.map((t) =>
        t.id === id
          ? {
              ...t,
              name: editTeacher.name,
              class: editTeacher.class,
              qualities: editTeacher.qualities
                .split(",")
                .map((q) => q.trim())
                .filter(Boolean),
            }
          : t
      )
    );
    setEditId(null);
    setEditTeacher({ name: "", class: "", qualities: "" });
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditTeacher({ name: "", class: "", qualities: "" });
  };

  const qualitiesSummary = getQualitiesSummary(teachers);

  return (
    <Box>
      <Sidekick/>
    
    <Box sx={{ bgcolor: "#f4f6fb", minHeight: "100vh", py: 4 }}>
      
      <Paper elevation={3} sx={{ maxWidth: 900, mx: "auto", borderRadius: 3, p: 4 }}>
        <Typography variant="h4" align="center" color="primary.dark" gutterBottom>
          Teachers Information
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="space-between" alignItems="center" mb={3}>
          <TextField
            label="Search by name or class"
            value={search}
            onChange={e => setSearch(e.target.value)}
            size="small"
            sx={{ width: 260 }}
          />
          <Typography fontWeight={600} color="text.secondary">
            Total Teachers: {teachers.length}
          </Typography>
        </Stack>
        <Box component="form" onSubmit={handleAddTeacher} mb={4} p={2} borderRadius={2} bgcolor="#f8fafc" boxShadow={1} display="flex" flexWrap="wrap" gap={2} alignItems="center">
          <TextField
            label="Name"
            value={newTeacher.name}
            onChange={e => setNewTeacher({ ...newTeacher, name: e.target.value })}
            required
            size="small"
            sx={{ width: 120 }}
          />
          <TextField
            label="Class"
            value={newTeacher.class}
            onChange={e => setNewTeacher({ ...newTeacher, class: e.target.value })}
            required
            size="small"
            sx={{ width: 80 }}
          />
          <TextField
            label="Qualities (comma separated)"
            value={newTeacher.qualities}
            onChange={e => setNewTeacher({ ...newTeacher, qualities: e.target.value })}
            size="small"
            sx={{ width: 220 }}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ fontWeight: 600, px: 3 }}>
            Add Teacher
          </Button>
        </Box>
        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
          <Typography fontWeight={600}>Sort by:</Typography>
          <FormControl size="small">
            <InputLabel id="sort-by-label">Sort By</InputLabel>
            <Select
              labelId="sort-by-label"
              value={sortBy}
              label="Sort By"
              onChange={e => setSortBy(e.target.value)}
              sx={{ minWidth: 100 }}
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="class">Class</MenuItem>
            </Select>
          </FormControl>
          <IconButton onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
            color="primary" size="small">
            {sortDir === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          </IconButton>
        </Stack>
        <Grid container spacing={2} mb={4}>
          {filteredTeachers.map((teacher, idx) => (
            <Grow in={true} timeout={400 + idx * 100} key={teacher.id}>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ bgcolor: "#f8fafc", borderRadius: 2, boxShadow: 1, p: 1 }}>
                  <CardContent>
                    {editId === teacher.id ? (
                      <Stack spacing={1}>
                        <TextField
                          label="Name"
                          value={editTeacher.name}
                          onChange={e => setEditTeacher({ ...editTeacher, name: e.target.value })}
                          size="small"
                          fullWidth
                        />
                        <TextField
                          label="Class"
                          value={editTeacher.class}
                          onChange={e => setEditTeacher({ ...editTeacher, class: e.target.value })}
                          size="small"
                          fullWidth
                        />
                        <TextField
                          label="Qualities (comma separated)"
                          value={editTeacher.qualities}
                          onChange={e => setEditTeacher({ ...editTeacher, qualities: e.target.value })}
                          size="small"
                          fullWidth
                        />
                        <Stack direction="row" spacing={1}>
                          <Button onClick={() => handleEditSave(teacher.id)} variant="contained" color="success" startIcon={<SaveIcon />}>Save</Button>
                          <Button onClick={handleEditCancel} variant="outlined" color="inherit" startIcon={<CancelIcon />}>Cancel</Button>
                        </Stack>
                      </Stack>
                    ) : (
                      <>
                        <Typography variant="h6" color="primary.dark" fontWeight={700} mb={0.5}>{teacher.name}</Typography>
                        <Typography color="primary" fontWeight={600} mb={0.5}>Class: {teacher.class}</Typography>
                        <Typography color="text.secondary" fontSize={15} mb={1}>
                          Qualities: {teacher.qualities.join(", ")}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          <Button onClick={() => handleEdit(teacher)} variant="contained" color="warning" startIcon={<EditIcon />}>Edit</Button>
                          <Button onClick={() => handleRemoveTeacher(teacher.id)} variant="contained" color="error" startIcon={<DeleteIcon />}>Remove</Button>
                        </Stack>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grow>
          ))}
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" color="primary.dark" mb={1}>
              Classes Without Assigned Teachers
            </Typography>
            <Divider />
            {unassignedClasses.length > 0 ? (
              <List>
                {unassignedClasses.map(cls => (
                  <ListItem key={cls}>
                    <ListItemText primary={cls} primaryTypographyProps={{ color: "error", fontWeight: 600 }} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography color="success.main" mt={2}>
                All classes have assigned teachers.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
    </Box>
  );
};

export default TeachersUser;
