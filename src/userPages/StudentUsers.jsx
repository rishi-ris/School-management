import React, { useState } from "react";
import AddStudentButton from "./AddStudentButton";
import StudentTable from "./StudentUsersTable";
import StudentDialog from "./StudentUsersDialog";

import { Box, Typography ,} from "@mui/material";


const StudentUsers = () => {

    const [students, setStudents] = useState([
      {
        name: "Aman Sharma",
        roll: "101",
        fees: 1000,
        class: "10th",
        attendance: "95%",
        holidays: 2
      },
      {
        name: "Sneha Gupta",
        roll: "102",
        fees: 1200,
        class: "9th",
        attendance: "97%",
        holidays: 1
      }
    ]);
  
    const [dialogOpen, setDialogOpen] = useState(false);
  
    const handleAddStudent = (newStudent) => {
      setStudents([...students, newStudent]);
    };

  return (
    <Box>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Student Table
              </Typography>
              <AddStudentButton onClick={() => setDialogOpen(true)} />
            </Box>
            <StudentTable students={students} />
            <StudentDialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            onSave={handleAddStudent}/>
          </Box>
  );
};

export default StudentUsers;
