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
import Network from "../Application/Network";

const Logify = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("❌ Username and Password are required.");
      return;
    }

    try {
      console.log("➡️ Sending login request to the server...");
      const response = await Network.login(username, password);
      console.log("✅ Server Response:", response);

      if (response?.data) {
        setMessage("✅ Login Successful");
        console.log("Successful");
        navigate("/adminUser");
      } else {
        setMessage("❌ Wrong user password");
      }
    } catch (error) {
      setMessage("❌ server not found");
    }
  };

  return (
    <Box>
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
