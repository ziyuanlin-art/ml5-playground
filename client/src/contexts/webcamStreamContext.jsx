/**
 * This is used to provide webcam data through a video element reference
 */

import React from 'react';
import { createContext, useState, useRef } from 'react';

const WebcamStreamContext = createContext({
    webcamVideo: null,
    webcamStream: null,
    setWebcamStream: () => { }
});

export function WebcamStreamProvider({ children }) {
    const [stream, setStream] = useState(null);
    const [video, setVideo] = useState(null);

    const videoRef = useRef(null);

    //a function that starts the users webcam 
    const startStream = () => {
        window.navigator.mediaDevices.getUserMedia({
            video: {
                width: 640,
                height: 480
            },
            audio: false
        }).then((stream) => {
            const video = videoRef.current;
            video.srcObject = stream;
            video.play();

            setStream(stream);
            setVideo(video);
        }).catch((err) => {
            console.log(err);
        });
    }

    const context = {
        webcamVideo: video,
        webcamStream: stream,
        startWebcamStream: startStream,
    }

    return (
        <WebcamStreamContext.Provider value={context}>
            <video hidden ref={videoRef}></video>
            {children}
        </WebcamStreamContext.Provider>
    );
}

export default WebcamStreamContext;