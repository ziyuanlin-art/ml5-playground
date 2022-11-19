import React from "react";
import styles from "./Class.module.css";
import Button from "../../components/button/Button";
import TextInput from "../text-input/TextInput";

function Class({ name, deleteClass }) {


  return (
    <div className={styles.container}>
      <TextInput value={name} onChange={() => {}}/>
      <div className={styles.samples}>
      </div>
      <Button>Add Sample</Button>
      <Button onClick={deleteClass}>Remove Class</Button>
    </div>
  );
}

export default Class;

      