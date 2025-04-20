import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaBoxOpen, FaCalendarAlt, FaDollarSign, FaReceipt, FaChevronDown, FaArrowUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import NavbarAfterLogin from './Navbar_after_login';
import Footer from './footer';

const Orders = () => {
  const navigate = useNavigate();
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Sample order data
  const orders = [
    {
      id: 'ORD-12345',
      date: '2023-05-15',
      status: 'Delivered',
      items: [
        { name: 'Summer Hat', quantity: 1, price: 89.99 },
        { name: 'Premium Notebook', quantity: 2, price: 12.99 }
      ],
      total: 115.97,
      trackingNumber: 'TRK789456123'
    },
    {
      id: 'ORD-67890',
      date: '2023-04-22',
      status: 'Shipped',
      items: [
        { name: 'LEGO Set', quantity: 1, price: 49.99 }
      ],
      total: 49.99,
      trackingNumber: 'TRK321654987'
    },
    {
      id: 'ORD-54321',
      date: '2023-03-10',
      status: 'Cancelled',
      items: [
        { name: 'Wireless Earbuds', quantity: 1, price: 59.99 },
        { name: 'Phone Case', quantity: 1, price: 19.99 }
      ],
      total: 79.98
    }
  ];

  // Custom scrollbar styles
  const customScrollbarStyles = `
    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  `;

  useEffect(() => {
    // Add custom scrollbar styles
    const styleElement = document.createElement("style");
    styleElement.innerHTML = customScrollbarStyles;
    document.head.appendChild(styleElement);

    // Auto-scroll to top on component mount
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    // Animation trigger on mount
    setTimeout(() => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, index * 100);
      });
    }, 100);

    // Scroll position tracking
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollToTop(st > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      document.head.removeChild(styleElement);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getStatusStyle = (status) => {
    const baseStyle = {
      padding: "5px 10px",
      borderRadius: "20px",
      fontSize: "0.9rem",
      fontWeight: "bold"
    };

    switch(status) {
      case "Delivered":
        return { ...baseStyle, backgroundColor: "#28a74520", color: "#28a745" };
      case "Shipped":
        return { ...baseStyle, backgroundColor: "#17a2b820", color: "#17a2b8" };
      case "Cancelled":
        return { ...baseStyle, backgroundColor: "#dc354520", color: "#dc3545" };
      default:
        return { ...baseStyle, backgroundColor: "#6c757d20", color: "#6c757d" };
    }
  };

  const toggleOrderExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
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
      width: '100%'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      position: 'relative',
      opacity: 0,
      transform: 'translateY(20px)',
      transition: 'all 0.5s ease-out'
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
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: '#0069d9',
        transform: 'translateY(-2px)'
      }
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#333',
      margin: '0 auto',
      textAlign: 'center'
    },
    ordersContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    orderCard: {
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      opacity: 0,
      transform: 'translateY(30px)',
      transition: 'all 0.5s ease-out'
    },
    orderCardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    orderHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px',
      paddingBottom: '15px',
      borderBottom: '1px solid #eee',
      width: '100%'
    },
    orderId: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: '#007bff'
    },
    orderMeta: {
      display: 'flex',
      gap: '20px',
      marginBottom: '15px'
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      fontSize: '0.9rem',
      color: '#6c757d'
    },
    itemsList: {
      margin: '15px 0'
    },
    itemRow: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px 0',
      borderBottom: '1px solid #f8f9fa'
    },
    itemName: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    itemQuantity: {
      color: '#6c757d',
      fontSize: '0.9rem'
    },
    itemPrice: {
      fontWeight: 'bold'
    },
    orderTotal: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '15px',
      paddingTop: '15px',
      borderTop: '1px solid #eee',
      fontWeight: 'bold',
      fontSize: '1.1rem'
    },
    orderActions: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px',
      marginTop: '15px'
    },
    actionButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      backgroundColor: 'transparent',
      border: '1px solid #ddd',
      padding: '8px 15px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: '#f8f9fa',
        transform: 'translateY(-2px)'
      }
    },
    emptyOrders: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      textAlign: 'center',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      opacity: 0,
      transform: 'translateY(20px)',
      transition: 'all 0.5s ease-out'
    },
    emptyIcon: {
      fontSize: '3rem',
      color: '#6c757d',
      marginBottom: '15px'
    },
    emptyText: {
      fontSize: '1.2rem',
      color: '#6c757d',
      marginBottom: '15px'
    },
    shopButton: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: '#0069d9',
        transform: 'translateY(-2px)'
      }
    },
    chevronIcon: {
      transition: 'transform 0.3s ease'
    },
    orderCardContent: {
      maxHeight: 0,
      overflow: 'hidden',
      transition: 'max-height 0.5s ease, opacity 0.3s ease',
      opacity: 0
    },
    scrollToTopButton: {
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      backgroundColor: '#007bff',
      color: 'white',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
      transition: 'all 0.3s ease',
      transform: showScrollToTop ? 'scale(1)' : 'scale(0)',
      zIndex: 1000,
      '&:hover': {
        backgroundColor: '#0069d9',
        transform: showScrollToTop ? 'scale(1.1)' : 'scale(0)'
      }
    }
  };

  return (
    <div style={styles.pageContainer}>
      <NavbarAfterLogin profileImage="/assets/profile-logo.png" activeLink="orders" />
      
      <div style={styles.contentContainer}>
        <div 
          className="animate-on-scroll" 
          style={{
            ...styles.header,
            opacity: 1,
            transform: 'translateY(0)'
          }}
        >
          <button 
            style={styles.backButton}
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft /> Back
          </button>
          <h1 style={styles.title}>Your Orders</h1>
          <div style={{ width: '85px' }}></div>
        </div>

        {orders.length === 0 ? (
          <div 
            className="animate-on-scroll" 
            style={{
              ...styles.emptyOrders,
              opacity: 1,
              transform: 'translateY(0)'
            }}
          >
            <FaBoxOpen style={styles.emptyIcon} />
            <h2 style={styles.emptyText}>You haven't placed any orders yet</h2>
            <button 
              style={styles.shopButton}
              onClick={() => navigate('/products')}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div style={styles.ordersContainer}>
            {orders.map((order, index) => (
              <div 
                key={order.id} 
                className="animate-on-scroll" 
                style={{
                  ...styles.orderCard,
                  transitionDelay: `${index * 0.1}s`,
                  opacity: 1,
                  transform: 'translateY(0)'
                }}
              >
                <div 
                  style={styles.orderCardHeader}
                  onClick={() => toggleOrderExpand(order.id)}
                >
                  <div style={styles.orderHeader}>
                    <div style={styles.orderId}>Order #{order.id}</div>
                    <div style={getStatusStyle(order.status)}>{order.status}</div>
                  </div>
                  <FaChevronDown style={{
                    ...styles.chevronIcon,
                    transform: expandedOrder === order.id ? 'rotate(180deg)' : 'rotate(0)'
                  }} />
                </div>
                
                <div 
                  style={{
                    ...styles.orderCardContent,
                    maxHeight: expandedOrder === order.id ? '500px' : '0',
                    opacity: expandedOrder === order.id ? 1 : 0
                  }}
                >
                  <div style={styles.orderMeta}>
                    <div style={styles.metaItem}>
                      <FaCalendarAlt /> Ordered on {new Date(order.date).toLocaleDateString()}
                    </div>
                    <div style={styles.metaItem}>
                      <FaDollarSign /> Total: ${order.total.toFixed(2)}
                    </div>
                  </div>
                  
                  <div style={styles.itemsList}>
                    {order.items.map((item, itemIndex) => (
                      <div 
                        key={itemIndex} 
                        style={{
                          ...styles.itemRow,
                          transition: 'all 0.3s ease',
                          transitionDelay: `${itemIndex * 0.05}s`,
                          opacity: expandedOrder === order.id ? 1 : 0,
                          transform: expandedOrder === order.id ? 'translateX(0)' : 'translateX(-20px)'
                        }}
                      >
                        <div style={styles.itemName}>
                          {item.name}
                          <span style={styles.itemQuantity}>x{item.quantity}</span>
                        </div>
                        <div style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div style={styles.orderTotal}>
                    <span>Order Total:</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                  
                  <div style={styles.orderActions}>
                    <button 
                      style={styles.actionButton}
                      onClick={() => navigate(`/order/${order.id}`)}
                    >
                      <FaReceipt /> View Details
                    </button>
                    {order.status === 'Shipped' && (
                      <button style={styles.actionButton}>
                        Track Package
                      </button>
                    )}
                    {order.status === 'Delivered' && (
                      <button style={styles.actionButton}>
                        Buy Again
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button 
        style={styles.scrollToTopButton}
        onClick={scrollToTop}
        title="Scroll to top"
      >
        <FaArrowUp />
      </button>

      <Footer />
    </div>
  );
};

export default Orders;