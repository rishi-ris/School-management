import React from "react";
import { Grid, TextField } from "@mui/material";

const documentFields = [
  "aadharCard", "panCard", "sssmid", "casteCertificate", "incomeCertificate",
  "domicileCertificate", "transferCertificate", "migrationCertificate",
  "characterCertificate", "previousMarksheet", "disabilityCertificate",
  "rationCard", "admissionForm", "passbook"
];

const StuDocDlg = ({ data, onChange }) => {
  const handleInputChange = (e) => {
    onChange({ [e.target.name]: e.target.value });
  };

  return (
    <Grid container spacing={2} mt={1}>
      {documentFields.map((field) => (
        <Grid item xs={12} sm={6} key={field}>
          <TextField
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
    </Grid>
  );
};

export default StuDocDlg;
