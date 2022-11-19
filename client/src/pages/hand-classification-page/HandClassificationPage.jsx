import React from "react";
import styles from "./HandClassificationPage.module.css";
import WebcamCapture from "../../components/webcam/WebcamCapture";
import ClassList from "../../components/class-list/ClassList";
import { WebcamStreamProvider } from "../../contexts/webcamStreamContext";

function HandClassificationPage() {


  return (
    <div className={styles.page}>
      <WebcamStreamProvider>
        <h1 className={styles.title}>Hand Classification</h1>

        <div className={styles.left}>
          <WebcamCapture />
        </div>

        <div className={styles.right}>
          <ClassList />
        </div>
      </WebcamStreamProvider>
    </div>
  );
}

export default HandClassificationPage;
