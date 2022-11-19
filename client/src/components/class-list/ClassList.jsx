import React from "react";
import styles from "./ClassList.module.css";
import Class from "../../components/class/Class";
import Button from "../../components/button/Button";
import { useState } from "react";


function ClassList() {
  const [idCounter, setIdCounter] = useState(2);

  const [classes, setClasses] = useState([
    {
      key: "c0",
      name: "Class 1",
    },
    {
      key: "c1",
      name: "Class 2",
    }
  ]);

  const deleteClass = (key) => {
    setClasses(classes.filter((c) => c.key !== key));
  };

  const addClass = () => {
    setIdCounter((idCounter) => idCounter + 1);
    setClasses( prev => [...prev, {key: "c" + idCounter, name: "Class " + (idCounter + 1)}]);
  };

  return (
    <div className={styles.container}>
      {
        classes.map((c) => {
          return (
            <Class key={c.key} name={c.name} deleteClass={() => { deleteClass(c.key) }} />
          );
        })
      }
      <div className={styles.button_wrapper}>
        <Button onClick={addClass}>Add New Class</Button>
      </div>
    </div>
  );
}

export default ClassList;