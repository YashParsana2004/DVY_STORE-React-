import React, { useState, useEffect } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";

const products = [
  { id: 1, title: "Toys", price: "$49.99", img: "/assets/Toys.png" },
  { id: 2, title: "Summer Hat", price: "$19.99", img: "/assets/Summer-hat.jpeg" },
  { id: 3, title: "Stationery", price: "$39.99", img: "/assets/Stationery.jpeg" },
  { id: 4, title: "Festive", price: "$59.99", img: "/assets/Festive.png" },
  { id: 5, title: "Autumn Sweater", price: "$29.99", img: "/assets/Autmn-sweater.jpeg" },
  { id: 6, title: "Beach Sandals", price: "$14.99", img: "/assets/sandals" },
  { id: 7, title: "Boquet", price: "$9.99", img: "/assets/Boquet.jpeg" },
  { id: 8, title: "Sunglasses", price: "$24.99", img: "/assets/Sunglasses.png" }
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

const styles = {
  productCard: {
    background: "white",
    borderRadius: "10px",
    padding: "15px",
    transition: "all 0.3s ease-in-out",
    textAlign: "center",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    opacity: 0,
    transform: "translateY(20px)"
  },
  productImg: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "5px",
    transition: "transform 0.3s ease"
  },
  productTitle: {
    marginTop: "10px",
    fontWeight: "bold",
    fontSize: "1.1rem"
  },
  productPrice: {
    color: "green",
    fontWeight: "bold",
    fontSize: "1.2rem"
  },
  addToCartBtn: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.2s ease"
  },
  actionContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto"
  },
  wishlistButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "1.5rem",
    padding: "5px",
    transition: "all 0.2s ease",
    color: "#6c757d"
  }
};

const Homepage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [hoveredHeart, setHoveredHeart] = useState(null);

  useEffect(() => {
    // Add custom scrollbar styles
    const styleElement = document.createElement("style");
    styleElement.innerHTML = customScrollbarStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  useEffect(() => {
    // Animation for product cards when they become visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".product-card").forEach((card) => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [products]);

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      
      {/* Main content */}
      <div className="container mt-4 flex-grow-1">
        <h2 className="text-center mb-4">Recommended Products</h2>

        <div className="row g-4">
          {products.map((product) => (
            <div key={product.id} className="col-md-3 col-sm-6">
              <div
                className="product-card"
                style={{
                  ...styles.productCard,
                  transition: `all 0.5s ease ${product.id * 0.1}s`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.querySelector('img').style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.querySelector('img').style.transform = "scale(1)";
                }}
              >
                <img 
                  src={product.img} 
                  alt={product.title} 
                  style={styles.productImg}
                  loading="lazy"
                />
                <p style={styles.productTitle}>{product.title}</p>
                <p style={styles.productPrice}>{product.price}</p>
                
                <div style={styles.actionContainer}>
                  <button 
                    style={{
                      ...styles.addToCartBtn,
                      ":hover": { backgroundColor: "#0069d9" }
                    }}
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                  
                  <button 
                    style={{
                      ...styles.wishlistButton,
                      color: wishlist.includes(product.id) ? "#ff4757" : 
                            hoveredHeart === product.id ? "#ff4757" : "#6c757d",
                      transform: hoveredHeart === product.id ? "scale(1.2)" : "scale(1)"
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

export default Homepage;