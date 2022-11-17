import React from "react";
import styles from "./Button.module.css";

function Button({children, handleClick}) {
  return (
    <div>
      <button type="button" className={styles.button} onClick={handleClick}>{children}</button>
    </div>
  );
}

export default Button;