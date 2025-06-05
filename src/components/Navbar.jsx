import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiHeart, FiUser, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import styles from '../styles/navbar.module.css';
import '../index.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    const isScrolled = window.scrollY > 5;
    setScrolled(isScrolled);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Verifica o estado inicial

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);


  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navbarContainer}>

        {/* TOPO: logo + hambúrguer */}
        <div className={styles.navbarTop}>
          <div className={styles.navbarLogo}>
            <a to="/" onClick={() => window.scrollTo(0, 0)}>3dMarketPlace</a>
          </div>
          <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </div>
        </div>

        {/* Ícones */}
        <div className={styles.navbarIcons}>
          <button className={styles.iconButton}>
            <FiSearch className={styles.navIcon} />
          </button>
          <button className={styles.iconButton}>
            <FiHeart className={styles.navIcon} />
          </button>
          <button className={styles.iconButton}>
            <FiUser className={styles.navIcon} />
          </button>
          <button className={`${styles.iconButton} ${styles.cartIcon}`}>
            <FiShoppingBag className={styles.navIcon} />
            <span className={styles.cartCount}>0</span>
          </button>
        </div>

        {/* Links */}
        <div className={`${styles.navbarLinks} ${menuOpen ? styles.showMenu : ''}`}>
          <Link to="/" onClick={() => window.scrollTo(0, 0)} className={styles.navLink}>Início</Link>
          <Link to="/produtos" onClick={() => window.scrollTo(0, 0)} className={styles.navLink}>Produtos</Link>
          <Link to="/colecoes" onClick={() => window.scrollTo(0, 0)} className={styles.navLink}>Coleções</Link>
          <Link to="/sobre" onClick={() => window.scrollTo(0, 0)} className={styles.navLink}>Sobre</Link>
          <Link to="/contato" onClick={() => window.scrollTo(0, 0)} className={styles.navLink}>Contato</Link>
        </div>
        
        <div className={styles.navbarLogoPC}>
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>3dMarketPlace</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;