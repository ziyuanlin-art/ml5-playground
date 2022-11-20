import React from "react";
import styles from "./ImageCanvas.module.css";
import { useRef, useEffect, useContext } from "react";
import HandposeContext from "../../contexts/handposeContext";
import WebcamStreamContext from "../../contexts/webcamStreamContext";

function ImageCanvas() {

  const canvasRef = useRef(null);

  const video = useContext(WebcamStreamContext).webcamVideo;
  const hand = useContext(HandposeContext).handPosition;

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = 'red';

    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-60, 0);
    
    if (video) ctx.drawImage(video, 0, 0, 60, 45);

    if (hand.current && hand.current[0]) {
      const landmarks = hand.current[0].landmarks;
      for (let i = 0; i < landmarks.length; i++) {
        ctx.fillRect(landmarks[i][0] / 640 * 60, landmarks[i][1] / 480 * 45, 1, 1);
      }
    }
    ctx.restore();
  }

  useEffect(() => {
    draw();
    // eslint-disable-next-line
  }, []);
  
  return (
    <div className={styles.container}>
      <canvas className={styles.canvas} ref={canvasRef} width="60px" height="45px"></canvas>
    </div>

  );
}

export default ImageCanvas;
