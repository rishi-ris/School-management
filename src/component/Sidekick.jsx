import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Box, AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'


const Sidekick = () => {
const [open, setOpen] = useState(false);
      const toggleDrawer = (state) => () => {
    setOpen(state);
  };
  const navigate = useNavigate();

  return (
    <Box>
     <AppBar
        position="static"
        sx={{
          backgroundColor: "var(--header-bg-color)",
        }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 2 }}>
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar> 
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            <ListItem button onClick={() => navigate("/adminUser")}>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => navigate("/fees")}>
              <ListItemText primary="Fees" />
            </ListItem>

            <ListItem button onClick={() => navigate("/StudentUser")}>
              {/* <ListItem button onClick={() => navigate("/StudentPage")}> */}

              <ListItemText primary="Students" />
            </ListItem>
            <ListItem button onClick={() => navigate("/teachersUser")}>
              <ListItemText primary="Teachers" />
            </ListItem>
            <ListItem button onClick={() => navigate("/newEmployee")}>
              <ListItemText primary="Add New Employee" />
            </ListItem>
            <ListItem button onClick={() => navigate("/timetable")}>
              <ListItemText primary="Timetable" />
            </ListItem>
             <ListItem button onClick={() => navigate("/subjectManager")}>
              <ListItemText primary="Subject" />
            </ListItem>
            <ListItem button onClick={() => navigate("/")}>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      </Box>
  )
}

export default Sidekick
