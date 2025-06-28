import React, { useState } from "react";
import {
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  MenuItem
} from "@mui/material";

const classOptions = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"];
const studentNames = ["Rashi", "Rishi", "Vishal", "Shainu", "Prachi"];

const StudentUsersFamilyDetails = ({ data, onChange }) => {
  const [showSiblingFields, setShowSiblingFields] = useState(data.isSibling || false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    onChange({ [name]: val });

    if (name === "isSibling") {
      setShowSiblingFields(val);
    }
  };

  return (
    <Grid container spacing={2} mt={1}>
      {/* Father */}
      <Grid item xs={12}><strong>Father Details</strong></Grid>
      {["fatherName", "fatherPhone", "fatherEmail", "fatherAadharNum", "fatherEducation", "fatherOccupation"].map((field) => (
        <Grid item xs={12} sm={6} key={field}>
          <TextField
            fullWidth
            label={field.replace(/([A-Z])/g, " $1")}
            name={field}
            value={data[field] || ""}
            onChange={handleInputChange}
          />
        </Grid>
      ))}

      {/* Mother */}
      <Grid item xs={12}><strong>Mother Details</strong></Grid>
      {["motherName", "motherPhone", "motherEmail", "motherAadharNum", "motherEducation", "motherOccupation"].map((field) => (
        <Grid item xs={12} sm={6} key={field}>
          <TextField
            fullWidth
            label={field.replace(/([A-Z])/g, " $1")}
            name={field}
            value={data[field] || ""}
            onChange={handleInputChange}
          />
        </Grid>
      ))}

      {/* Guardian */}
      <Grid item xs={12}><strong>Guardian Details</strong></Grid>
      {["guardianName", "guardianPhone", "guardianEmail", "guardianAadharNum", "guardianEducation", "guardianOccupation"].map((field) => (
        <Grid item xs={12} sm={6} key={field}>
          <TextField
            fullWidth
            label={field.replace(/([A-Z])/g, " $1")}
            name={field}
            value={data[field] || ""}
            onChange={handleInputChange}
          />
        </Grid>
      ))}

      {/* Sibling */}
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              name="isSibling"
              checked={data.isSibling || false}
              onChange={handleInputChange}
            />
          }
          label="Is Sibling?"
        />
      </Grid>

      {showSiblingFields && (
        <>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              name="siblingClass"
              label="Sibling Class"
              value={data.siblingClass || ""}
              onChange={handleInputChange}
            >
              {classOptions.map((cls) => (
                <MenuItem key={cls} value={cls}>{cls}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              name="siblingName"
              label="Sibling Name"
              value={data.siblingName || ""}
              onChange={handleInputChange}
            >
              {studentNames.map((name) => (
                <MenuItem key={name} value={name}>{name}</MenuItem>
              ))}
            </TextField>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default StudentUsersFamilyDetails;
