// useCssVariable.js
import { useState, useEffect } from "react";

const UseCommonText = (variableName) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const val = rootStyles.getPropertyValue(variableName).replace(/['"]/g, "").trim();
    setValue(val);
  }, [variableName]);

  return value;
};

export default UseCommonText;
