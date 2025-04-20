import React, { useState, useEffect } from 'react';
import { FaStar, FaRegStar, FaShoppingCart, FaPlus, FaMinus, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import NavbarAfterLogin from '../Navbar_after_login';
import Footer from '../footer';

const HalloweenPumpkinPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [showReviews, setShowReviews] = useState(false);
  const [isHoveringMainImage, setIsHoveringMainImage] = useState(false);
  const [hoveredThumbnail, setHoveredThumbnail] = useState(null);

  const product = {
    name: "Premium Halloween Pumpkin",
    price: 19.99,
    description: "Get into the Halloween spirit with our premium decorative pumpkin. Made from high-quality, durable materials with a realistic carved design that glows in the dark. Perfect for home decoration or as a spooky gift!",
    features: [
      "Realistic carved design with glowing effect",
      "Made from durable, lightweight resin material",
      "Battery-operated LED light included (batteries not included)",
      "Approximately 10 inches in diameter",
      "Weather-resistant for outdoor use",
      "Reusable year after year"
    ],
    images: [
      "/assets/Halloween1.jpeg",
      "/assets/Halloween2.jpeg",
      "/assets/Halloween3.jpeg",
      "/assets/Halloween4.jpeg"
    ],
    rating: 4.8,
    reviews: [
      {
        id: 1,
        user: "SpookyLover",
        rating: 5,
        date: "2023-10-10",
        comment: "This pumpkin looks incredibly realistic! The glow effect is perfect and it's become the centerpiece of our Halloween decor."
      },
      {
        id: 2,
        user: "HalloweenFanatic",
        rating: 5,
        date: "2023-09-28",
        comment: "Excellent quality - much better than the cheap plastic ones. The details are amazing and it's held up perfectly outdoors."
      },
      {
        id: 3,
        user: "DecorEnthusiast",
        rating: 4,
        date: "2023-10-15",
        comment: "Love the pumpkin! Only wish it came in different sizes. The glow could be a bit brighter but overall very happy."
      }
    ]
  };

  // Auto-change images when hovering main image
  useEffect(() => {
    let interval;
    
    if (isHoveringMainImage) {
      interval = setInterval(() => {
        setActiveImage(prev => (prev + 1) % product.images.length);
      }, 2000); // Change image every 2 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHoveringMainImage, product.images.length]);

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const toggleWishlist = () => setIsWishlisted(!isWishlisted);
  const toggleReviews = () => setShowReviews(!showReviews);

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
      objectFit: 'cover',
      borderRadius: '10px',
      marginBottom: '1rem',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      transition: 'opacity 0.5s ease',
      cursor: 'pointer'
    },
    thumbnailContainer: {
      display: 'flex',
      gap: '1rem'
    },
    thumbnail: {
      width: '80px',
      height: '80px',
      objectFit: 'cover',
      borderRadius: '5px',
      cursor: 'pointer',
      border: '2px solid transparent',
      transition: 'all 0.3s ease',
      ':hover': {
        borderColor: '#007bff'
      }
    },
    activeThumbnail: {
      borderColor: '#007bff'
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
      background: 'rgb(0, 123, 255)',
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
        background: '#e05d00'
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
      <NavbarAfterLogin profileImage="/assets/profile-logo.png" activeLink="holiday" />
      
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
                  ...styles.thumbnail,
                  ...(activeImage === index && styles.activeThumbnail),
                  border: activeImage === index || hoveredThumbnail === index 
                    ? '2px solid #007bff' 
                    : '2px solid transparent',
                }}
                onClick={() => {
                  setActiveImage(index);
                  setIsHoveringMainImage(false);
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

export default HalloweenPumpkinPage;