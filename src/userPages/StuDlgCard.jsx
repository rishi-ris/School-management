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

const StuDlgCard = ({ open, onClose, onSave, student }) => {
  const [commonData, setCommonData] = useState({});
  const [personalData, setPersonalData] = useState({});
  const [familyData, setFamilyData] = useState({});
  const [documents, setDocuments] = useState({});
  const [photos, setPhotos] = useState({});
  const [selectedClass, setSelectedClass] = useState({});
  const [selectedRole, setSelectedRole] = useState({});

  useEffect(() => {
    console.log("Received student data:", student);
    if (student) {
      setCommonData({
        username: student.username,
        password: student.password,
        gender: student.gender,
        rollNumber: student.rollNumber,
        scholarNumber: student.scholarNumber,
        firstName: student.firstName, 
        lastName: student.lastName,
        contactNumber: student.contactNumber,
        // dob: student.dob,
        dOB: student.dOB,
        address: student.address,
        city: student.city,
        state: student.state,
        pinCode: student.pinCode,
        country: student.country,
        status: student.status,
        feesDiscount: student.feesDiscount,
        totalFees: student.totalFees,
        prevSchool: student.prevSchool,
        prevEduBoard: student.prevEduBoard,
        isDisable: student.isDisable,
        createdBy: student.createdBy,
        createdAt: student.createdAt,
        updatedAt: student.updatedAt,
        schoolClass: student.schoolClass,
        role: student.role,
        fees: student.fees || [],
        
        documents: student.documents || [],
        photos: student.photos || {}
      });
setFamilyData(student.family && student.family.length > 0 ? student.family[0] : {
        fatherName: "",
        fatherOccupation: "",
        fatherContactNumber: "",
        fatherEmail: "",
        motherName: "",
        motherOccupation: "",
        motherContactNumber: "",
        motherEmail: "",
        guardianName: null,
        guardianOccupation: null,
        guardianContactNumber: null,
        guardianEmail: null,
        guardianRelation: null,
        createdBy: "admin"
      }); 
      setPersonalData({
        caste: student.caste,
        religion: student.religion,
        nationality: student.nationality,
        motherToungue: student.motherToungue,
        isDisable: student.isDisable,
        sssmidNum: student.sssmidNum,
        aadharCardNum: student.aadharCardNum,
        rationCardNum: student.rationCardNum,
        admissionFormNumber: student.admissionFormNumber,
        disabilityType: student.disabilityType,
        apaarId: student.apaarId,
        prevSchool: student.prevSchool,
        prevEduBoard: student.prevEduBoard,
        registrationNumber: student.registrationNumber,
        enrollmentNumber: student.enrollmentNumber,
        bloodGroup: student.bloodGroup,
        medicalHistory: student.medicalHistory,
        createdBy: student.createdBy
      });

      setDocuments({ ...student.documents });
      setPhotos({ ...student.photos });

      setSelectedClass(student.schoolClass);
      setSelectedRole(student.role);
    }
  }, [student]);

  const getTimestamp = () => new Date().toISOString();

  const handleSubmit = () => {
    console.log("Submitting student data:", familyData);
    const transformedStudent = {
      username: commonData.username,
      password: commonData.password,
      gender: commonData.gender,
      rollNumber: commonData.rollNumber,
      scholarNumber: commonData.scholarNumber,
      schoolClass: selectedClass.classId,
      className: selectedClass.classId.classId,
      classId: selectedClass.classId.classId,
      role: selectedRole.roleId,
      firstName: commonData.firstName,
      lastName: commonData.lastName,
      contactNumber: commonData.contactNumber,
      dOB: formatDate(commonData.dOB),
      // dob: formatDate(commonData.dob),/
      address: commonData.address,
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
      currentEduBoard: personalData.prevEduBoard ?? null,
      feesDiscount: commonData.feesDiscount ?? null,
      medicalHistory: personalData.medicalHistory || "None",
      apaarId: personalData.apaarId,
      prevSchool: personalData.prevSchool,
      prevEduBoard: personalData.prevEduBoard,
      registrationNumber: personalData.registrationNumber,
      enrollmentNumber: personalData.enrollmentNumber,
      bloodGroup: personalData.bloodGroup,
      city: commonData.city,
      state: commonData.state,
      pinCode: commonData.pinCode,
      country: commonData.country,
      status: commonData.status,
      createdBy: "admin",
      createdAt: getTimestamp(),
      updatedAt: getTimestamp(),
      totalFees: commonData.totalFees,

      fees: [
        {
          totalFees: commonData.totalFees,
          paymentDate: "2024-06-15",
          paymentMode: "cash",
          paymentRefNum: null,
          receivedBy: null,
          paidAmount: "0",
          status: "partial",
          createdAt: getTimestamp(),
          updatedAt: getTimestamp()
        }
      ],

      family: [
  {
    

    fatherName: familyData.fatherName || "",
    fatherOccupation: familyData.fatherOccupation || "",
    fatherPhone: familyData.fatherPhone || "",
    fatherEmail: familyData.fatherEmail || "",
    fatherAadharNum: familyData.fatherAadharNum || null,
    fatherEducation: familyData.fatherEducation || null,

    motherAadharNum: familyData.motherAadharNum || null,
    motherName: familyData.motherName || "",
    motherOccupation: familyData.motherOccupation || "",
    motherPhone: familyData.motherPhone || "",
    motherEmail: familyData.motherEmail || "",
    motherEducation: familyData.motherEducation || null,

    guardianName: familyData.guardianName || null,
    guardianOccupation: familyData.guardianOccupation || null,
    guardianPhone: familyData.guardianPhone || null,
    guardianEmail: familyData.guardianEmail || null,
    guardianRelation: familyData.guardianRelation || null,
    guardianAadharNum: familyData.guardianAadharNum || null,
    guardianEducation: familyData.guardianEducation || null,
    isSibling: familyData.isSibling || null,
    siblingDetails: familyData.siblingDetails || null,
   createdBy: "admin"
  }
],

      documents: [{
        aadharCard: documents.aadharCard,
        panCard: documents.panCard,
        sssmid: documents.sssmid,
        casteCertificate: documents.casteCertificate,
        incomeCertificate: documents.incomeCertificate,
        domicileCertificate: documents.domicileCertificate,
        transferCertificate: documents.transferCertificate,
        migrationCertificate: documents.migrationCertificate,
        characterCertificate: documents.characterCertificate,
        previousMarksheet: documents.previousMarksheet,
        disabilityCertificate: documents.disabilityCertificate,
        rationCard: documents.rationCard,
        admissionForm: documents.admissionForm,
        passbook: documents.passbook,
        createdBy: "admin",
        createdAt: getTimestamp(),
        updatedAt: getTimestamp()
      }],

      photos: {
        studentPhoto: photos.studentPhoto,
        fatherPhoto: photos.fatherPhoto,
        motherPhoto: photos.motherPhoto ?? null,
        guardianPhoto: photos.guardianPhoto ?? null,
        createdBy: "admin",
        createdAt: getTimestamp(),
        updatedAt: getTimestamp()
      }
    };

    onSave(transformedStudent);
  };
// ✅ Format date from yyyy-mm-dd to dd/MM/yyyy
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add New Student</DialogTitle>
      <DialogContent dividers>
        <StuCommonDtlDlg
          data={commonData}
          onChange={(val) => setCommonData((prev) => ({ ...prev, ...val }))}
          onClassSelect={(cls) => {console.log("Selected class 1:", cls); setSelectedClass(cls);}}
          onRoleSelect={(role) => {console.log("Selected role:", role); setSelectedRole(role);}}
        />
        <StuPersonalDltDlg
          data={personalData}
          onChange={(val) => setPersonalData((prev) => ({ ...prev, ...val }))}
        />
        <StuFamilyDltDlg
          data={familyData}
          onChange={(val) => setFamilyData((prev) => ({ ...prev, ...val }))}
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
