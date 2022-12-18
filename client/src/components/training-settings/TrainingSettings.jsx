import React from "react";
import styles from "./TrainingSettings.module.css";
import TextInput from "../../components/text-input/TextInput";
import { useContext } from "react";
import LayersContext from "../../contexts/layersContext";

function TrainingSettings() {
  const getSettings = useContext(LayersContext).getSettings;
  const getLearningRate = useContext(LayersContext).getLearningRate;
  const setEpochs = useContext(LayersContext).setEpochs;
  const setBatchSize = useContext(LayersContext).setBatchSize;
  const setLearningRate = useContext(LayersContext).setLearningRate;

  return (
    <div className={styles.container}>
      Epochs:
        <TextInput value={getSettings().epochs} onInputChange={setEpochs} mode="integer"/>
      Batch Size:
        <TextInput value={getSettings().batchSize} onInputChange={setBatchSize} mode="integer"/>
      Learning Rate:
        <TextInput value={getLearningRate()} onInputChange={setLearningRate} mode="number" />
    </div>

  );
}

export default TrainingSettings;