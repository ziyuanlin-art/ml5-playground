import React from "react";
import styles from "./LayersList.module.css";
import Layer from "../layer/Layer";
import StaticLayer from "../layer/StaticLayer";
import { useContext } from "react";
import LayersContext from "../../contexts/layersContext";
import Button from "../button/Button";

function LayersList() {
  const { layers } = useContext(LayersContext);
  const { addLayer } = useContext(LayersContext);

  const addNewLayer = (index) => {
    console.log("add layer");
    addLayer(index);
  }

  const layersList = layers.map((layer, index) => {
    return (
      <div key={layer.id} className={styles.layer}>
        <div className={styles.line}></div>
        <Button  onClick={() => {addNewLayer(index)}}>+</Button>
        <Layer index={index} />
      </div>
    );
  });

  return (
    <div className={styles.container}>
      <StaticLayer type="Input Layer" />
      {layersList}
      <div className={styles.last_button}>
        <Button onClick={() => {addNewLayer(layers.length)}}>+</Button>
      </div>
      <StaticLayer type="Output Layer" />
    </div>
  );
}

export default LayersList;
