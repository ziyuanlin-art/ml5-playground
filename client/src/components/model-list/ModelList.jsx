import React from "react";
import styles from "./ModelList.module.css";

function ModelList({children, name}) {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{name}</h1>
      <div className={styles.cards}>
        {children}
      </div>
      
    </div>
  );
}

export default ModelList;