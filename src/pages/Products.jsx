import { useState, useEffect } from 'react';
import styles from '../styles/products.module.css';
import '../index.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollReveal from 'scrollreveal';
import { Link } from 'react-router-dom';

import banner1 from '../assets/banner1.png';
import banner2 from '../assets/banner2.png';
import banner3 from '../assets/banner3.png';

const Products = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [banner1, banner2, banner3];

  // Auto-rotatção do carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000); // Muda a cada 5 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div>
      <Navbar/>
      <main>
        <div className={styles.hero}>
          <div className={styles.carrossel}>
            {images.map((image, index) => (
              <div 
                key={index}
                className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className={styles.slideContent}>
                  <h1>Produtos Importados</h1>
                  <p>As melhores seleções para você</p>
                </div>
              </div>
            ))}
            
            <button className={styles.carrosselButtonPrev} onClick={prevSlide}>
              &#10094;
            </button>
            <button className={styles.carrosselButtonNext} onClick={nextSlide}>
              &#10095;
            </button>
            
            <div className={styles.carrosselIndicators}>
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default Products;