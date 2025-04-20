import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import NavbarAfterLogin from '../Navbar_after_login';
import Footer from '../footer';

const ToysCollection = () => {
  const navigate = useNavigate();
  const [headingPosition, setHeadingPosition] = useState(-100);
  
  const toys = [
    { 
      id: 1, 
      name: "Building Blocks Set", 
      price: 29.99, 
      image: "/assets/Building-block4.jpeg", 
      category: "educational",
      slug: "building-blocks"
    },
    { id: 2, name: "Remote Control Car", price: 49.99, image: "/assets/Car.jpeg", category: "electronic" },
    { id: 3, name: "Plush Teddy Bear", price: 19.99, image: "/assets/Teddy.jpeg", category: "soft" },
    { id: 4, name: "Puzzle Game", price: 14.99, image: "/assets/Puzzle.jpeg", category: "educational" },
    { id: 5, name: "Action Figure", price: 24.99, image: "/assets/Figure.jpeg", category: "collectible" },
    { id: 6, name: "Doll House", price: 59.99, image: "/assets/Doll-house.jpeg", category: "pretend-play" },
  ];

  const [wishlist, setWishlist] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const duration = 1000;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const newPosition = -100 + (progress * 100);
      
      setHeadingPosition(newPosition);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, []);

  const filteredToys = activeCategory === 'all' 
    ? toys 
    : toys.filter(item => item.category === activeCategory);

  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const addToCart = (product, e) => {
    e.stopPropagation();
    console.log(`Added ${product.name} to cart`);
  };

  const navigateToProduct = (product) => {
    if (product.slug) {
      navigate(`/toys/${product.slug}`);
    } else {
      console.log(`Viewing ${product.name}`);
    }
  };

  const styles = {
    pageContainer: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      paddingTop: '80px'
    },
    collectionContainer: {
      flex: 1,
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%'
    },
    collectionHeading: {
      textAlign: 'center',
      fontSize: '3rem',
      margin: '2rem 0',
      color: '#333',
      position: 'relative',
      left: `${headingPosition}%`, // Now using headingPosition
      opacity: headingPosition === 0 ? 1 : 0.5 + (headingPosition + 100) / 200,
      transition: 'left 0.05s linear, opacity 0.05s linear',
      '@media (max-width: 768px)': {
        fontSize: '2.2rem'
      }
    },
    categoryFilters: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '1rem',
      marginBottom: '2rem'
    },
    filterButton: {
      padding: '0.5rem 1.5rem',
      border: '2px solid #007bff',
      background: 'transparent',
      color: '#007bff',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease'
    },
    activeFilterButton: {
      background: '#007bff',
      color: 'white'
    },
    toysGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '2rem',
      padding: '1rem',
      '@media (max-width: 768px)': {
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))'
      }
    },
    toyCard: {
      background: 'white',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      position: 'relative',
      cursor: 'pointer'
    },
    toyCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)'
    },
    wishlistIcon: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      fontSize: '1.5rem',
      color: '#dc3545',
      cursor: 'pointer',
      zIndex: 2,
      background: 'rgba(255, 255, 255, 0.8)',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      transition: 'all 0.3s ease'
    },
    wishlistIconHover: {
      transform: 'scale(1.1)'
    },
    toyImage: {
      width: '100%',
      height: '300px',
      objectFit: 'cover'
    },
    toyInfo: {
      padding: '1.5rem'
    },
    toyName: {
      margin: '0 0 0.5rem 0',
      fontSize: '1.2rem',
      color: '#333'
    },
    price: {
      fontSize: '1.1rem',
      color: '#28a745',
      fontWeight: 'bold',
      margin: '0 0 1rem 0'
    },
    addToCart: {
      width: '100%',
      padding: '0.75rem',
      background: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transition: 'background 0.3s ease'
    },
    addToCartHover: {
      background: '#0069d9'
    }
  };

  return (
    <div style={styles.pageContainer}>
      <NavbarAfterLogin profileImage="/assets/profile-logo.png" activeLink="toys" />
      
      <div style={styles.collectionContainer}>
        <h1 style={styles.collectionHeading}>
          Toys Collection
        </h1>
        
        <div style={styles.categoryFilters}>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeCategory === 'all' && styles.activeFilterButton)
            }}
            onClick={() => setActiveCategory('all')}
          >
            All Toys
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeCategory === 'educational' && styles.activeFilterButton)
            }}
            onClick={() => setActiveCategory('educational')}
          >
            Educational
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeCategory === 'electronic' && styles.activeFilterButton)
            }}
            onClick={() => setActiveCategory('electronic')}
          >
            Electronic
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeCategory === 'soft' && styles.activeFilterButton)
            }}
            onClick={() => setActiveCategory('soft')}
          >
            Soft Toys
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeCategory === 'collectible' && styles.activeFilterButton)
            }}
            onClick={() => setActiveCategory('collectible')}
          >
            Collectibles
          </button>
        </div>
        
        <div style={styles.toysGrid}>
          {filteredToys.map(toy => (
            <div 
              key={toy.id} 
              style={styles.toyCard}
              onClick={() => navigateToProduct(toy)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = styles.toyCardHover.transform;
                e.currentTarget.style.boxShadow = styles.toyCardHover.boxShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = styles.toyCard.boxShadow;
              }}
            >
              <div 
                style={styles.wishlistIcon}
                onClick={(e) => toggleWishlist(toy.id, e)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = styles.wishlistIconHover.transform;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                }}
              >
                {wishlist.includes(toy.id) ? (
                  <FaHeart style={{ color: '#dc3545' }} />
                ) : (
                  <FaRegHeart />
                )}
              </div>
              
              <img src={toy.image} alt={toy.name} style={styles.toyImage} />
              
              <div style={styles.toyInfo}>
                <h3 style={styles.toyName}>{toy.name}</h3>
                <p style={styles.price}>${toy.price.toFixed(2)}</p>
                <button 
                  style={styles.addToCart}
                  onClick={(e) => addToCart(toy, e)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = styles.addToCartHover.background;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = styles.addToCart.background;
                  }}
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ToysCollection;