import React from "react";
import { Grid, Typography, Button } from "@mui/material";

const photoFields = [
  { name: "studentPhoto", label: "Student Photo" },
  { name: "fatherPhoto", label: "Father Photo" },
  { name: "motherPhoto", label: "Mother Photo" },
  { name: "guardianPhoto", label: "Guardian Photo" }
];

const StuPhotosDltDlg = ({ data, onChange }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const { name } = e.target;

    if (file) {
      // You can replace URL.createObjectURL with file directly if sending to server
      onChange({ [name]: URL.createObjectURL(file) });
    }
  };

  return (
    <Grid container spacing={2} mt={1}>
      {photoFields.map(({ name, label }) => (
        <Grid item xs={12} sm={6} key={name}>
          <Typography variant="body2" gutterBottom>{label}</Typography>
          
          <Button
            variant="contained"
            component="label"
            fullWidth
          >
            {data[name] ? "Change Photo" : `Upload ${label}`}
            <input
              type="file"
              name={name}
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>

          {data[name] && (
            <img
              src={data[name]}
              alt={label}
              style={{ marginTop: 8, maxHeight: "100px", borderRadius: "8px", display: "block" }}
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default StuPhotosDltDlg;
