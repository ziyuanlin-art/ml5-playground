import React from "react";
import styles from "./DropdownSelector.module.css";

function DropdownSelector({ options, onChange }) {

  const handleChange = (event) => {
    const index = event.target.selectedIndex;
    onChange(index);
  };

  return (
    <div className={styles.container}>
      
      <select className={styles.selector} onChange={handleChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropdownSelector;
