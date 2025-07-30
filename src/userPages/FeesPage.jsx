import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  TextField,
  Paper,
  Slide,
} from "@mui/material";

import StudentFeesDetails from "./StudentFeesDetails";
import Network from "../Application/Network";
import ClassDropDown from "../component/ClassDropDown";
import Sidekick from "../component/Sidekick";

const FeesPage = () => {
  // States to handle form inputs and display logic
  const [roll, setRoll] = useState("");
  const [className, setClassName] = useState("");
  const [classSection, setClassSection] = useState("");
  const [result, setResult] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [slideKey, setSlideKey] = useState(0); // Used to re-trigger Slide animation

  // 🔍 Submit button click handler
  const handleSubmit = () => {
    console.log("🔍 Searching fees for:", { roll, className });

    Network.searchStudentFees({ rollNumber: roll, className })
      .then((response) => {
        setResult(response.data);
        setShowDetails(true);
        setSlideKey((prev) => prev + 1); // Retrigger animation
      })
      .catch((err) => {
        console.error("⚠️ Error searching student fees", err);
        setResult("not-found");
      });
  };

  // 📝 Roll number change handler
  const handleRollChange = (e) => {
    setRoll(e.target.value);
    console.log("Roll number changed:", e.target.value);
    setShowDetails(false);
    setResult(null);
    setSlideKey((prev) => prev + 1);
  };

  // 🎓 Class dropdown selection handler
  const handleClassSelect = (cls) => {
    setClassName(cls.classId);
    console.log("Selected class: common dialog", cls);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        mt: 8,
        p: 0,
        background: "#f9f9f9",
        display: "flex",
      }}
    >
      {/* 📘 Sidebar Component */}
      <Sidekick />

      {/* 🧾 Fees Search Form */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          width: 400,
          borderRadius: 0,
          boxShadow: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 🎓 Header Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: 80 }}>🎓</Typography>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Search Student Fees
          </Typography>
        </Box>

        {/* 🔍 Search Inputs */}
        <Box
          height="250px"
          display="flex"
          flexDirection="column"
          justifyContent="space-evenly"
        >
          <TextField
            fullWidth
            margin="normal"
            label="Roll Number"
            value={roll}
            onChange={handleRollChange}
          />

          {/* 🎓 Class Dropdown */}
          <ClassDropDown onSelect={handleClassSelect} />

          {/* 🔍 Search Button */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              fontWeight: "bold",
              backgroundColor: "var(--button-bg-color)",
              "&:hover": {
                backgroundColor: "var(--buttonHover-bg-color)",
              },
            }}
            onClick={handleSubmit}
          >
            Search
          </Button>

          {/* ⚠️ Student Not Found Message */}
          {result === "not-found" && (
            <Typography color="error" sx={{ mt: 2 }}>
              No student found.
            </Typography>
          )}
        </Box>
      </Paper>

      {/* 📄 Slide-in Student Fee Details Panel */}
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

      {/* 🖼️ Default Watermark Display When No Data */}
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
              opacity: 0.08,
              zIndex: 0,
              top: "45%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default FeesPage;
