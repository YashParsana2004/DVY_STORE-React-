import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FaSearch, FaShoppingCart, FaHeart, FaUser } from "react-icons/fa";

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
    fontWeight: "700",
    color: "#333",
    transition: "0.3s",
    margin: "0 10px",
    textDecoration: "none",
    fontSize: "1rem",
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
    fontWeight: "700",
    color: "#333",
    transition: "0.3s",
    display: "flex",
    alignItems: "center",
    fontSize: "1rem",
    '&:hover': {
      color: "#6e8efb",
      textDecoration: "none"
    }
  },
  profileIcon: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    objectFit: "cover",
    cursor: "pointer",
    transition: "0.3s",
    '&:hover': {
      transform: "scale(1.1)"
    }
  },
  searchContainer: {
    position: "relative",
    marginRight: "10px"
  },
  searchInput: {
    padding: "8px 15px 8px 35px",
    borderRadius: "20px",
    border: "1px solid #ddd",
    outline: "none",
    transition: "all 0.3s",
    width: "200px",
    '&:focus': {
      borderColor: "#6e8efb",
      boxShadow: "0 0 0 2px rgba(110, 142, 251, 0.2)",
      width: "250px"
    }
  },
  searchIcon: {
    position: "absolute",
    left: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#777"
  },
  dropdownButton: {
    backgroundColor: "transparent",
    border: "none",
    fontWeight: "700",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    color: "#333",
    transition: "0.3s",
    margin: "0 10px",
    textDecoration: "none",
    fontSize: "1rem",
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
    fontWeight: "600",
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
    fontWeight: "700",
    fontSize: "1rem",
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
    fontWeight: "bold"
  }
};

const NavbarAfterLogin = ({ profileImage }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

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
            <li><a href="/cloth-collection" className="dropdown-item" style={styles.dropdownItem}>Cloth Collection</a></li>
            <li><a href="/toys" className="dropdown-item" style={styles.dropdownItem}>Toys</a></li>
            <li><a href="/festive-items" className="dropdown-item" style={styles.dropdownItem}>Festive Items</a></li>
            <li><a href="/stationery-items" className="dropdown-item" style={styles.dropdownItem}>Stationery Items</a></li>
            <li><a href="/floral" className="dropdown-item" style={styles.dropdownItem}>Floral</a></li>
            <li><a href="/accessories" className="dropdown-item" style={styles.dropdownItem}>Accessories</a></li>
            <li><a href="/footwear" className="dropdown-item" style={styles.dropdownItem}>Foot Wear</a></li>
          </ul>
        </div>

        {/* Navbar Links */}
        <div style={{ display: "flex" }}>
          <a href="/dashboard" style={styles.navLink}>Home</a>
          <a href="/contact" style={styles.navLink}>Contact</a>
          <a href="/about" style={styles.navLink}>About</a>
          <a href="/exclusive" style={styles.navLink}>Exclusive</a>
        </div>

        {/* Navbar Icons */}
        <div style={styles.navbarIcons}>
          {/* Search Bar */}
          <div style={styles.searchContainer}>
            <FaSearch style={styles.searchIcon} />
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search products..."
                style={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          <a href="/cart" style={styles.navbarIconLink}>
            <FaShoppingCart /> Cart
          </a>
          <a href="/wishlist" style={styles.navbarIconLink}>
            <FaHeart /> Wishlist
          </a>
          <img
            src={profileImage || "/assets/profile-logo.png"} 
            alt="Profile"
            style={styles.profileIcon}
            onClick={() => navigate("/profile")}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavbarAfterLogin;