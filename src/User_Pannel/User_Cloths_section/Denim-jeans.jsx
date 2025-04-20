import React, { useState, useEffect } from 'react';
import { FaStar, FaRegStar, FaShoppingCart, FaPlus, FaMinus, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import NavbarAfterLogin from '../Navbar_after_login';
import Footer from '../footer';

const DenimJeansPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [showReviews, setShowReviews] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');
  const [isHoveringMainImage, setIsHoveringMainImage] = useState(false);
  const [hoveredThumbnail, setHoveredThumbnail] = useState(null);

  const product = {
    name: "Classic Slim Fit Denim Jeans",
    price: 59.99,
    description: "Elevate your everyday style with our classic slim fit denim jeans. Made from premium stretch denim for all-day comfort, these jeans feature a modern slim fit through the thigh and leg with just the right amount of stretch for freedom of movement.",
    features: [
      "98% Cotton, 2% Spandex for optimal comfort and stretch",
      "Mid-rise waist with five-pocket styling",
      "Button closure and zip fly",
      "Available in multiple washes and sizes",
      "Machine wash cold, tumble dry low",
      "Designed to retain shape wash after wash"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    images: [
      "/assets/denimjeans1.jpeg",
      "/assets/denimjeans2.jpeg",
      "/assets/denimjeans3.jpeg",
      "/assets/denimjeans4.jpeg"
    ],
    rating: 4.5,
    reviews: [
      {
        id: 1,
        user: "FashionLover22",
        rating: 5,
        date: "2023-09-10",
        comment: "These jeans fit perfectly! The stretch is just right - not too tight but holds its shape well. I've already bought two pairs in different washes."
      },
      {
        id: 2,
        user: "DenimEnthusiast",
        rating: 4,
        date: "2023-08-25",
        comment: "Great quality for the price. The color hasn't faded after several washes. Only reason I didn't give 5 stars is I wish they had more pocket space."
      },
      {
        id: 3,
        user: "StyleSeeker",
        rating: 5,
        date: "2023-10-05",
        comment: "Exactly what I was looking for. Comfortable enough to wear all day but still looks polished. The slim fit is modern without being too tight."
      },
      {
        id: 4,
        user: "FirstTimeBuyer",
        rating: 4,
        date: "2023-10-18",
        comment: "Very happy with my purchase. The sizing was accurate based on the size chart. They arrived quickly and were packaged nicely."
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

  const handleIncreaseQuantity = () => setQuantity(prev => prev + 1);
  const handleDecreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const handleToggleWishlist = () => setIsWishlisted(!isWishlisted);
  const handleToggleReviews = () => setShowReviews(!showReviews);
  const handleSelectSize = (size) => setSelectedSize(size);

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
    sizeSelector: {
      margin: '1.5rem 0'
    },
    sizeTitle: {
      marginBottom: '0.75rem',
      fontWeight: '600',
      color: '#333'
    },
    sizeOptions: {
      display: 'flex',
      gap: '0.75rem',
      flexWrap: 'wrap'
    },
    sizeButton: {
      width: '50px',
      height: '40px',
      background: '#f8f9fa',
      border: '1px solid #dee2e6',
      borderRadius: '5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        background: '#e9ecef'
      }
    },
    selectedSize: {
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
      <NavbarAfterLogin profileImage="/assets/profile-logo.png" activeLink="clothing" />
      
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
          
          <div style={styles.sizeSelector}>
            <div style={styles.sizeTitle}>Select Size:</div>
            <div style={styles.sizeOptions}>
              {product.sizes.map(size => (
                <button
                  key={size}
                  style={{
                    ...styles.sizeButton,
                    ...(selectedSize === size && styles.selectedSize)
                  }}
                  onClick={() => handleSelectSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <div style={styles.quantityControls}>
            <button 
              style={styles.quantityButton}
              onClick={handleDecreaseQuantity}
            >
              <FaMinus />
            </button>
            <div style={styles.quantityDisplay}>{quantity}</div>
            <button 
              style={styles.quantityButton}
              onClick={handleIncreaseQuantity}
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
              onClick={handleToggleWishlist}
            >
              {isWishlisted ? <FaStar /> : <FaRegStar />}
              {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </button>
          </div>

          <div style={styles.reviewsSection}>
            <div style={styles.reviewsHeader} onClick={handleToggleReviews}>
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

export default DenimJeansPage;