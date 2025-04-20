import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaShoppingCart, FaHome, FaUser, FaInfoCircle, FaGift } from 'react-icons/fa';
import NavbarAfterLogin from './Navbar_after_login';
import Footer from './footer';

const ExclusiveProducts = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [hoveredHeart, setHoveredHeart] = useState(null);

  // Navigation items
  const navItems = [
    { path: '/home', icon: <FaHome />, label: 'Home' },
    { path: '/profile', icon: <FaUser />, label: 'Profile' },
    { path: '/about', icon: <FaInfoCircle />, label: 'About' },
    { path: '/exclusive', icon: <FaGift />, label: 'Exclusive', active: true }
  ];

  // Exclusive products data
  const exclusiveProducts = [
    { id: 1, name: "Plush Teddy Bear", price: "$24.99", category: "toys", image: "/assets/Teddy.jpeg" },
    { id: 2, name: "LEGO Set", price: "$49.99", category: "toys", image: "/assets/Lego.jpeg" },
    { id: 3, name: "Remote Control Car", price: "$34.99", category: "toys", image: "/assets/Car.jpeg" },
    { id: 4, name: "Premium Notebook", price: "$12.99", category: "stationery", image: "/assets/Notebook.jpeg" },
    { id: 5, name: "Art Supplies Kit", price: "$29.99", category: "stationery", image: "/assets/Art.jpeg" },
    { id: 6, name: "Fountain Pen Set", price: "$45.99", category: "stationery", image: "/assets/Pen.jpeg" },
    { id: 7, name: "Winter Jacket", price: "$89.99", category: "clothes", image: "/assets/Jacket.jpeg" },
    { id: 8, name: "Graphic T-Shirt", price: "$19.99", category: "clothes", image: "/assets/Tshirt.jpeg" },
    { id: 9, name: "Denim Jeans", price: "$39.99", category: "clothes", image: "/assets/Jeans.jpeg" },
  ];

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product) => {
    console.log(`Added ${product.name} to cart`);
    // Here you would typically add to cart state or make an API call
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

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

    // Animation trigger for products
    const animateProducts = () => {
      document.querySelectorAll('.product-card').forEach(product => {
        const { top } = product.getBoundingClientRect();
        if (top < window.innerHeight * 0.75) {
          product.style.opacity = "1";
          product.style.transform = "translateY(0)";
        }
      });
    };

    // Initial animation
    const timer = setTimeout(() => {
      animateProducts();
      // Animate header
      const header = document.querySelector('.products-header');
      if (header) {
        header.style.opacity = "1";
        header.style.transform = "translateY(0)";
      }
    }, 100);

    window.addEventListener('scroll', animateProducts);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', animateProducts);
      document.head.removeChild(styleElement);
    };
  }, []);

  const styles = {
    pageContainer: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    },
    contentContainer: {
      flex: 1,
      padding: '90px 20px'
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
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '30px',
      padding: '0 20px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    productCard: {
      backgroundColor: 'white',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      opacity: 0,
      transform: 'translateY(30px)',
      transition: 'all 0.6s ease-out',
      ':hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)'
      }
    },
    productImage: {
      width: '100%',
      height: '250px',
      objectFit: 'cover',
      transition: 'transform 0.3s ease',
      ':hover': {
        transform: 'scale(1.03)'
      }
    },
    productInfo: {
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    },
    productName: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      margin: 0
    },
    productPrice: {
      fontSize: '1.1rem',
      color: '#28a745',
      fontWeight: 'bold',
      margin: 0
    },
    productCategory: {
      fontSize: '0.9rem',
      color: '#6c757d',
      textTransform: 'capitalize'
    },
    actionButtons: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '15px'
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
    wishlistBtn: {
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.5rem',
      padding: '5px',
      transition: 'all 0.3s ease'
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* Navbar with navigation */}
      <NavbarAfterLogin 
        profileImage="/assets/profile-logo.png" 
        navItems={navItems}
        onNavigate={handleNavigation}
      />
      
      {/* Main Content */}
      <div style={styles.contentContainer}>
        <div className="products-header" style={styles.header}>
          <h1 style={styles.title}>Exclusive Products</h1>
          <p style={styles.subtitle}>Discover our seasonal collection of premium items</p>
        </div>

        <div style={styles.productsGrid}>
          {exclusiveProducts.map((product) => (
            <div key={product.id} className="product-card" style={styles.productCard}>
              <img src={product.image} alt={product.name} style={styles.productImage} />
              <div style={styles.productInfo}>
                <span style={styles.productCategory}>{product.category}</span>
                <h3 style={styles.productName}>{product.name}</h3>
                <p style={styles.productPrice}>{product.price}</p>
                <div style={styles.actionButtons}>
                  <button 
                    style={styles.addToCartBtn}
                    onClick={() => handleAddToCart(product)}
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                  <button 
                    style={{
                      ...styles.wishlistBtn,
                      color: wishlist.includes(product.id) ? '#ff4757' : 
                            hoveredHeart === product.id ? '#ff4757' : '#495057',
                      transform: hoveredHeart === product.id ? 'scale(1.2)' : 'scale(1)'
                    }}
                    onClick={() => toggleWishlist(product.id)}
                    onMouseEnter={() => setHoveredHeart(product.id)}
                    onMouseLeave={() => setHoveredHeart(null)}
                    aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    {wishlist.includes(product.id) ? <FaHeart /> : <FaRegHeart />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ExclusiveProducts;