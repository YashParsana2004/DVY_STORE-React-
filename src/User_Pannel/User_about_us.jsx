import React, { useEffect } from 'react';
import NavbarAfterLogin from './Navbar_after_login';
import Footer from './footer';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const AboutUs = () => {
  useEffect(() => {
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

    // Add custom scrollbar styles
    const styleElement = document.createElement("style");
    styleElement.innerHTML = customScrollbarStyles;
    document.head.appendChild(styleElement);

    // Animation trigger for sections
    const animateSections = () => {
      const sections = document.querySelectorAll('.about-section');
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
          section.style.opacity = "1";
          section.style.transform = "translateY(0)";
          
          const image = section.querySelector('.about-image');
          const text = section.querySelector('.about-text');
          
          if (image && text) {
            image.style.opacity = "1";
            image.style.transform = "translateX(0)";
            text.style.opacity = "1";
            text.style.transform = "translateX(0)";
          }
        }
      });
    };

    // Initial animation
    setTimeout(() => {
      animateSections();
    }, 100);

    // Scroll event listener
    window.addEventListener('scroll', animateSections);
    
    return () => {
      window.removeEventListener('scroll', animateSections);
      document.head.removeChild(styleElement);
    };
  }, []);

  const styles = {
    body: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    },
    aboutSection: {
      padding: '100px 0',
      flexGrow: 1
    },
    aboutContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'white',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '40px',
      opacity: 0,
      transform: 'translateY(30px)',
      transition: 'all 0.6s ease-out',
      '@media (max-width: 768px)': {
        flexDirection: 'column'
      }
    },
    aboutText: {
      flex: 1,
      padding: '20px',
      opacity: 0,
      transform: 'translateX(30px)',
      transition: 'all 0.6s ease-out 0.3s',
      '@media (max-width: 768px)': {
        width: '100%',
        padding: '15px',
        transform: 'translateX(0)',
        transitionDelay: '0.2s'
      }
    },
    aboutImage: {
      flex: 1,
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      opacity: 0,
      transform: 'translateX(-30px)',
      transition: 'all 0.6s ease-out 0.3s',
      '@media (max-width: 768px)': {
        width: '100%',
        padding: '15px',
        transform: 'translateX(0)',
        transitionDelay: '0.2s'
      }
    },
    aboutImg: {
      width: '70%',
      borderRadius: '10px',
      objectFit: 'cover',
      transition: 'transform 0.3s ease',
      ':hover': {
        transform: 'scale(1.03)'
      },
      '@media (max-width: 768px)': {
        width: '100%'
      }
    },
    heading: {
      marginBottom: '1.5rem',
      textAlign: 'center',
      opacity: 0,
      transform: 'translateY(-20px)',
      transition: 'all 0.5s ease-out 0.4s'
    },
    headingVisible: {
      opacity: 1,
      transform: 'translateY(0)'
    }
  };

  const getStyle = (baseStyle, isReverse = false) => {
    const mobileStyles = baseStyle['@media (max-width: 768px)'] || {};
    
    return {
      ...baseStyle,
      ...(isReverse && {
        '& .about-image': {
          transform: 'translateX(30px)',
          '@media (max-width: 768px)': {
            transform: 'translateX(0)'
          }
        },
        '& .about-text': {
          transform: 'translateX(-30px)',
          '@media (max-width: 768px)': {
            transform: 'translateX(0)'
          }
        }
      }),
      '@media (max-width: 768px)': mobileStyles
    };
  };

  return (
    <div style={styles.body}>
      {/* Navbar */}
      <NavbarAfterLogin profileImage="/assets/profile-logo.png" activeLink="about" />

      {/* Main Content */}
      <div className="container" style={styles.aboutSection}>
        {/* Mission Section */}
        <div className="about-section" style={getStyle(styles.aboutContainer)}>
          <div className="about-image" style={styles.aboutImage}>
            <img 
              src="/assets/mission.jpeg" 
              alt="Our Mission" 
              style={styles.aboutImg} 
            />
          </div>
          <div className="about-text" style={styles.aboutText}>
            <h2 style={{...styles.heading, ...styles.headingVisible}}>Our Mission</h2>
            <p>
              We aim to redefine industry standards by focusing on quality, innovation, and customer satisfaction.
              Our goal is to create meaningful solutions that positively impact businesses and individuals
              worldwide.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="about-section" style={getStyle(styles.aboutContainer, true)}>
          <div className="about-image" style={styles.aboutImage}>
            <img 
              src="/assets/Team.jpeg" 
              alt="Our Team" 
              style={styles.aboutImg} 
            />
          </div>
          <div className="about-text" style={styles.aboutText}>
            <h2 style={{...styles.heading, ...styles.headingVisible}}>Our Team</h2>
            <p>
              Our team is a blend of creative minds, problem solvers, and tech enthusiasts dedicated to delivering
              excellence. We believe in collaboration and continuous learning to stay ahead in the industry.
            </p>
          </div>
        </div>

        {/* Journey Section */}
        <div className="about-section" style={getStyle(styles.aboutContainer)}>
          <div className="about-image" style={styles.aboutImage}>
            <img 
              src="/assets/journey.jpeg" 
              alt="Our Journey" 
              style={styles.aboutImg} 
            />
          </div>
          <div className="about-text" style={styles.aboutText}>
            <h2 style={{...styles.heading, ...styles.headingVisible}}>Our Journey</h2>
            <p>
              Since our inception in 2020, we have grown into a trusted name, serving numerous clients across
              various industries. Our commitment to excellence has driven our success and fueled our passion for
              innovation.
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="about-section" style={getStyle(styles.aboutContainer, true)}>
          <div className="about-image" style={styles.aboutImage}>
            <img 
              src="/assets/choose.jpeg" 
              alt="Why Choose Us" 
              style={styles.aboutImg} 
            />
          </div>
          <div className="about-text" style={styles.aboutText}>
            <h2 style={{...styles.heading, ...styles.headingVisible}}>Why Choose Us?</h2>
            <p>
              We prioritize customer needs, providing tailored solutions to help them succeed. Our expertise,
              dedication, and unwavering commitment to quality make us the preferred choice for businesses and
              individuals alike.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;