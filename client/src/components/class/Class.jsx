import React from "react";
import styles from "./Class.module.css";
import Button from "../../components/button/Button";
import { useContext } from "react";
import TextInput from "../text-input/TextInput";
import HandposeContext from "../../contexts/handposeContext";
import HandDataContext from "../../contexts/handDataContext";
import ImageCanvas from "../image-canvas/ImageCanvas";

function Class({ classId, name, deleteClass }) {
  const addSample = useContext(HandDataContext).addSample;
  const removeSample = useContext(HandDataContext).removeSample;
  const getSamples = useContext(HandDataContext).getSamples;
  const setClassName = useContext(HandDataContext).setClassName;
  const flattenedPositionRef = useContext(HandposeContext).flattenedPosition;
  const isHandInFrame = useContext(HandposeContext).isHandInFrame;

  const samples = getSamples(classId);

  const changeClassName = (newName) => {
    setClassName(classId, newName);
  };

  const onAddSample = () => {
    //flatten the handpose prediction array
    const flattenedSample = flattenedPositionRef.current;
    if (isHandInFrame()) {
      //add data to the hand data context
      addSample(flattenedSample, classId);
    }
  };

  const onRemoveSample = (sampleId) => {
    removeSample(classId, sampleId);
  };

  const onRemoveClass = () => {
    //remove data about this classification from the hand data context
    deleteClass();
  };

  const sampleComponents = samples.map((sample, index) => {
    return (
      <ImageCanvas
        key={sample.id}
        preview={sample.preview}
        deleteSelf={() => {
          onRemoveSample(index);
        }}
      />
    );
  });

  return (
    <div className={styles.container}>
      <TextInput value={name} onInputChange={changeClassName} />

      <div className={styles.samples}>{sampleComponents}</div>
      <div className={styles.sample_count}>{samples.length} samples added</div>
      <div className={styles.button_container}>
        <Button onClick={onAddSample}>Add Sample</Button>
        <Button onClick={onRemoveClass}>Remove Class</Button>
      </div>
    </div>
  );
}

export default Class;
