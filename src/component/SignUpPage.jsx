import React from "react";
import {
  Box,
  TextField,
  Typography,
  Grid,
  Container,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Paper,
  Button,
} from "@mui/material";

export default function Rasisgtration() {
  const [country, setCountry] = React.useState("");

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    
      <Container sx={{ width: "45%", py: 5,    boxShadow: '5px 5px 35px rgba(0, 0, 0, 0.3)', mr:'2px',bgcolor:"rgb(138, 138, 138)"}}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Registration Form
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Please fill in the form below
          </Typography>

          <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
            {/* Full Name */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth required label="First Name" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth required label="Last Name" />
              </Grid>

              {/* Address */}
              <Grid item xs={12}>
                <TextField fullWidth required label="Street Address" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Street Address Line 2" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="City" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="State / Province" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Postal / Zip Code" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>city</InputLabel>
                  <Select
                    value={country}
                    onChange={handleCountryChange}
                    label="Country"
                  >
                    <MenuItem value="India">Sehore</MenuItem>
                    <MenuItem value="USA">Bhopal</MenuItem>
                    <MenuItem value="UK">Ujjain</MenuItem>
                    <MenuItem value="Other">Indore</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Contact Info */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Phone Number"
                  placeholder="(000) 000-0000"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="E-mail"
                  placeholder="ex: myname@example.com"
                />
              </Grid>

              <Button
                fullWidth
                type="submit"
                variant="contained"
               
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  backgroundColor: "darkorange",
                  "&:hover": {
                    backgroundColor: "orange",
                  },
                }}
              >
               Registration
              </Button>
            </Grid>
          </Box>
        </Paper>
      </Container>
   
  );
}

