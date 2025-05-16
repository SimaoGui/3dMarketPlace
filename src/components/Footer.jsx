// components/Footer.jsx
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaCcVisa, FaCcMastercard, FaPaypal } from 'react-icons/fa';
import styles from '../styles/footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Seção Esquerda - Atendimento */}
        <div className={styles.serviceSection}>
          <h3 className={styles.sectionTitle}>ATENDIMENTO AO CLIENTE</h3>
          <ul className={styles.serviceList}>
            <li><Link to="/ajuda" onClick={() => window.scrollTo(0, 0)} className={styles.serviceLink}>Central de Ajuda</Link></li>
            <li><Link to="/como-comprar" onClick={() => window.scrollTo(0, 0)} className={styles.serviceLink}>Como Comprar</Link></li>
            <li><Link to="/pagamentos" onClick={() => window.scrollTo(0, 0)} className={styles.serviceLink}>Métodos de Pagamento</Link></li>
            <li><Link to="/garantia" onClick={() => window.scrollTo(0, 0)} className={styles.serviceLink}>Garantia 3dMarketPlace</Link></li>
            <li><Link to="/devolucao" onClick={() => window.scrollTo(0, 0)} className={styles.serviceLink}>Devolução e Reembolso</Link></li>
            <li><Link to="/contato" onClick={() => window.scrollTo(0, 0)} className={styles.serviceLink}>Fale Conosco</Link></li>
            <li><Link to="/ouvidoria" onClick={() => window.scrollTo(0, 0)} className={styles.serviceLink}>Ouvidoria</Link></li>
            <li><Link to="/cookies" onClick={() => window.scrollTo(0, 0)} className={styles.serviceLink}>Preferências de cookies</Link></li>
          </ul>
        </div>

        {/* Seção Direita - Redes + Pagamentos */}
        <div className={styles.socialPaymentSection}>
          {/* Redes Sociais */}
          <div className={styles.socialSection}>
            <h3 className={styles.sectionTitle}>CONECTE-SE</h3>
            <ul className={styles.socialList}>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <FaFacebook className={styles.socialIcon} />
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <FaInstagram className={styles.socialIcon} />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <FaTwitter className={styles.socialIcon} />
                  <span>Twitter</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Pagamentos */}
          <div className={styles.paymentSection}>
            <h3 className={styles.sectionTitle}>PAGAMENTO SEGURO</h3>
            <div className={styles.paymentMethods}>
              <FaCcVisa className={styles.paymentIcon} />
              <FaCcMastercard className={styles.paymentIcon} />
              <FaPaypal className={styles.paymentIcon} />
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé Inferior */}
      <div className={styles.footerBottom}>
        <Link to="/" onClick={() => window.scrollTo(0, 0)} className={styles.brandName}>3dMarketPlace</Link>
        <span className={styles.copyright}>&copy; 2024 Todos os direitos reservados</span>
      </div>
    </footer>
  );
};

export default Footer;