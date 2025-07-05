import React, { useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import Network from "../Application/Network";

const documentFields = [
  "aadharCard", "panCard", "sssmid", "casteCertificate", "incomeCertificate",
  "domicileCertificate", "transferCertificate", "migrationCertificate",
  "characterCertificate", "previousMarksheet", "disabilityCertificate",
  "rationCard", "admissionForm", "passbook"
];

const labelMap = (field) =>
  field
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .replace(/ (\w)/g, (_, c) => " " + c.toUpperCase());

const StuDocDlg = ({ studentId }) => {
  const [selectedFiles, setSelectedFiles] = useState({});

  const handleFileChange = async (e, docType) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    await Network.uploadStudentDocument(1, docType, file);
    console.log(`✅ Uploaded ${docType}: ${file.name}`);
  } catch (err) {
    console.error(`❌ Upload failed for ${docType}:`, err.message);
  }
  e.target.value = null; // Clear file input
};


  return (
    <Grid container spacing={2} mt={1}>
      {documentFields.map((field) => (
        <Grid item xs={12} sm={6} key={field}>
          <Typography variant="body2" gutterBottom>
            {labelMap(field)}
          </Typography>

          <Button variant="outlined" component="label" fullWidth>
            {selectedFiles[field]?.name || `Upload ${labelMap(field)}`}
            <input
              type="file"
              name={field}
              hidden
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, field)}
            />
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default StuDocDlg;
