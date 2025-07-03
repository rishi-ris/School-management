import React, { useEffect } from "react";
import { Grid, TextField } from "@mui/material";
import Network from "../Application/Network";
import ClassDropDown from "../component/ClassDropDown";

const fields = [
  "userName", "password", "role", "gender", "rollNumber", "scholarNumber",
  "stu_class", "section", "firstName", "lastName", "contactNumber", "dOB",
  "address", "city", "state", "pinCode", "country", "status", "feesDiscount"
];

const StuCommonDtlDlg = ({ data, onChange }) => {
  const [allClasses, setAllClasses] = React.useState([]);
  useEffect(() => {
    Network.getAllClasses()
      .then(response => {
        console.log("Classes fetched successfully:", response.data);
        setAllClasses(response.data);
      })
      .catch(error => {
        console.error("⚠️ Error fetching classes:", error);
      });
   
    // Initialize data if not provided
    if (!data) {
      const initialData = {};
      fields.forEach(field => {
        initialData[field] = "";
      });
      onChange(initialData);
    }
  }, [data, onChange]);







  const handleInputChange = (e) => {
    onChange({ [e.target.name]: e.target.value });
  };
  return (
    <Grid container spacing={2} mt={1}>
      <ClassDropDown
        roles={allClasses}
        onSelect={(value) => onChange({ role: value })}
        value={data.role || ""}
      />
      {fields.map((field) => (
        <Grid item xs={12} sm={6} key={field}>
          <TextField
            fullWidth
            label={field.replace(/([A-Z])/g, " $1").replace(/^\w/, c => c.toUpperCase())}
            name={field}
            value={data[field] || ""}
            onChange={handleInputChange}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default StuCommonDtlDlg;
