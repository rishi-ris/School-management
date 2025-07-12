import React, { useEffect, useState } from "react";
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
import Network from "../Application/Network";
import RoleDropdown from "./RoleDropdown";

const Logify = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [onRolesSelectChange, setOnRolesSelectChange] = useState("");

  const onRolesSelect = (roleId) => {
    setOnRolesSelectChange(roleId.roleId);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("❌ Username and Password are required.");
      return;
    }

    if (!onRolesSelectChange) {
      setMessage("❌ Please select a role.");
      return;
    }

    let response = {};
    switch (onRolesSelectChange) {
      case 1:
      case 2:
      case 4:
        response = await Network.login(username, password);
        break;
      case 3:
      case 5:
        response = await Network.studentLogin(username, password);
        break;
      default:
        setMessage("❌ Invalid role selected.");
        return;
    }

    try {
      if (response.status === 200) {
        setMessage("✅ Login successful!");
        switch (onRolesSelectChange) {
          case 1: navigate("/adminUser"); break;
          case 2: navigate("/teachersUser"); break;
          case 3: navigate("/studentUser"); break;
          case 4: navigate("/parentsusers"); break;
          default: navigate("/");
        }
      } else {
        setMessage("❌ Invalid username or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("❌ An error occurred during login.");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Box
        sx={{
          width: "100%",
          height: 75,
          backgroundColor: "var(--header-bg-color)",
          boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
        }}
      />

      {/* Login Form */}
      <Container
        maxWidth="sm"
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
        }}
      >
        <Paper elevation={6} sx={{ width: "100%", p: 4, borderRadius: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Login to Your Account
          </Typography>
          <RoleDropdown onSelect={onRolesSelect} />
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
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
                backgroundColor: "var(--header-bg-color)",
              }}
            >
              Login
            </Button>
            <Typography align="center" mt={2} color="error">
              {message}
            </Typography>
          </Box>
        </Paper>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          py: 2,
          textAlign: "center",
          backgroundColor: "#f1f1f1",
          borderTop: "1px solid #ccc",
        }}
      >
        <Typography variant="body2">
    © {new Date().getFullYear()} All Rights Reserved —{" "}
    <Link
      href="https://arpanasoftwaressolution.co.in"
      target="_blank"
      rel="noopener noreferrer"
      underline="hover"
      sx={{ fontWeight: "bold" }}
    >
      Arpana Infotech Solutions
    </Link>
  </Typography>
      </Box>
    </Box>
  );
};

export default Logify;
