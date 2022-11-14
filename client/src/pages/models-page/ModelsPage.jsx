import React from "react";
import ModelList from "../../components/model-list/ModelList";
import ModelCard from "../../components/model-card/ModelCard";
import styles from "./ModelsPage.module.css";
import placeholder from "../../assets/images/models/Placeholder.png";

function ModelsPage() {
  return (
    <div className={styles.page}>
      <h1>Please select the model you want to train:</h1>
      <ModelList name="Classification">
        <ModelCard
          image={placeholder}
          name="Hand Gesture Classification"
          description="Train a classification model from hand keypoints from Handpose"
          link="/hand-classification"
        />
        <ModelCard
          image={placeholder}
          name="Pose Classification"
          description="Train a classification model from body keypoints from Posenet"
        />
        <ModelCard
          image={placeholder}
          name="Face Expression Classification"
          description="Train a classification model from face keypoints from Facemesh"
        />
        <ModelCard
          image={placeholder}
          name="CSV/JSON Data Classification"
          description="Train a classification model from imported CSV/JSON data."
        />
        <ModelCard
          image={placeholder}
          name="Image Classification"
          description="Train a classification model from image data."
        />
        
      </ModelList>

      <ModelList name="Regression">
      <ModelCard
          image={placeholder}
          name="Hand Gesture Regression"
          description="Train a regression model from hand keypoints from Handpose"
        />
        <ModelCard
          image={placeholder}
          name="Pose Regression"
          description="Train a regression model from body keypoints from Posenet"
        />
        <ModelCard
          image={placeholder}
          name="Face Expression Regression"
          description="Train a regression model from face keypoints from Facemesh"
        />
        <ModelCard
          image={placeholder}
          name="CSV/JSON Data Regression"
          description="Train a regression model from imported CSV/JSON data."
        />
        <ModelCard
          image={placeholder}
          name="Image Regression"
          description="Train a regression model from image data."
        />
      </ModelList>
    </div>
  );
}

export default ModelsPage;
