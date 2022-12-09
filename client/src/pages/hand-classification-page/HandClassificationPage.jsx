import React from "react";
import styles from "./HandClassificationPage.module.css";
import { WebcamStreamProvider } from "../../contexts/webcamStreamContext";
import { HandposeProvider } from "../../contexts/handposeContext";
import { HandDataProvider } from "../../contexts/handDataContext";
import { NeuralNetworkProvider } from "../../contexts/neuralNetworkContext";
import { LayersProvider } from "../../contexts/layersContext";
import { Routes, Route } from "react-router-dom";
import HandClassificationDataSection from "./HandClassificationDataSection";
import HandClassificationLayersSection from "./HandClassificationLayersSection";
import HandClassificationTrainSection from "./HandClassificationTrainSection";
import HandClassificationDownloadSection from "./HandClassificationDownloadSection";
import HandClassificationHeader from "./HandClassificationHeader";
import HandClassificationFooter from "./HandClassificationFooter";

function HandClassificationPage() {
  return (
    <WebcamStreamProvider>
      <HandposeProvider>
        <HandDataProvider>
          <LayersProvider>
            <NeuralNetworkProvider>
              <div className={styles.page}>
                <HandClassificationHeader />
                <Routes>
                  <Route path="data" element={<HandClassificationDataSection />} />
                  <Route path="layers" element={<HandClassificationLayersSection />} />
                  <Route path="train" element={<HandClassificationTrainSection />} />
                  <Route path="download" element={<HandClassificationDownloadSection />} />
                </Routes>
                <HandClassificationFooter />
              </div>
            </NeuralNetworkProvider>
          </LayersProvider>
        </HandDataProvider>
      </HandposeProvider>
    </WebcamStreamProvider>
  );
}

export default HandClassificationPage;
