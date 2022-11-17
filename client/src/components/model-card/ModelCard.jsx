import React from "react";
import styles from "./ModelCard.module.css";
import { useNavigate } from "react-router-dom";

function ModelCard({ image, name, description, link }) {
  const navigate = useNavigate();
  function handleClick() {
    if (link) {
      navigate(link);
    }
  }

  return (
    <div className={styles.container} onClick={handleClick}>
      <img className={styles.image} src={image} alt=""></img>
      <div className={styles.text}>
        <h1 className={styles.name}>{name}</h1>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
}

export default ModelCard;
