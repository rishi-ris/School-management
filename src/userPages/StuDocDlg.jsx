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
} from "@mui/material";
import Network from "../Application/Network";
import Endpoints from "../Application/Endpoints";

// All expected document types
const documentFields = [
  "studentPhoto", "fatherPhoto",  "motherPhoto",  "guardianPhoto",
  "aadharCard", "panCard", "sssmid", "casteCertificate", "incomeCertificate",
  "domicileCertificate", "transferCertificate", "migrationCertificate",
  "characterCertificate", "previousMarksheet", "disabilityCertificate",
  "rationCard", "admissionForm", "passbook"
];



// Converts camelCase to readable label
const labelMap = (field) =>
  field
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());

const StuDocDlg = ({ studentId, data }) => {
  const [selectedFiles, setSelectedFiles] = useState({});

  // Create a map of uploaded docs for quick lookup
  const docMap = useMemo(() => {
    if (!Array.isArray(data)) return {};
    return data.reduce((acc, doc) => {
      if (doc?.docType) {
        acc[doc.docType] = doc;
      }
      return acc;
    }, {});
  }, [data]);

  const handleFileChange = async (e, docType) => {
    const file = e.target.files[0];
    if (!file) return;

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
    }

    e.target.value = null;
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Upload Student Documents
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Document Type</strong></TableCell>
            <TableCell><strong>Upload</strong></TableCell>
            <TableCell><strong>Selected / Uploaded File</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documentFields.map((field) => (
            <TableRow key={field}>
              <TableCell>{labelMap(field)}</TableCell>

              <TableCell>
                <Button variant="outlined" component="label">
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
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StuDocDlg;
