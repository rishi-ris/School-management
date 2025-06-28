import React from "react";
import { Grid, TextField } from "@mui/material";

const documentFields = [
  "aadharCard", "panCard", "sssmid", "casteCertificate", "incomeCertificate",
  "domicileCertificate", "transferCertificate", "migrationCertificate",
  "characterCertificate", "previousMarksheet", "disabilityCertificate",
  "rationCard", "admissionForm", "passbook"
];

const StudentUsersDocuments = ({ data, onChange }) => {
  const handleInputChange = (e) => {
    onChange({ [e.target.name]: e.target.value });
  };

  return (
    <Grid container spacing={2} mt={1}>
      {documentFields.map((field) => (
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
    </Grid>
  );
};

export default StudentUsersDocuments;
