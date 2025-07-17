import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import Network from "../Application/Network";
import Endpoints from "../Application/Endpoints";

const documentFields = {
  Photos: [
    "studentPhoto", "fatherPhoto", "motherPhoto", "guardianPhoto"
  ],
  Certificates: [
    "aadharCard", "panCard", "sssmid", "casteCertificate", "incomeCertificate",
    "domicileCertificate", "disabilityCertificate", "rationCard", "passbook"
  ],
  Academic: [
    "transferCertificate", "migrationCertificate", "characterCertificate",
    "previousMarksheet", "admissionForm"
  ]
};

const labelMap = (field) =>
  field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

const StuDocDlg = ({ studentId, data }) => {
  const [selectedFiles, setSelectedFiles] = useState({});

  const docMap = useMemo(() => {
    if (!Array.isArray(data)) return {};
    return data.reduce((acc, doc) => {
      if (doc?.docType) acc[doc.docType] = doc;
      return acc;
    }, {});
  }, [data]);

  const handleFileChange = async (e, docType) => {
    const file = e.target.files[0];
    if (!file) return;

    // ✅ Optional: Validate file size (limit: 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      e.target.value = null;
      return;
    }

    setSelectedFiles((prev) => ({
      ...prev,
      [docType]: file,
    }));

    const existingDoc = docMap[docType];
    try {
      if (existingDoc?.stuDocId) {
        await Network.updateStudentDocument(studentId, existingDoc.stuDocId, docType, file);
        console.log(`🔁 Updated ${docType}: ${file.name}`);
      } else {
        await Network.uploadStudentDocument(studentId, docType, file);
        console.log(`✅ Uploaded ${docType}: ${file.name}`);
      }
    } catch (err) {
      console.error(`❌ Failed to process ${docType}:`, err.message);
      alert(`Failed to upload ${labelMap(docType)}: ${err.message}`);
    }

    e.target.value = null;
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>Student Documents</Typography>
      <Divider sx={{ mb: 3 }} />

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>Document Type</strong></TableCell>
              <TableCell><strong>Upload</strong></TableCell>
              <TableCell><strong>Selected / Uploaded File</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.entries(documentFields).map(([section, fields]) => (
              <React.Fragment key={section}>
                <TableRow>
                  <TableCell colSpan={3} sx={{ backgroundColor: "#f5f5f5" }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {section}
                    </Typography>
                  </TableCell>
                </TableRow>
                {fields.map((field) => (
                  <TableRow key={field}>
                    <TableCell>{labelMap(field)}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        component="label"
                        size="small"
                        aria-label={`Upload ${labelMap(field)}`}
                      >
                        Choose File
                        <input
                          type="file"
                          hidden
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileChange(e, field)}
                        />
                      </Button>
                    </TableCell>
                    <TableCell>
                      {docMap[field]?.fileName ? (
                        <a
                          href={`${Endpoints.getStudentDocuments}/${studentId}/preview/${docMap[field].stuDocId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {docMap[field].fileName}
                        </a>
                      ) : selectedFiles[field]?.name ? (
                        selectedFiles[field].name
                      ) : (
                        <em>No file chosen</em>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default StuDocDlg;
  