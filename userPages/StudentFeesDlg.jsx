import React, { use, useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";


import StudentFeesDetails from "./StudentFeesDetails";

const StudentFeesDlg = ({ open, onClose, student }) => {
   
  const [docs, setDocuments] = useState({});
  const [photos, setPhotos] = useState({});

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Upload Student Documents</DialogTitle>
      <DialogContent dividers>
       
       <StudentFeesDetails
        student={student && student !== "not-found" ? student : null}
      />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">Cancel</Button>
       
      </DialogActions>
    </Dialog>
  );
};

export default StudentFeesDlg;
