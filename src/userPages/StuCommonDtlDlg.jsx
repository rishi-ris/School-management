import React, { useEffect, useState } from "react";
import { Grid, TextField } from "@mui/material";
import Network from "../Application/Network";
import ClassDropDown from "../component/ClassDropDown";
import RoleDropdown from "../component/RoleDropdown";

const fields = [
  "username", "password", "gender", "rollNumber", "scholarNumber",
  "firstName", "lastName", "contactNumber", "dOB",
  "address", "city", "state", "pinCode", "country", "status", "feesDiscount", "totalFees"
];

const StuCommonDtlDlg = ({ data, onChange, onClassSelect, onRoleSelect }) => {
  const [allClasses, setAllClasses] = useState([]);
  const [allRoles, setAllRoles] = useState([]);

  // ✅ Fetch dropdown data only once
  useEffect(() => {
    Network.getAllClasses()
      .then((response) => setAllClasses(response.data))
      .catch((err) => console.error("⚠️ Error fetching classes", err));

    Network.getAllRoles()
      .then((response) => setAllRoles(response.data))
      .catch((err) => console.error("⚠️ Error fetching roles", err));
  }, []); // ← runs only once

  // ✅ Only initialize empty form once
  useEffect(() => {
    if (!data || Object.keys(data).length === 0) {
      const initial = {};
      fields.forEach((field) => {
        initial[field] = "";
      });
      onChange(initial);
    }
  }, []); // ← runs only once

  const handleInputChange = (e) => {
    onChange({ [e.target.name]: e.target.value });
  };

  const handleClassSelect = (cls) => {
    onClassSelect(cls);
    console.log("Selected class: common dialog", cls);
    onClassSelect({ classId: cls });
  };

  const handleRoleSelect = (role) => {
    onRoleSelect(role);
    console.log("Selected role: common dialog", role);
    onRoleSelect({ roleId: role });
  };

  return (
    <Grid container spacing={2} mt={1}>
      <Grid item xs={12} sm={6}>
        <ClassDropDown
          roles={allClasses}
          onSelect={handleClassSelect}
          value={data?.classId || ""}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <RoleDropdown
          roles={allRoles}
          onSelect={handleRoleSelect}
          value={data?.roleId || ""}
        />
      </Grid>

      {fields.map((field) => (
        <Grid item xs={12} sm={6} key={field}>
          <TextField
            fullWidth
            label={field.replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase())}
            name={field}
            value={data?.[field] || ""}
            onChange={handleInputChange}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default StuCommonDtlDlg;
