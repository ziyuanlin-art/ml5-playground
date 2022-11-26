import React from "react";
import styles from "./TextInput.module.css";
import { useState } from "react";

function TextInput({ value, onInputChange }) {

  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onInputChange(e.target.value);
  }

  return (
    <div>
      <input
        className={styles.input}
        name="class name"
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
}

export default TextInput;
