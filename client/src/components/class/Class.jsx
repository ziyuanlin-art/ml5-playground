import React from "react";
import styles from "./Class.module.css";
import Button from "../../components/button/Button";
import { useState, useContext, useRef } from "react";
import TextInput from "../text-input/TextInput";
import HandposeContext from "../../contexts/handposeContext";
import ImageCanvas from "../image-canvas/ImageCanvas";

function Class({ name, deleteClass }) {
  const samples = useRef([]);
  const [sampleCanvases, setSampleCanvases] = useState([]);

  const hand = useContext(HandposeContext).handPosition;

  const addSample = () => {
    if (hand.current && hand.current[0]) {
      const newSample = hand.current[0].landmarks;
      samples.current = [...samples.current, newSample];
      setSampleCanvases((prevState) => [...prevState, <ImageCanvas key={prevState.length}/>]);
      console.log(samples);
    }
  }

  return (
    <div className={styles.container}>
      <TextInput value={name} onInputChange={() => {}}/>
      
      <div className={styles.samples}>
        {sampleCanvases}
      </div>
      <div className={styles.sample_count}>
        {sampleCanvases.length} samples added
      </div>
      <div className={styles.button_container}>
        <Button onClick={addSample}>Add Sample</Button>
        <Button onClick={deleteClass}>Remove Class</Button>
      </div>

    </div>
  );
}

export default Class;

      