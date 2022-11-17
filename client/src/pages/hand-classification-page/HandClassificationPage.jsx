import React from 'react';
import styles from './HandClassificationPage.module.css';
import WebcamCapture from '../../components/webcam/WebcamCapture';

function HandClassificationPage() {
  return (
    <div className={styles.page}>
      <h1>Hand Classification</h1>
      <WebcamCapture />
    </div>
  );
}

export default HandClassificationPage;