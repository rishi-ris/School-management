import React from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  Dialog,
  DialogContent,
} from "@mui/material";

const StudentFeesReceipt = ({ student, method, onClose, showPrint }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
     <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth >
      {/* <DialogContent border="2px solid red">
         <Box display="flex" justifyContent="center" > */}
          <Paper
            elevation={3}
            sx={{
              p: 0,
              // width: "100%",
              // maxWidth: 600,
              position: "relative",
              overflow: "hidden",
              "::before": {
                content: '""',
                position: "absolute",
                bottom: 8,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "url(projectPic/chandrashekhar-azad-watermark.png.png) center center/60% no-repeat",
                opacity: 0.14,
                zIndex: 0,
                pointerEvents: "none",
              },
            }}
          >
            {/* School Navbar/Header */}
            <Box
              textAlign="center"
              py={2}
              sx={{
                background: "linear-gradient(90deg, #1976D2 60%, #42a5f5 100%)",
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "white", letterSpacing: 1 }}
              >
                CHANDRA SEKHAR AZAD HR. SEC SCHOOL
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ color: "#e3f2fd", fontWeight: 500, letterSpacing: 1 }}
              >
                SEMLI KHURD SEHORE
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#e3f2fd",
                  fontWeight: 400,
                  letterSpacing: 1,
                  mt: 0.5,
                }}
              >
                Contact: 9165918557, 9301054099
              </Typography>
            </Box>
          
            <Typography
              sx={{
                fontWeight: 600,
                fontWeight: "bold",
                borderTopRightRadius: "50px",
                borderBottomRightRadius: "50px",
                width: "145px",
                padding: "2",
                mt: 2,
                ml: 2,
                pl: 1,
                color: "white",
                backgroundColor: "#1976D2",
              }}
            >
              Payment Recipt
            </Typography>
            
            {/* Receipt Content */}
            <Box sx={{ p: 2 , }}>
              <Typography variant="subtitle1">
                <strong>Name:</strong> {student.name}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Class:</strong> {student.class}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Section:</strong> {student.section || "-"}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Roll No:</strong> {student.roll}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Total Fees:</strong> ₹{student.total}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Paid Fees (after payment):</strong> ₹
                {parseInt(student.paid || 0) + parseInt(student.fees || 0)}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Due Fees (after payment):</strong> ₹
                {parseInt(student.due || 0) - parseInt(student.fees || 0)}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Amount Paid:</strong> ₹{student.fees}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Payment Mode:</strong> {method}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Date & Time:</strong> {new Date().toLocaleString()}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" align="center" color="green">
                 Payment Successful!
              </Typography>
              <Box textAlign="center" mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onClose}
                  sx={{ mr: 2 }}
                >
                  Close Receipt
                </Button>
                {showPrint && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handlePrint}
                  >
                    Print Receipt
                  </Button>
                )}
              </Box>
            </Box>
          </Paper>
         {/* </Box>
     </DialogContent> */}
    </Dialog>
  );
};

export default StudentFeesReceipt;
