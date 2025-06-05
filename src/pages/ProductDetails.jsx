import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ModelViewer from '../components/ModelViewer';
import '../styles/productDetails.css'
import { FaSquarePollVertical } from 'react-icons/fa6';
import { FaBalanceScale, FaLayerGroup, FaPalette, FaRegStar, FaRulerCombined, FaSearchMinus, FaSearchPlus, FaStar, FaStarHalfAlt, FaWrench } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [rotationY, setRotationY] = useState(0); 
  const [rotationX, setRotationX] = useState(0); 
  const [activeView, setActiveView] = useState('front')
  const [scale, setScale] = useState(1);

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

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
// In your parent component
const handleViewChange = (view) => {
  switch (view) {
    case 'top':
      setRotationX(0.5);
      setRotationY(Math.PI/2);
      break;
    case 'front':
      setRotationX(0); 
      setRotationY(Math.PI/2);
      break;
    case 'side':
      setRotationX(0); 
      setRotationY(0);  
      break;
    default:
      setRotationX(0);
      setRotationY(0);
  }
};

  if (loading) return <div className="loading">Carregando produto...</div>;
  if (error) return <div className="error">Erro ao carregar produto: {error}</div>;
  if (!product) return <div className="error">Produto não encontrado</div>;

  return (
    <div className="product-detail-page">
      <Navbar/>
      <Helmet>
        <title>{product.produto.titulo} | QuantumShop</title>
        <meta name="description" content={product.produto.descricao} />
      </Helmet>
      <main>
        <section className="product-hero">
          <div className="container">
            <div className="product-container">
              <div className="product-viewer">
                <div className="viewer-border">
                  <div className="product-model">
                    <ModelViewer 
                      src={product.produto.arquivo3d} 
                      rotationY={rotationY} 
                      rotationX={rotationX}
                      scale={scale} 
                    />
                  </div>
                </div>
                <div className="viewer-controls">
                  <div className="control-btn" onClick={() => setScale(prev => prev < 1.5 ? prev + 0.1 : prev)}>
                    <FaSearchPlus className="fas fa-search-plus" 
                    onClick={() => {
                      handleViewChange('front');
                      setActiveView('front');
                    }}/>
                  </div>
                  <div className="control-btn" onClick={() => setScale(prev => prev > 0.7 ? prev - 0.1 : prev)}>
                    <FaSearchMinus className="fas fa-search-minus" 
                    onClick={() => {
                      handleViewChange('front');
                      setActiveView('front');
                    }}/>
                  </div>
                </div>
                <div className="zoom-controls">
                  <button 
                    className={`zoom-btn ${activeView === 'front' ? 'active' : ''}`}
                    onClick={() => {
                      handleViewChange('front');
                      setActiveView('front');
                    }}
                  >
                    Vista Frontal
                  </button>
                  <button className="zoom-btn" onClick={() => handleViewChange('side')}>
                    Vista Lateral
                  </button>
                  <button className="zoom-btn" onClick={() => handleViewChange('top')}>
                    Vista Superior
                  </button>
                </div>
              </div>
              
              <div className="product-info">
                <span className="product-category">Móveis: Prateleiras</span>
                <h1 className="product-title">{product.produto.titulo}</h1>
                <div className="product-rating">
                  <div className="stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                  </div>
                  <span className="rating-value">4.7 (142 avaliações)</span>
                </div>
                
                <div className="product-price">
                  <div className="current-price">
                    {Number(product.produto.valor).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </div>
                  {product.desconto && (
                    <>
                      <div className="old-price">
                        {Number(product.produto.desconto).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </div>
                      <div className="discount-badge">22% OFF</div>
                    </>
                  )}
                </div>
                
                <div className="shipping-info">
                  <i className="fas fa-shipping-fast"></i>
                  <div className="shipping-text">
                    Frete <span className="free-shipping">GRÁTIS</span> para todo o Brasil
                    <br /><small>Entrega estimada: 3-5 dias úteis</small>
                  </div>
                </div>
                
                <div className="product-actions">
                  <button className="action-btn buy-btn">
                    <i className="fas fa-bolt"></i> Comprar Agora
                  </button>
                  <button className="action-btn cart-btn">
                    <i className="fas fa-shopping-cart"></i> Adicionar ao Carrinho
                  </button>
                  <div className='action-add'>
                    <button 
                      className={`action-btn1 wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
                      onClick={() => setIsWishlisted(!isWishlisted)}
                    >
                      <i className={`fas fa-heart ${isWishlisted ? 'active' : ''}`}></i> 
                      {isWishlisted ? 'Favoritado' : 'Favoritar'}
                    </button>
                    <div className="quantity-selector">
                      <button className="quantity-btn" onClick={() => handleQuantityChange(-1)}>-</button>
                      <input 
                        type="text" 
                        className="quantity-input" 
                        value={quantity} 
                        readOnly
                      />
                      <button className="quantity-btn" onClick={() => handleQuantityChange(1)}>+</button>
                    </div>
                  </div>
                </div>
                
                <div className="product-features">
                  <div className="feature-item">
                    <FaSquarePollVertical className="feature-icon" />
                    <span>Madeira de alta qualidade</span>
                  </div>
                  <div className="feature-item">
                    <FaRulerCombined className="feature-icon" />
                    <span>Dimensões: 100cm x 30cm x 180cm</span>
                  </div>
                  <div className="feature-item">
                    <FaLayerGroup className="feature-icon" />
                    <span>5 prateleiras</span>
                  </div>
                  <div className="feature-item">
                    <FaBalanceScale className="feature-icon" />
                    <span>Capacidade: 50kg por prateleira</span>
                  </div>
                  <div className="feature-item">
                    <FaPalette className="feature-icon" />
                    <span>Cor: Natural</span>
                  </div>
                  <div className="feature-item">
                    <FaWrench className="feature-icon" />
                    <span>Montagem fácil</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="product-details">
          <div className="container">
            <div className="detail-tabs">
              <button 
                className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`} 
                onClick={() => setActiveTab('description')}
              >
                Descrição
              </button>
              <button 
                className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`} 
                onClick={() => setActiveTab('specs')}
              >
                Especificações
              </button>
              <button 
                className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`} 
                onClick={() => setActiveTab('reviews')}
              >
                Avaliações (142)
              </button>
            </div>
            
            <div className={`tab-content ${activeTab === 'description' ? 'active' : ''}`} id="description-content">
              <div className="description-content">
                <h3>Prateleira de Exibição de Madeira Premium</h3>
                <p>
                  A Prateleira de Exibição de Madeira é a escolha perfeita para organização e decoração. Feita com madeira de alta qualidade, combina durabilidade com um design elegante, ideal para exibir livros, objetos decorativos ou coleções em sua casa ou escritório.
                </p>
                
                <p><strong>Características principais:</strong></p>
                <ul>
                  <li>Madeira maciça com acabamento natural para maior durabilidade</li>
                  <li>Design modular com 5 prateleiras ajustáveis</li>
                  <li>Capacidade de peso de até 50kg por prateleira</li>
                  <li>Fácil montagem com instruções detalhadas inclusas</li>
                  <li>Acabamento ecológico, resistente a arranhões e manchas</li>
                  <li>Dimensões compactas para se adaptar a diversos espaços</li>
                  <li>Estilo versátil que combina com qualquer decoração</li>
                </ul>
              </div>
            </div>
            
            <div className={`tab-content ${activeTab === 'specs' ? 'active' : ''}`} id="specs-content">
              <div className="specs-grid">
                <div className="spec-item">
                  <div className="spec-title">Material</div>
                  <p>Madeira maciça (pinus)<br />
                  Acabamento: Verniz natural ecológico<br />
                  Resistente a arranhões</p>
                </div>
                <div className="spec-item">
                  <div className="spec-title">Dimensões</div>
                  <p>Altura: 180 cm<br />
                  Largura: 100 cm<br />
                  Profundidade: 30 cm</p>
                </div>
                <div className="spec-item">
                  <div className="spec-title">Capacidade</div>
                  <p>Capacidade por prateleira: 50 kg<br />
                  Total de prateleiras: 5<br />
                  Prateleiras ajustáveis</p>
                </div>
                <div className="spec-item">
                  <div className="spec-title">Montagem</div>
                  <p>Tempo estimado: 30 minutos<br />
                  Ferramentas necessárias: Chave de fenda (inclusa)<br />
                  Manual de instruções detalhado</p>
                </div>
                <div className="spec-item">
                  <div className="spec-title">Design</div>
                  <p>Estilo: Moderno<br />
                  Cor: Natural<br />
                  Acabamento fosco</p>
                </div>
                <div className="spec-item">
                  <div className="spec-title">Peso</div>
                  <p>Peso total: 25 kg<br />
                  Embalagem: 2 caixas<br />
                  Peso por caixa: 13 kg</p>
                </div>
              </div>
            </div>            
            <div className={`tab-content ${activeTab === 'reviews' ? 'active' : ''}`} id="reviews-content">
              <div className="reviews-container">
                <div className="review-summary">
                  <div className="average-rating">
                    <div className="rating-score">4.7</div>
                    <div className="stars">
                      <FaStar className="star-icon" />
                      <FaStar className="star-icon" />
                      <FaStar className="star-icon" />
                      <FaStar className="star-icon" />
                      <FaStarHalfAlt className="star-icon" />
                    </div>
                    <div className="rating-max">de 5</div>
                  </div>
                  <div className="rating-bars">
                    <div className="rating-bar">
                      <div className="bar-label">5 estrelas</div>
                      <div className="bar-container">
                        <div className="bar-fill" style={{ width: '85%' }}></div>
                      </div>
                      <div className="bar-value">85%</div>
                    </div>
                    <div className="rating-bar">
                      <div className="bar-label">4 estrelas</div>
                      <div className="bar-container">
                        <div className="bar-fill" style={{ width: '10%' }}></div>
                      </div>
                      <div className="bar-value">10%</div>
                    </div>
                    <div className="rating-bar">
                      <div className="bar-label">3 estrelas</div>
                      <div className="bar-container">
                        <div className="bar-fill" style={{ width: '3%' }}></div>
                      </div>
                      <div className="bar-value">3%</div>
                    </div>
                    <div className="rating-bar">
                      <div className="bar-label">2 estrelas</div>
                      <div className="bar-container">
                        <div className="bar-fill" style={{ width: '1%' }}></div>
                      </div>
                      <div className="bar-value">1%</div>
                    </div>
                    <div className="rating-bar">
                      <div className="bar-label">1 estrela</div>
                      <div className="bar-container">
                        <div className="bar-fill" style={{ width: '1%' }}></div>
                      </div>
                      <div className="bar-value">1%</div>
                    </div>
                  </div>
                </div>

                <div className="reviews-list">
                  <div className="review-card">
                    <div className="review-header">
                      <div className="reviewer">Carlos Silva</div>
                      <div className="review-date">15 de Outubro, 2023</div>
                    </div>
                    <div className="review-stars">
                      <FaStar className="star-icon" />
                      <FaStar className="star-icon" />
                      <FaStar className="star-icon" />
                      <FaStar className="star-icon" />
                      <FaStar className="star-icon" />
                    </div>
                    <h4 className="review-title">Perfeita para minha sala!</h4>
                    <p>Comprei esta prateleira para organizar meus livros e objetos decorativos, e estou muito satisfeito! A madeira é de ótima qualidade, e a montagem foi bem simples. O design combina perfeitamente com minha decoração. Recomendo!</p>
                  </div>

                  <div className="review-card">
                    <div className="review-header">
                      <div className="reviewer">Mariana Costa</div>
                      <div className="review-date">8 de Outubro, 2023</div>
                    </div>
                    <div className="review-stars">
                      <FaStar className="star-icon" />
                      <FaStar className="star-icon" />
                      <FaStar className="star-icon" />
                      <FaStar className="star-icon" />
                      <FaStar className="star-icon" />
                    </div>
                    <h4 className="review-title">Excelente qualidade e praticidade</h4>
                    <p>Essa prateleira é incrível! As prateleiras ajustáveis me permitiram organizar tudo do jeito que eu queria. O acabamento natural é lindo, e ela suporta bem o peso dos meus itens. Melhor compra que fiz este ano!</p>
                  </div>

                  <div className="review-card">
                    <div className="review-header">
                      <div className="reviewer">Roberto Almeida</div>
                      <div className="review-date">2 de Outubro, 2023</div>
                    </div>
                    <div className="review-stars">
                      <FaStar className="star-icon" />
                      <FaStar className="star-icon" />
                      <FaStar className="star-icon" />
                      <FaStar className="star-icon" />
                      <FaRegStar className="star-icon" />
                    </div>
                    <h4 className="review-title">Muito boa, mas montagem demorada</h4>
                    <p>A prateleira é robusta e tem um visual elegante. Minha única crítica é que a montagem levou um pouco mais de tempo do que o esperado, mas nada muito complicado. No geral, atendeu bem às minhas expectativas.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="related-products">
          <div className="container">
            <h2 className="section-title">Produtos Relacionados</h2>
            <div className="products-grid">
              <div className="product-card">
                <div className="card-image">
                  <img src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png" alt="Fone de Ouvido" />
                </div>
                <div className="card-info">
                  <h3 className="card-title">Fone Quantum Sound Pro</h3>
                  <div className="card-price">R$ 899,00</div>
                </div>
              </div>
              
              <div className="product-card">
                <div className="card-image">
                  <img src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png" alt="Câmera" />
                </div>
                <div className="card-info">
                  <h3 className="card-title">Câmera 360° Vision</h3>
                  <div className="card-price">R$ 1.599,00</div>
                </div>
              </div>
              
              <div className="product-card">
                <div className="card-image">
                  <img src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png" alt="Smartwatch" />
                </div>
                <div className="card-info">
                  <h3 className="card-title">Smartwatch X7 Pro</h3>
                  <div className="card-price">R$ 1.299,00</div>
                </div>
              </div>
              
              <div className="product-card">
                <div className="card-image">
                  <img src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png" alt="Caixa de Som" />
                </div>
                <div className="card-info">
                  <h3 className="card-title">Caixa de Som Nebula</h3>
                  <div className="card-price">R$ 699,00</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
};

export default ProductDetail;