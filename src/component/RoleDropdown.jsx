import React, { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Network from "../Application/Network";

const RoleDropdown = ({ onSelect }) => {
 const [selectedRoleId, setSelectedRoleId] = useState('');
   const [allRoles, setAllRoles] = useState([]);

   const handleChange = (event) => {
     const selectedId = event.target.value;
     const selectedRoleObj = allRoles.find(role => role.roleId === selectedId);

     setSelectedRoleId(selectedId);
     if (selectedRoleObj) {
       onSelect(selectedRoleObj); // ✅ Send full object
     }
   };
// ✅ Fetch dropdown data only once
  useEffect(() => {
    Network.getAllRoles()
      .then((response) => setAllRoles(response.data))
      .catch((err) => console.error("⚠️ Error fetching roles", err));
  }, []); // ← runs only once
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
           {allRoles.map((role) => (
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