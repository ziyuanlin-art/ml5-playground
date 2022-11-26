import React from "react";
import styles from "./Class.module.css";
import Button from "../../components/button/Button";
import { useState, useContext, useEffect } from "react";
import TextInput from "../text-input/TextInput";
import HandposeContext from "../../contexts/handposeContext";
import HandDataContext from "../../contexts/handDataContext";

function Class({ classId, name, deleteClass }) {

  const [previews, setPreviews] = useState([]);

  const hand = useContext(HandposeContext).handPosition;
  const addSample = useContext(HandDataContext).addSample;
  const getPreviews = useContext(HandDataContext).getPreviews;
  const setClassName = useContext(HandDataContext).setClassName;
  //on mount
  useEffect(() => {
    setPreviews(getPreviews(classId));
    // eslint-disable-next-line
  }, []);

  const changeClassName = (newName) => {
    setClassName(classId, newName);
  };

  const onAddSample = () => {
    if (hand.current && hand.current[0]) {
      const newSample = hand.current[0].landmarks;
      //flatten the handpose prediction array
      const flattenedSample = [];
      for (let i = 0; i < newSample.length; i++) {
        flattenedSample.push(newSample[i][0]);
        flattenedSample.push(newSample[i][1]);
      }
      //add data to the hand data context
      addSample(flattenedSample, classId);
      //get the sample preview from the hand data context and display it
      setPreviews(getPreviews(classId));
    }
  }

  const onRemoveClass = () => {
    //remove data about this classification from the hand data context
    deleteClass();
  }

  return (
    <div className={styles.container}>
      <TextInput value={name} onInputChange={changeClassName}/>
      
      <div className={styles.samples}>
        {previews}
      </div>
      <div className={styles.sample_count}>
        {previews.length} samples added
      </div>
      <div className={styles.button_container}>
        <Button onClick={onAddSample}>Add Sample</Button>
        <Button onClick={onRemoveClass}>Remove Class</Button>
      </div>

    </div>
  );
}

export default Class;