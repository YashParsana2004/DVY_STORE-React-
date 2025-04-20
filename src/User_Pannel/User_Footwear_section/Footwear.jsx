import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import NavbarAfterLogin from '../Navbar_after_login';
import Footer from '../footer';

const FootwearCollection = () => {
  // Animation state for heading
  const [headingPosition, setHeadingPosition] = useState(-100);
  
  // Footwear items data
  const footwearItems = [
    { id: 1, name: "Running Shoes", price: 89.99, image: "/assets/running-shoes.jpg", category: "sneakers" },
    { id: 2, name: "Leather Loafers", price: 79.99, image: "/assets/loafers.jpg", category: "casual" },
    { id: 3, name: "Hiking Boots", price: 119.99, image: "/assets/hiking-boots.jpg", category: "outdoor" },
    { id: 4, name: "High Heels", price: 69.99, image: "/assets/heels.jpg", category: "formal" },
    { id: 5, name: "Flip Flops", price: 19.99, image: "/assets/flip-flops.jpg", category: "casual" },
    { id: 6, name: "Basketball Shoes", price: 99.99, image: "/assets/basketball-shoes.jpg", category: "sports" },
    { id: 7, name: "Dress Shoes", price: 89.99, image: "/assets/dress-shoes.jpg", category: "formal" },
    { id: 8, name: "Sandals", price: 29.99, image: "/assets/sandals.jpg", category: "casual" },
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

  // Filter items by category
  const filteredItems = activeCategory === 'all' 
    ? footwearItems 
    : footwearItems.filter(item => item.category === activeCategory);

  // Toggle wishlist
  const toggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  // Add to cart function
  const addToCart = (product) => {
    console.log(`Added ${product.name} to cart`);
  };

  // Combined styles object
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
      position: 'relative'
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
      <NavbarAfterLogin profileImage="/assets/profile-logo.png" activeLink="footwear" />
      
      <div style={styles.collectionContainer}>
        {/* Animated Heading */}
        <h1 style={styles.collectionHeading}>
          Footwear Collection
        </h1>
        
        {/* Category Filters */}
        <div style={styles.categoryFilters}>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeCategory === 'all' && styles.activeFilterButton)
            }}
            onClick={() => setActiveCategory('all')}
          >
            All Footwear
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeCategory === 'sneakers' && styles.activeFilterButton)
            }}
            onClick={() => setActiveCategory('sneakers')}
          >
            Sneakers
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeCategory === 'casual' && styles.activeFilterButton)
            }}
            onClick={() => setActiveCategory('casual')}
          >
            Casual
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeCategory === 'formal' && styles.activeFilterButton)
            }}
            onClick={() => setActiveCategory('formal')}
          >
            Formal
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeCategory === 'sports' && styles.activeFilterButton)
            }}
            onClick={() => setActiveCategory('sports')}
          >
            Sports
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeCategory === 'outdoor' && styles.activeFilterButton)
            }}
            onClick={() => setActiveCategory('outdoor')}
          >
            Outdoor
          </button>
        </div>
        
        {/* Items Grid */}
        <div style={styles.itemsGrid}>
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              style={styles.itemCard}
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
                onClick={() => toggleWishlist(item.id)}
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
                  onClick={() => addToCart(item)}
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

export default FootwearCollection;