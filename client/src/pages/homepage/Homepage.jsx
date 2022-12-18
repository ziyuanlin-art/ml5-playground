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
        <h1>Welcome to NN Playground</h1>
        <h3 className={styles.subtitle}>A comprehensive graphical interface for training neural networks</h3>
        <Button onClick={onStartClicked}>Get Started</Button>
      </div>
    </div>
  );
}

export default Homepage;