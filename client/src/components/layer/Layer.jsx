import React from "react";
import { useContext } from "react";
import styles from "./Layer.module.css";
import DropdownSelector from "../dropdown-selector/DropdownSelector";
import LayersContext from "../../contexts/layersContext";
import Button from "../button/Button";

function Layer({ index }) {
  const activation = [
    "sigmoid",
    "hardSigmoid",
    "softplus",
    "softsign",
    "tanh",
    "softmax",
    "linear",
    "relu",
    "relu6",
    "selu",
    "elu"
  ];

  const units = [1, 2, 4, 8, 16, 32];

  const { layers } = useContext(LayersContext);
  const { removeLayer } = useContext(LayersContext);
  const { updateLayerUnits } = useContext(LayersContext);
  const { updateLayerActivation } = useContext(LayersContext);

  const removeCurrentLayer = () => {
    console.log(index);
    removeLayer(index);
  };

  const updateUnits = (unitsIndex) => {
    updateLayerUnits(index, units[unitsIndex]);
  };

  const updateActivation = (activationIndex) => {
    updateLayerActivation(index, activation[activationIndex]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.selection}>
        Units:
        <DropdownSelector
          options={units}
          defaultOption={layers[index].units}
          onChange={updateUnits}
        />
      </div>
      <div className={styles.selection}>
        Activation:
        <DropdownSelector
          options={activation}
          defaultOption={layers[index].activation}
          onChange={updateActivation}
        />
      </div>
      <div className={styles.button}>
        <Button onClick={removeCurrentLayer}>Remove</Button>
      </div>
    </div>
  );
}

export default Layer;
