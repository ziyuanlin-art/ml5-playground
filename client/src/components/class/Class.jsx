import React from "react";
import styles from "./Class.module.css";
import Button from "../../components/button/Button";
import TextInput from "../text-input/TextInput";

function Class() {

  return (
    <div className={styles.container}>
      <TextInput value="Class 1" handleChange={()=>{}}/>
      <div className={styles.samples}>
      </div>
      <Button>Add Sample</Button>
    </div>
  );
}

export default Class;

      