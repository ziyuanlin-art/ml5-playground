import React from "react";
import styles from "./Class.module.css";
import Button from "../../components/button/Button";
import { useState, useContext } from "react";
import TextInput from "../text-input/TextInput";
import HandposeContext from "../../contexts/handposeContext";
import HandDataContext from "../../contexts/handDataContext";
import ImageCanvas from "../image-canvas/ImageCanvas";

function Class({ classId, name, deleteClass }) {
  

  const addSample = useContext(HandDataContext).addSample;
  const removeSample = useContext(HandDataContext).removeSample;
  const getPreviews = useContext(HandDataContext).getPreviews;
  const setClassName = useContext(HandDataContext).setClassName;
  const flattenedPositionRef = useContext(HandposeContext).flattenedPosition;
  const [previews, setPreviews] = useState(getPreviews(classId));

  let previewCanvases = [];


  const changeClassName = (newName) => {
    setClassName(classId, newName);
  };

  const onAddSample = () => {
    //flatten the handpose prediction array
    const flattenedSample = flattenedPositionRef.current;
    if (flattenedSample) {
      //add data to the hand data context
      addSample(flattenedSample, classId);
      //get the sample preview from the hand data context and display it
      setPreviews(getPreviews(classId));
    }
  };

  const onRemoveSample = (sampleId) => {
    removeSample(classId, sampleId);
    setPreviews(() => getPreviews(classId));
    
    
  };
  const onRemoveClass = () => {
    //remove data about this classification from the hand data context
    deleteClass();
  };

  console.log("dr")

  const createCanvases = () => {
    console.log(previews);
    for(let i = 0; i < previews.length; i++){
      previewCanvases.push(<ImageCanvas key={i} preview={previews[i]} deleteSelf={() => {onRemoveSample(i)}}></ImageCanvas>)
    } 
  }
  
  
  createCanvases();
  return (
    <div className={styles.container}>
      <TextInput value={name} onInputChange={changeClassName} />

      <div className={styles.samples}>{previewCanvases}</div>
      <div className={styles.sample_count}>{previews.length} samples added</div>
      <div className={styles.button_container}>
        <Button onClick={onAddSample}>Add Sample</Button>
        <Button onClick={onRemoveClass}>Remove Class</Button>
      </div>
    </div>
  );
}

export default Class;
