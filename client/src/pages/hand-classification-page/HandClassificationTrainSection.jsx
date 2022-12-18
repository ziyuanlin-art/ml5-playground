import React from "react";
import styles from "./HandClassificationTrainSection.module.css";
import Button from "../../components/button/Button";
import WebcamCapture from "../../components/webcam-capture/WebcamCapture";
import LossEpochGraph from "../../components/loss-epoch-graph/LossEpochGraph";
import { useContext } from "react";
import HandDataContext from "../../contexts/handDataContext";
import LayersContext from "../../contexts/layersContext";
import NeuralNetworkContext from "../../contexts/neuralNetworkContext";
import WebcamClassificationPreview from "../../components/webcam-classification-preview/WebcamClassificationPreview";

function HandClassificationTrainSection() {
  const getDataArray = useContext(HandDataContext).getDataArray;
  const getLayers = useContext(LayersContext).getLayers;
  const getLearningRate = useContext(LayersContext).getLearningRate;
  const getSettings = useContext(LayersContext).getSettings;
  const trainModel = useContext(NeuralNetworkContext).trainModel;
  const training = useContext(NeuralNetworkContext).training;
  const modelReady = useContext(NeuralNetworkContext).modelReady;
  
  
  

  const startTraining = () => {
    trainModel(
      {
        task: "classification",
        layers: getLayers(),
        learningRate: getLearningRate(),
      },
      getSettings(),
      getDataArray()
    );
  };

  return (
    <div className={styles.section}>
      <div className={styles.left}>
        <div>
          {!training && <Button onClick={startTraining}>Train</Button>}
        </div>
        {training && <div>Training your model...</div>}
        {modelReady && <div>Model is trained!</div>}
        {(training || modelReady) ? <LossEpochGraph /> : null}
      </div>
      <div className={styles.right}>
        <WebcamCapture />
        <WebcamClassificationPreview />
      </div>
    </div>
  );
}

export default HandClassificationTrainSection;
