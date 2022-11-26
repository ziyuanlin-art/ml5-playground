import React from "react";
import { useContext } from "react";
import styles from "./LossEpochGraph.module.css";
import NeuralNetworkContext from "../../contexts/neuralNetworkContext";

function LossEpochGraph() {
  const loss = useContext(NeuralNetworkContext).loss.loss;
  const epoch = useContext(NeuralNetworkContext).epoch;

  return (
    <div className={styles.container}>
      <div>Loss: {loss ? loss : 0}</div>
      <div>Epoch: {epoch ? epoch : 0}</div>
    </div>
  );
}

export default LossEpochGraph;
