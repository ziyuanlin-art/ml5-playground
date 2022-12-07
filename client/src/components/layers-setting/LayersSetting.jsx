import React from "react";
import styles from "./LayersSetting.module.css";
import Layer from "../layer/Layer";

function LayersSetting() {
  return (
    <div className={styles.container}>
      <Layer />
      <Layer />
      <Layer />
    </div>
  );
}

export default LayersSetting;
