import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidekick from "../component/Sidekick";
import RoleDropdown from "../component/RoleDropdown";
import Network from "../Application/Network";
import { Fade } from "@mui/material";
const TeachersUser = () => {
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState("");

  const handleViewProfile = (id) => {
    alert(`Viewing profile of teacher ID: ${id}`);
    // navigate(/teacher/profile/${id});
  };

  const onRolesSelect = (roleObj) => {
    const roleId = roleObj.roleId;
    setSelectedRoleId(roleId);

    Network.getAllUsersByRoleId(roleId)
      .then((res) => {
        setTeachers(res);
      })
      .catch((err) => {
        console.error("Error loading teachers:", err);
        setTeachers([]);
      });
  };

  return (
    <>
     
<Sidekick/>
      <Box display="flex" justifyContent="center" mt={4}>
        <TableContainer
          component={Paper}
          sx={{ maxWidth: 1250, width: "100%", boxShadow: 3 }}
        >
    
<Fade in={true} timeout={1000}>
  <Typography
    variant="h5"
    align="center"
    sx={{ backgroundColor: "var(--header-bg-color)", color: "white", py: 2 }}
  >
    Teacher Information Table
  </Typography>
</Fade>


          <Box px={2} py={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} width={200}>
                <RoleDropdown onSelect={onRolesSelect} />
              </Grid>
            </Grid>
          </Box>

          <Divider />

          <Table>
            <TableHead sx={{ backgroundColor: "var(--header-bg-color)", }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Name</TableCell>
                <TableCell sx={{ color: "white" }}>Subject</TableCell>
                <TableCell sx={{ color: "white" }}>Salary</TableCell>
                <TableCell sx={{ color: "white" }}>Phone</TableCell>
                <TableCell sx={{ color: "white" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers.length > 0 ? (
                teachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>{`${teacher.firstName || ""} ${teacher.lastName || ""}`}</TableCell>
                    <TableCell>{teacher.subject || "-"}</TableCell>
                    <TableCell>{teacher.salary || "-"}</TableCell>
                    <TableCell>{teacher.phone || teacher.mobile || "-"}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ m: 0.5,backgroundColor: "var(--button-bg-color)", }}
                        onClick={() => handleViewProfile(teacher.id)}
                      >
                        View Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Please select a role to load teachers.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default TeachersUser;