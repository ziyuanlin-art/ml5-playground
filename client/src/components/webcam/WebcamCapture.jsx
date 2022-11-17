import React from 'react';
import styles from './WebcamCapture.module.css';
import Button from '../button/Button';
import Webcam from 'react-webcam';
import { useState } from 'react';

function WebcamCapture() {

  const [isWebcamOn, setIsWebcamOn] = useState(false);

  const onStartClicked = () => {
    setIsWebcamOn(true);
  }

  return (
    <div className={styles.container}>
        {isWebcamOn ? 
          <Webcam 
            className = {styles.webcam}
            audio={false}
            mirrored={true}
            videoConstraints={
              {
                width: 640,
                height: 480,
                facingMode: "user"
              }
            }
          /> :
          <Button handleClick={onStartClicked}>Start Webcam</Button>
        }
    </div>
  );
}

export default WebcamCapture;