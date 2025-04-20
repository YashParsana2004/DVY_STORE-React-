import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaShoppingCart, FaTrash } from 'react-icons/fa';
import NavbarAfterLogin from './Navbar_after_login';
import Footer from './footer';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Car",
      price: 89.99,
      image: "/assets/Car.jpeg",
      inStock: true
    },
    {
      id: 2,
      name: "Premium Notebook",
      price: 12.99,
      image: "/assets/Notebook.jpeg",
      inStock: true
    },
    {
      id: 3,
      name: "Art Supplies Kit",
      price: 29.99,
      image: "/assets/Art.jpeg",
      inStock: false
    }
  ]);

  // Remove item from wishlist
  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  // Add item to cart
  const addToCart = (product) => {
    console.log(`Added ${product.name} to cart`);
  };

  // Scroll animation setup
  useEffect(() => {
    // Custom scrollbar styles
    const customScrollbarStyles = `
      ::-webkit-scrollbar { width: 10px; }
      ::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
      ::-webkit-scrollbar-thumb { background: #888; border-radius: 10px; }
      ::-webkit-scrollbar-thumb:hover { background: #555; }
    `;

    const styleElement = document.createElement("style");
    styleElement.innerHTML = customScrollbarStyles;
    document.head.appendChild(styleElement);

    // Animation trigger for wishlist items
    const animateItems = () => {
      const items = document.querySelectorAll('.wishlist-item');
      items.forEach((item) => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight * 0.75) {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }
      });

      // Animate header
      const header = document.querySelector('.wishlist-header');
      if (header) {
        header.style.opacity = "1";
        header.style.transform = "translateY(0)";
      }
    };

    // Initial animation
    const timer = setTimeout(animateItems, 100);
    window.addEventListener('scroll', animateItems);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', animateItems);
      document.head.removeChild(styleElement);
    };
  }, []);

  // Styles
  const styles = {
    pageContainer: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      paddingTop: '80px'
    },
    contentContainer: {
      flex: 1,
      padding: '40px 20px',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
      opacity: 0,
      transform: 'translateY(-20px)',
      transition: 'all 0.5s ease-out 0.4s'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '10px'
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#6c757d'
    },
    wishlistGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '30px'
    },
    wishlistItem: {
      backgroundColor: 'white',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.6s ease-out',
      opacity: 0,
      transform: 'translateY(30px)',
      ':hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)'
      }
    },
    itemImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      transition: 'transform 0.3s ease',
      ':hover': {
        transform: 'scale(1.03)'
      }
    },
    itemInfo: {
      padding: '20px',
      position: 'relative'
    },
    itemName: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      margin: '0 0 10px 0'
    },
    itemPrice: {
      fontSize: '1.1rem',
      color: '#28a745',
      fontWeight: 'bold',
      margin: '0 0 15px 0'
    },
    stockStatus: {
      fontSize: '0.9rem',
      color: '#dc3545',
      margin: '0 0 15px 0'
    },
    inStock: {
      color: '#28a745'
    },
    actionButtons: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    addToCartBtn: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '10px 15px',
      borderRadius: '5px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'background-color 0.2s ease',
      ':hover': {
        backgroundColor: '#0069d9'
      }
    },
    removeBtn: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#dc3545',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      fontSize: '1rem'
    },
    emptyWishlist: {
      textAlign: 'center',
      padding: '60px 0',
      opacity: 0,
      transform: 'translateY(20px)',
      transition: 'all 0.6s ease-out'
    },
    emptyVisible: {
      opacity: 1,
      transform: 'translateY(0)'
    },
    emptyTitle: {
      fontSize: '1.8rem',
      marginBottom: '20px'
    },
    continueShopping: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '5px',
      fontSize: '1.1rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      ':hover': {
        backgroundColor: '#0069d9'
      }
    }
  };

  return (
    <div style={styles.pageContainer}>
      <NavbarAfterLogin profileImage="/assets/profile-logo.png" activeLink="wishlist" />
      
      <div style={styles.contentContainer}>
        <div className="wishlist-header" style={styles.header}>
          <h1 style={styles.title}>Your Wishlist</h1>
          <p style={styles.subtitle}>{wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}</p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist" style={{...styles.emptyWishlist, ...styles.emptyVisible}}>
            <h2 style={styles.emptyTitle}>Your wishlist is empty</h2>
            <p>Save your favorite items here for later</p>
            <button style={styles.continueShopping}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div style={styles.wishlistGrid}>
            {wishlistItems.map(item => (
              <div 
                key={item.id} 
                className="wishlist-item" 
                style={styles.wishlistItem}
              >
                <img src={item.image} alt={item.name} style={styles.itemImage} />
                <div style={styles.itemInfo}>
                  <h3 style={styles.itemName}>{item.name}</h3>
                  <p style={styles.itemPrice}>${item.price.toFixed(2)}</p>
                  <p style={{...styles.stockStatus, ...(item.inStock ? styles.inStock : {})}}>
                    {item.inStock ? 'In Stock' : 'Out of Stock'}
                  </p>
                  <div style={styles.actionButtons}>
                    <button 
                      style={{
                        ...styles.addToCartBtn,
                        opacity: item.inStock ? 1 : 0.6,
                        cursor: item.inStock ? 'pointer' : 'not-allowed'
                      }}
                      onClick={() => item.inStock && addToCart(item)}
                      disabled={!item.inStock}
                    >
                      <FaShoppingCart /> {item.inStock ? 'Add to Cart' : 'Notify Me'}
                    </button>
                    <button 
                      style={styles.removeBtn}
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <FaTrash /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default WishlistPage;