import React from "react";
import styles from "./Button.module.css";

function Button({children, onClick}) {
  return (
    <div>
      <button type="button" className={styles.button} onClick={onClick}>{children}</button>
    </div>
  );
}

export default Button;