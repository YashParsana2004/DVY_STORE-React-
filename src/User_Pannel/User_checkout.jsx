import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaMapMarkerAlt, FaCreditCard, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import NavbarAfterLogin from './Navbar_after_login';
import Footer from './footer';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('shipping');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});

  // Sample cart items
  const cartItems = [
    { id: 1, name: "Hat", price: 89.99, quantity: 1, image: "/assets/Summer-hat.jpeg" },
    { id: 2, name: "LEGO Set", price: 49.99, quantity: 2, image: "/assets/Lego.jpeg" }
  ];

  // Calculate order totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const shipping = 9.99;
  const total = subtotal + tax + shipping;

  // Auto-scroll to top on component mount and tab change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    // Animation trigger
    setTimeout(() => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, index * 100);
      });
    }, 100);
  }, [activeTab]);

  // Format card number with spaces every 4 digits
  const formatCardNumber = (value) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  // Format expiry date with slash
  const formatExpiryDate = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .substring(0, 5);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value).substring(0, 19);
    } else if (name === 'expiry') {
      formattedValue = formatExpiryDate(value);
    }
    
    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // Form validation functions
  const validateShipping = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors = {};
    if (!formData.cardNumber.trim() || !/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(formData.cardNumber)) 
      newErrors.cardNumber = 'Valid card number is required';
    if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
    if (!formData.expiry.trim() || !/^\d{2}\/\d{2}$/.test(formData.expiry)) 
      newErrors.expiry = 'Valid expiry date (MM/YY) required';
    if (!formData.cvv.trim() || !/^\d{3,4}$/.test(formData.cvv)) 
      newErrors.cvv = 'Valid CVV required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handlers
  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (validateShipping()) {
      setActiveTab('payment');
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (validatePayment()) {
      alert('Order placed successfully!');
      navigate('/order-confirmation');
    }
  };

  // Component styles
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
      maxWidth: '1000px',
      margin: '0 auto',
      width: '100%'
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '30px',
      position: 'relative',
      opacity: 0,
      transform: 'translateY(20px)',
      transition: 'all 0.5s ease-out'
    },
    backButton: {
      position: 'absolute',
      left: 0,
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
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#0069d9',
        transform: 'translateY(-2px)'
      }
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      margin: '0 0 30px 0',
      textAlign: 'center'
    },
    checkoutLayout: {
      display: 'flex',
      flexDirection: 'column',
      gap: '30px'
    },
    orderSummary: {
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '25px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      opacity: 0,
      transform: 'translateY(30px)',
      transition: 'all 0.5s ease-out 0.1s'
    },
    formSection: {
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '25px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      opacity: 0,
      transform: 'translateY(30px)',
      transition: 'all 0.5s ease-out 0.2s'
    },
    tabs: {
      display: 'flex',
      borderBottom: '1px solid #ddd',
      marginBottom: '20px'
    },
    tab: {
      padding: '12px 20px',
      cursor: 'pointer',
      borderBottom: '3px solid transparent',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      '&.active': {
        borderBottom: '3px solid #007bff',
        color: '#007bff'
      },
      ':hover': {
        color: '#007bff'
      }
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '500'
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '1rem',
      fontFamily: 'monospace'
    },
    errorText: {
      color: '#dc3545',
      fontSize: '0.8rem',
      marginTop: '5px'
    },
    row: {
      display: 'flex',
      gap: '20px',
      '& > div': {
        flex: 1
      }
    },
    summaryTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '20px'
    },
    cartItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      marginBottom: '15px',
      paddingBottom: '15px',
      borderBottom: '1px solid #eee'
    },
    itemImage: {
      width: '60px',
      height: '60px',
      objectFit: 'cover',
      borderRadius: '5px'
    },
    itemDetails: {
      flex: 1
    },
    itemName: {
      margin: 0,
      fontSize: '1rem'
    },
    itemPrice: {
      margin: '5px 0 0',
      fontSize: '0.9rem',
      color: '#28a745'
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
    submitButton: {
      width: '100%',
      padding: '15px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      marginTop: '20px',
      ':hover': {
        backgroundColor: '#218838'
      }
    },
    secureNote: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#6c757d',
      fontSize: '0.9rem',
      marginTop: '15px',
      justifyContent: 'center'
    }
  };

  return (
    <div style={styles.pageContainer}>
      <NavbarAfterLogin profileImage="/assets/profile-logo.png" activeLink="cart" />
      
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
            <FaArrowLeft /> Back to Cart
          </button>
          <h1 style={styles.title}>Checkout</h1>
        </div>

        <div style={styles.checkoutLayout}>
          <div 
            className="animate-on-scroll order-summary"
            style={{
              ...styles.orderSummary,
              opacity: 1,
              transform: 'translateY(0)'
            }}
          >
            <h2 style={styles.summaryTitle}>Order Summary</h2>
            
            {cartItems.map((item, index) => (
              <div 
                key={item.id} 
                style={{
                  ...styles.cartItem,
                  transitionDelay: `${index * 0.1}s`,
                  opacity: 1,
                  transform: 'translateY(0)'
                }}
                className="animate-on-scroll"
              >
                <img src={item.image} alt={item.name} style={styles.itemImage} />
                <div style={styles.itemDetails}>
                  <h3 style={styles.itemName}>{item.name}</h3>
                  <p style={styles.itemPrice}>${item.price.toFixed(2)} × {item.quantity}</p>
                </div>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}

            <div style={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div style={styles.totalRow}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div 
            className="animate-on-scroll form-section"
            style={{
              ...styles.formSection,
              opacity: 1,
              transform: 'translateY(0)'
            }}
          >
            <div style={styles.tabs}>
              <div 
                style={{...styles.tab, ...(activeTab === 'shipping' && styles.tab.active)}}
                onClick={() => setActiveTab('shipping')}
              >
                <FaMapMarkerAlt /> Shipping
              </div>
              <div 
                style={{...styles.tab, ...(activeTab === 'payment' && styles.tab.active)}}
                onClick={() => setActiveTab('payment')}
              >
                <FaCreditCard /> Payment
              </div>
            </div>

            {activeTab === 'shipping' ? (
              <form onSubmit={handleShippingSubmit}>
                <div style={styles.row}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>First Name</label>
                    <input
                      style={{...styles.input, ...(errors.firstName && { borderColor: '#dc3545' })}}
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    {errors.firstName && <div style={styles.errorText}>{errors.firstName}</div>}
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Last Name</label>
                    <input
                      style={{...styles.input, ...(errors.lastName && { borderColor: '#dc3545' })}}
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                    {errors.lastName && <div style={styles.errorText}>{errors.lastName}</div>}
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Address</label>
                  <input
                    style={{...styles.input, ...(errors.address && { borderColor: '#dc3545' })}}
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                  {errors.address && <div style={styles.errorText}>{errors.address}</div>}
                </div>

                <div style={styles.row}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>City</label>
                    <input
                      style={{...styles.input, ...(errors.city && { borderColor: '#dc3545' })}}
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                    {errors.city && <div style={styles.errorText}>{errors.city}</div>}
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Country</label>
                    <input
                      style={{...styles.input, ...(errors.country && { borderColor: '#dc3545' })}}
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    />
                    {errors.country && <div style={styles.errorText}>{errors.country}</div>}
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>ZIP Code</label>
                  <input
                    style={{...styles.input, ...(errors.zipCode && { borderColor: '#dc3545' })}}
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                  />
                  {errors.zipCode && <div style={styles.errorText}>{errors.zipCode}</div>}
                </div>

                <button type="submit" style={styles.submitButton}>
                  Continue to Payment
                </button>
              </form>
            ) : (
              <form onSubmit={handlePaymentSubmit}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Card Number</label>
                  <input
                    style={{...styles.input, ...(errors.cardNumber && { borderColor: '#dc3545' })}}
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                  {errors.cardNumber && <div style={styles.errorText}>{errors.cardNumber}</div>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Name on Card</label>
                  <input
                    style={{...styles.input, ...(errors.cardName && { borderColor: '#dc3545' })}}
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                  />
                  {errors.cardName && <div style={styles.errorText}>{errors.cardName}</div>}
                </div>

                <div style={styles.row}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Expiry Date (MM/YY)</label>
                    <input
                      style={{...styles.input, ...(errors.expiry && { borderColor: '#dc3545' })}}
                      type="text"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                    {errors.expiry && <div style={styles.errorText}>{errors.expiry}</div>}
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>CVV</label>
                    <input
                      style={{...styles.input, ...(errors.cvv && { borderColor: '#dc3545' })}}
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      maxLength={4}
                    />
                    {errors.cvv && <div style={styles.errorText}>{errors.cvv}</div>}
                  </div>
                </div>

                <button type="submit" style={styles.submitButton}>
                  <FaLock /> Place Order
                </button>
                <div style={styles.secureNote}>
                  <FaLock /> Your payment information is secure
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;