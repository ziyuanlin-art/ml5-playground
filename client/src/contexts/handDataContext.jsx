import React from "react";
import { createContext, useRef, useContext} from "react";
import WebcamStreamContext from "./webcamStreamContext";

const HandDataContext = createContext({
  data: [],
  addSample: (sample, classId) => {},
  removeSample: (classId, sampleIndex) => {},
  addClass: (classId, className) => {},
  removeClass: (classId) => {},
  setClassName: (classId, className) => {},
  getPreviews: (classId) => {},
  getClassNames: () => {},
  getDataArray: () => {},
  counterRef: null,
});

export function HandDataProvider({ children }) {
  const counterRef = useRef(3);

  const video = useContext(WebcamStreamContext).webcamVideo;

  const handDataRef = useRef({
    1: { name: "Class 1", samples: [] },
    2: { name: "Class 2", samples: [] }
  });

  const addSample = (newSample, classId) => {
    const newData = {
      index: 0,
      sample: newSample,
      preview: null
    };
    newData.index = handDataRef.current[classId].samples.length;
    newData.preview = createPreview(newData.sample);
    handDataRef.current[classId].samples = [...handDataRef.current[classId].samples, newData];
    console.log(handDataRef.current);
  };

  const removeSample = (classId, sampleIndex) => {
    handDataRef.current[classId].samples.splice(sampleIndex, 1);
    console.log(handDataRef.current);
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
    handDataRef.current[classId] = {
      name: className,
      samples: []
    };
    counterRef.current += 1;
    console.log(handDataRef.current);
  };

  const removeClass = (classId) => {
    delete handDataRef.current[classId];
    console.log(handDataRef.current);
  };
  
  /**
   * 
   * @param {number } classId 
   * @param {string} className 
   */
  const setClassName = (classId, className) => {
    handDataRef.current[classId].name = className;
    console.log(handDataRef.current);
  };

  const getPreviews = (classId) => {
    let handData = handDataRef.current;
    console.log(handData);
    let previews = [];
    for (let i = 0; i < handData[classId].samples.length; i++) {
      previews.push(handData[classId].samples[i].preview);
    }
    return previews;
  };

  const getClassNames = () => {
    let classNames = [];
    for (const classId in handDataRef.current) {
      classNames.push(handDataRef.current[classId].name);
    }
    return classNames;
  };

  const getDataArray = () => {
    let dataArray = [];
    for (const classId in handDataRef.current) {
      for (let i = 0; i < handDataRef.current[classId].samples.length; i++) {
        dataArray.push({
          input: handDataRef.current[classId].samples[i].sample,
          output: handDataRef.current[classId].name
        });
      }
    }
    return dataArray;
  };

  const context = {
    data: handDataRef,
    addSample: addSample,
    removeSample: removeSample,
    addClass: addClass,
    removeClass: removeClass,
    setClassName: setClassName,
    getPreviews: getPreviews,
    getClassNames: getClassNames,
    getDataArray: getDataArray,
    counterRef: counterRef
  };

  return <HandDataContext.Provider value={context}>{children}</HandDataContext.Provider>;
}

export default HandDataContext;
