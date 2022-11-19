import React from 'react';
import { createContext, useState } from 'react';

const WebcamStreamContext = createContext({
    webcamStream: null,
    setWebcamStream: () => { }
});

export function WebcamStreamProvider({ children }) {
    const [stream, setStream] = useState(null);


    const startStream = () => {
        window.navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        }).then((stream) => {
            setStream(stream);
        }).catch((err) => {
            console.log(err);
        });
    }

    const context = {
        webcamStream: stream,
        startWebcamStream: startStream,
    }

    return (
        <WebcamStreamContext.Provider value={context}>
            {children}
        </WebcamStreamContext.Provider>

    );
}
export default WebcamStreamContext;