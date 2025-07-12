import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import Network from "../Application/Network";
import Endpoints from "../Application/Endpoints";

const photoFields = [
  { name: "studentPhoto", label: "Student Photo" },
  { name: "fatherPhoto", label: "Father Photo" },
  { name: "motherPhoto", label: "Mother Photo" },
  { name: "guardianPhoto", label: "Guardian Photo" },
];

const StuPhotosDltDlg = ({ studentId, data = {}, onChange }) => {
  const [loading, setLoading] = useState({});
  const [localPreview, setLocalPreview] = useState({});
  const [backendPreview, setBackendPreview] = useState({});

  // ✅ Set preview from backend on dialog open
  useEffect(() => {
    const previews = {};

    if (data && typeof data === "object") {
      Object.entries(data).forEach(([docType, doc]) => {
        if (doc?.stuDocId) {
          previews[docType] = `${Endpoints.getStudentDocuments}/${studentId}/preview/${doc.stuDocId}`;
        }
      });
    }

    setBackendPreview(previews);
  }, [data, studentId]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const docType = e.target.name;

    if (!file || !studentId) return;

    const localURL = URL.createObjectURL(file);
    setLocalPreview((prev) => ({ ...prev, [docType]: localURL }));

    try {
      setLoading((prev) => ({ ...prev, [docType]: true }));

      const response = await Network.uploadStudentDocument(studentId, docType, file);
      console.log(`✅ Uploaded ${docType}`, response);

      if (response?.stuDocId) {
        const newBackendURL = `${Endpoints.getStudentDocuments}/${studentId}/preview/${response.stuDocId}`;
        setBackendPreview((prev) => ({ ...prev, [docType]: newBackendURL }));
      }

      if (onChange) onChange({ [docType]: file });

    } catch (err) {
      console.error(`❌ Failed to upload ${docType}:`, err.message);
    } finally {
      setLoading((prev) => ({ ...prev, [docType]: false }));
      e.target.value = null;
    }
  };

  const getPreviewURL = (docType) => {
    return localPreview[docType] || backendPreview[docType] || null;
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Upload Student Photos
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Photo Type</strong></TableCell>
            <TableCell><strong>Preview</strong></TableCell>
            <TableCell><strong>Upload / Change</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {photoFields.map(({ name, label }) => (
            <TableRow key={name}>
              <TableCell>{label}</TableCell>
              <TableCell>
                {getPreviewURL(name) ? (
                  <img
                    src={getPreviewURL(name)}
                    alt={label}
                    style={{ height: 80, borderRadius: 6 }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.png";
                    }}
                  />
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No photo uploaded
                  </Typography>
                )}
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  component="label"
                  disabled={loading[name]}
                >
                  {loading[name]
                    ? "Uploading..."
                    : getPreviewURL(name)
                    ? "Change"
                    : "Upload"}
                  <input
                    type="file"
                    name={name}
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StuPhotosDltDlg;
