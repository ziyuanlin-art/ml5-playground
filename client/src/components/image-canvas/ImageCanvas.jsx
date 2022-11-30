import React from "react";
import styles from "./ImageCanvas.module.css";
import { useRef, useEffect } from "react";

function ImageCanvas({ preview }) {
  const canvasRef = useRef(null);

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(preview, 0, 0);
  };

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
