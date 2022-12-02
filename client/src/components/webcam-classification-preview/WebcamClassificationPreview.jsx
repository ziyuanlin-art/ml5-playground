import React from "react";
import styles from "./WebcamClassificationPreview.module.css";
import ClassBar from "./ClassBar";
import { useContext, useState, useEffect, useRef } from "react";
import HandDataContext from "../../contexts/handDataContext";
import NeuralNetworkContext from "../../contexts/neuralNetworkContext";
import HandposeContext from "../../contexts/handposeContext";

function WebcamClassificationPreview() {
  const classify = useContext(NeuralNetworkContext).classify;
  const classes = useContext(HandDataContext).getClassNames();
  const flattenedData = useContext(HandposeContext).flattenedPosition;
  const [results, setResults] = useState([]);
  //used to dispose infinite loop on unmount
  const mountedRef = useRef(false);

  //infinite loop with useState to continuously update results
  const classifyData = () => {
    if (!mountedRef.current) return;
    if (flattenedData.current && classify) {
      classify(flattenedData.current, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          setResults(res);
          classifyData();
        }
      });
    }
    else {
      //retry after 10ms
      setTimeout(classifyData, 10);
    }
  };
  

  useEffect(() => {

    mountedRef.current = true;
    classifyData();
    return () => {
      mountedRef.current = false;
    }
    // eslint-disable-next-line
  }, []);

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