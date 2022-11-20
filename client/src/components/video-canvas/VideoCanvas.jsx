import React from "react";
import styles from "./VideoCanvas.module.css";
import { useRef, useEffect, useContext } from "react";
import WebcamStreamContext from "../../contexts/webcamStreamContext";
import HandposeContext from "../../contexts/handposeContext";

function VideoCanvas() {

  const canvasRef = useRef(null);

  const requestIdRef = useRef(null);

  const video = useContext(WebcamStreamContext).webcamVideo;
  const hand = useContext(HandposeContext).handPosition;

  const draw = () => {
    

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, 300, 225);
    ctx.fillStyle = 'red';

    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-300, 0);
    
    if (video) ctx.drawImage(video, 0, 0, 300, 225);

    if (hand.current && hand.current[0]) {
      const landmarks = hand.current[0].landmarks;
      for (let i = 0; i < landmarks.length; i++) {
        ctx.fillRect(landmarks[i][0] / 640 * 300, landmarks[i][1] / 480 * 225, 5, 5);
      }
    }

    ctx.restore();
  }

  const render = () => {
    draw();
    requestIdRef.current = requestAnimationFrame(render);
  }
  
  useEffect(() => {
    requestIdRef.current = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(requestIdRef.current);
    };
    // eslint-disable-next-line
  }, [video]);



  
  return (
    <div className={styles.container}>
      <canvas className={styles.canvas} ref={canvasRef} width="300px" height="225px"></canvas>
    </div>

  );
}

export default VideoCanvas;
