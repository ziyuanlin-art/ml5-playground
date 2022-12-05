import React from "react";
import styles from "./HandClassificationDownloadSection.module.css";
import { useContext } from "react";
import Button from "../../components/button/Button";
import NeuralNetworkContext from "../../contexts/neuralNetworkContext";
import Code from "../../components/code/Code";
import DropdownSelector from "../../components/dropdown-selector/DropdownSelector";
import p5Snippet from "../../assets/code/HandClassificationSnippetP5";

function HandClassificationDownloadSection() {
  const model = useContext(NeuralNetworkContext).model;

  const projectOptions = ["p5.js", "Other options coming soon!"];
  const [project, setProject] = React.useState(0);

  const downloadModel = () => {
    model.current.save();
  };

  const changeProjectType = (index) => {
    setProject(index);
  };

  return (
    <div className={styles.section}>
      <div className={styles.selector}>
        <div className={styles.prompt}>I would like to use this model in:</div>
        <DropdownSelector options={projectOptions} onChange={changeProjectType} />
      </div>

      <div className={styles.project}>
        {project === 0 ? (
          <div>
            <div>Download the model and add the following code snippet to your project:</div>
            <div className={styles.button}>
              <Button onClick={downloadModel}>Download Model</Button>
            </div>
            <Code>{p5Snippet}</Code>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default HandClassificationDownloadSection;
