import React from "react";
import styles from "./WebcamCapture.module.css";
import Button from "../button/Button";
import { useState, useContext } from "react";
import WebcamStreamContext from "../../contexts/webcamStreamContext";
import HandposeContext from "../../contexts/handposeContext";
import VideoCanvas from "../video-canvas/VideoCanvas";

function WebcamCapture() {
  const startWebcam = useContext(WebcamStreamContext).startWebcamStream;
  const modelReady = useContext(HandposeContext).modelReady;
  const [started, setStarted] = useState(false);

  const onStartClicked = () => {
    setStarted(true);
    startWebcam();
  };

  const display = () => {
    if (modelReady) return <VideoCanvas />;
    else {
      if (started) return <div>Loading webcam and model...</div>;
      else return <Button onClick={onStartClicked}>Start Webcam</Button>;
    }
  };

  return <div className={styles.container}>{display()}</div>;
}

export default WebcamCapture;
