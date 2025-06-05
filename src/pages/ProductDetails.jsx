import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styles from '../styles/ProductDetails.module.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ModelViewer from '../components/ModelViewer.jsx';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://app-ecommerce3d-0d43757e15c1.herokuapp.com/api/v1/produto/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className={styles.loading}>Carregando produto...</div>;
  if (error) return <div className={styles.error}>Erro ao carregar produto: {error}</div>;
  if (!product) return <div className={styles.error}>Produto não encontrado</div>;

  return (
    <div className={styles.container}>
      <Helmet>
        <title>{product.produto.titulo} | 3D Commerce</title>
        <meta name="description" content={product.produto.descricao} />
      </Helmet>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.heroContainer}>
          <div className={styles.mediaContainer}>
            <ModelViewer src={product.produto.arquivo3d} />
            <div className={styles.overlayContent}>
              <h1 className={styles.productTitle}>{product.produto.titulo}</h1>
                <div className={styles.priceContainer}>
                  <span className={styles.price}>
                    {Number(product.produto.valor).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </span>
                  {product.desconto && (
                    <span className={styles.discount}>
                      {Number(product.produto.desconto).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </span>
                  )}
                </div>
                <div className={styles.actions}>
                  <button className={styles.buyButton}>Comprar Agora</button>
                  <button className={styles.cartButton}>Adicionar ao Carrinho</button>
                </div>
              </div>
            </div>
        </div>
        {/* Abas de detalhes, especificações e avaliações */}
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'details' ? styles.active : ''}`}
              onClick={() => setActiveTab('details')}
            >
              Detalhes
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'specs' ? styles.active : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              Especificações
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'reviews' ? styles.active : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Avaliações
            </button>
          </div>
          <div className={styles.tabContent}>
            {activeTab === 'details' && (
              <div className={styles.details}>
                <p>{product.produto.descricao}</p>
                <ul>
                  <li>Material: Madeira de reflorestamento</li>
                  <li>Dimensões: 120cm x 30cm x 20cm</li>
                  <li>Peso: 5kg</li>
                  <li>Montagem necessária: Não</li>
                </ul>
              </div>
            )}
            {activeTab === 'specs' && (
              <div className={styles.specs}>
                <table>
                  <tbody>
                    <tr>
                      <td>Material</td>
                      <td>Madeira de reflorestamento</td>
                    </tr>
                    <tr>
                      <td>Cor</td>
                      <td>Natural</td>
                    </tr>
                    <tr>
                      <td>Dimensões</td>
                      <td>120cm (L) x 30cm (P) x 20cm (A)</td>
                    </tr>
                    <tr>
                      <td>Peso</td>
                      <td>5kg</td>
                    </tr>
                    <tr>
                      <td>Garantia</td>
                      <td>12 meses</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className={styles.reviews}>
                <div className={styles.review}>
                  <div className={styles.reviewHeader}>
                    <span className={styles.reviewAuthor}>João Silva</span>
                    <div className={styles.reviewRating}>★★★★★</div>
                  </div>
                  <p className={styles.reviewText}>Excelente produto, superou minhas expectativas!</p>
                </div>
                <div className={styles.review}>
                  <div className={styles.reviewHeader}>
                    <span className={styles.reviewAuthor}>Maria Souza</span>
                    <div className={styles.reviewRating}>★★★★☆</div>
                  </div>
                  <p className={styles.reviewText}>Muito bom, mas a entrega poderia ser mais rápida.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;