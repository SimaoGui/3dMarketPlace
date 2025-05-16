import { useState, useEffect } from 'react';
import styles from '../styles/home.module.css';
import '../index.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollReveal from 'scrollreveal';
import { Link } from 'react-router-dom';

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
            <Link to="/produtos"  onClick={() => window.scrollTo(0, 0)}>Descubra os novos importados 2025</Link>
          </div>
        </div>
        <div className={styles.parallax}> 
          <div className={styles.content}>
            <h2>Coleções</h2>
            <h1>Shopee do Futuro</h1>
          </div>
          <div className={styles.redirect}>
            <Link to="/colecoes" onClick={() => window.scrollTo(0, 0)}>Descubra as novas coleções 2025</Link>
          </div>
        </div>
        <div className={styles.parallax}> 
          <div className={styles.content}>
            <h2>Contato</h2>
            <h1>Shopee do Futuro</h1>
          </div>
          <div className={styles.redirect}>
            <Link to="/contato" onClick={() => window.scrollTo(0, 0)}>Entre em contato e garanta já um Serviço de Excelência </Link>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default HomePage