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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from "@mui/material";
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
  const { user } = useContext(AuthContext);

  useEffect(() => {
    Network.getAllSchools(user.data.data.schoolId)
      .then((data) => {
        const schools = Array.isArray(data) ? data : [data];
        setSchoolList(schools);
      })
      .catch((err) => console.error("Failed to load schools:", err));
  }, []);

  useEffect(() => {
    Network.getAllClasses(user.data.data.schoolId)
      .then((response) => setClassList(response.data))
      .catch((err) => console.error("⚠ Error fetching classes", err));
  }, []);

  const handleAddClass = async () => {
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
        const updatedList = [...classList, newClass];
        setClassList(updatedList);
        localStorage.setItem("classList", JSON.stringify(updatedList));
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

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: 700, mx: "auto" }}>
      <Sidekick />

      {/* Add Class Form */}
      <Paper
        sx={{
          p: 4,
          boxShadow: 4,
          mt: 8,
          borderRadius: 3,
          background: "linear-gradient(135deg, #f5f7fa, #e4ebf0)",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Add New Class
        </Typography>
        <Divider sx={{ mb: 3 }} />

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

        <Button
          variant="contained"
          fullWidth
          onClick={handleAddClass}
          sx={{ py: 1.2, fontSize: "1rem", fontWeight: "bold" }}
        >
          Add Class
        </Button>
      </Paper>

      {/* Class List */}
      {classList.length > 0 && (
        <Paper
          sx={{
            p: 3,
            mt: 4,
            boxShadow: 3,
            borderRadius: 3,
            background: "#fafafa",
          }}
        >
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: "bold", color: "#333" }}
          >
            Class List
          </Typography>
          <List>
            {classList.map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  mb: 1.5,
                  backgroundColor: "#fff",
                  boxShadow: 1,
                }}
              >
              <ListItemText
  sx={{ textAlign: "center", }} // <-- Added for center alignment
  primaryTypographyProps={{ fontWeight: "bold" }}
  primary={`Class: ${item.className} | Section: ${item.section} | School: ${
    schoolList.find((s) => s.id === item.schoolId)?.schoolName || "N/A"
  }`}
/>

              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default AddClassPage;
