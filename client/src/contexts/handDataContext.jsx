import React from "react";
import { createContext, useRef } from "react";
import ImageCanvas from "../components/image-canvas/ImageCanvas";

const HandDataContext = createContext({
  data: [],
  addSample: (sample, classId) => {},
  addClass: (classId, className) => {},
  removeClass: (classId) => {},
  setClassName: (classId, className) => {},
  getPreviews: (classId) => {},
  getClassNames: () => {},
  getDataArray: () => {},
});

export function HandDataProvider({ children }) {
  const handDataRef = useRef({0: {name: "Class 1", samples: []}, 1: {name: "Class 2", samples:[]}});

  const addSample = (input, classId) => {
    const newData = {
      index: 0,
      input: input,
      preview: null
    };
    newData.index = handDataRef.current[classId].samples.length;
    newData.preview = <ImageCanvas key={newData.index} />;
    //newData.preview = document.createElement('canvas');
    
    handDataRef.current[classId].samples = [...handDataRef.current[classId].samples, newData];

    console.log(handDataRef.current);
  };


  const addClass = (classId, className) => {
    handDataRef.current[classId] = {
      name: className,
      samples: []
    };
    console.log(handDataRef.current);
  };

  const removeClass = (classId) => {
    delete handDataRef.current[classId];
    console.log(handDataRef.current);
  };

  const setClassName = (classId, className) => {
    handDataRef.current[classId].name = className;
    console.log(handDataRef.current);
  };

  const getPreviews = (classId) => {
    let previews = [];
    for (let i = 0; i < handDataRef.current[classId].samples.length; i++) {
      previews.push(handDataRef.current[classId].samples[i].preview);
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
          input: handDataRef.current[classId].samples[i].input,
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
    getDataArray: getDataArray
  };


  return <HandDataContext.Provider value={context}>{children}</HandDataContext.Provider>;
}

export default HandDataContext;
