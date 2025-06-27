import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

const Logify = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Role-wise user list
  const users = [
    { username: "Admin", password: "Admin123", role: "admin" },
    { username: "Teacher", password: "Teacher123", role: "teacher" },
    { username: "Student", password: "Student123", role: "student" },
    { username: "Parents", password: "Parents123", role: "parents" },
  ];
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Find matching user from array
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Based on role, show welcome
      if (user.role === "admin") {
        // alert("Welcome Admin");
        navigate("/adminUser");
      } else if (user.role === "teacher") {
        // alert("Welcome Teacher");
        navigate("/teachersUser");
      } else if (user.role === "student") {
        // alert("Welcome Student");
        navigate("/studentUsers");
      } else if (user.role === "parents") {
        // alert("Welcome Parents");
        navigate("/parentsUsers");
      } else {
        alert("Invalid login");
      }
    }
  };

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          height: 75,
         backgroundColor: 'var(--header-bg-color)',
          boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
        }}
      />

      <Container
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            p: { xs: 3, sm: 4 },
            borderRadius: 4,
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Login to Your Account
          </Typography>

          <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Box display="flex" justifyContent="flex-end" mt={1}>
              <Link href="#" underline="hover">
                Forgot password?
              </Link>
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              startIcon={<LoginIcon />}
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "1rem",
                 backgroundColor: 'var(--header-bg-color)',
                "&:hover": {
                  backgroundColor: 'var(--buttonHover-bg-color)',
                },
              }}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Logify;
