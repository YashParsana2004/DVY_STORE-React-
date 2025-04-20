import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import NavbarAfterLogin from '../Navbar_after_login';
import Footer from '../footer';

const StationeryCollection = () => {
  const navigate = useNavigate();
  const [headingPosition, setHeadingPosition] = useState(-100);
  
  const stationeryItems = [
    { 
      id: 1, 
      name: "Premium Notebook", 
      price: 12.99, 
      image: "/assets/Notebook.jpeg", 
      category: "writing",
      slug: "premium-notebook",
      description: "High-quality notebook with premium paper that prevents ink bleed-through. Perfect for writing, sketching, and note-taking.",
      features: [
        "120gsm thick, acid-free paper",
        "192 pages (96 sheets)",
        "Lay-flat design",
        "Elastic closure band",
        "Includes ribbon bookmark"
      ],
      colors: ['Black', 'Blue', 'Red'],
      rating: 4.7,
      reviews: []
    },
    { 
      id: 2, 
      name: "Gel Pen Set", 
      price: 8.99, 
      image: "/assets/Gel-pen.jpeg", 
      category: "writing",
      slug: "gelpen-set",
      description: "Smooth-writing gel pens with vibrant colors and comfortable grip for extended writing sessions.",
      features: [
        "Set of 12 assorted colors",
        "0.7mm tip size",
        "Quick-drying ink",
        "Rubberized grip",
        "Retractable design"
      ],
      colors: ['Multicolor'],
      rating: 4.5,
      reviews: []
    },
    { 
      id: 3, 
      name: "Sticky Notes", 
      price: 4.99, 
      image: "/assets/Sticky-notes.jpeg", 
      category: "office",
      slug: "sticky-notes",
      description: "Colorful sticky notes that stick securely but remove cleanly without leaving residue.",
      features: [
        "100 sheets per pad",
        "3x3 inch size",
        "5 bright colors",
        "Repositionable adhesive",
        "Bleed-resistant paper"
      ],
      colors: ['Yellow', 'Pink', 'Green', 'Blue', 'Orange'],
      rating: 4.2,
      reviews: []
    },
    { 
      id: 4, 
      name: "Artistic Marker Set", 
      price: 18.99, 
      image: "/assets/Marker.jpeg", 
      category: "art",
      slug: "artistic-marker-set",
      description: "Professional-grade markers with dual tips for versatile artistic applications.",
      features: [
        "Set of 24 colors",
        "Fine and chisel tips",
        "Alcohol-based ink",
        "Blendable colors",
        "Odorless formula"
      ],
      colors: ['Multicolor'],
      rating: 4.8,
      reviews: []
    },
    { 
      id: 5, 
      name: "Planner", 
      price: 15.99, 
      image: "/assets/Planner.jpeg", 
      category: "organization",
      slug: "planner",
      description: "Comprehensive daily planner with monthly, weekly, and daily sections to keep you organized.",
      features: [
        "12-month planner",
        "Hardcover design",
        "Elastic closure",
        "Back pocket for storage",
        "Two ribbon markers"
      ],
      colors: ['Black', 'Rose Gold', 'Navy'],
      rating: 4.6,
      reviews: []
    },
    { 
      id: 6, 
      name: "Desk Organizer", 
      price: 22.99, 
      image: "/assets/Desk-organizer.jpeg", 
      category: "office",
      slug: "desk-organizer",
      description: "Modern desk organizer to keep your workspace tidy and efficient.",
      features: [
        "5 compartments",
        "Natural wood finish",
        "Pen holders",
        "Phone/tablet stand",
        "Small item storage"
      ],
      colors: ['Walnut', 'Oak', 'White'],
      rating: 4.4,
      reviews: []
    },
    { 
      id: 7, 
      name: "Watercolor Set", 
      price: 24.99, 
      image: "/assets/Watercolor.jpeg", 
      category: "art",
      slug: "watercolor-set",
      description: "Premium watercolor paint set with vibrant pigments and excellent blendability.",
      features: [
        "24 colors",
        "Includes brush",
        "Non-toxic formula",
        "Travel-friendly case",
        "Highly pigmented"
      ],
      colors: ['Multicolor'],
      rating: 4.9,
      reviews: []
    },
    { 
      id: 8, 
      name: "Fountain Pen", 
      price: 29.99, 
      image: "/assets/Fountain-pen.jpeg", 
      category: "writing",
      slug: "fountain-pen",
      description: "Elegant fountain pen with smooth writing performance and classic design.",
      features: [
        "Medium stainless steel nib",
        "Includes converter and ink cartridges",
        "Brass body with lacquer finish",
        "Comfortable grip section",
        "Presented in gift box"
      ],
      colors: ['Black', 'Blue', 'Red'],
      rating: 4.7,
      reviews: []
    }
  ];

  const [wishlist, setWishlist] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  // Animate heading from left to right
  useEffect(() => {
    const duration = 1000;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const newPosition = -100 + (progress * 100);
      
      setHeadingPosition(newPosition);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, []);

  // Filter items by category
  const filteredItems = activeCategory === 'all' 
    ? stationeryItems 
    : stationeryItems.filter(item => item.category === activeCategory);

  // Toggle wishlist with event prevention
  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  // Add to cart with event prevention
  const addToCart = (product, e) => {
    e.stopPropagation();
    console.log(`Added ${product.name} to cart`);
  };

  // Navigate to product page using slug
  const navigateToProduct = (product) => {
    if (product.slug) {
      navigate(`/stationery-items/${product.slug}`);
    }
  };

  // Styles
  const styles = {
    pageContainer: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      paddingTop: '80px'
    },
    collectionContainer: {
      flex: 1,
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%'
    },
    collectionHeading: {
      textAlign: 'center',
      fontSize: '3rem',
      margin: '2rem 0',
      color: '#333',
      position: 'relative',
      left: `${headingPosition}%`,
      opacity: headingPosition === 0 ? 1 : 0.5 + (headingPosition + 100) / 200,
      transition: 'left 0.05s linear, opacity 0.05s linear',
      '@media (max-width: 768px)': {
        fontSize: '2.2rem'
      }
    },
    categoryFilters: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '1rem',
      marginBottom: '2rem'
    },
    filterButton: {
      padding: '0.5rem 1.5rem',
      border: '2px solid #007bff',
      background: 'transparent',
      color: '#007bff',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease'
    },
    activeFilterButton: {
      background: '#007bff',
      color: 'white'
    },
    itemsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '2rem',
      padding: '1rem',
      '@media (max-width: 768px)': {
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))'
      }
    },
    itemCard: {
      background: 'white',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      position: 'relative',
      cursor: 'pointer'
    },
    itemCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)'
    },
    wishlistIcon: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      fontSize: '1.5rem',
      color: '#dc3545',
      cursor: 'pointer',
      zIndex: 2,
      background: 'rgba(255, 255, 255, 0.8)',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      transition: 'all 0.3s ease'
    },
    wishlistIconHover: {
      transform: 'scale(1.1)'
    },
    itemImage: {
      width: '100%',
      height: '300px',
      objectFit: 'contain',
      backgroundColor: 'white',
      padding: '1rem'
    },
    itemInfo: {
      padding: '1.5rem'
    },
    itemName: {
      margin: '0 0 0.5rem 0',
      fontSize: '1.2rem',
      color: '#333'
    },
    price: {
      fontSize: '1.1rem',
      color: '#28a745',
      fontWeight: 'bold',
      margin: '0 0 1rem 0'
    },
    addToCart: {
      width: '100%',
      padding: '0.75rem',
      background: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transition: 'background 0.3s ease'
    },
    addToCartHover: {
      background: '#0069d9'
    }
  };

  return (
    <div style={styles.pageContainer}>
      <NavbarAfterLogin profileImage="/assets/profile-logo.png" activeLink="stationery" />
      
      <div style={styles.collectionContainer}>
        <h1 style={styles.collectionHeading}>Stationery Collection</h1>
        
        <div style={styles.categoryFilters}>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeCategory === 'all' && styles.activeFilterButton)
            }}
            onClick={() => setActiveCategory('all')}
          >
            All Items
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeCategory === 'writing' && styles.activeFilterButton)
            }}
            onClick={() => setActiveCategory('writing')}
          >
            Writing
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeCategory === 'office' && styles.activeFilterButton)
            }}
            onClick={() => setActiveCategory('office')}
          >
            Office
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeCategory === 'art' && styles.activeFilterButton)
            }}
            onClick={() => setActiveCategory('art')}
          >
            Art
          </button>
          <button 
            style={{
              ...styles.filterButton,
              ...(activeCategory === 'organization' && styles.activeFilterButton)
            }}
            onClick={() => setActiveCategory('organization')}
          >
            Organization
          </button>
        </div>
        
        <div style={styles.itemsGrid}>
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              style={styles.itemCard}
              onClick={() => navigateToProduct(item)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = styles.itemCardHover.transform;
                e.currentTarget.style.boxShadow = styles.itemCardHover.boxShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = styles.itemCard.boxShadow;
              }}
            >
              <div 
                style={styles.wishlistIcon}
                onClick={(e) => toggleWishlist(item.id, e)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = styles.wishlistIconHover.transform;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                }}
              >
                {wishlist.includes(item.id) ? (
                  <FaHeart style={{ color: '#dc3545' }} />
                ) : (
                  <FaRegHeart />
                )}
              </div>
              
              <img src={item.image} alt={item.name} style={styles.itemImage} />
              
              <div style={styles.itemInfo}>
                <h3 style={styles.itemName}>{item.name}</h3>
                <p style={styles.price}>${item.price.toFixed(2)}</p>
                <button 
                  style={styles.addToCart}
                  onClick={(e) => addToCart(item, e)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = styles.addToCartHover.background;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = styles.addToCart.background;
                  }}
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default StationeryCollection;