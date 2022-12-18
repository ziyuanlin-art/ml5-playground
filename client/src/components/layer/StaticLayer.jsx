import React from "react";
import styles from "./Layer.module.css";

function StaticLayer({ type }) {
  if (type === "Input Layer") {
    return (
      <div className={styles.static_container}>
        Input Layer
        <div className={styles.right_line}></div>
      </div>
    );
  }
  else {
    return (
      <div className={styles.static_container}>
        Output Layer
        <div className={styles.left_line}></div>
      </div>
    );
  }
}

export default StaticLayer;
