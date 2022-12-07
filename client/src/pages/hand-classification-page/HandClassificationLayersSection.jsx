import React from "react";
import styles from "./HandClassificationLayersSection.module.css";
import LayersSetting from "../../components/layers-setting/LayersSetting";

function HandClassificationLayersSection() {

  return (
    <div className={styles.section}>
      <LayersSetting />
    </div>
  );
}

export default HandClassificationLayersSection;
