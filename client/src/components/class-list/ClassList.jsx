import React from "react";
import styles from "./ClassList.module.css";
import Class from "../../components/class/Class";
import Button from "../../components/button/Button";
import { useState, useEffect, useContext } from "react";
import HandDataContext from "../../contexts/handDataContext";

function ClassList() {
  const addClass = useContext(HandDataContext).addClass;
  const removeClass = useContext(HandDataContext).removeClass;
  const classDataRef = useContext(HandDataContext).data;
  const idCounterRef = useContext(HandDataContext).counterRef;

  const [classes, setClasses] = useState([]);

  const deleteClass = (classId) => {
    setClasses(classes.filter((c) => c.classId !== classId));
    removeClass(classId);
  };

  const onAddClass = () => {
    const id = idCounterRef.current;
    setClasses((prev) => [...prev, { classId: id + "", name: "Class " + id }]);
    addClass(id + "", "Class " + id);
  };

  useEffect(() => {
    const classData = classDataRef.current;
    let classes = [];
    for (let classId in classData) {
      classes.push({ classId: classId, name: classData[classId].name });
    }
    setClasses(classes);
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
