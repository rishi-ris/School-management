import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, } from "@mui/material";
import CloseButton from "./CloseButton";
import StudentUsersPerDetail from "./StudentUsersPerDetail";
import StudentUsersFamilyDetails from "./StudentUsersFamilyDetails";
import StudentUsersDocuments from "./StudentUsersDocuments";
import StudentUsersPhotos from "./StudentUsersPhotos";
import StudentUsersComDetail from "./StudentUserComDetails";

const steps = ["Common Details","Personal Details", "Family Details", "Documents Details", "Upload Photos"];

const StudentUsersDialog = ({ open, onClose, onSave }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleChange = (newValues) => {
    setFormData((prev) => ({ ...prev, ...newValues }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
    setFormData({});
    setActiveStep(0);
  };

  const validateStep = (step) => {
    const stepFields = [
      ["caste", "religion", "nationality"],
      ["fatherName", "fatherPhone"],
      ["aadharCard", "panCard"],
      ["studentPhoto"]
    ];
    return stepFields[step].every((field) => formData[field]?.trim?.() !== "");
  };

  const getStepComponent = () => {
    switch (activeStep) {
      case 0:
        return <StudentUsersComDetail data={formData} onChange={handleChange} />
      case 1:
        return <StudentUsersPerDetail data={formData} onChange={handleChange} />;
      case 2:
        return <StudentUsersFamilyDetails data={formData} onChange={handleChange} />;
      case 3:
        return <StudentUsersDocuments data={formData} onChange={handleChange} />;
      case 4:
        return <StudentUsersPhotos data={formData} onChange={handleChange} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        Register Student :  {steps[activeStep]}
        <CloseButton onClick={onClose} />
      </DialogTitle>
      <DialogContent>{getStepComponent()}</DialogContent>
      <DialogActions>
        {activeStep > 0 && <Button onClick={handleBack}>Previous</Button>}
        {activeStep < steps.length - 1 ? (
          <Button onClick={handleNext} variant="contained">Next</Button>
        ) : (
          <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default StudentUsersDialog;
