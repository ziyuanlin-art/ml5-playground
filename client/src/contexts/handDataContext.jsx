import React from "react";
import { createContext, useRef, useContext } from "react";
import ImageCanvas from "../components/image-canvas/ImageCanvas";
import WebcamStreamContext from "./webcamStreamContext";

const HandDataContext = createContext({
  data: [],
  addSample: (sample, classId) => {},
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
  };

  const createPreview = (sample) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "red";

    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-60, 0);

    ctx.drawImage(video, 0, 0, 60, 45);

    for (let i = 0; i < sample.length; i += 2) {
      ctx.fillRect((sample[i] / 640) * 60, (sample[i + 1] / 480) * 45, 1, 1);
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
    let previews = [];
    for (let i = 0; i < handDataRef.current[classId].samples.length; i++) {
      let data = handDataRef.current[classId].samples[i];
      previews.push(<ImageCanvas key={data.index} preview={data.preview}></ImageCanvas>);
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
