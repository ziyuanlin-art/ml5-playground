import React from "react";
import styles from "./Button.module.css";

function Button({text, handleClick}) {
  return (
    <div>
      <button type="button" className={styles.button} onClick={handleClick}>{text}</button>
    </div>
  );
}

export default Button;