import styles from '../styles/home.module.css';
import '../index.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
function HomePage() {


  return (
    <div className={styles.masterDiv}>
      <Navbar/>
      <div className={styles.container}>
        {/* Seção 1 - Importados */}
        <div className={`${styles.parallax} ${styles.parallax1}`}>
          <div className={styles.content}>
            <h2>Importados</h2>
            <h1>Shopee do Futuro</h1>
          </div>
          <div className={styles.redirect}>
            <Link to="/produtos" onClick={() => window.scrollTo(0, 0)}>
              Descubra os novos importados 2025
            </Link>
          </div>
        </div>

        {/* Seção 2 - Coleções */}
        <div className={`${styles.parallax} ${styles.parallax2}`}>
          <div className={styles.content}>
            <h2>Coleções</h2>
            <h1>Shopee do Futuro</h1>
          </div>
          <div className={styles.redirect}>
            <Link to="/colecoes" onClick={() => window.scrollTo(0, 0)}>
              Descubra as novas coleções 2025
            </Link>
          </div>
        </div>

        {/* Seção 3 - Contato */}
        <div className={`${styles.parallax} ${styles.parallax3}`}>
          <div className={styles.content}>
            <h2>Contato</h2>
            <h1>Shopee do Futuro</h1>
          </div>
          <div className={styles.redirect}>
            <Link to="/contato" onClick={() => window.scrollTo(0, 0)}>
              Entre em contato e garanta já um Serviço de Excelência
            </Link>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default HomePage