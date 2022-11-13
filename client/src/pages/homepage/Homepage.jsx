import React from 'react';
import styles from './Homepage.module.css';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';

//When the user clicks the "Get Started" button, the user is redirected to the model selection page.


function Homepage() {
  const navigate = useNavigate();
  
  const onStartClicked = () => {
    navigate('/models');
  }

  return (
    <div className={styles.page}>
      <div className={styles.title_box}>
        <h1 className={styles.title}>Welcome to NN Playground</h1>
        <Button text="Get Started" handleClick={onStartClicked}/>
      </div>
    </div>
  );
}

export default Homepage;