import React from 'react';
import styles from './WebcamCapture.module.css';
import Button from '../button/Button';
import { useState, useContext, useRef } from 'react';
import WebcamStreamContext from '../../contexts/webcamStreamContext';

function WebcamCapture() {
  const webcamContext = useContext(WebcamStreamContext);
  const [isWebcamOn, setIsWebcamOn] = useState(false);

  const videoRef = useRef(null);
  
  const onStartClicked = () => {
    setIsWebcamOn(true);
    webcamContext.startWebcamStream();
  }

  const video = videoRef.current;
  if (video && webcamContext.webcamStream) {
    video.srcObject = webcamContext.webcamStream;
    video.play();
  }

  return (
    <div className={styles.container}>
        {isWebcamOn ? 
          <video className={styles.webcam} ref={videoRef}></video>:
          <Button onClick={onStartClicked}>Start Webcam</Button>
        }
    </div>
  );
}

export default WebcamCapture;