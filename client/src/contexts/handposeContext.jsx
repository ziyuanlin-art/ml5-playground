/**
 * This is used to provide hand position
 * This uses ml5.js' handpose model to predict hand position
 * 
 * TODO: handle unmount 
 */

import React from 'react';
import { createContext, useContext, useRef, useEffect } from 'react';
import ml5 from 'ml5';
import WebcamStreamContext from './webcamStreamContext';

const HandposeContext = createContext({
  handPose: null,
});

export function HandposeProvider({ children }) {

  const video = useContext(WebcamStreamContext).webcamVideo;

  const handPoseRef = useRef(null);
  const handPositionRef = useRef(null);

  useEffect(() => {
    if (video) {
      handPoseRef.current = ml5.handpose(video, () => {
        handPoseRef.current.on('hand', (results) => {
          handPositionRef.current = results;
        });
  
      });
    }
    return () => {
      handPoseRef.current = null;
      handPositionRef.current = null;
    }
  }, [video]);


  const context = {
    handPose: handPoseRef,
    handPosition: handPositionRef,
  }

  return (
    <HandposeContext.Provider value={context}>
      {children}
    </HandposeContext.Provider>
  );
}

export default HandposeContext;
