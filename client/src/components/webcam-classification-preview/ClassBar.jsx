import React from "react";
import styles from "./WebcamClassificationPreview.module.css";

function ClassBar({ name, confidence }) {
  
  return (
    <div className={styles.classBar}>
      <div className={styles.name}>{name}</div>
      <div className={styles.bar}>
        <div
          className={styles.innerBar}
          style={{ width: `${confidence}%` }}
        ></div>
      </div>
      <div className={styles.confidence}>{confidence}%</div>
    </div>
  );
}

export default ClassBar;