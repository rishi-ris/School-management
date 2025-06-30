import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import CloseButton from "./CloseButton";
import StuPersonalDltDlg from "./StuPersonalDltDlg";
import StuFamilyDltDlg from "./StuFamilyDltDlg";
import StuDocDlg from "./StuDocDlg";
import StuPhotosDltDlg from "./StuPhotosDltDlg";
import StuCommonDtlDlg from "./StuCommonDtlDlg";

const steps = [
  "Common Details",
  "Personal Details",
  "Family Details",
  "Documents Details",
  "Upload Photos",
];

const StuDlgCard = ({ open, onClose, onSave }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => prev + 1);
    } else {
      console.log("Please fill all required fields");
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
      // Step 0: Common Details
      [
        "userName",
        "password",
        "role",
        "gender",
        "rollNumber",
        "scholarNumber",
        "stu_class",
        "section",
        "firstName",
        "lastName",
        "contactNumber",
        "dOB",
        "address",
        "city",
        "state",
        "pinCode",
        "country",
        "status",
        "feesDiscount",
      ],
      // Step 1: Personal
      ["caste", "religion", "nationality", "motherTongue"],
      // Step 2: Family
      ["fatherName", "fatherPhone", "motherName", "guardianName"],
      // Step 3: Documents
      ["aadharCard", "panCard", "birthCertificate"],
      // Step 4: Photos
      ["studentPhoto"],
    ];

    const requiredFields = stepFields[step] || [];

    return requiredFields.every(
      (field) => formData[field]?.toString().trim() !== ""
    );
  };

  const getStepComponent = () => {
    switch (activeStep) {
      case 0:
        return (
          <StuCommonDtlDlg data={formData} onChange={handleChange} />
        );
      case 1:
        return (
          <StuPersonalDltDlg data={formData} onChange={handleChange} />
        );
      case 2:
        return (
          <StuFamilyDltDlg data={formData} onChange={handleChange} />
        );
      case 3:
        return (
          <StuDocDlg data={formData} onChange={handleChange} />
        );
      case 4:
        return (
          <StuPhotosDltDlg data={formData} onChange={handleChange} />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        Registration Student : {steps[activeStep]}
        <CloseButton onClick={onClose} />
      </DialogTitle>
      <DialogContent>{getStepComponent()}</DialogContent>
      <DialogActions>
        {activeStep > 0 && <Button onClick={handleBack}>Previous</Button>}
        {activeStep < steps.length - 1 ? (
          <Button onClick={handleNext} variant="contained">
            Next
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default StuDlgCard;
