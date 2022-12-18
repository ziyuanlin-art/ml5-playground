import React from "react";
import styles from "./TextInput.module.css";
import { useState } from "react";

function TextInput({ value, onInputChange, mode}) {

  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e) => {
    e.preventDefault();
    if (mode==="number") {
      if (isNaN(e.target.value)) {
        return;
      }
      setInputValue(e.target.value);
      onInputChange(+e.target.value);
    }
    else if (mode==="integer") {
      if (isNaN(e.target.value) || e.target.value.includes(".")) {
        return;
      }
      setInputValue(e.target.value);
      onInputChange(+e.target.value);
    }
    else {
      setInputValue(e.target.value);
      onInputChange(e.target.value);
    }
    
  }

  return (
    <div>
      <input
        className={styles.input}
        name="class name"
        type="text"
        value={inputValue}
        onChange={handleChange}
        autoComplete="off"
      />
    </div>
  );
}

export default TextInput;
