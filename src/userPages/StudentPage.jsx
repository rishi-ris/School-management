import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import AddStuButton from "./AddStuButton";
import StuTable from "./StuTable";
import StuDlgCard from "./StuDlgCard";
import Network from "../Application/Network";
import StuDlgDocUpload from "./StuDlgDocUpload";
import StudentFeesDlg from "./StudentFeesDlg";
import Sidekick from "../component/Sidekick";

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [documentDialogOpen, setDocumentDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newStudentId, setNewStudentId] = useState(null); // <-- NEW
  const [studentDocuments, setStudentDocuments] = useState(null);
  const [openFeesDetails, setOpenFeesDetails] = useState(false);
  const [feesDetails, setFeesDetails] = useState(null);
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await Network.getAllPendingFeesStudents();
      setStudents(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("⚠️ Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDetails = async (studentId) => {
  try {
    setLoading(true);
    const response = await Network.getStudentDetails(studentId); // Replace with your API
    const fullStudent = response.data;

    setEditingStudent(fullStudent);
    setNewStudentId(studentId);
    setDialogOpen(true);
  } catch (err) {
    console.error("⚠️ Error loading student:", err);
    alert("Failed to load student details.");
  } finally {
    setLoading(false);
  }
};
const handleFeesDetails = async (stuFeesDetails) => {
  console.log("Fetching fees details for student ID:", stuFeesDetails);
  try {
    setOpenFeesDetails(true);
    setFeesDetails(stuFeesDetails);
  } catch (err) {
    console.error("⚠️ Error loading student fees details:", err);
    alert("Failed to load student fees details.");
  } finally {
    setLoading(false);
  }
};
const handleDocumentsDetails = async (studentId) => {
  console.log("Fetching documents for student ID:", studentId);
  try {
    setLoading(true);
     setDocumentDialogOpen(true);
    const response = await Network.getStudentDocuments(studentId); // Replace with your API
    const studentDocuments = response.data;   
    setStudentDocuments(studentDocuments);
    setEditingStudent(studentId ? studentId : null); // Set student ID for document upload
    // console.log("Documents loaded:", studentDocuments);
    setNewStudentId(studentId);
    setDocumentDialogOpen(true);
  } catch (err) {
    console.error("⚠️ Error loading student documents:", err);
    alert("Failed to load student documents.");
  } finally {
    setLoading(false);
  }
};  

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSave = async (flatData) => {
    console.log("Saving student data:", flatData.family[0]);



    try {
      setLoading(true);
      await Network.createStudent(flatData);
      alert("✅ Student saved!");
      await fetchStudents();
      setDialogOpen(false);
      setSelectedStudent(null);
    } catch (error) {
      console.error("❌ Error saving student:", error);
      alert("❌ Failed to save student.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (student) => {
    console.log("Editing student:", student);
    setSelectedStudent(student);
    setDialogOpen(true);
  };

  return (
    <Box>
      <Sidekick/>
    
    <Box p={3}>
      
      <Box display="flex" justifyContent="space-between" mb={2}>
        
        <Typography variant="h4" fontWeight="bold">Student Table</Typography>
        <AddStuButton onClick={() => {
          setSelectedStudent(null);
          setDialogOpen(true);
        }} />
        
      </Box>
      

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress size={40} />
        </Box>
      ) : (
        <StuTable students={students} onEdit={handleDetails} documentsDetails={handleDocumentsDetails} payFees={handleFeesDetails} />
      )}

      <StuDlgCard
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedStudent(null);
          setNewStudentId(null);
          setEditingStudent(null);
              }}
          onSave={handleSave}
          student={editingStudent} // pass for edit
      />

      <StuDlgDocUpload
        open={documentDialogOpen}
        onClose={() => {
          setDocumentDialogOpen(false);
        }}
        docStudentId={newStudentId} // pass for edit
        documents={studentDocuments} // pass for edit
      />
      <StudentFeesDlg
        open={openFeesDetails}
        onClose={() => {
          setOpenFeesDetails(false);
        }}
        student={feesDetails} // pass for edit
      />
      
    </Box>
    </Box>
  );
};

export default StudentPage;