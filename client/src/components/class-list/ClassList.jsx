import React from "react";
import styles from "./ClassList.module.css";
import Class from "../../components/class/Class";
import Button from "../../components/button/Button";
import { useState, useEffect, useContext } from "react";
import HandDataContext from "../../contexts/handDataContext";

function ClassList() {
  const addClass = useContext(HandDataContext).addClass;
  const removeClass = useContext(HandDataContext).removeClass;
  const getClassNames = useContext(HandDataContext).getClassNames;

  const [idCounter, setIdCounter] = useState(0);
  const [classes, setClasses] = useState([]);

  const deleteClass = (classId) => {
    setClasses(classes.filter((c) => c.classId !== classId));
    removeClass(classId);
  };

  const onAddClass = () => {
    setIdCounter((idCounter) => idCounter + 1);
    
    setClasses((prev) => [...prev, { classId: idCounter, name: "Class " + (idCounter + 1) }]);
    addClass(idCounter, "Class " + (idCounter + 1));
  };

  useEffect(() => {
    let classes = [];
    getClassNames().forEach(element => {
      classes.push({classId: classes.length, name: element});
    });
    setClasses(classes);
    setIdCounter(classes.length);
    // eslint-disable-next-line
  }, []);
  

  return (
    <div className={styles.container}>
      {classes.map((c) => {
        return (
          <Class
            key={c.classId}
            classId={c.classId}
            name={c.name}
            deleteClass={() => {
              deleteClass(c.classId);
            }}
          />
        );
      })}
      <div className={styles.button_wrapper}>
        <Button onClick={onAddClass}>Add New Class</Button>
      </div>
    </div>
  );
}

export default ClassList;
