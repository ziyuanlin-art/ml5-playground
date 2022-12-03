import React from "react";
import { createContext, useRef, useContext, useState} from "react";
import WebcamStreamContext from "./webcamStreamContext";

const HandDataContext = createContext({
  data: {},
  addSample: (sample, classId) => {},
  removeSample: (classId, sampleIndex) => {},
  addClass: (classId, className) => {},
  removeClass: (classId) => {},
  setClassName: (classId, className) => {},
  getSamples: (classId) => {},
  getClassNames: () => {},
  getDataArray: () => {},
  counterRef: null,
});

export function HandDataProvider({ children }) {
  
  const counterRef = useRef(3);

  const video = useContext(WebcamStreamContext).webcamVideo;

  const [handData, setHandData] = useState({
    1: { name: "Class 1", samples: [] },
    2: { name: "Class 2", samples: [] }
  });

  console.log("HandDataContext: " + handData);
  
  const addSample = (newSample, classId) => {
    const sample = {
      myindex: 0,
      sample: newSample,
      preview: null
    };
    sample.myindex = "i" + handData[classId].samples.length;
    sample.preview = createPreview(sample.sample);

    setHandData((prevData) => {
      let newData = { ...prevData };
      newData[classId].samples.push(sample);
      return newData;
    });
  };

  const removeSample = (classId, sampleIndex) => {
    setHandData((prevData) => {
      let newData = { ...prevData };
      newData[classId].samples.splice(sampleIndex, 1);
      return newData;
    });
  };


  const createPreview = (sample) => {
    const canvas = document.createElement("canvas");
    canvas.width = 120;
    canvas.height = 90;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "rgb(0, 255, 0)";

    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-120, 0);

    ctx.drawImage(video, 0, 0, 120, 90);

    for (let i = 0; i < sample.length; i += 2) {
      ctx.fillRect((sample[i] / 640) * 120, (sample[i + 1] / 480) * 90, 3, 3);
    }
    ctx.restore();
    return canvas;
  };

  const addClass = (classId, className) => {
    setHandData((prevData) => {
      let newData = { ...prevData };
      newData[classId] = { name: className, samples: [] };
      return newData;
    });

    counterRef.current += 1;
  };

  const removeClass = (classId) => {
    setHandData((prevData) => {
      let newData = { ...prevData };
      delete newData[classId];
      return newData;
    });
  };
  
  /**
   * 
   * @param {number } classId 
   * @param {string} className 
   */
  const setClassName = (classId, className) => {
    setHandData((prevData) => {
      let newData = { ...prevData };
      newData[classId].name = className;
      return newData;
    });
  };

  const getSamples = (classId) => {
    return handData[classId].samples;
  };

  const getClassNames = () => {
    let classNames = [];
    for (const classId in handData) {
      classNames.push(handData[classId].name);
    }
    return classNames;
  };

  const getDataArray = () => {
    let dataArray = [];
    for (const classId in handData) {
      for (let i = 0; i < handData[classId].samples.length; i++) {
        dataArray.push({
          input: handData[classId].samples[i].sample,
          output: handData[classId].name
        });
      }
    }
    return dataArray;
  };

  const context = {
    data: handData,
    addSample: addSample,
    removeSample: removeSample,
    addClass: addClass,
    removeClass: removeClass,
    setClassName: setClassName,
    getSamples: getSamples,
    getClassNames: getClassNames,
    getDataArray: getDataArray,
    counterRef: counterRef
  };

  return <HandDataContext.Provider value={context}>{children}</HandDataContext.Provider>;
}

export default HandDataContext;
