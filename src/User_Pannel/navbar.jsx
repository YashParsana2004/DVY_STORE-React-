import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const styles = {
  navbar: {
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    padding: "10px 0",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
    display: "flex",
    alignItems: "center"
  },
  logoContainer: {
    marginLeft: "20px",
    display: "flex",
    alignItems: "center",
    marginRight: "auto"
  },
  logoImage: {
    height: "50px",
    width: "auto",
    maxWidth: "200px",
    objectFit: "contain",
    borderRadius: "10px",
    border: "2px solid #f0f0f0",
    padding: "3px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    '&:hover': {
      transform: "scale(1.05)",
      boxShadow: "0 4px 8px rgba(0,0,0,0.15)"
    }
  },
  navContent: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  navLink: {
    fontWeight: "700", // Changed from 600 to 700 for bolder text
    color: "#333",
    transition: "0.3s",
    margin: "0 10px",
    textDecoration: "none",
    fontSize: "1rem", // Added consistent font size
    '&:hover': {
      color: "#6e8efb",
      transform: "translateY(-2px)",
      textDecoration: "none"
    }
  },
  navbarIcons: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginRight: "20px"
  },
  navbarIconLink: {
    textDecoration: "none",
    fontWeight: "700", // Made bold
    color: "#333",
    transition: "0.3s",
    display: "flex",
    alignItems: "center",
    fontSize: "1rem", // Added consistent font size
    '&:hover': {
      color: "#6e8efb",
      textDecoration: "none"
    }
  },
  dropdownButton: {
    backgroundColor: "transparent",
    border: "none",
    fontWeight: "700", // Made bold
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    color: "#333",
    transition: "0.3s",
    margin: "0 10px",
    textDecoration: "none",
    fontSize: "1rem", // Added consistent font size
    '&:hover': {
      backgroundColor: "#f8f9fa",
      textDecoration: "none"
    }
  },
  dropdownMenu: {
    borderRadius: "8px",
    border: "none",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    padding: "10px 0"
  },
  dropdownItem: {
    padding: "8px 20px",
    color: "#333",
    transition: "0.3s",
    textDecoration: "none",
    fontWeight: "600", // Slightly less bold for dropdown items
    '&:hover': {
      backgroundColor: "#f8f9fa",
      color: "#6e8efb",
      textDecoration: "none"
    }
  },
  loginButton: {
    padding: "8px 20px",
    backgroundColor: "#6e8efb",
    color: "white",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "700", // Made bold
    fontSize: "1rem", // Made consistent with other text
    transition: "all 0.3s ease",
    border: "none",
    '&:hover': {
      backgroundColor: "#5a7de3",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      textDecoration: "none"
    }
  },
  icon: {
    marginRight: "5px",
    fontSize: "18px",
    fontWeight: "bold" // Made icons bold if they're text-based
  }
};

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      {/* Logo Container - Left Aligned */}
      <div style={styles.logoContainer}>
        <a href="/" style={{ textDecoration: "none" }}>
          <img 
            src="/assets/StoreLogo.webp" 
            alt="DYV Store Logo"
            style={styles.logoImage}
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = "/assets/StoreLogo.png"
            }}
          />
        </a>
      </div>

      {/* Main Nav Content */}
      <div style={styles.navContent}>
        {/* Dropdown Button */}
        <div className="dropdown">
          <button
            style={styles.dropdownButton}
            className="btn dropdown-toggle"
            type="button"
            id="seasonalDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Seasonal Store
          </button>
          <ul 
            className="dropdown-menu" 
            aria-labelledby="seasonalDropdown" 
            style={styles.dropdownMenu}
          >
            <li><a href="/" className="dropdown-item" style={styles.dropdownItem}>Cloth Collection</a></li>
            <li><a href="/" className="dropdown-item" style={styles.dropdownItem}>Toys</a></li>
            <li><a href="/" className="dropdown-item" style={styles.dropdownItem}>Festive Items</a></li>
            <li><a href="/" className="dropdown-item" style={styles.dropdownItem}>Stationery Items</a></li>
            <li><a href="/" className="dropdown-item" style={styles.dropdownItem}>Floral</a></li>
            <li><a href="/" className="dropdown-item" style={styles.dropdownItem}>Accessories</a></li>
            <li><a href="/" className="dropdown-item" style={styles.dropdownItem}>Foot Wear</a></li>
          </ul>
        </div>

        {/* Navbar Links */}
        <div style={{ display: "flex" }}>
          <a href="/" style={styles.navLink}>Home</a>
          <a href="/" style={styles.navLink}>Contact</a>
          <a href="/" style={styles.navLink}>About</a>
          <a href="/" style={styles.navLink}>Exclusive</a>
        </div>

        {/* Navbar Icons */}
        <div style={styles.navbarIcons}>
          <a href="/" style={styles.navbarIconLink}>
            <span style={styles.icon}>🛒</span> Cart
          </a>
          <a href="/" style={styles.navbarIconLink}>
            <span style={styles.icon}>♥</span> Wishlist
          </a>
          <a href="/login" style={styles.loginButton}>Login</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;