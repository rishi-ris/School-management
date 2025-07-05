import React, { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const RoleDropdown = ({ roles, onSelect }) => {
 const [selectedRoleId, setSelectedRoleId] = useState('');

   const handleChange = (event) => {
     const selectedId = event.target.value;
     const selectedRoleObj = roles.find(role => role.roleId === selectedId);

     setSelectedRoleId(selectedId);
     if (selectedRoleObj) {
       onSelect(selectedRoleObj); // ✅ Send full object
     }
   };

   return (
     <Box sx={{ minWidth: 200 }}>
       <FormControl fullWidth>
         <InputLabel id="role-select-label">Select Role</InputLabel>
         <Select
           labelId="role-select-label"
           id="role-select"
           value={selectedRoleId}
           label="Select Role"
           onChange={handleChange}
         >
           {roles.map((role) => (
             <MenuItem key={role.roleId} value={role.roleId}>
               {role.title}
             </MenuItem>
           ))}
         </Select>
       </FormControl>
     </Box>
   );
};
export default RoleDropdown;