import React, { useEffect, useState } from "react";
import AddStuButton from "./AddStuButton";
import StuTable from "./StuTable";
import StuDlgCard from "./StuDlgCard";
import { Box, Typography } from "@mui/material";
import Network from "../Application/Network";

const StudentPage = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      userName: "rahul123",
      password: "pass123",
      gender: "Male",
      rollNumber: "101",
      contactNumber: "9876543210",
      stu_class: "10th",
      section: "A",
      feesStatus: "Unpaid",
    },
    {
      id: 2,
      userName: "priya456",
      password: "abc123",
      gender: "Female",
      rollNumber: "102",
      contactNumber: "9123456780",
      stu_class: "9th",
      section: "B",
      feesStatus: "Paid",
    },
    {
      id: 3,
      userName: "amit001",
      password: "amitpass",
      gender: "Male",
      rollNumber: "103",
      contactNumber: "9001234567",
      stu_class: "8th",
      section: "A",
      feesStatus: "Unpaid",
    },
    {
      id: 4,
      userName: "sana999",
      password: "sana@123",
      gender: "Female",
      rollNumber: "104",
      contactNumber: "9823456789",
      stu_class: "10th",
      section: "C",
      feesStatus: "Paid",
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    Network.getAllStudents()
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("⚠️ Error fetching students:", error);
      });
  }, []);

  const handleSave = (newStudent) => {
    Network.createStudent(newStudent)
      .then((response) => {
        setStudents((prev) => [...prev, { ...newStudent, id: prev.length + 1 }]);
        setDialogOpen(false);
      })
      .catch((error) => {
        console.error("⚠️ Error creating student:", error);
      });
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4" fontWeight="bold">
          Student Table
        </Typography>
        <AddStuButton onClick={() => setDialogOpen(true)} />
      </Box>

      <StuTable students={students} />

      <StuDlgCard
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={(newStudent) => handleSave(newStudent)}
      />
    </Box>
  );
};

export default StudentPage;
