import React from "react";
import { createContext, useRef, useState } from "react";
import ml5 from "ml5";

const NeuralNetworkContext = createContext({
  model: null,
  trainModel: (options, data) => {},
  training : false,
  modelReady: false,
  loss: 0,
  epoch: 0,
  classify: null
});

export function NeuralNetworkProvider({ children }) {
  const model = useRef(null);
  const [modelReady, setModelReady] = useState(false);
  const [epochLoss, setEpochLoss] = useState({ epoch: 0, loss: 0 });
  const [training, setTraining] = useState(false);

  const trainModel = (options, data) => {
    setTraining(true);
    setModelReady(false);
    model.current = ml5.neuralNetwork(options);
    data.forEach((item) => {
      model.current.addData(item.input, [item.output]);
    });
    model.current.normalizeData();
    model.current.train(
      { epochs: 50 },
      (epoch, loss) => {
        setEpochLoss({ epoch: epoch, loss: loss });
      },
      () => {
        setTraining(false);
        setModelReady(true);
      }
    );
  };

  const context = {
    model: model,
    trainModel: trainModel,
    training: training,
    modelReady: modelReady,
    epoch: epochLoss.epoch,
    loss: epochLoss.loss,
    classify: model.current ? model.current.classify: null
  };

  return <NeuralNetworkContext.Provider value={context}>{children}</NeuralNetworkContext.Provider>;
}

export default NeuralNetworkContext;
