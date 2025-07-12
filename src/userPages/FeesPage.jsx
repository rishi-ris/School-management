import React, { useState, useEffect, useRef } from "react";
import {
  Typography,
  Box,
  Button,
  Container,
  TextField,
  Paper,
  Slide,
} from "@mui/material";
import StudentFeesDetails from "./StudentFeesDetails";
import Network from "../Application/Network";
import ClassDropDown from "../component/ClassDropDown";
import Sidekick from "../component/Sidekick";

const FeesPage = () => {
  const [roll, setRoll] = useState("");
  const [className, setClassName] = useState("");
  const [classSection, setClassSection] = useState("");
  const [result, setResult] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [slideKey, setSlideKey] = useState(0);

  const handleSubmit = () => {
    console.log("🔍 Searching fees for:", { roll, className });
    Network.searchStudentFees({ rollNumber: roll, className })
      .then((response) => {
        setResult(response.data);
        setShowDetails(true);
        setSlideKey((prev) => prev + 1);
      })
      .catch((err) => {
        console.error("⚠️ Error searching student fees", err);
        setResult("not-found");
      });
  };
  const handleRollChange = (e) => {
    setRoll(e.target.value);
    console.log("Roll number changed:", e.target.value);
    setShowDetails(false);
    setResult(null);
    setSlideKey((prev) => prev + 1);
  };
  const handleClassSelect = (cls) => {
    // onClassSelect(cls);
    setClassName(cls.classId);
    console.log("Selected class: common dialog", cls);
    // onClassSelect({ classId: cls });
  };
  // ✅ Fetch dropdown data only once

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        m: 0,
        p: 0,
        overflow: "hidden",
        background: "#f9f9f9",
      }}
    >
      <Sidekick />
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          m: 0,
          p: 0,
          width: "100vw",

          height: "100vh",

          display: "flex",
          background: "#f9f9f9",
        }}
      >
        <Box sx={{ width: 400, height: "100%", minHeight: "100%", p: 0 }}>
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: 80 }}>🎓</Typography>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                }}
              >
                Search Student Fees
              </Typography>
            </Box>
            <TextField
              fullWidth
              margin="normal"
              label="Roll Number"
              value={roll}
              onChange={(e) => handleRollChange(e)}
            />
            <ClassDropDown onSelect={handleClassSelect} />
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                fontWeight: "bold",
                backgroundColor: "var(--header-bg-color)",
                "&:hover": {
                  backgroundColor: "var(--buttonHover-bg-color)",
                },
              }}
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
        {/* Show 'hello' when student details are not open */}
        {!(showDetails && !!(result && result !== "not-found")) && (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "",
              boxShadow: 2,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* 🔽 Watermark Image */}
            <Box
              component="img"
              src="ProjectIMG/chandrashekhar-azad-watermark.png.png" 
              alt="Watermark"
              sx={{
                position: "absolute",
                
                width: "60%",
                opacity: 0.08, // ✅ some watermark effect
                zIndex: 0,
                top: "45%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />

            {/*  Foreground Text */}
            {/* <Typography variant="h4" color="text.secondary" sx={{ zIndex: 1 }}>
    CHANDRA SHEKHAR AZAD HR. SEC SCHOOL
  </Typography> */}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default FeesPage;
