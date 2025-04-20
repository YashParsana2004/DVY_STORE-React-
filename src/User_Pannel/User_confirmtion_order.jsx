import React, { useEffect, useRef } from 'react';
import { FaHome, FaShoppingBag } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import NavbarAfterLogin from './Navbar_after_login';
import Footer from './footer';
import { gsap } from 'gsap';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const checkmarkRef = useRef(null);
  
  // Default values if no state is passed
  const orderDetails = state || {
    orderNumber: `#${Math.floor(Math.random() * 1000000)}`,
    items: [
      { id: 1, name: "Hat", price: 89.99, quantity: 1 },
      { id: 2, name: "LEGO Set", price: 49.99, quantity: 2 }
    ],
    subtotal: 189.97,
    tax: 18.99,
    shipping: 9.99,
    total: 218.95,
    deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5 days from now
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Scale up animation with bounce effect
    gsap.from(checkmarkRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)"
    });
    
    // Draw checkmark path animation
    const checkPath = document.querySelector('.check-path');
    const pathLength = checkPath.getTotalLength();
    
    gsap.set(checkPath, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength
    });
    
    gsap.to(checkPath, {
      strokeDashoffset: 0,
      duration: 0.8,
      delay: 0.4,
      ease: "power2.out"
    });
    
    // Background circle fill animation
    gsap.to(".checkmark-bg", {
      scale: 1.2,
      opacity: 0.8,
      duration: 0.8,
      delay: 0.4,
      ease: "power2.out",
      yoyo: true,
      repeat: 1
    });
  }, []);

  // Format date as "Day, Month Date, Year"
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
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
      maxWidth: '800px',
      margin: '0 auto',
      width: '100%',
      textAlign: 'center'
    },
    checkmarkContainer: {
      width: '150px',
      height: '150px',
      margin: '0 auto 30px',
      position: 'relative'
    },
    checkmarkBg: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      backgroundColor: '#f0fff0',
      opacity: 0
    },
    checkmarkSvg: {
      position: 'relative',
      width: '100%',
      height: '100%'
    },
    checkmarkCircle: {
      stroke: '#228B22',
      strokeWidth: 3,
      fill: 'none'
    },
    checkmarkCheck: {
      stroke: '#228B22',
      strokeWidth: 8,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      fill: 'none'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '25px',
      color: '#333'
    },
    thankYouText: {
      fontSize: '1.3rem',
      color: '#666',
      marginBottom: '40px',
      lineHeight: '1.6'
    },
    orderCard: {
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '30px',
      boxShadow: '0 3px 15px rgba(0, 0, 0, 0.08)',
      marginBottom: '30px',
      textAlign: 'left'
    },
    sectionTitle: {
      fontSize: '1.6rem',
      fontWeight: 'bold',
      marginBottom: '25px',
      color: '#333',
      borderBottom: '2px solid #eee',
      paddingBottom: '12px'
    },
    orderNumber: {
      fontWeight: 'bold',
      marginBottom: '25px',
      fontSize: '1.2rem',
      color: '#444'
    },
    deliveryDate: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '25px',
      fontSize: '1.2rem',
      color: '#444'
    },
    itemRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '18px',
      paddingBottom: '18px',
      borderBottom: '1px solid #eee'
    },
    itemName: {
      fontWeight: '500',
      fontSize: '1.1rem'
    },
    itemPrice: {
      color: '#228B22',
      fontWeight: '600',
      fontSize: '1.1rem'
    },
    summaryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '18px',
      fontSize: '1.1rem'
    },
    totalRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '25px',
      paddingTop: '25px',
      borderTop: '2px solid #eee',
      fontSize: '1.3rem',
      fontWeight: 'bold'
    },
    buttonGroup: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
      marginTop: '40px'
    },
    button: {
      padding: '15px 30px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.1rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      transition: 'all 0.3s'
    },
    homeButton: {
      backgroundColor: '#007bff',
      color: 'white',
      ':hover': {
        backgroundColor: '#0069d9',
        transform: 'translateY(-2px)'
      }
    },
    ordersButton: {
      backgroundColor: '#6c757d',
      color: 'white',
      ':hover': {
        backgroundColor: '#5a6268',
        transform: 'translateY(-2px)'
      }
    }
  };

  return (
    <div style={styles.pageContainer}>
      <NavbarAfterLogin profileImage="/assets/profile-logo.png" activeLink="cart" />
      
      <div style={styles.contentContainer}>
        <div style={styles.checkmarkContainer} ref={checkmarkRef}>
          <div className="checkmark-bg" style={styles.checkmarkBg}></div>
          <svg viewBox="0 0 52 52" style={styles.checkmarkSvg}>
            <circle 
              style={styles.checkmarkCircle}
              cx="26" 
              cy="26" 
              r="25" 
            />
            <path 
              className="check-path"
              style={styles.checkmarkCheck}
              d="M14.1 27.2l7.1 7.2 16.7-16.8" 
            />
          </svg>
        </div>
        
        <h1 style={styles.title}>Order Confirmed!</h1>
        <p style={styles.thankYouText}>
          Thank you for your purchase! We've received your order <br />
          and it's now being processed. You'll receive a confirmation email shortly.
        </p>
        
        <div style={styles.orderCard}>
          <h2 style={styles.sectionTitle}>Order Details</h2>
          <div style={styles.orderNumber}>Order Number: {orderDetails.orderNumber}</div>
          
          <div style={styles.deliveryDate}>
            <FaShoppingBag size={20} /> 
            Estimated Delivery: {formatDate(orderDetails.deliveryDate)}
          </div>
          
          <h3 style={styles.sectionTitle}>Your Items</h3>
          {orderDetails.items.map(item => (
            <div key={item.id} style={styles.itemRow}>
              <span style={styles.itemName}>
                {item.name} × {item.quantity}
              </span>
              <span style={styles.itemPrice}>
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          
          <h3 style={styles.sectionTitle}>Order Summary</h3>
          <div style={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${orderDetails.subtotal.toFixed(2)}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Tax</span>
            <span>${orderDetails.tax.toFixed(2)}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Shipping</span>
            <span>${orderDetails.shipping.toFixed(2)}</span>
          </div>
          <div style={styles.totalRow}>
            <span>Total</span>
            <span>${orderDetails.total.toFixed(2)}</span>
          </div>
        </div>
        
        <div style={styles.buttonGroup}>
          <button 
            style={{...styles.button, ...styles.homeButton}}
            onClick={() => navigate('/dashboard')}
          >
            <FaHome size={18} /> Back to Home
          </button>
          <button 
            style={{...styles.button, ...styles.ordersButton}}
            onClick={() => navigate('/orders')}
          >
            <FaShoppingBag size={18} /> View Orders
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;