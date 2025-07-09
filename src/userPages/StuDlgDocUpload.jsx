
import React, { use, useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import StuCommonDtlDlg from "./StuCommonDtlDlg";
import StuPersonalDltDlg from "./StuPersonalDltDlg";
import StuFamilyDltDlg from "./StuFamilyDltDlg";
import StuDocDlg from "./StuDocDlg";
import StuPhotosDltDlg from "./StuPhotosDltDlg";

const StuDlgDocUpload = ({ open, onClose, docStudentId, documents }) => {
   
  const [docs, setDocuments] = useState({});
  const [photos, setPhotos] = useState({});

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Upload Student Documents</DialogTitle>
      <DialogContent dividers>
       
        <StuDocDlg
          data={documents}
          studentId={docStudentId}
          onChange={(val) => setDocuments((prev) => ({ ...prev, ...val }))}
        />
        {/* <StuPhotosDltDlg
          data={documents}
          studentId={docStudentId}
          onChange={(val) => setPhotos((prev) => ({ ...prev, ...val }))}
        /> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">Cancel</Button>
       
      </DialogActions>
    </Dialog>
  );
};

export default StuDlgDocUpload;
