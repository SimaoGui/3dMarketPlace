import React from 'react';
import styles from '../styles/home.module.css';
import '../index.css';

function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.parallax}> 
        <div className={styles.content}>
          <h1>Title</h1>
          <p>Subtitle</p>
        </div>
      </div>
      <div className={styles.parallax}> 
        <div className={styles.content}>
          <h1>Title</h1>
          <p>Subtitle</p>
        </div>
      </div>
      <div className={styles.parallax}> 
        <div className={styles.content}>
          <h1>Title</h1>
          <p>Subtitle</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage