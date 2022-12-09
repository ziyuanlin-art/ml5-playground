import React from "react";
import styles from "./ImageCanvas.module.css";
import { useRef, useEffect, useState } from "react";

function ImageCanvas({ preview, deleteSelf}) {
  const canvasRef = useRef(null);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.height / preview.height * preview.width;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(preview, 0, 0, canvas.width, canvas.height);
  };
  
  const mouseEnter = () => {
    setIsMouseOver(true);
  };

  const mouseLeave = () => {
    setIsMouseOver(false);
  };

  const deleteSample = () => {
    deleteSelf();
  };

  useEffect(() => {
    draw();
  }, []);

  return (
    <span className={styles.container} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      {isMouseOver? <div className={styles.deleteButton} onClick={deleteSample}>Delete</div>: null}
      <canvas className={styles.canvas} ref={canvasRef}></canvas>
    </span>
  );
}

export default ImageCanvas;
