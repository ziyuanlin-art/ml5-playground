import React from "react";
import styles from "./HandClassificationLayersSection.module.css";
import LayersList from "../../components/layers-setting/LayersList";
import TrainingSettings from "../../components/training-settings/TrainingSettings";

function HandClassificationLayersSection() {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.title}>Layers:</div>
        <LayersList />
      </div>
      <div className={styles.container}>
        <div className={styles.title}>Settings:</div>
        <TrainingSettings />
      </div>
    </div>
  );
}

export default HandClassificationLayersSection;
