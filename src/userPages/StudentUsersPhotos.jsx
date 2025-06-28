import React from "react";
import { Grid, Typography, Input } from "@mui/material";

const photoFields = [
  { name: "studentPhoto", label: "Student Photo" },
  { name: "fatherPhoto", label: "Father Photo" },
  { name: "motherPhoto", label: "Mother Photo" },
  { name: "guardianPhoto", label: "Guardian Photo" }
];

const StudentUsersPhotos = ({ data, onChange }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange({ [e.target.name]: URL.createObjectURL(file) }); // temporary preview
    }
  };

  return (
    <Grid container spacing={2} mt={1}>
      {photoFields.map(({ name, label }) => (
        <Grid item xs={12} sm={6} key={name}>
          <Typography variant="body2" gutterBottom>{label}</Typography>
          <Input type="file" name={name} onChange={handleFileChange} fullWidth />
          {data[name] && (
            <img
              src={data[name]}
              alt={label}
              style={{ marginTop: 8, maxHeight: "100px", borderRadius: "8px" }}
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default StudentUsersPhotos;
