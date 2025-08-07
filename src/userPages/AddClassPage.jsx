import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import Sidekick from "../component/Sidekick";
import Network from "../Application/Network";
import { AuthContext } from "../auth/AuthProvider";
import ClassLevelDropdown from "../CommonFile/ClassLevelDropdown";
import SectionDropdown from "../CommonFile/SectionDropdown";

const AddClassPage = () => {
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [schoolList, setSchoolList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const { user } = useContext(AuthContext);
  const [editData, setEditData] = useState({
    className: "",
    section: "",
    schoolId: "",
  });

  // ✅ Load school list from backend
  useEffect(() => {
    Network.getAllSchools(user.data.data.schoolId)
      .then((data) => {
        const schools = Array.isArray(data) ? data : [data];
        setSchoolList(schools);
      })
      .catch((err) => console.error("Failed to load schools:", err));
  }, []);

  // ✅ Add class function
  const handleAddClass = async () => {
    console.log("className:", className);
    console.log("section:", section);
    console.log("schoolId:", schoolId);

    if (
      className.trim() !== "" &&
      section.trim() !== "" &&
      schoolId.toString().trim() !== ""
    ) {
      const newClass = {
        className: className.trim(),
        section: section.trim(),
        schoolId: Number(schoolId),
      };

      try {
        await Network.AddClasses(newClass);
        setClassList([...classList, newClass]);
        setClassName("");
        setSection("");
        setSchoolId("");
      } catch (error) {
        console.error("❌ Failed to add class:", error);
        alert("❌ Failed to add class");
      }
    } else {
      alert("⚠ Please fill all fields");
    }
  };

  const handleDelete = (index) => {
    const updated = [...classList];
    updated.splice(index, 1);
    setClassList(updated);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditData(classList[index]);
  };

  const handleSaveEdit = () => {
    const updated = [...classList];
    updated[editingIndex] = editData;
    setClassList(updated);
    setEditingIndex(null);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Sidekick />
      <Paper sx={{ p: 3, boxShadow: 3, mt: 10 }}>
        <Typography variant="h5" gutterBottom>
          Add New Class
        </Typography>

        <Box sx={{ mb: 2 }}>
          <ClassLevelDropdown
            label="Class"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <SectionDropdown
            label="Section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            required
          />
        </Box>

        <FormControl fullWidth sx={{ mb: 2 }} required>
          <InputLabel>School</InputLabel>
          <Select
            value={schoolId}
            label="School"
            onChange={(e) => setSchoolId(e.target.value)}
          >
            {schoolList.map((school) => (
              <MenuItem key={school.id} value={school.id}>
                {school.schoolName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" fullWidth onClick={handleAddClass}>
          Add Class
        </Button>
      </Paper>

      {classList.length > 0 && (
        <Paper sx={{ p: 3, mt: 4, boxShadow: 2 }}>
          <Typography variant="h6">Class List:</Typography>
          <List>
            {classList.map((item, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  editingIndex === index ? (
                    <IconButton edge="end" onClick={handleSaveEdit}>
                      <SaveIcon />
                    </IconButton>
                  ) : (
                    <>
                      <IconButton onClick={() => handleEdit(index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )
                }
              >
                {editingIndex === index ? (
                  <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
                    <TextField
                      label="Class"
                      size="small"
                      value={editData.className}
                      onChange={(e) =>
                        setEditData({ ...editData, className: e.target.value })
                      }
                    />
                    <TextField
                      label="Section"
                      size="small"
                      value={editData.section}
                      onChange={(e) =>
                        setEditData({ ...editData, section: e.target.value })
                      }
                    />
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                      <InputLabel>School</InputLabel>
                      <Select
                        value={editData.schoolId}
                        label="School"
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            schoolId: e.target.value,
                          })
                        }
                      >
                        {schoolList.map((school) => (
                          <MenuItem key={school.id} value={school.id}>
                            {school.schoolName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                ) : (
                  <ListItemText
                    primary={`Class: ${item.className} | Section: ${item.section} | School ID: ${item.schoolId}`}
                  />
                )}
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default AddClassPage;
