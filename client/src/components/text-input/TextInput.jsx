import React from "react";
import styles from "./TextInput.module.css";
import { useState } from "react";

function TextInput({ value, handleChange }) {

  const [inputValue, setInputValue] = useState(value);

  const onInputChange = (e) => {
    setInputValue(e.target.value);
    handleChange(e.target.value);
  }

  return (
    <div>
      <input
        className={styles.input}
        name="class name"
        type="text"
        value={inputValue}
        onChange={onInputChange}
      />
    </div>
  );
}

export default TextInput;
