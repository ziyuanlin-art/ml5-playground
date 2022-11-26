import React from "react";
import styles from "./HandClassificationPage.module.css";
import { WebcamStreamProvider } from "../../contexts/webcamStreamContext";
import { HandposeProvider } from "../../contexts/handposeContext";
import { HandDataProvider } from "../../contexts/handDataContext";
import { NeuralNetworkProvider } from "../../contexts/neuralNetworkContext";
import { Routes, Route } from "react-router-dom";
import HandClassificationDataSection from "./HandClassificationDataSection";
import HandClassificationTrainSection from "./HandClassificationTrainSection";
import HandClassificationHeader from "./HandClassificationHeader";
import HandClassificationFooter from "./HandClassificationFooter";

function HandClassificationPage() {
  return (
    <WebcamStreamProvider>
      <HandposeProvider>
        <HandDataProvider>
          <NeuralNetworkProvider>
            <div className={styles.page}>
              <HandClassificationHeader />
              <Routes>
                <Route path="data" element={<HandClassificationDataSection />} />
                <Route path="train" element={<HandClassificationTrainSection />} />
              </Routes>
              <HandClassificationFooter />
            </div>
          </NeuralNetworkProvider>
        </HandDataProvider>
      </HandposeProvider>
    </WebcamStreamProvider>
  );
}

export default HandClassificationPage;
