import { useState, useEffect } from 'react';
import styles from '../styles/home.module.css';
import '../index.css';
import Navbar from '../components/Navbar';
import ScrollReveal from 'scrollreveal';

function HomePage() {
  useEffect(() => {
    ScrollReveal().reveal(`.${styles.content}`, {
      origin: 'top',
      distance: '60px',
      duration: 500,
      delay: 600,
      easing: 'ease-out',
      reset: false,
      opacity: 0,
      scale: 0.9,
      mobile: true,
    });
  }, []);

  return (
    <div>
      <Navbar/>
      <div className={styles.container}>
        <div className={styles.parallax}> 
          <div className={styles.content}>
            <h2>Importados</h2>
            <h1>Shopee do Futuro</h1>
          </div>
          <div className={styles.redirect}>
            <a href="/">Descubra os novos importados 2025</a>
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
    </div>
  )
}

export default HomePage