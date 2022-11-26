import React from "react";
import styles from "./HandClassificationDataSection.module.css";
import WebcamCapture from "../../components/webcam-capture/WebcamCapture";
import ClassList from "../../components/class-list/ClassList";

function HandClassificationDataSection() {
  return (
    <div className={styles.section}>
      <div className={styles.left}>
              <WebcamCapture />
            </div>

            <div className={styles.right}>
              <ClassList />
            </div>
    </div>
  );
}

export default HandClassificationDataSection;