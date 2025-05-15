import { useState, useEffect } from 'react';
import { FiShoppingBag, FiHeart, FiUser, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import styles from '../styles/navbar.module.css';
import '../index.css';
import ScrollReveal from 'scrollreveal';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    ScrollReveal().reveal(`.${styles.navbarContainer}`, {
      origin: 'top',
      distance: '50px',
      duration: 500,
      delay: 100,
      easing: 'ease-in-out',
      reset: false,
      opacity: 0,
      scale: 0.95,
    });

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
            <a href="/">3dMarketPlace</a>
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
          <a href="/" className={styles.navLink}>Início</a>
          <a href="/" className={styles.navLink}>Produtos</a>
          <a href="/" className={styles.navLink}>Coleções</a>
          <a href="/" className={styles.navLink}>Sobre</a>
          <a href="/" className={styles.navLink}>Contato</a>
        </div>
        <div className={styles.navbarLogoPC}>
            <a href="/">3dMarketPlace</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
