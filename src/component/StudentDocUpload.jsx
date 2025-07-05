// components/StudentDocUpload.jsx
import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import Network from "../Application/Network";

const documentFields = [
  "aadharCard", "panCard", "sssmid", "casteCertificate", "incomeCertificate",
  "domicileCertificate", "transferCertificate", "migrationCertificate",
  "characterCertificate", "previousMarksheet", "disabilityCertificate",
  "rationCard", "admissionForm", "passbook"
];

const StudentDocUpload = ({ studentId }) => {
 const handleFileChange = async (e, docType) => {
  console.log(`📂 Selected file for ${docType}:`, e.target.files[0]?.name);
  const file = e.target.files[0];
  if (!file) return;

  try {
    await Network.uploadStudentDocument(studentId, docType, file);
    console.log(`✅ Uploaded ${docType}:`, file.name);
  } catch (err) {
    console.error(`❌ Upload failed for ${docType}:`, err.response?.data || err.message);
  }

  e.target.value = null; // Reset to allow same file upload again
};


  return (
    <Grid container spacing={2}>
      {documentFields.map((field) => (
        <Grid item xs={12} sm={6} key={field}>
          <Typography variant="body2" gutterBottom>
            {field.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())}
          </Typography>
          <Button variant="outlined" component="label" fullWidth>
            Upload {field}
           <input
  type="file"
  accept=".pdf,.jpg,.png"
  onChange={(e) => handleFileChange(e, field)}
/>
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default StudentDocUpload;
