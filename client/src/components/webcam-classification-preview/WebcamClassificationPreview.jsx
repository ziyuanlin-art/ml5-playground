import React from "react";
import styles from "./WebcamClassificationPreview.module.css";
import ClassBar from "./ClassBar";
import { useContext, useState } from "react";
import HandDataContext from "../../contexts/handDataContext";
import NeuralNetworkContext from "../../contexts/neuralNetworkContext";
import HandposeContext from "../../contexts/handposeContext";

function WebcamClassificationPreview() {
  const classify = useContext(NeuralNetworkContext).classify;
  const classes = useContext(HandDataContext).getClassNames();
  const flattenedData = useContext(HandposeContext).flattenedPosition;
  const [results, setResults] = useState([]);


  //infinite loop with useState to continuously update results
  const classifyData = () => {
    if (flattenedData.current && classify) {
      classify(flattenedData.current, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          setResults(res);
        }
      });
    }
  };

  classifyData();

  let classConfidenceBars = [];

  for (let i = 0; i < classes.length; i++) {
    let confidence = 0;
    results.forEach((item) => {
      if (item.label === classes[i]) {
        confidence = Math.round(item.confidence * 100);
      }
    });
    
    classConfidenceBars.push(
      <ClassBar name={classes[i]} confidence={confidence} key={i} />
    );
  }

  return (
    <div className={styles.container}>
      {classConfidenceBars}
    </div>
  );
}

export default WebcamClassificationPreview;