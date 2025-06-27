import React, { useState, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
  TextField,
  Paper,
  Slide,
} from "@mui/material";
import StudentFeesDetails from "./StudentFeesDetails";

const dummyData = [
  {
    roll: "101",
    name: "Rishi",
    class: "10",
    section: "A",
    total: "5000",
    paid: "3000",
    due: "2000",
  },
  {
    roll: "102",
    name: "Anshika",
    class: "9",
    section: "B",
    total : "4500",
    paid: "4500",
    due: "0",
  },
  {
    roll: "103",
    name: "Vishal",
    class: "8",
    section: "A",
    total: "4500",
    paid: "2000",
    due: "2500",
  },
  {
    roll: "104",
    name: "Manisha",
    class: "7",
    section: "C",
    total: "4500",
    paid: "500",
    due: "4000",
  },
  {
    roll: "105",
    name: "Ju",
    class: "6",
    section: "B",
    total: "4500",
    paid: "4500",
    due: "0",
  },
];

const FeesPage = () => {
  const [roll, setRoll] = useState("");
  const [className, setClassName] = useState("");
  const [classSection, setClassSection] = useState("");
  const [result, setResult] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [slideKey, setSlideKey] = useState(0);

  const handleSubmit = () => {
    const filtered = dummyData.find(
      (item) =>
        item.roll === roll.trim() &&
        item.class === className.trim() &&
        (item.section ? item.section.toLowerCase() : "") === classSection.trim().toLowerCase()
    );
    setResult(filtered || "not-found");
    setShowDetails(!!filtered);
    setSlideKey((prev) => prev + 1); // force Slide to remount for animation
  };

  return (
    <Box sx={{ width: '100vw', height: '100vh', m: 0, p: 0, overflow: 'hidden', background: '#f9f9f9' }}>
      <AppBar position="static" color="primary" sx={{ zIndex: 1201, border: "1px solid black"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Shiksha Portal
          </Typography>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          m: 0,
          p: 0,
          width: "100vw",
          height: "calc(100vh - 64px)",
          minHeight: "calc(100vh - 64px)",
          overflow: "hidden",
          display: "flex",
          background: "#f9f9f9",
        }}
      >
        <Box sx={{ width: 400, height: "100%", minHeight: "100%", p: 0,}}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: "100%",
              minHeight: "100%",
              borderRadius: 0,
              boxShadow: 0,
              //  border: "1px solid black",
               
               display: "flex",
               flexDirection: "column",
              //  justifyContent: "center",
            }}
          >
            <Box sx={{ display: "flex",
               flexDirection: "column",
               justifyContent: "center",
               alignItems: "center",
               }}>
             <Typography sx={{fontSize: 60}}>🎓</Typography>
            <Typography variant="h6" gutterBottom sx={{
              fontWeight: 'bold',
            }}>
              Search Student Fees
            </Typography>
            </Box>
            <TextField
              fullWidth
              margin="normal"
              label="Roll Number"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Class"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Class Section"
              value={classSection}
              onChange={(e) => setClassSection(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, fontWeight: 'bold',  backgroundColor: 'var(--header-bg-color)',
                "&:hover": {
                  backgroundColor: 'var(--buttonHover-bg-color)',
                }, }}
              onClick={handleSubmit}
            >
              Search
            </Button>
            {result === "not-found" && (
              <Typography color="error" sx={{ mt: 2 }}>
                No student found.
              </Typography>
            )}
          </Paper>
        </Box>
        {/* Student Details Panel */}
        <Slide
          direction="right"
          in={showDetails && !!(result && result !== "not-found")}
          mountOnEnter
          unmountOnExit
          timeout={500}
          key={slideKey}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              
              height: "100%",
              background: "#fff",
              boxShadow: 2,
            }}
          >
            <StudentFeesDetails
              student={result && result !== "not-found" ? result : null}
            />
          </Box>
        </Slide>
      </Container>
    </Box>
  );
};

export default FeesPage;
