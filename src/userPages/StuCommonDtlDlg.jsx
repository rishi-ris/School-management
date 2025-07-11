import React, { useEffect, useState } from "react";
import { Grid, TextField } from "@mui/material";
import Network from "../Application/Network";
import ClassDropDown from "../component/ClassDropDown";
import RoleDropdown from "../component/RoleDropdown";

const StuCommonDtlDlg = ({ data, onChange, onClassSelect, onRoleSelect }) => {
  console.log("StuCommonDtlDlg rendered with data:", data);
  useEffect(() => {
    const newErrors = {};
    requiredCommonFields.forEach((field) => {
      if (!data?.[field]) {
        newErrors[field] = `${field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (c) => c.toUpperCase())} is required`;
      }
    });
    setErrors(newErrors);
  }, [data]);

  const handleInputChange = (e) => {
    onChange({ [e.target.name]: e.target.value });
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
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
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const requiredCommonFields = [
    "username",
    "password",
    "gender",
    "rollNumber",
    "scholarNumber",
    "firstName",
    "lastName",
    "contactNumber",
    "dOB",
    "address",
    "city",
    "state",
    "pinCode",
    "country",
    "status",
    "feesDiscount",
    "totalFees",
  ];

  return (
    <Grid container spacing={2} mt={1}>
      <Grid item xs={12} sm={6} width={225}>
        <ClassDropDown
          selectedClassId={data?.classId || ""}
          onSelect={handleClassSelect}
          value={data?.classId || ""}
        />
      </Grid>
      <Grid item xs={12} sm={6}  width={225}>
        <RoleDropdown
          selectedRoleId={data?.roleId || ""}
          onSelect={handleRoleSelect}
          value={data?.roleId || ""}
        />
      </Grid>

      {requiredCommonFields.map((field) => (
        <Grid item xs={12} sm={6} key={field}>
          <TextField
            fullWidth
            label={field
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (c) => c.toUpperCase())}
            name={field}
            value={data?.[field] || ""}
            onChange={handleInputChange}
            error={!!errors[field] && touched[field]}
            helperText={touched[field] && errors[field] ? errors[field] : ""}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default StuCommonDtlDlg;
