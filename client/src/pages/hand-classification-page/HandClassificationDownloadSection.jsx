import React from "react";
import styles from "./HandClassificationDownloadSection.module.css";
import { useContext } from "react";
import Button from "../../components/button/Button";
import NeuralNetworkContext from "../../contexts/neuralNetworkContext";

function HandClassificationDownloadSection() {
  const model = useContext(NeuralNetworkContext).model;

  const downloadModel = () => {
    model.current.save();
  };
  return (
    <div className={styles.section}>
      <Button onClick={downloadModel}>Download Model</Button>
    </div>
  );
}

export default HandClassificationDownloadSection;
