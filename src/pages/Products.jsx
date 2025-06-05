import { useState, useEffect } from 'react';
import styles from '../styles/products.module.css';
import '../index.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

import banner1 from '../assets/banner1.png';
import banner2 from '../assets/banner2.png';
import banner3 from '../assets/banner3.png';

// Imagens para categorias
import relogioImg from '../assets/relogio.png';
import mochilaImg from '../assets/mochila.png';
import tennisImg from '../assets/tennis.png';

const Products = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const images = [banner1, banner2, banner3];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://app-ecommerce3d-0d43757e15c1.herokuapp.com/api/v1/produtos');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        console.log(data)
        setProducts(data.data)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (loading) return <div className={styles.loading}>Carregando produtos...</div>;
  if (error) return <div className={styles.error}>Erro ao carregar produtos: {error}</div>;

  return (
    <div>
      <Navbar/>
      <main>
        <div className={styles.mainDiv}>
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

        <section className={styles.categoria}>
          <h1>Categorias</h1>
          <div>
            <div className={styles.divCategoria}>
                <img src={relogioImg} alt="Gadgets tecnológicos"/>
                <h2>Gadgets</h2>
            </div>
            <div className={styles.divCategoria}>
                <img src={mochilaImg} alt="Mochilas modernas" />
                <h2>Mochilas</h2>
            </div>
            <div className={styles.divCategoria}>
                <img src={tennisImg} alt="Calçados esportivos" />
                <h2>Calçados</h2>
            </div>
          </div>
        </section>

        <section className={styles.productsSection}>
          <h2 className={styles.productsTitle}>Nossos Produtos</h2>
          
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <img 
                  src={product.capa} 
                  alt={product.titulo} 
                  className={styles.productImage}
                  loading="lazy"
                />
                <div className={styles.productInfo}>
                  <h3 className={styles.productTitle}>{product.titulo}</h3>
                  <p className={styles.productDescription}>{product.descricao}</p>
                  <div className={styles.productFooter}>
                    <span className={styles.productPrice}>
                      {Number(product.valor).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </span>
                    <Link 
                      to={`/produto/${product.id}`} 
                      className={styles.productButton}
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      Ver Detalhes
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default Products;