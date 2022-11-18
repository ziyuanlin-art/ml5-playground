import React from "react";
import styles from "./ClassList.module.css";
import Class from "../../components/class/Class";
import Button from "../../components/button/Button";

function ClassList() {
  return (
    <div className={styles.container}>
      <Class />
      <Class />
      <Class />
      <Class />
      <Class />
      <div className={styles.button_wrapper}>
        <Button>Add New Class</Button>
      </div>
    </div>
  );
}

export default ClassList;