// import React, { useEffect } from "react";
// import { Grid, TextField } from "@mui/material";
// import Network from "../Application/Network";

// const fields = [
//   "username", "password", "role", "gender", "firstName", "lastName", "contactNumber", "dOB",
//   "address", "city", "state", "pinCode", "country", "status",
// ];

// const AddNewEmpPage = () => {
//   const [allUsers, getAllUsers] = React.useState([]);
//   useEffect(() => {
//     // Network.getAllUsers()
//     //   .then(response => {
//     //     console.log("Employees fetched successfully:", response.data);
//     //     getAllUsers(response.data);
//     //   })
//     //   .catch(error => {
//     //     console.error("⚠️ Error fetching employees:", error);
//     //   });
   
//     // // Initialize data if not provided
//     // if (!data) {
//     //   const initialData = {};
//     //   fields.forEach(field => {
//     //     initialData[field] = "";
//     //   });
//     //   onChange(initialData);
//     // }
//   }, []);


//   const handleInputChange = (e) => {
//     console.log({ [e.target.name]: e.target.value });
//   };
//   return (
//     <Grid container spacing={2} mt={1}>
//       {fields.map((field) => (
//         <Grid item xs={12} sm={6} key={field}>
//           <TextField
//             fullWidth
//             label={field.replace(/([A-Z])/g, " $1").replace(/^\w/, c => c.toUpperCase())}
//             name={field}
            
//             onChange={handleInputChange}
//           />
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default AddNewEmpPage;







import React, { useEffect, useState } from "react";
import { Grid, TextField, MenuItem, Button } from "@mui/material";
import Network from "../Application/Network";
import RoleDropdown from "../component/RoleDropdown";

const AddNewEmpPage = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    roleId: "",
    gender: "",
    firstName: "",
    lastName: "",
    contactNumber: "",
    dOB: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    status: "",
  });
  const [roles, setRoles] = useState([]);

 useEffect(() => {
    const fetchRoles = async () => {
      const response = await Network.getAllRoles();
      if (response.status === 200) {
        setRoles(response.data);
      } else {
        console.error("Failed to fetch roles");
      }
    };
    fetchRoles();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const onRolesSelect = (roleId) => {
     console.log("Selected Role ID:", roleId);

  };

  const genders = ["male", "female"];
  const statuses = ["active", "inactive"];

  return (
    <Grid container spacing={2} sx={{ display: "flex", flexDirection: "row", marginTop: "20px" }}>
      {[
        { name: "username", label: "Username" },
        { name: "password", label: "Password" },
        { name: "roleId", label: "Role", select: true, options: <RoleDropdown roles={roles} onSelect={onRolesSelect} /> },
        { name: "gender", label: "Gender", select: true, options: genders },
        { name: "firstName", label: "First Name" },
        { name: "lastName", label: "Last Name" },
        { name: "contactNumber", label: "Contact Number" },
        { name: "dOB", label: "D O B",type: "date" },
        { name: "address", label: "Address" },
        { name: "city", label: "City" },
        { name: "state", label: "State" },
        { name: "pinCode", label: "Pin Code" },
        { name: "country", label: "Country" },
        { name: "status", label: "Status", select: true, options: statuses },
      ].map(({ name, label, select, options, type }) => (
        <Grid item xs={12} sm={6} key={name}>
          <TextField sx={{width:"200px"}}
            fullWidth
            label={label}
            name={name}
            type={type === "date" ? "date" : "text"}
            value={form[name]}
            onChange={handleChange}
            InputLabelProps={type === "date" ? { shrink: true } : {}}
            select={!!select}
          >
            {select &&
              options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
          </TextField>
          
        </Grid>
      ))}
      <Button variant="contained" >Summit</Button>
    </Grid>
  );
};

export default AddNewEmpPage;
