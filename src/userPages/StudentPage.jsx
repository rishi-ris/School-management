import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import AddStuButton from "./AddStuButton";
import StuTable from "./StuTable";
import StuDlgCard from "./StuDlgCard";
import Network from "../Application/Network";
import StuDlgDocUpload from "./StuDlgDocUpload";
import StudentFeesDlg from "./StudentFeesDlg";
import Sidekick from "../component/Sidekick";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentPage = () => {
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
  const [formErrors, setFormErrors] = useState(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await Network.getAllPendingFeesStudents();
      setStudents(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("⚠️ Error fetching students:", error);
      toast.error("❌ Error fetching students.");
    } finally {
      setLoading(false);
    }
  };

  const handleDetails = async (studentId) => {
    try {
      setLoading(true);
      const response = await Network.getStudentDetails(studentId);
      setEditingStudent(response);
      setNewStudentId(studentId);
      setDialogOpen(true);
    } catch (err) {
      console.error("⚠️ Error loading student:", err);
      toast.error("❌ Failed to load student details.");
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
      toast.error("❌ Failed to load student fees details.");
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentsDetails = async (studentId) => {
    try {
      setLoading(true);
      setDocumentDialogOpen(true);
      const response = await Network.getStudentDocuments(studentId);
      setStudentDocuments(response.data);
      setEditingStudent(studentId || null);
      setNewStudentId(studentId);
    } catch (err) {
      console.error("⚠️ Error loading student documents:", err);
      toast.error("❌ Failed to load student documents.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ UPDATED handleSave to return true/false
  const handleSave = async (flatData) => {
    try {
      setLoading(true);
      setFormErrors(null);

      const response = flatData?.studentPin
        ? await Network.updateStudent(flatData)
        : await Network.createStudent(flatData);

      alert("✅ Student saved successfully!");
      toast.success("✅ Student saved successfully!", {
        autoClose: 4000,
        position: "top-center",
      });

      await fetchStudents();

      setDialogOpen(false);
      setSelectedStudent(null);
      setEditingStudent(null);
      setNewStudentId(null);
      setFormErrors(null);

      return true; // ✅ Save was successful
    } catch (error) {
      let errors = null;
      if (error?.response?.data?.errors) {
        errors = error.response.data.errors;
      } else if (error.message) {
        errors = { general: error.message };
      } else {
        errors = { general: "Unknown error occurred" };
      }

      setFormErrors(errors);

      const errorMessage =
        typeof errors === "string"
          ? errors
          : Object.values(errors).flat().join(", ");

   console.log("*****hellooo*****",errorMessage )
      toast.error("❌ " + errorMessage, {
        autoClose: 5000,
        position: "top-center",
      });

      return false; // ❌ Save failed
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
      <Sidekick />

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
            setEditingStudent(null);
            setDialogOpen(true);
          }}
        />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress size={40} />
        </Box>
      ) : (
        <Box mt={4}>
          <StuTable
            students={students}
            onEdit={handleDetails}
            documentsDetails={handleDocumentsDetails}
            payFees={handleFeesDetails}
          />
        </Box>
      )}

      <StuDlgCard
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedStudent(null);
          setNewStudentId(null);
          setEditingStudent(null);
          setFormErrors(null);
        }}
        onSave={handleSave} // ✅ now returns true/false
        student={editingStudent}
        formErrors={formErrors}
      />

      <StuDlgDocUpload
        open={documentDialogOpen}
        onClose={() => setDocumentDialogOpen(false)}
        docStudentId={newStudentId}
        documents={studentDocuments}
      />

      <StudentFeesDlg
        open={openFeesDetails}
        onClose={() => setOpenFeesDetails(false)}
        student={feesDetails}
      />

      <ToastContainer
        position="top-center"
        autoClose={10000}
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

export default StudentPage;
