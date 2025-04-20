import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus, FaTrash, FaArrowLeft, FaHistory } from 'react-icons/fa';
import NavbarAfterLogin from './Navbar_after_login';
import Footer from './footer';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Hat", price: 89.99, quantity: 1, image: "/assets/Summer-hat.jpeg" },
    { id: 2, name: "LEGO Set", price: 49.99, quantity: 2, image: "/assets/Lego.jpeg" },
    { id: 3, name: "Premium Notebook", price: 12.99, quantity: 3, image: "/assets/Notebook.jpeg" }
  ]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  // Auto-scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Scroll animation setup
    const animateElements = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < window.innerHeight * 0.8) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      });
    };

    // Initial animation
    animateElements();
    window.addEventListener('scroll', animateElements);
    
    return () => window.removeEventListener('scroll', animateElements);
  }, []);

  const increaseQuantity = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate('/checkout', {
      state: {
        cartItems,
        subtotal,
        tax,
        shipping,
        total
      }
    });
  };

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
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom: '30px',
      maxWidth: '1000px',
      position: 'relative'
    },
    headerLeftButton: {
      position: 'absolute',
      left: 0
    },
    headerRightButton: {
      position: 'absolute',
      right: 0
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '10px 15px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'background-color 0.2s ease',
      ':hover': {
        backgroundColor: '#0069d9'
      }
    },
    ordersButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      padding: '10px 15px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'background-color 0.2s ease',
      ':hover': {
        backgroundColor: '#5a6268'
      }
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#333',
      margin: '0 auto',
      textAlign: 'center'
    },
    cartContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      width: '100%',
      maxWidth: '1000px',
      '@media (min-width: 992px)': {
        flexDirection: 'row'
      }
    },
    itemsSection: {
      flex: 2,
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      opacity: 0,
      transform: 'translateY(30px)',
      transition: 'all 0.6s ease-out'
    },
    summarySection: {
      flex: 1,
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      height: 'fit-content',
      opacity: 0,
      transform: 'translateY(30px)',
      transition: 'all 0.6s ease-out 0.2s'
    },
    cartItem: {
      display: 'flex',
      padding: '15px 0',
      borderBottom: '1px solid #eee',
      gap: '20px',
      opacity: 0,
      transform: 'translateX(-20px)',
      transition: 'all 0.4s ease-out'
    },
    itemImage: {
      width: '100px',
      height: '100px',
      objectFit: 'cover',
      borderRadius: '5px',
      transition: 'transform 0.3s ease',
      ':hover': {
        transform: 'scale(1.05)'
      }
    },
    itemDetails: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    itemName: {
      fontSize: '1.1rem',
      fontWeight: 'bold',
      margin: 0
    },
    itemPrice: {
      fontSize: '1rem',
      color: '#28a745',
      fontWeight: 'bold'
    },
    quantityControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    quantityButton: {
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      border: '1px solid #ddd',
      backgroundColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      ':hover': {
        backgroundColor: '#f8f9fa'
      }
    },
    quantityDisplay: {
      minWidth: '30px',
      textAlign: 'center'
    },
    removeButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#dc3545',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      fontSize: '0.9rem',
      transition: 'all 0.2s ease',
      ':hover': {
        transform: 'scale(1.05)'
      }
    },
    summaryTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '20px'
    },
    summaryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '15px'
    },
    totalRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px',
      paddingTop: '20px',
      borderTop: '1px solid #eee',
      fontSize: '1.2rem',
      fontWeight: 'bold'
    },
    checkoutButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: cartItems.length === 0 ? '#cccccc' : '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      cursor: cartItems.length === 0 ? 'not-allowed' : 'pointer',
      transition: 'background-color 0.2s ease, transform 0.2s ease',
      marginTop: '20px',
      ':hover': {
        backgroundColor: cartItems.length === 0 ? '#cccccc' : '#218838',
        transform: cartItems.length === 0 ? 'none' : 'translateY(-2px)'
      }
    },
    emptyCart: {
      textAlign: 'center',
      padding: '40px 0',
      width: '100%',
      opacity: 0,
      transform: 'translateY(20px)',
      transition: 'all 0.6s ease-out'
    }
  };

  return (
    <div style={styles.pageContainer}>
      <NavbarAfterLogin profileImage="/assets/profile-logo.png" activeLink="cart" />
      
      <div style={styles.contentContainer}>
        <div className="animate-on-scroll" style={styles.header}>
          <div style={styles.headerLeftButton}>
            <button 
              style={styles.backButton}
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft /> Continue Shopping
            </button>
          </div>
          
          <h1 style={styles.title}>Your Shopping Cart</h1>
          
          <div style={styles.headerRightButton}>
            <button 
              style={styles.ordersButton}
              onClick={() => navigate('/orders')}
            >
              <FaHistory /> View Orders
            </button>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="animate-on-scroll" style={{...styles.emptyCart, ...{opacity: 1, transform: 'translateY(0)'}}}>
            <h2>Your cart is empty</h2>
            <p>Browse our products to add items to your cart</p>
          </div>
        ) : (
          <div style={styles.cartContainer}>
            <div className="animate-on-scroll" style={styles.itemsSection}>
              {cartItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="animate-on-scroll" 
                  style={{
                    ...styles.cartItem,
                    transitionDelay: `${0.1 * index}s`,
                    opacity: 1,
                    transform: 'translateX(0)'
                  }}
                >
                  <img src={item.image} alt={item.name} style={styles.itemImage} />
                  <div style={styles.itemDetails}>
                    <div>
                      <h3 style={styles.itemName}>{item.name}</h3>
                      <p style={styles.itemPrice}>${item.price.toFixed(2)}</p>
                    </div>
                    <div style={styles.quantityControls}>
                      <button 
                        style={styles.quantityButton}
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        <FaMinus size={12} />
                      </button>
                      <span style={styles.quantityDisplay}>{item.quantity}</span>
                      <button 
                        style={styles.quantityButton}
                        onClick={() => increaseQuantity(item.id)}
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                  </div>
                  <button 
                    style={styles.removeButton}
                    onClick={() => removeItem(item.id)}
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="animate-on-scroll" style={styles.summarySection}>
              <h2 style={styles.summaryTitle}>Order Summary</h2>
              <div style={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div style={styles.totalRow}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button 
                style={styles.checkoutButton}
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;