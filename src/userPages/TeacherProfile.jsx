import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
  Chip,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Sidekick from "../component/Sidekick";
import Network from "../Application/Network";
import { AuthContext } from "../auth/AuthProvider";

const TeacherProfile = () => {
  const { id } = useParams();       // URL se teacher id
  const [teacher, setTeacher] = useState(null);
  const {user} = useContext(AuthContext);
  const teacherRoleId = "3"; // Fixed role for teachers

  useEffect(() => {
    Network.getAllUsersByRoleId(teacherRoleId, user.data.data.schoolId)
      .then((res) => {
        if (Array.isArray(res)) {
          const selected = res.find((t) => String(t.id) === String(id));
          setTeacher(selected || null);
        }
      })
      .catch((err) => {
        console.error("Error loading teacher:", err);
        setTeacher(null);
      });
  }, [id]);

  return (
    <>
      <Sidekick />
      <Box
        sx={{
          backgroundColor: "#f5f6fa",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        {teacher ? (
          <Card
            sx={{
              maxWidth: 400,
              width: "100%",
              textAlign: "center",
              borderRadius: 4,
              boxShadow: "0 6px 25px rgba(0,0,0,0.15)",
              p: 3,
            }}
          >
            <Avatar
              alt={`${teacher.firstName} ${teacher.lastName}`}
              src={teacher.photo || ""}
              sx={{
                width: 120,
                height: 120,
                mx: "auto",
                mb: 2,
                border: "4px solid #1976d2",
              }}
            />

            <Typography variant="h5" fontWeight="bold">
              {teacher.firstName} {teacher.lastName}
            </Typography>

            {teacher.subject && (
              <Chip
                label={teacher.subject}
                color="primary"
                size="medium"
                sx={{ mt: 1 }}
              />
            )}

            <CardContent>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">
                <strong>Email:</strong> {teacher.email || "-"}
              </Typography>
              <Typography variant="body1">
                <strong>Phone:</strong>{" "}
                {teacher.contactNumber || teacher.phone || "-"}
              </Typography>
              <Typography variant="body1">
                <strong>Experience:</strong> {teacher.experience || "-"}
              </Typography>
              <Typography variant="body1">
                <strong>Qualification:</strong> {teacher.qualification || "-"}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Typography variant="h6" color="text.secondary">
            Loading teacher data...
          </Typography>
        )}
      </Box>
    </>
  );
};

export default TeacherProfile;