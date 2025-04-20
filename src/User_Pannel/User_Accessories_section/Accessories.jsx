import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import NavbarAfterLogin from '../Navbar_after_login';
import Footer from '../footer';

const AccessoriesCollection = () => {
  // Animation state for heading
  const [headingPosition, setHeadingPosition] = useState(-100);
  
  // Accessories items data
  const accessoriesItems = [
    { id: 1, name: "Designer Sunglasses", price: 89.99, image: "/assets/sunglasses.jpg", category: "eyewear" },
    { id: 2, name: "Leather Wallet", price: 49.99, image: "/assets/wallet.jpg", category: "wallets" },
    { id: 3, name: "Silk Scarf", price: 39.99, image: "/assets/scarf.jpg", category: "scarves" },
    { id: 4, name: "Statement Necklace", price: 34.99, image: "/assets/necklace.jpg", category: "jewelry" },
    { id: 5, name: "Classic Watch", price: 129.99, image: "/assets/watch.jpg", category: "watches" },
    { id: 6, name: "Designer Handbag", price: 199.99, image: "/assets/handbag.jpg", category: "bags" },
    { id: 7, name: "Leather Belt", price: 44.99, image: "/assets/belt.jpg", category: "belts" },
    { id: 8, name: "Cashmere Gloves", price: 29.99, image: "/assets/gloves.jpg", category: "winter" },
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
    ? accessoriesItems 
    : accessoriesItems.filter(item => item.category === activeCategory);

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
      <NavbarAfterLogin profileImage="/assets/profile-logo.png" activeLink="accessories" />
      
      <div style={styles.collectionContainer}>
        {/* Animated Heading */}
        <h1 style={styles.collectionHeading}>
          Accessories Collection
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
            All Accessories
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeCategory === 'jewelry' && styles.activeFilterButton)
            }}
            onClick={() => setActiveCategory('jewelry')}
          >
            Jewelry
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeCategory === 'watches' && styles.activeFilterButton)
            }}
            onClick={() => setActiveCategory('watches')}
          >
            Watches
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeCategory === 'bags' && styles.activeFilterButton)
            }}
            onClick={() => setActiveCategory('bags')}
          >
            Bags
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeCategory === 'eyewear' && styles.activeFilterButton)
            }}
            onClick={() => setActiveCategory('eyewear')}
          >
            Eyewear
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeCategory === 'wallets' && styles.activeFilterButton)
            }}
            onClick={() => setActiveCategory('wallets')}
          >
            Wallets
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

export default AccessoriesCollection;