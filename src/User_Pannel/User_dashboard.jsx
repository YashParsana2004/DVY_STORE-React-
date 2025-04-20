import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAfterLogin from "./Navbar_after_login";
import Footer from "./footer";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";

const recommendedProducts = [
  { id: 1, name: "Toys", price: "$49.99", image: "/assets/Toys.png", category: "toys" },
  { id: 2, name: "Summer Hat", price: "$19.99", image: "/assets/Summer-hat.jpeg", category: "clothing" },
  { id: 3, name: "Stationery", price: "$39.99", image: "/assets/Stationery.jpeg", category: "stationery-items" },
  { id: 4, name: "Festive", price: "$59.99", image: "/assets/Festive.png", category: "festive-items" },
  { id: 5, name: "Autumn Sweater", price: "$29.99", image: "/assets/Autmn-sweater.jpeg", category: "cloth-collection" },
  { id: 6, name: "Beach Sandals", price: "$14.99", image: "/assets/sandals", category: "footwear" },
  { id: 7, name: "Boquet", price: "$9.99", image: "/assets/Boquet.jpeg", category: "floral" },
  { id: 8, name: "Sunglasses", price: "$24.99", image: "/assets/Sunglasses.png", category: "accessories" }
];

const UserDashboardPage = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [hoveredHeart, setHoveredHeart] = useState(null);

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
  }, []);

  const toggleWishlist = (productId, e) => {
    e.stopPropagation();
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const handleCardClick = (category) => {
    navigate(`/${category}`);
  };

  const styles = {
    productCard: {
      opacity: 0,
      transform: "translateY(20px)",
      transition: "all 0.5s ease",
      height: "100%",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      cursor: "pointer",
      ":hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)"
      }
    }
  };

  return (
    <>
      <NavbarAfterLogin profileImage="/assets/profile-logo.png" />
      <div className="container mt-5 pt-5">
        <h2 className="text-center fw-bold">Welcome to Your Dashboard</h2>
        <p className="text-center text-muted">Here are some recommended products for you:</p>

        <div className="row mt-4">
          {recommendedProducts.map((product) => (
            <div key={product.id} className="col-md-3 mb-4">
              <div 
                className="product-card card shadow-sm p-3 text-center"
                style={{ 
                  ...styles.productCard,
                  transitionDelay: `${product.id * 0.1}s`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
                }}
                onClick={() => handleCardClick(product.category)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="card-img-top"
                  style={{ 
                    height: "200px", 
                    objectFit: "cover", 
                    borderRadius: "5px",
                    transition: "transform 0.3s ease"
                  }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text fw-bold">{product.price}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <button 
                      className="btn btn-primary d-flex align-items-center gap-2"
                      style={{ 
                        flex: 1, 
                        marginRight: "60px",
                        transition: "all 0.2s ease",
                        ":hover": {
                          backgroundColor: "#5a7df4"
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Added ${product.name} to cart`);
                      }}
                    >
                      <FaShoppingCart /> Add To Cart
                    </button>
                    <button 
                      className="btn p-2"
                      onClick={(e) => toggleWishlist(product.id, e)}
                      onMouseEnter={() => setHoveredHeart(product.id)}
                      onMouseLeave={() => setHoveredHeart(null)}
                      aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                      style={{
                        border: "none",
                        background: "transparent",
                        fontSize: "1.5rem",
                        transition: "all 0.3s ease",
                        transform: hoveredHeart === product.id ? "scale(1.2)" : "scale(1)"
                      }}
                    >
                      {wishlist.includes(product.id) ? (
                        <FaHeart style={{ color: "#ff4757" }} />
                      ) : (
                        <FaRegHeart style={{ 
                          color: hoveredHeart === product.id ? "#ff4757" : "#495057" 
                        }} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDashboardPage;