import React from "react";
import styles from "./HandClassificationPage.module.css";
import WebcamCapture from "../../components/webcam/WebcamCapture";
import ClassList from "../../components/class-list/ClassList";

function HandClassificationPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Hand Classification</h1>

      <div className={styles.left}>
        <WebcamCapture />
      </div>

      <div className={styles.right}>
        <ClassList />
      </div>
    </div>
  );
}

export default HandClassificationPage;
