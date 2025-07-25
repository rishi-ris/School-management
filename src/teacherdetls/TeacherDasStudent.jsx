import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

import AddStuButton from "../userPages/AddStuButton";
import StuTable from "../userPages/StuTable";
import StuDlgCard from "../userPages/StuDlgCard";
import Network from "../Application/Network";
import StuDlgDocUpload from "../userPages/StuDlgDocUpload";
import StudentFeesDlg from "../userPages/StudentFeesDlg";
import Sidekick from "../component/Sidekick";
import { ToastContainer } from "react-toastify"; // ✅ Toast import
import "react-toastify/dist/ReactToastify.css"; // ✅ Toast CSS
import TeacherDasboard from "./TeacherDashboard";
import TeacherDashboardside from "./TeacherDasboardside";

const TeacherDasStudent = () => {
  const [students, setStudents] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [documentDialogOpen, setDocumentDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newStudentId, setNewStudentId] = useState(null);
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
      const response = await Network.getStudentDetails(studentId);
      const fullStudent = response;

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
    try {
      setLoading(true);
      setDocumentDialogOpen(true);
      const response = await Network.getStudentDocuments(studentId);
      const studentDocuments = response.data;
      setStudentDocuments(studentDocuments);
      setEditingStudent(studentId ? studentId : null);
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
    try {
      setLoading(true);
      flatData?.studentPin
        ? await Network.updateStudent(flatData)
        : await Network.createStudent(flatData);
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
    setSelectedStudent(student);
    setDialogOpen(true);
  };

  return (
    <Box p={3}>
      {/* Side Navigation or Info */}
   <TeacherDashboardside/>

      {/* Header Bar with Title and Add Button */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        maxWidth={1200}
        mx="auto"
        mt={8}
        p={2}
        border="2px solid #191818ff"
        borderRadius={2}
        sx={{
          background: "linear-gradient(to right, #f0f4ff, #ffffff)",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.1)",
            transform: "scale(1.01)",
          },
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            color: "#2c3e50",
            letterSpacing: "1px",
            fontFamily: "Roboto, sans-serif",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
              color: "#1a237e",
              cursor: "pointer",
            },
          }}
        >
          Student Table
        </Typography>

        <AddStuButton
          onClick={() => {
            setSelectedStudent(null);
            setDialogOpen(true);
          }}
        />
      </Box>

      {/* Loading Spinner */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress size={40} />
        </Box>
      ) : (
        // Student Table Component
        <Box mt={4}>
          <StuTable
            students={students}
            onEdit={handleDetails}
            documentsDetails={handleDocumentsDetails}
            payFees={handleFeesDetails}
          />
        </Box>
      )}

      {/* Student Registration Dialog */}
      <StuDlgCard
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedStudent(null);
          setNewStudentId(null);
          setEditingStudent(null);
        }}
        onSave={handleSave}
        student={editingStudent}
      />

      {/* Document Upload Dialog */}
      <StuDlgDocUpload
        open={documentDialogOpen}
        onClose={() => setDocumentDialogOpen(false)}
        docStudentId={newStudentId}
        documents={studentDocuments}
      />

      {/* Fees Details Dialog */}
      <StudentFeesDlg
        open={openFeesDetails}
        onClose={() => setOpenFeesDetails(false)}
        student={feesDetails}
      />

      {/* Toast Notifications */}
      <ToastContainer
        position="top-center"
        autoClose={100000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastStyle={{
          fontSize: "16px",
          fontWeight: "500",
          borderRadius: "10px",
          padding: "12px 20px",
          background: "rgb(67, 78, 243)",
          color: "#fff",
          boxShadow: "0px 3px 10px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      />
    </Box>
  );
};


export default TeacherDasStudent;
