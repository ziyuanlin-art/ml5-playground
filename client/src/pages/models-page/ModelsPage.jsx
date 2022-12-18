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
          description="Train a model to recognize hand gestures."
          link="/hand-classification/data"
        />
        <ModelCard
          image={placeholder}
          name="Coming Soon..."
          description="More training options coming soon!"
        />
      </ModelList>

      <ModelList name="Regression">
        <ModelCard
          image={placeholder}
          name="Coming Soon..."
          description="More training options coming soon!"
        />
      </ModelList>
    </div>
  );
}

export default ModelsPage;
