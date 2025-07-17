import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import StuCommonDtlDlg from "./StuCommonDtlDlg";
import StuPersonalDltDlg from "./StuPersonalDltDlg";
import StuFamilyDltDlg from "./StuFamilyDltDlg";
import StuDocDlg from "./StuDocDlg";
import StuPhotosDltDlg from "./StuPhotosDltDlg";

const StuDlgCard = ({ open, onClose, onSave, student }) => {
  const [commonData, setCommonData] = useState({});
  const [personalData, setPersonalData] = useState({});
  const [familyData, setFamilyData] = useState({});
  const [documents, setDocuments] = useState({});
  const [photos, setPhotos] = useState({});
  const [selectedClass, setSelectedClass] = useState({});
  const [selectedRole, setSelectedRole] = useState({});
  const [errors, setErrors] = useState({});

  const requiredCommonFields = [
    "username", "password", "gender", "rollNumber", "scholarNumber",
    "firstName", "lastName", "contactNumber", "dOB", "address", "city",
    "state", "pinCode", "country", "status", "feesDiscount", "totalFees",
  ];

  const requiredDocuments = [
    "aadharCard", "sssmid", "admissionForm", "casteCertificate", "previousMarksheet",
  ];

  const requiredFamilyFields = [
    "fatherName", "fatherOccupation", "fatherContactNumber",
    "motherName", "motherOccupation", "motherContactNumber",
  ];

  useEffect(() => {
    if (student) {
      setCommonData({ ...student });
      setFamilyData(student.family?.[0] || {});
      setPersonalData({ ...student });
      setDocuments({ ...student.documents });
      setPhotos({ ...student.photos });
      setSelectedClass(student.schoolClass);
      setSelectedRole(student.role);
    }
  }, [student]);

  const getTimestamp = () => new Date().toISOString();

  const handleSubmit = () => {
    let newErrors = {};

    // Common fields validation
    requiredCommonFields.forEach((field) => {
      if (!commonData[field]?.toString().trim()) {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase())} is required`;
      }
    });

    // Document validation
    requiredDocuments.forEach((docField) => {
      if (!documents[docField]?.toString().trim()) {
        newErrors[`doc_${docField}`] = `${docField.replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase())} is required`;
      }
    });

    // Family validation
    requiredFamilyFields.forEach((field) => {
      if (!familyData[field]?.toString().trim()) {
        newErrors[`family_${field}`] = `${field.replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase())} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => {
        const prevString = JSON.stringify(prev);
        const newString = JSON.stringify(newErrors);
        return prevString !== newString ? newErrors : prev;
      });
      return;
    }

    setErrors({});

    const transformedStudent = {
      ...commonData,
      caste: personalData.caste,
      religion: personalData.religion,
      nationality: personalData.nationality,
      motherToungue: personalData.motherToungue,
      isDisable: personalData.isDisable ?? null,
      sssmidNum: documents.sssmid ?? null,
      aadharCardNum: documents.aadharCard ?? null,
      rationCardNum: documents.rationCard ?? null,
      admissionFormNumber: documents.admissionForm ?? null,
      disabilityType: personalData.disabilityType ?? null,
      medicalHistory: personalData.medicalHistory || "None",
      apaarId: personalData.apaarId,
      registrationNumber: personalData.registrationNumber,
      enrollmentNumber: personalData.enrollmentNumber,
      bloodGroup: personalData.bloodGroup,
      className: selectedClass?.classId?.className,
      classId: selectedClass?.classId?.classId,
      role: selectedRole?.roleId,
      createdBy: "admin",
      createdAt: getTimestamp(),
      updatedAt: getTimestamp(),
      fees: [
        {
          totalFees: commonData.totalFees,
          paymentDate: getTimestamp().slice(0, 10),
          paymentMode: "cash",
          paymentRefNum: null,
          receivedBy: null,
          paidAmount: "0",
          status: "partial",
          createdAt: getTimestamp(),
          updatedAt: getTimestamp(),
        },
      ],
      family: [
        {
          ...familyData,
          createdBy: "admin",
        },
      ],
      documents: [
        {
          ...documents,
          createdBy: "admin",
          createdAt: getTimestamp(),
          updatedAt: getTimestamp(),
        },
      ],
      photos: {
        ...photos,
        createdBy: "admin",
        createdAt: getTimestamp(),
        updatedAt: getTimestamp(),
      },
    };

    onSave(transformedStudent);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography
          width={180}
          sx={{
            fontWeight: "bold",
            borderTopRightRadius: "50px",
            borderBottomRightRadius: "50px",
            padding: "5px",
            mt: 2,
            color: "white",
            backgroundColor: "#1976D2",
          }}
        >
          Add New Student
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <StuCommonDtlDlg
          data={commonData}
          onChange={(val) => setCommonData((prev) => ({ ...prev, ...val }))}
          onClassSelect={(cls) => setSelectedClass(cls)}
          onRoleSelect={(role) => setSelectedRole(role)}
          errors={errors}
        />

        <StuPersonalDltDlg
          data={personalData}
          onChange={(val) => setPersonalData((prev) => ({ ...prev, ...val }))}
          errors={errors}
          setErrors={setErrors}
        />

        <StuFamilyDltDlg
          data={familyData}
          onChange={(val) => setFamilyData((prev) => ({ ...prev, ...val }))}
          errors={errors}
          setErrors={setErrors}
        />

        <StuDocDlg
          data={documents}
          onChange={(val) => setDocuments((prev) => ({ ...prev, ...val }))}
          errors={errors}
        />

        {/* You can also add StuPhotosDltDlg here if needed */}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StuDlgCard;
