import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import StuCommonDtlDlg from "./StuCommonDtlDlg";
import StuPersonalDltDlg from "./StuPersonalDltDlg";
import StuFamilyDltDlg from "./StuFamilyDltDlg";
import StuDocDlg from "./StuDocDlg";

const StuDlgCard = ({ open, onClose, onSave, student }) => {
  const [commonData, setCommonData] = useState({});
  const [personalData, setPersonalData] = useState({});
  const [familyData, setFamilyData] = useState({});
  const [documents, setDocuments] = useState({});
  const [photos, setPhotos] = useState({});
  const [selectedClass, setSelectedClass] = useState({});
  const [selectedRole, setSelectedRole] = useState({});
  const [errors, setErrors] = useState({});

  const dialogContentRef = useRef(null);

  const requiredCommonFields = [
    "username", "password", "gender", "rollNumber", "scholarNumber",
    "firstName", "lastName", "contactNumber", "dob", "address", "city",
    "state", "pinCode", "country", "status", "feesDiscount", "totalFees",
  ];

  const requiredFamilyFields = [
    "fatherName", "fatherOccupation", "fatherPhone",
    "motherName", "motherOccupation", "motherPhone",
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

  const scrollToFirstError = (errorKeys) => {
    if (!dialogContentRef.current) return;
    for (const key of errorKeys) {
      const field = dialogContentRef.current.querySelector(`[name="${key}"]`);
      if (field) {
        field.scrollIntoView({ behavior: "smooth", block: "center" });
        field.focus();
        break;
      }
    }
  };

  const beautify = (field) =>
    field
      .replace(/^family_/, "")
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (c) => c.toUpperCase());

  const handleSubmit = () => {
    let newErrors = {};
    let missingFields = [];

    requiredCommonFields.forEach((field) => {
      if (!commonData[field]?.toString().trim()) {
        newErrors[field] = `${beautify(field)} is required`;
        missingFields.push(beautify(field));
      }
    });

    if (!selectedClass?.classId?.classId) {
      newErrors.classId = "Class selection is required";
      missingFields.push("Class");
    }

    if (!commonData?.dob) {
      newErrors.dob = "Date of Birth is required";
      missingFields.push("Date of Birth");
    }

    requiredFamilyFields.forEach((field) => {
      const key = `family_${field}`;
      if (!familyData[field]?.toString().trim()) {
        newErrors[key] = `${beautify(key)} is required`;
        missingFields.push(beautify(key));
      }
    });

    ["fatherPhone", "motherPhone"].forEach((field) => {
      const phone = familyData[field];
      const key = `family_${field}`;
      if (phone && !/^[6-9]\d{9}$/.test(phone)) {
        newErrors[key] = `${beautify(key)} must start with 6-9 and be 10 digits`;
        missingFields.push(beautify(key));
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => {
        const prevStr = JSON.stringify(prev);
        const newStr = JSON.stringify(newErrors);
        if (prevStr !== newStr) {
          setTimeout(() => scrollToFirstError(Object.keys(newErrors)), 100);
        }
        return newErrors;
      });

      toast.error(
        `❌ Please fill: ${missingFields.slice(0, 5).join(", ")}${
          missingFields.length > 5 ? ", ..." : ""
        }`,
        {
          autoClose: 5000,
          position: "top-center",
        }
      );
      return;
    }

    setErrors({});
    toast.success("✅ Student details submitted successfully!", {
      autoClose: 4000,
      position: "top-center",
    });

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
      schoolClass: {
        classId: selectedClass?.classId?.classId,
      },
      role: {
        roleId: selectedRole?.roleId,
      },
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
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="paper">
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

      <DialogContent dividers ref={dialogContentRef}>
        <StuCommonDtlDlg
          data={commonData}
          onChange={(val) => setCommonData((prev) => ({ ...prev, ...val }))}
          onClassSelect={(cls) => setSelectedClass(cls)}
          onRoleSelect={(role) => setSelectedRole(role)}
          errors={errors}
          setErrors={setErrors}
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
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StuDlgCard;
