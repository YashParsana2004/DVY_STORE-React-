import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import FAQPopup from "./Footer_Quick_Links/FAQ";
import ShippingReturnsPopup from "./Footer_Quick_Links/Shipping_and_returns";
import PrivacyPolicyPopup from "./Footer_Quick_Links/Privacy_policy";
import TermsConditionsPopup from "./Footer_Quick_Links/Terms_and_condition";

const Footer = () => {
  const [showFAQ, setShowFAQ] = useState(false);
  const [showShippingReturns, setShowShippingReturns] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsConditions, setShowTermsConditions] = useState(false);
  
  const styles = {
    footer: {
      background: "linear-gradient(black, #000000d1)",
      color: "white",
      paddingTop: "40px",
      paddingBottom: "20px",
      marginTop: "50px",
    },
    footerText: {
      fontSize: "14px",
      opacity: 0.8,
    },
    footerLink: {
      color: "rgba(255, 255, 255, 0.8)",
      textDecoration: "none",
      transition: "all 0.3s ease",
      display: "block",
      marginBottom: "5px",
      cursor: "pointer",
      ":hover": {
        color: "#f8d210",
        transform: "translateX(5px)"
      }
    },
    footerInput: {
      borderRadius: "8px",
      padding: "8px",
      width: "100%",
    },
    footerBtn: {
      borderRadius: "8px",
      fontWeight: "bold",
      transition: "all 0.3s ease",
      width: "100%",
      ":hover": {
        background: "#f8d210",
        color: "#333",
      }
    },
    socialIcons: {
      marginTop: "10px",
      display: "flex",
      justifyContent: "center",
      gap: "10px",
    },
    socialLink: {
      display: "inline-block",
      width: "40px",
      height: "40px",
      background: "rgba(255, 255, 255, 0.2)",
      textAlign: "center",
      lineHeight: "40px",
      borderRadius: "50%",
      fontSize: "18px",
      color: "white",
      transition: "all 0.3s ease",
      ":hover": {
        background: "#f8d210",
        color: "#333",
      }
    },
    popupOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      opacity: 0,
      visibility: 'hidden',
      transition: 'all 0.3s ease'
    },
    popupContent: {
      transform: 'translateY(20px)',
      transition: 'all 0.3s ease'
    }
  };

  const togglePopup = (setter, state) => {
    setter(!state);
    document.body.style.overflow = state ? 'auto' : 'hidden';
  };

  return (
    <>
      <footer style={styles.footer}>
        <div className="container">
          <div className="row">
            {/* Company Info */}
            <div className="col-md-3">
              <h5 className="fw-bold">Seasonal Store</h5>
              <p style={styles.footerText}>
                Your one-stop shop for all seasonal needs. Quality products at the best prices.
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-md-3">
              <h5 className="fw-bold">Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to="/dashboard" style={styles.footerLink}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" style={styles.footerLink}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" style={styles.footerLink}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/exclusive" style={styles.footerLink}>
                    Exclusive Deals
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Support */}
            <div className="col-md-3">
              <h5 className="fw-bold">Customer Support</h5>
              <ul className="list-unstyled">
                <li>
                  <button 
                    style={{ 
                      ...styles.footerLink,
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      font: 'inherit',
                      cursor: 'pointer'
                    }} 
                    onClick={() => togglePopup(setShowFAQ, showFAQ)}
                  >
                    FAQs
                  </button>
                </li>
                <li>
                  <button 
                    style={{ 
                      ...styles.footerLink,
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      font: 'inherit',
                      cursor: 'pointer'
                    }} 
                    onClick={() => togglePopup(setShowShippingReturns, showShippingReturns)}
                  >
                    Shipping & Returns
                  </button>
                </li>
                <li>
                  <button 
                    style={{ 
                      ...styles.footerLink,
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      font: 'inherit',
                      cursor: 'pointer'
                    }} 
                    onClick={() => togglePopup(setShowPrivacyPolicy, showPrivacyPolicy)}
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    style={{ 
                      ...styles.footerLink,
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      font: 'inherit',
                      cursor: 'pointer'
                    }} 
                    onClick={() => togglePopup(setShowTermsConditions, showTermsConditions)}
                  >
                    Terms & Conditions
                  </button>
                </li>
              </ul>
            </div>

            {/* Newsletter Subscription */}
            <div className="col-md-3">
              <h5 className="fw-bold">Subscribe to Newsletter</h5>
              <p>Get the latest updates on new arrivals and exclusive discounts.</p>
              <form>
                <div className="mb-2">
                  <input type="email" style={styles.footerInput} placeholder="Enter your email" required />
                </div>
                <button type="submit" className="btn btn-primary" style={styles.footerBtn}>
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <hr className="my-4 border-light" />

          {/* Social Media */}
          <div className="text-center">
            <h6 className="fw-bold">Follow Us</h6>
            <div style={styles.socialIcons}>
              <a href="#" style={styles.socialLink}>
                <FaFacebookF />
              </a>
              <a href="#" style={styles.socialLink}>
                <FaInstagram />
              </a>
              <a href="#" style={styles.socialLink}>
                <FaTwitter />
              </a>
              <a href="#" style={styles.socialLink}>
                <FaYoutube />
              </a>
            </div>
          </div>

          <div className="text-center mt-3">
            <p className="mb-0">&copy; 2025 Seasonal Store. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* FAQ Popup */}
      <div 
        style={{
          ...styles.popupOverlay,
          opacity: showFAQ ? 1 : 0,
          visibility: showFAQ ? 'visible' : 'hidden'
        }}
        onClick={() => togglePopup(setShowFAQ, showFAQ)}
      >
        <div 
          style={{
            ...styles.popupContent,
            transform: showFAQ ? 'translateY(0)' : 'translateY(20px)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <FAQPopup onClose={() => togglePopup(setShowFAQ, showFAQ)} />
        </div>
      </div>

      {/* Shipping & Returns Popup */}
      <div 
        style={{
          ...styles.popupOverlay,
          opacity: showShippingReturns ? 1 : 0,
          visibility: showShippingReturns ? 'visible' : 'hidden'
        }}
        onClick={() => togglePopup(setShowShippingReturns, showShippingReturns)}
      >
        <div 
          style={{
            ...styles.popupContent,
            transform: showShippingReturns ? 'translateY(0)' : 'translateY(20px)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <ShippingReturnsPopup onClose={() => togglePopup(setShowShippingReturns, showShippingReturns)} />
        </div>
      </div>

      {/* Privacy Policy Popup */}
      <div 
        style={{
          ...styles.popupOverlay,
          opacity: showPrivacyPolicy ? 1 : 0,
          visibility: showPrivacyPolicy ? 'visible' : 'hidden'
        }}
        onClick={() => togglePopup(setShowPrivacyPolicy, showPrivacyPolicy)}
      >
        <div 
          style={{
            ...styles.popupContent,
            transform: showPrivacyPolicy ? 'translateY(0)' : 'translateY(20px)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <PrivacyPolicyPopup onClose={() => togglePopup(setShowPrivacyPolicy, showPrivacyPolicy)} />
        </div>
      </div>

      {/* Terms & Conditions Popup */}
      <div 
        style={{
          ...styles.popupOverlay,
          opacity: showTermsConditions ? 1 : 0,
          visibility: showTermsConditions ? 'visible' : 'hidden'
        }}
        onClick={() => togglePopup(setShowTermsConditions, showTermsConditions)}
      >
        <div 
          style={{
            ...styles.popupContent,
            transform: showTermsConditions ? 'translateY(0)' : 'translateY(20px)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <TermsConditionsPopup onClose={() => togglePopup(setShowTermsConditions, showTermsConditions)} />
        </div>
      </div>
    </>
  );
};

export default Footer;