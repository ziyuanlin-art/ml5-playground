import React from "react";
import styles from "./ClassList.module.css";
import Class from "../../components/class/Class";
import Button from "../../components/button/Button";
import { useContext } from "react";
import HandDataContext from "../../contexts/handDataContext";

function ClassList() {
  const addClass = useContext(HandDataContext).addClass;
  const removeClass = useContext(HandDataContext).removeClass;
  const getData = useContext(HandDataContext).getData;

  const data = getData();

  const deleteClass = (classId) => {
    removeClass(classId);
  };

  const onAddClass = () => {
    addClass();
  };

  let classes = [];
  for (let classId in data) {
    classes.push(
      <Class
        key={classId}
        classId={classId}
        name={data[classId].name}
        deleteClass={() => {
          deleteClass(classId);
        }}
      />
    );
  }

  return (
    <div className={styles.container}>
      {classes}
      <div className={styles.button_wrapper}>
        <Button onClick={onAddClass}>Add New Class</Button>
      </div>
    </div>
  );
}

export default ClassList;
