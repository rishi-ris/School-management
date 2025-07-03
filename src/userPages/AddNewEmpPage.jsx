// import React, { useEffect } from "react";
// import { Grid, TextField } from "@mui/material";
// import Network from "../Application/Network";

// const fields = [
//   "username", "password", "role", "gender", "firstName", "lastName", "contactNumber", "dOB",
//   "address", "city", "state", "pinCode", "country", "status",
// ];

// const AddNewEmpPage = ({ data, onChange }) => {
//   const [allUsers, getAllUsers] = React.useState([]);
//   useEffect(() => {
//     Network.getAllUsers()
//       .then(response => {
//         console.log("Employees fetched successfully:", response.data);
//         getAllUsers(response.data);
//       })
//       .catch(error => {
//         console.error("⚠️ Error fetching employees:", error);
//       });
   
//     // Initialize data if not provided
//     if (!data) {
//       const initialData = {};
//       fields.forEach(field => {
//         initialData[field] = "";
//       });
//       onChange(initialData);
//     }
//   }, [data, onChange]);


//   const handleInputChange = (e) => {
//     onChange({ [e.target.name]: e.target.value });
//   };
//   return (
//     <Grid container spacing={2} mt={1}>
//       {fields.map((field) => (
//         <Grid item xs={12} sm={6} key={field}>
//           <TextField
//             fullWidth
//             label={field.replace(/([A-Z])/g, " $1").replace(/^\w/, c => c.toUpperCase())}
//             name={field}
//             value={data[field] || ""}
//             onChange={handleInputChange}
//           />
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default AddNewEmpPage;