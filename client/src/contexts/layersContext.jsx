import React from "react";
import { createContext, useState, useRef } from "react";

const LayersContext = createContext({
  layers: [],
  addLayer: () => {},
  removeLayer: (index) => {},
  updateLayerUnits: () => {},
  updateLayerActivation: () => {}
});

export function LayersProvider({ children }) {
  const LayerCounterRef = useRef(2);
  //The default layer is currently only for classification model
  //TODO: Add more default layers for other models
  const defaultLayers = [
    {
      id: 0,
      type: "dense",
      units: 16,
      activation: "relu"
    },
    {
      id: 1,
      type: "dense",
      activation: "softmax"
    }
  ];

  const [layers, setLayers] = useState(defaultLayers);

  console.log(layers);

  const addLayer = (index) => {
    const newLayer = {
      id: LayerCounterRef.current,
      type: "dense",
      units: 16,
      activation: "relu"
    };
    setLayers((prevLayers) => {
      const newLayers = [...prevLayers];
      newLayers.splice(index, 0, newLayer);
      return newLayers;
    });
    LayerCounterRef.current++;
  };

  const removeLayer = (index) => {
    setLayers((prevLayers) => {
      const newLayers = [...prevLayers];
      newLayers.splice(index, 1);
      return newLayers;
    });
  };

  const updateLayerUnits = (index, units) => {
    setLayers((prevLayers) => {
      const newLayers = [...prevLayers];
      newLayers[index].units = units;
      return newLayers;
    });
  };

  const updateLayerActivation = (index, activation) => {
    setLayers((prevLayers) => {
      const newLayers = [...prevLayers];
      newLayers[index].activation = activation;
      return newLayers;
    });
  };

  const context = {
    layers: layers,
    addLayer: addLayer,
    removeLayer: removeLayer,
    updateLayerUnits: updateLayerUnits,
    updateLayerActivation: updateLayerActivation
  };

  return <LayersContext.Provider value={context}>{children}</LayersContext.Provider>;
}

export default LayersContext;
