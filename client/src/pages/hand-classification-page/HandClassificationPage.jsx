import React from "react";
import { useEffect } from "react";
import styles from "./HandClassificationPage.module.css";
import { WebcamStreamProvider } from "../../contexts/webcamStreamContext";
import { HandposeProvider } from "../../contexts/handposeContext";
import { HandDataProvider } from "../../contexts/handDataContext";
import { NeuralNetworkProvider } from "../../contexts/neuralNetworkContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import HandClassificationDataSection from "./HandClassificationDataSection";
import HandClassificationLayersSection from "./HandClassificationLayersSection";
import HandClassificationTrainSection from "./HandClassificationTrainSection";
import HandClassificationDownloadSection from "./HandClassificationDownloadSection";
import HandClassificationHeader from "./HandClassificationHeader";
import HandClassificationFooter from "./HandClassificationFooter";


function HandClassificationPage() {

  //redirects to the /data route when the page first loads
  const navigate = useNavigate();
  useEffect(() => {
    navigate("data", { replace: true });
     // eslint-disable-next-line
  }, []);

  return (
    <WebcamStreamProvider>
      <HandposeProvider>
        <HandDataProvider>
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
        </HandDataProvider>
      </HandposeProvider>
    </WebcamStreamProvider>
  );
}

export default HandClassificationPage;
