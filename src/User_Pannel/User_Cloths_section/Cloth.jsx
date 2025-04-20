import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import NavbarAfterLogin from '../Navbar_after_login';
import Footer from '../footer';

const ClothCollection = () => {
  const navigate = useNavigate();
  const [headingPosition, setHeadingPosition] = useState(-100);
  
  const clothes = [
    { 
      id: 1, 
      name: "Winter Jacket", 
      price: 89.99, 
      image: "/assets/Winter-jacket.jpeg", 
      category: "jackets",
      slug: "winter-jacket"
    },
    { 
      id: 2, 
      name: "Denim Jeans", 
      price: 49.99, 
      image: "/assets/denimjeans1.jpeg", 
      category: "pants",
      slug: "denim-jeans" // Added slug for navigation
    },
    { 
      id: 3, 
      name: "Graphic T-Shirt", 
      price: 24.99, 
      image: "/assets/Tshirt.jpeg", 
      category: "shirts",
      slug: "graphic-tshirt"
    },
    { 
      id: 4, 
      name: "Wool Sweater", 
      price: 59.99, 
      image: "/assets/Wool-sweater.jpeg", 
      category: "sweaters",
      slug: "wool-sweater"
    },
    { 
      id: 5, 
      name: "Summer Dress", 
      price: 39.99, 
      image: "/assets/Summer-dress.jpeg", 
      category: "dresses",
      slug: "summer-dress"
    },
    { 
      id: 6, 
      name: "Sports Hoodie", 
      price: 44.99, 
      image: "/assets/Sports-hoodie.jpeg", 
      category: "hoodies",
      slug: "sports-hoodie"
    },
  ];

  const [wishlist, setWishlist] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  // Animate heading from left to right
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

  // Filter clothes by category
  const filteredClothes = activeCategory === 'all' 
    ? clothes 
    : clothes.filter(item => item.category === activeCategory);

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

  // Navigate to product page using slug
  const navigateToProduct = (product) => {
    if (product.slug) {
      navigate(`/clothes/${product.slug}`);
    }
  };

  // Styles (same structure as your original)
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
      left: `${headingPosition}%`,
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
    clothesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '2rem',
      padding: '1rem',
      '@media (max-width: 768px)': {
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))'
      }
    },
    clothCard: {
      background: 'white',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      position: 'relative',
      cursor: 'pointer'
    },
    clothCardHover: {
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
    clothImage: {
      width: '100%',
      height: '300px',
      objectFit: 'cover'
    },
    clothInfo: {
      padding: '1.5rem'
    },
    clothName: {
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
      <NavbarAfterLogin profileImage="/assets/profile-logo.png" activeLink="clothes" />
      
      <div style={styles.collectionContainer}>
        <h1 style={styles.collectionHeading}>Cloth Collection</h1>
        
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
              ...(activeCategory === 'jackets' && styles.activeFilterButton)
            }}
            onClick={() => setActiveCategory('jackets')}
          >
            Jackets
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeCategory === 'shirts' && styles.activeFilterButton)
            }}
            onClick={() => setActiveCategory('shirts')}
          >
            Shirts
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeCategory === 'pants' && styles.activeFilterButton)
            }}
            onClick={() => setActiveCategory('pants')}
          >
            Pants
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeCategory === 'dresses' && styles.activeFilterButton)
            }}
            onClick={() => setActiveCategory('dresses')}
          >
            Dresses
          </button>
        </div>
        
        <div style={styles.clothesGrid}>
          {filteredClothes.map(item => (
            <div 
              key={item.id} 
              style={styles.clothCard}
              onClick={() => navigateToProduct(item)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = styles.clothCardHover.transform;
                e.currentTarget.style.boxShadow = styles.clothCardHover.boxShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = styles.clothCard.boxShadow;
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
              
              <img src={item.image} alt={item.name} style={styles.clothImage} />
              
              <div style={styles.clothInfo}>
                <h3 style={styles.clothName}>{item.name}</h3>
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

export default ClothCollection;