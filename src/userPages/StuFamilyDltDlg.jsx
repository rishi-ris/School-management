import React, { useState } from "react";
import {
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Box
} from "@mui/material";

const classOptions = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"];
const studentNames = ["Rashi", "Rishi", "Vishal", "Shainu", "Prachi"];

const StuFamilyDltDlg = ({ data, onChange }) => {
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
    <Box>
      <Grid container spacing={2} mt={1}>
      {/* Father */}
      <Box>
      <Grid item xs={12} sx={{fontWeight: "600", fontSize: "20px"}}>Father Details</Grid>
      {["fatherName", "fatherPhone", "fatherEmail", "fatherAadharNum", "fatherEducation", "fatherOccupation"].map((field) => (
        <Grid item xs={12} sm={6} key={field} >
          <TextField sx={{marginTop: 2}}
            fullWidth
            label={field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())
          .replace(/ (\w)/g, (_, c) => " " + c.toUpperCase())}
            name={field}
            value={data[field] || ""}
            onChange={handleInputChange}
          />
        </Grid>
      ))}
      </Box>

      {/* Mother */}
      <Box>
        <Grid item xs={12}  sx={{fontWeight: "600", fontSize: "20px"}}>Mother Details</Grid>
      {["motherName", "motherPhone", "motherEmail", "motherAadharNum", "motherEducation", "motherOccupation"].map((field) => (
        <Grid item xs={12} sm={6} key={field}>
          <TextField sx={{marginTop: 2}}
            fullWidth
             label={field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())
          .replace(/ (\w)/g, (_, c) => " " + c.toUpperCase())}
            name={field}
            value={data[field] || ""}
            onChange={handleInputChange}
          />
        </Grid>
      ))}
      </Box>

      {/* Guardian */}
      <Box >
      <Grid item xs={12}  sx={{fontWeight: "600", fontSize: "20px"}}>Guardian Details</Grid>
      {["guardianName", "guardianPhone", "guardianEmail", "guardianAadharNum", "guardianEducation", "guardianOccupation"].map((field) => (
        <Grid item xs={12} sm={6} key={field}>
          <TextField sx={{marginTop:2}}
            fullWidth
             label={field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())
          .replace(/ (\w)/g, (_, c) => " " + c.toUpperCase())}
            name={field}
            value={data[field] || ""}
            onChange={handleInputChange}
          />
        </Grid>
      ))}
      </Box>

      {/* Sibling */}
      <Box sx={{ display: "flex", flexDirection: "row"}}>
      <Grid sx={{ paddingTop: "19px",}}>
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
            <Grid item xs={6} >
            <TextField sx={{marginTop: 2, width: "220px", marginLeft: 5}}
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
            <TextField sx={{marginTop: 2,  width: "220px", marginLeft: 2}}
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
      </Box>
    </Grid>
    </Box>
  );
};

export default StuFamilyDltDlg;
