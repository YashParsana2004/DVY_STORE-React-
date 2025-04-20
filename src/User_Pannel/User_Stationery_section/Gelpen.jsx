import React, { useState, useEffect } from 'react';
import { FaStar, FaRegStar, FaShoppingCart, FaPlus, FaMinus, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import NavbarAfterLogin from '../Navbar_after_login';
import Footer from '../footer';

const GelPenSetPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [showReviews, setShowReviews] = useState(false);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [hoveredThumbnail, setHoveredThumbnail] = useState(null);
  const [autoChangeInterval, setAutoChangeInterval] = useState(null);
  const [isHoveringMainImage, setIsHoveringMainImage] = useState(false);

  const product = {
    name: "Premium Gel Pen Set - 12 Colors",
    price: 19.99,
    description: "Elevate your writing experience with our premium gel pen set. Featuring 12 vibrant colors with smooth 0.7mm tips, these pens offer effortless writing with rich, bold ink that dries quickly and resists smudging. Perfect for note-taking, journaling, art projects, and more.",
    features: [
      "12 assorted vibrant colors including metallic and pastel shades",
      "0.7mm medium point for smooth writing and precise lines",
      "Quick-drying, smudge-resistant ink that won't bleed through paper",
      "Comfortable rubber grip for reduced hand fatigue during long writing sessions",
      "Elegant, durable plastic barrel with color-coded ends for easy identification",
      "Includes: Black, Blue, Red, Green, Purple, Pink, Orange, Brown, Teal, Gold, Silver, and Bronze",
      "Ideal for students, artists, and professionals alike"
    ],
    colors: ['Black', 'Blue', 'Red', 'Green', 'Purple', 'Pink', 'Orange', 'Brown', 'Teal', 'Gold', 'Silver', 'Bronze'],
    images: [
      "/assets/Gelpen1.jpeg",
      "/assets/Gelpen2.jpeg",
      "/assets/Gelpen3.jpeg",
      "/assets/Gelpen4.jpeg"
    ],
    rating: 4.8,
    reviews: [
      {
        id: 1,
        user: "StationeryLover",
        rating: 5,
        date: "2023-10-05",
        comment: "These pens are absolutely amazing! The colors are vibrant and the ink flows so smoothly. I use them for my bullet journal and they make my spreads look professional. Highly recommend!"
      },
      {
        id: 2,
        user: "ArtTeacher",
        rating: 5,
        date: "2023-09-18",
        comment: "Bought these for my classroom and my students love them. The colors are true to what's shown and they last much longer than cheaper gel pens. The metallic shades are particularly stunning."
      },
      {
        id: 3,
        user: "OfficeWorker",
        rating: 4,
        date: "2023-10-12",
        comment: "Great pens for the price. The ink is smooth and consistent. Only reason for 4 stars is that I wish the black was a bit darker, but overall very satisfied with my purchase."
      },
      {
        id: 4,
        user: "JournalKeeper",
        rating: 5,
        date: "2023-09-30",
        comment: "These have become my go-to pens for journaling. They don't bleed through my Leuchtturm pages and the colors make my entries pop. The comfort grip is a nice bonus for long writing sessions."
      }
    ]
  };

  // Auto-change images when hovering main image
  useEffect(() => {
    if (isHoveringMainImage) {
      const interval = setInterval(() => {
        setActiveImage(prev => (prev + 1) % product.images.length);
      }, 2000); // Change image every 2 seconds
      setAutoChangeInterval(interval);
    } else {
      clearInterval(autoChangeInterval);
    }

    return () => clearInterval(autoChangeInterval);
  }, [isHoveringMainImage]);

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const toggleWishlist = () => setIsWishlisted(!isWishlisted);
  const toggleReviews = () => setShowReviews(!showReviews);
  const selectColor = (color) => setSelectedColor(color);

  const styles = {
    pageContainer: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      paddingTop: '80px'
    },
    productContainer: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      '@media (min-width: 992px)': {
        flexDirection: 'row'
      }
    },
    imageGallery: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      marginRight: '0',
      '@media (min-width: 992px)': {
        marginRight: '2rem'
      }
    },
    mainImage: {
      width: '100%',
      height: '400px',
      objectFit: 'contain',
      backgroundColor: 'white',
      borderRadius: '10px',
      marginBottom: '1rem',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      cursor: 'pointer',
      transition: 'opacity 0.5s ease'
    },
    thumbnailContainer: {
      display: 'flex',
      gap: '1rem'
    },
    productInfo: {
      flex: 1,
      padding: '1rem'
    },
    productTitle: {
      fontSize: '2.2rem',
      marginBottom: '0.5rem',
      color: '#333'
    },
    price: {
      fontSize: '1.8rem',
      color: '#28a745',
      fontWeight: 'bold',
      margin: '1rem 0'
    },
    rating: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1rem',
      color: '#ffc107'
    },
    reviewCount: {
      marginLeft: '0.5rem',
      color: '#6c757d',
      fontSize: '0.9rem'
    },
    description: {
      margin: '1.5rem 0',
      lineHeight: '1.6',
      color: '#495057'
    },
    featuresList: {
      paddingLeft: '1.5rem',
      margin: '1.5rem 0'
    },
    featureItem: {
      marginBottom: '0.5rem'
    },
    colorSelector: {
      margin: '1.5rem 0'
    },
    colorTitle: {
      marginBottom: '0.75rem',
      fontWeight: '600',
      color: '#333'
    },
    colorOptions: {
      display: 'flex',
      gap: '0.75rem',
      flexWrap: 'wrap'
    },
    colorButton: {
      padding: '0.5rem 1rem',
      background: '#f8f9fa',
      border: '1px solid #dee2e6',
      borderRadius: '20px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        background: '#e9ecef'
      }
    },
    selectedColor: {
      background: '#007bff',
      color: 'white',
      borderColor: '#007bff'
    },
    quantityControls: {
      display: 'flex',
      alignItems: 'center',
      margin: '2rem 0'
    },
    quantityButton: {
      width: '40px',
      height: '40px',
      background: '#f8f9fa',
      border: '1px solid #dee2e6',
      borderRadius: '5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '1.2rem',
      transition: 'all 0.3s ease',
      ':hover': {
        background: '#e9ecef'
      }
    },
    quantityDisplay: {
      width: '60px',
      textAlign: 'center',
      margin: '0 1rem',
      fontSize: '1.2rem'
    },
    actionButtons: {
      display: 'flex',
      gap: '1rem',
      marginTop: '2rem'
    },
    addToCart: {
      padding: '0.75rem 1.5rem',
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
      transition: 'background 0.3s ease',
      ':hover': {
        background: '#0069d9'
      }
    },
    wishlistButton: {
      padding: '0.75rem 1.5rem',
      background: 'white',
      color: '#dc3545',
      border: '1px solid #dc3545',
      borderRadius: '5px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
      ':hover': {
        background: '#f8d7da'
      }
    },
    reviewsSection: {
      marginTop: '3rem',
      borderTop: '1px solid #dee2e6',
      paddingTop: '2rem'
    },
    reviewsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      cursor: 'pointer'
    },
    reviewsTitle: {
      fontSize: '1.5rem',
      color: '#333'
    },
    toggleButton: {
      background: 'transparent',
      border: 'none',
      color: '#007bff',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontWeight: '600',
      cursor: 'pointer'
    },
    reviewCard: {
      background: 'white',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '1rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    },
    reviewHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '0.5rem'
    },
    reviewUser: {
      fontWeight: '600',
      color: '#333'
    },
    reviewRating: {
      color: '#ffc107'
    },
    reviewDate: {
      color: '#6c757d',
      fontSize: '0.9rem',
      marginBottom: '0.5rem'
    },
    reviewComment: {
      lineHeight: '1.6',
      color: '#495057'
    },
    noReviews: {
      color: '#6c757d',
      fontStyle: 'italic'
    }
  };

  return (
    <div style={styles.pageContainer}>
      <NavbarAfterLogin profileImage="/assets/profile-logo.png" activeLink="stationery" />
      
      <div style={styles.productContainer}>
        <div style={styles.imageGallery}>
          <img 
            src={product.images[activeImage]} 
            alt={product.name} 
            style={styles.mainImage} 
            onMouseEnter={() => setIsHoveringMainImage(true)}
            onMouseLeave={() => setIsHoveringMainImage(false)}
          />
          <div style={styles.thumbnailContainer}>
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'contain',
                  backgroundColor: 'white',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  border: activeImage === index || hoveredThumbnail === index 
                    ? '2px solid #007bff' 
                    : '2px solid transparent',
                  transition: 'all 0.3s ease',
                }}
                onClick={() => {
                  setActiveImage(index);
                  setIsHoveringMainImage(false); // Stop auto-changing when manually selecting
                }}
                onMouseEnter={() => setHoveredThumbnail(index)}
                onMouseLeave={() => setHoveredThumbnail(null)}
              />
            ))}
          </div>
        </div>
        
        <div style={styles.productInfo}>
          <h1 style={styles.productTitle}>{product.name}</h1>
          
          <div style={styles.rating}>
            {[...Array(5)].map((_, i) => (
              i < Math.floor(product.rating) ? 
                <FaStar key={i} /> : 
                <FaRegStar key={i} />
            ))}
            <span style={styles.reviewCount}>({product.reviews.length} reviews)</span>
          </div>
          
          <div style={styles.price}>${product.price.toFixed(2)}</div>
          
          <p style={styles.description}>{product.description}</p>
          
          <ul style={styles.featuresList}>
            {product.features.map((feature, index) => (
              <li key={index} style={styles.featureItem}>{feature}</li>
            ))}
          </ul>
          
          <div style={styles.colorSelector}>
            <div style={styles.colorTitle}>Available Colors:</div>
            <div style={styles.colorOptions}>
              {product.colors.map(color => (
                <button
                  key={color}
                  style={{
                    ...styles.colorButton,
                    ...(selectedColor === color && styles.selectedColor)
                  }}
                  onClick={() => selectColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
          
          <div style={styles.quantityControls}>
            <button 
              style={styles.quantityButton}
              onClick={decreaseQuantity}
            >
              <FaMinus />
            </button>
            <div style={styles.quantityDisplay}>{quantity}</div>
            <button 
              style={styles.quantityButton}
              onClick={increaseQuantity}
            >
              <FaPlus />
            </button>
          </div>
          
          <div style={styles.actionButtons}>
            <button style={styles.addToCart}>
              <FaShoppingCart /> Add to Cart (${(product.price * quantity).toFixed(2)})
            </button>
            <button 
              style={styles.wishlistButton}
              onClick={toggleWishlist}
            >
              {isWishlisted ? <FaStar /> : <FaRegStar />}
              {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </button>
          </div>

          <div style={styles.reviewsSection}>
            <div style={styles.reviewsHeader} onClick={toggleReviews}>
              <h3 style={styles.reviewsTitle}>Customer Reviews</h3>
              <button style={styles.toggleButton}>
                {showReviews ? (
                  <>
                    <span>Hide Reviews</span>
                    <FaChevronUp />
                  </>
                ) : (
                  <>
                    <span>Show Reviews</span>
                    <FaChevronDown />
                  </>
                )}
              </button>
            </div>

            {showReviews && (
              <div>
                {product.reviews.length > 0 ? (
                  product.reviews.map(review => (
                    <div key={review.id} style={styles.reviewCard}>
                      <div style={styles.reviewHeader}>
                        <span style={styles.reviewUser}>{review.user}</span>
                        <div style={styles.reviewRating}>
                          {[...Array(5)].map((_, i) => (
                            i < review.rating ? 
                              <FaStar key={i} /> : 
                              <FaRegStar key={i} />
                          ))}
                        </div>
                      </div>
                      <div style={styles.reviewDate}>
                        Reviewed on {new Date(review.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <p style={styles.reviewComment}>{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p style={styles.noReviews}>No reviews yet. Be the first to review!</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default GelPenSetPage;