import React from "react";
import styles from "./HandClassificationPage.module.css";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";

function HandClassificationFooter() {
  const links = ["data", "train", "download"];
  const navigate = useNavigate();

  let index = links.indexOf(window.location.pathname.split("/")[2]);

  const toPreviousStep = () => {
    if (index - 1 >= 0) {
      navigate(links[index - 1], { replace: true });
    }
  };

  const toNextStep = () => {
    if (index + 1 < links.length) {
      navigate(links[index + 1], { replace: true });
    }
  };

  return (
    <div className={styles.footer}>
      <div>
        <Button onClick={toPreviousStep}>Previous Step</Button>
      </div>
      <div>
        <Button onClick={toNextStep}>Next Step</Button>
      </div>
    </div>
  );
}

export default HandClassificationFooter;
