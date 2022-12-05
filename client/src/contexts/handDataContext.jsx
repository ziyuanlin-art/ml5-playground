/**
 * This context stores the data of hand positions for each class of hand gesture.
 * The data stored is used to train the neural network.
 * This context provider need to be wrapped around the WebcamStreamProvider.
 */

import React from "react";
import { createContext, useRef, useContext, useState } from "react";
import WebcamStreamContext from "./webcamStreamContext";

const HandDataContext = createContext({
  getData: () => {},
  getSamples: (classId) => {},
  getClassNames: () => {},
  getDataArray: () => {},
  addSample: (sample, classId) => {},
  removeSample: (classId, sampleIndex) => {},
  addClass: () => {},
  removeClass: (classId) => {},
  setClassName: (classId, className) => {}
});

export function HandDataProvider({ children }) {
  const classCounterRef = useRef(2);

  const video = useContext(WebcamStreamContext).webcamVideo;

  const [handData, setHandData] = useState({
    1: { name: "Class 1", samples: [] },
    2: { name: "Class 2", samples: [] }
  });

  /**
   * Get the data stored in the context.
   *
   * @returns {Object} The data stored in the context.
   */
  const getData = () => {
    return handData;
  };

  /**
   * Add a new sample to a given class.
   *
   * @param {number[]} newSample A flattened array of landmark positions: [x1, y1, x2, y2, ...].
   * @param {number} classId The ID of the class to add the sample to.
   */
  const addSample = (newSample, classId) => {
    const sample = {
      sample: newSample,
      preview: null
    };
    sample.preview = createPreview(sample.sample);

    setHandData((prevData) => {
      let newData = { ...prevData };
      newData[classId].samples.push(sample);
      return newData;
    });
  };

  /**
   * Remove a given sample from a given class.
   *
   * @param {number} classId The id of the class to remove the sample from.
   * @param {*} sampleIndex The index of the sample to remove.
   */
  const removeSample = (classId, sampleIndex) => {
    setHandData((prevData) => {
      let newData = { ...prevData };
      newData[classId].samples.splice(sampleIndex, 1);
      return newData;
    });
  };

  /**
   * Create a preview of a sample.
   * Returns a HTML canvas that records the current webcam video frame
   * with landmark points drawn on top of it.
   *
   * @param {number[]} sample A flattened array of landmark points: [x1, y1, x2, y2, ...]
   * @returns {HTMLCanvasElement} A HTML canvas element for previewing the sample.
   */
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

  /**
   * Adds a new class to the data.
   * The name of the class is "Class " + the total number of
   * classes that have ever been created, including deleted classes.
   *
   */
  const addClass = () => {
    classCounterRef.current += 1;
    const classId = classCounterRef.current;
    const className = "Class " + classCounterRef.current;

    setHandData((prevData) => {
      let newData = { ...prevData };
      newData[classId] = { name: className, samples: [] };
      return newData;
    });
  };

  /**
   * Removes a given class from the data.
   *
   * @param {number} classId The ID of the class to remove.
   */
  const removeClass = (classId) => {
    setHandData((prevData) => {
      let newData = { ...prevData };
      delete newData[classId];
      return newData;
    });
  };

  /**
   * Rename a given class.
   *
   * @param {number} classId The ID of the class to rename.
   * @param {string} newName the new name of the class.
   */
  const setClassName = (classId, newName) => {
    setHandData((prevData) => {
      let newData = { ...prevData };
      newData[classId].name = newName;
      return newData;
    });
  };

  /**
   * Returns the samples of a given class.
   *
   * @param {number} classId The index of the class to get the samples from.
   * @returns {Object[]} The samples of the class.
   */
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

  /**
   * A function that returns an array objects each containing a sample.
   * Each sample object has an input and an output property.
   * This function is used by the Neural Network context for training.
   *
   * @returns {Object[]} Array of objects with an input and an output property.
   *
   */
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
    getData: getData,
    getSamples: getSamples,
    getClassNames: getClassNames,
    getDataArray: getDataArray,
    addSample: addSample,
    removeSample: removeSample,
    addClass: addClass,
    removeClass: removeClass,
    setClassName: setClassName
  };

  return <HandDataContext.Provider value={context}>{children}</HandDataContext.Provider>;
}

export default HandDataContext;
