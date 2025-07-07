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
     console.log("Selected Role ID:", roleId.roleId);
     setOnRolesSelectChange(roleId.roleId);
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("❌ Username and Password are required.");
      return;
    }
//check if drop down is not selected show error message
    if (!onRolesSelectChange) {
      setMessage("❌ Please select a role.");
      return;
    }
 let response = {}; // Initialize response variable
    // Handle login based on selected role
    switch (onRolesSelectChange) {
      case 1: // Admin  
      response = await Network.login(username, password);
        setMessage("🔄 Logging in as Admin...");
        break;
      case 2: // Teacher
      response = await Network.login(username, password);
        setMessage("🔄 Logging in as Teacher...");
        break;  
      case 3: // Student
      response = await Network.studentLogin(username, password);
        setMessage("🔄 Logging in as Student...");
        break;
      case 4: // Parent
      response = await Network.login(username, password);
        setMessage("🔄 Logging in as Parent...");
        break;
      case 5: // Student
      response = await Network.studentLogin(username, password);
        setMessage("🔄 Logging in as Student...");
        break;
      default:  
        setMessage("❌ Invalid role selected.");
        return;
    }
    try {
     
      if (response.status === 200) {
        setMessage("✅ Login successful!");
        // Redirect based on role
        switch (onRolesSelectChange) {
          case 1:
            navigate("/adminUser");
            break;
          case 2:
            navigate("/teachersUser");
            break;
          case 3:
            navigate("/studentUser");
            break;
          case 4:
            navigate("/parentsusers");
            break;
          default:
            navigate("/");
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
    <Box>
      {/* Header box */}
      <Box
        sx={{
          width: "100%",
          height: 75,
          backgroundColor: "var(--header-bg-color)",
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
    </Box>
  );
};

export default Logify;
