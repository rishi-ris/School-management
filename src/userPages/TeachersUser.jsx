import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const classes = ["Class 6A", "Class 7B", "Class 8C"];
const schedule = [
  { time: "9:00 AM", subject: "Maths", class: "6A" },
  { time: "10:00 AM", subject: "Science", class: "7B" },
  { time: "11:30 AM", subject: "English", class: "8C" },
];
const notices = [
  "Monthly test starts from 1st July.",
  "Submit attendance by 4 PM.",
  "Meeting with principal at 2 PM.",
];

const TeachersUser = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        👨‍🏫 Welcome, Teacher!
      </Typography>

      <Grid container spacing={3}>
        {/* Class List */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📚 Your Classes
              </Typography>
              <List>
                {classes.map((cls, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemText primary={cls} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Daily Schedule */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🗓️ Today's Schedule
              </Typography>
              <List>
                {schedule.map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemText
                      primary={`${item.time} - ${item.subject}`}
                      secondary={`Class: ${item.class}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Notices */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📢 Notices
              </Typography>
              <List>
                {notices.map((note, index) => (
                  <React.Fragment key={index}>
                    <ListItem disablePadding>
                      <ListItemText primary={note} />
                    </ListItem>
                    {index !== notices.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeachersUser;
