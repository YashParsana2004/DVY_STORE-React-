import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import NavbarAfterLogin from '../Navbar_after_login';
import Footer from '../footer';

const FestiveCollection = () => {
  const navigate = useNavigate();
  const [headingAnimation, setHeadingAnimation] = useState({
    position: -100,
    opacity: 0
  });
  
  // Simplified festive items data
  const festiveItems = [
    { 
      id: 5, 
      name: "Halloween Pumpkin", 
      price: 19.99, 
      image: "/assets/Halloween1.jpeg", 
      category: "decorations",
      slug: "halloween-pumpkin"
    },
    { id: 1, name: "Christmas Tree", price: 49.99, image: "/assets/Christmas.jpeg", category: "decorations", slug: "christmas-tree" },
    { id: 2, name: "Diwali Lanterns", price: 19.99, image: "/assets/Latern.jpeg", category: "lights", slug: "diwali-lanterns" },
    { id: 3, name: "Hannukah Menorah", price: 29.99, image: "/assets/Hannukah-Menorah.jpeg", category: "religious", slug: "hannukah-menorah" },
    { id: 4, name: "Easter Basket", price: 14.99, image: "/assets/Easter.jpeg", category: "seasonal", slug: "easter-basket" },
    { id: 6, name: "New Year Garland", price: 12.99, image: "/assets/new-year.jpeg", category: "decorations", slug: "new-year-garland" },
    { id: 7, name: "Valentine's Teddy", price: 24.99, image: "/assets/Teddy.jpeg", category: "gifts", slug: "valentine-teddy" },
    { id: 8, name: "Thanksgiving Cornucopia", price: 34.99, image: "/assets/Thanks.jpeg", category: "seasonal", slug: "thanksgiving-cornucopia" },
  ];

  const [wishlist, setWishlist] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  // Animate heading from left to right with opacity
  useEffect(() => {
    const duration = 1000;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      setHeadingAnimation({
        position: -100 + (progress * 100),
        opacity: 0.5 + (progress * 0.5)
      });
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, []);

  // Filter items by category
  const filteredItems = activeCategory === 'all' 
    ? festiveItems 
    : festiveItems.filter(item => item.category === activeCategory);

  // Navigation function
  const navigateToProduct = (product) => {
  if (product.slug === "halloween-pumpkin") {
    navigate('/festive-items/halloween-pumpkin', { 
      state: { product } 
    });
  }
  // Add other product navigations as needed
};

  // Toggle wishlist with event prevention
  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  // Add to cart with event prevention
  const addToCart = (product, e) => {
    e.stopPropagation();
    console.log(`Added ${product.name} to cart`);
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
      left: `${headingAnimation.position}%`,
      opacity: headingAnimation.opacity,
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
    itemsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '2rem',
      padding: '1rem',
      '@media (max-width: 768px)': {
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))'
      }
    },
    itemCard: {
      background: 'white',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      position: 'relative',
      cursor: 'pointer'
    },
    itemCardHover: {
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
    itemImage: {
      width: '100%',
      height: '300px',
      objectFit: 'cover'
    },
    itemInfo: {
      padding: '1.5rem'
    },
    itemName: {
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
      <NavbarAfterLogin profileImage="/assets/profile-logo.png" activeLink="festive" />
      
      <div style={styles.collectionContainer}>
        <h1 style={styles.collectionHeading}>Festive Collection</h1>
        
        <div style={styles.categoryFilters}>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeCategory === 'all' && styles.activeFilterButton)
            }}
            onClick={() => setActiveCategory('all')}
          >
            All Items
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeCategory === 'decorations' && styles.activeFilterButton)
            }}
            onClick={() => setActiveCategory('decorations')}
          >
            Decorations
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeCategory === 'lights' && styles.activeFilterButton)
            }}
            onClick={() => setActiveCategory('lights')}
          >
            Lights
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeCategory === 'religious' && styles.activeFilterButton)
            }}
            onClick={() => setActiveCategory('religious')}
          >
            Religious
          </button>
        </div>
        
        <div style={styles.itemsGrid}>
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              style={styles.itemCard}
              onClick={() => navigateToProduct(item)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = styles.itemCardHover.transform;
                e.currentTarget.style.boxShadow = styles.itemCardHover.boxShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = styles.itemCard.boxShadow;
              }}
            >
              <div 
                style={styles.wishlistIcon}
                onClick={(e) => toggleWishlist(item.id, e)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = styles.wishlistIconHover.transform;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                }}
              >
                {wishlist.includes(item.id) ? (
                  <FaHeart style={{ color: '#dc3545' }} />
                ) : (
                  <FaRegHeart />
                )}
              </div>
              
              <img src={item.image} alt={item.name} style={styles.itemImage} />
              
              <div style={styles.itemInfo}>
                <h3 style={styles.itemName}>{item.name}</h3>
                <p style={styles.price}>${item.price.toFixed(2)}</p>
                <button 
                  style={styles.addToCart}
                  onClick={(e) => addToCart(item, e)}
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

export default FestiveCollection;