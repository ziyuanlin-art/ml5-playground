/**
 * This is used to provide hand position
 * This uses ml5.js' handpose model to predict hand position
 *
 */

import React from "react";
import { createContext, useContext, useRef, useEffect } from "react";
import ml5 from "ml5";
import WebcamStreamContext from "./webcamStreamContext";

const HandposeContext = createContext({
  handPose: null,
  handPosition: null,
  flattenedPosition: null,
  modelReady: false
});

export function HandposeProvider({ children }) {
  const handposeRef = useRef(null);
  const handPositionRef = useRef(null);
  const flattenedPositionRef = useRef(null);
  const [modelReady, setModelReady] = React.useState(false);

  const video = useContext(WebcamStreamContext).webcamVideo;

  useEffect(() => {
    if (video) {
      handposeRef.current = ml5.handpose(video, () => {
        setModelReady(true);
        handposeRef.current.on("hand", (results) => {
          handPositionRef.current = results;
          if (results.length > 0) {
            flattenedPositionRef.current = flattenData(results[0].landmarks);
          }
        });
      });
    }
  }, [video]);

  const flattenData = (data) => {
    if(!data) return null;
    let flattenedData = [];
    data.forEach((item) => {
      flattenedData.push(item[0]);
      flattenedData.push(item[1]);
    });
    return flattenedData;
  };

  const context = {
    handPose: handposeRef,
    handPosition: handPositionRef,
    flattenedPosition: flattenedPositionRef,
    modelReady: modelReady
  };

  return <HandposeContext.Provider value={context}>{children}</HandposeContext.Provider>;
}

export default HandposeContext;
