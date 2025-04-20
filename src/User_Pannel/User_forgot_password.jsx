import React, { useState, useEffect } from 'react';
import NavbarAfterLogin from './Navbar_after_login';
import Footer from './footer';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHovering, setIsHovering] = useState(false);


  
  
  
  // Email regex pattern for basic validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Scroll animation effect
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.scroll-animate');
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Trigger immediately
    
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();

  setError('');
  setSuccess('');

  if (!email) {
    setError('Email is required');
    return;
  }

  if (!emailRegex.test(email)) {
    setError('Please enter a valid email address');
    return;
  }

  setIsSubmitting(true);

  try {
    const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || 'Something went wrong');
    } else {
      setSuccess(data.message);
      setEmail('');
    }
  } catch  {
    setError('Network error');
  } finally {
    setIsSubmitting(false);
  }
};



  return (
    <div style={styles.pageContainer}>
      <NavbarAfterLogin />

      <div style={styles.contentWrapper}>
        {/* Image Card */}
        <div 
          style={{
            ...styles.imageCard,
            transform: isHovering ? 'translateY(-5px)' : 'translateY(0)'
          }} 
          className="scroll-animate"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
            alt="Password recovery" 
            style={styles.image}
          />
          <div style={styles.imageOverlay}>
            <h3 style={styles.imageText}>Secure Password Recovery</h3>
          </div>
        </div>

        {/* Form Container */}
        <div style={styles.formContainer} className="scroll-animate">
          <h2 style={styles.heading}>Forgot Password?</h2>
          <p style={styles.paragraph}>
            Enter the email address associated with your account and we'll send you a link to reset your password.
          </p>

          {error && <div style={styles.errorMessage}>{error}</div>}
          {success && <div style={styles.successMessage}>{success}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  ...styles.input,
                  ...(error && !emailRegex.test(email) && styles.inputError
  )}}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={isSubmitting ? 
                {...styles.button, ...styles.submittingButton} : 
                styles.button}
            >
              {isSubmitting ? (
                <>
                  <span style={styles.spinner}></span> Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          <div style={styles.backToLogin}>
            <a href="/login" style={styles.loginLink}>
              ← Return to Login
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// Styles object
const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
  },
  contentWrapper: {
    display: 'flex',
    flex: 1,
    paddingTop: '80px',
    paddingBottom: '40px',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '60px',
    padding: '40px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '20px',
      padding: '20px',
    },
  },
  imageCard: {
    flex: 1,
    maxWidth: '600px',
    height: '500px',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.12)',
    position: 'relative',
    opacity: 0,
    transform: 'translateY(30px)',
    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s ease',
    '@media (max-width: 768px)': {
      maxWidth: '100%',
      height: '350px',
      paddingTop: '200px',
    },
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
    padding: '30px',
    color: 'white',
  },
  imageText: {
    margin: 0,
    fontSize: '1.8rem',
    fontWeight: '600',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
  },
  formContainer: {
    flex: 1,
    maxWidth: '450px',
    padding: '90px',
    backgroundColor: '#ffffff',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    borderRadius: '16px',
    opacity: 0,
    transform: 'translateY(30px)',
    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
    '@media (max-width: 768px)': {
      padding: '30px',
      maxWidth: '100%',
    },
  },
  heading: {
    marginBottom: '20px',
    textAlign: 'center',
    color: '#2c3e50',
    fontSize: '2rem',
    fontWeight: '600',
    '@media (max-width: 768px)': {
      fontSize: '1.8rem',
    },
  },
  paragraph: {
    marginBottom: '30px',
    color: '#7f8c8d',
    textAlign: 'center',
    fontSize: '1.1rem',
    lineHeight: '1.6',
  },
  formGroup: {
    marginBottom: '25px',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    fontWeight: '500',
    color: '#34495e',
    fontSize: '1rem',
  },
  input: {
    width: '100%',
    padding: '15px',
    border: '2px solid #ecf0f1',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    ':focus': {
      borderColor: '#3498db',
      boxShadow: '0 0 0 3px rgba(52, 152, 219, 0.2)',
      outline: 'none',
    },
  },
  inputError: {
    borderColor: '#e74c3c',
    boxShadow: '0 0 0 3px rgba(231, 76, 60, 0.2)',
  },
  button: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    ':hover': {
      backgroundColor: '#2980b9',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
    },
    ':active': {
      transform: 'translateY(0)',
    },
  },
  submittingButton: {
    backgroundColor: '#95a5a6',
    cursor: 'not-allowed',
    ':hover': {
      backgroundColor: '#95a5a6',
      transform: 'none',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
  },
  spinner: {
    display: 'inline-block',
    width: '20px',
    height: '20px',
    border: '3px solid rgba(255,255,255,0.3)',
    borderRadius: '50%',
    borderTopColor: '#fff',
    animation: 'spin 1s ease-in-out infinite',
  },
  errorMessage: {
    color: '#e74c3c',
    marginBottom: '20px',
    textAlign: 'center',
    padding: '15px',
    backgroundColor: '#fadbd8',
    borderRadius: '8px',
    fontSize: '0.95rem',
  },
  successMessage: {
    color: '#27ae60',
    marginBottom: '20px',
    textAlign: 'center',
    padding: '15px',
    backgroundColor: '#d5f5e3',
    borderRadius: '8px',
    fontSize: '0.95rem',
  },
  backToLogin: {
    marginTop: '25px',
    textAlign: 'center',
  },
  loginLink: {
    color: '#3498db',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    fontSize: '1rem',
    ':hover': {
      color: '#2874a6',
      textDecoration: 'underline',
    },
  },
};

// Add global styles for animation
const globalStyles = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

// Inject global styles
document.head.insertAdjacentHTML('beforeend', `<style>${globalStyles}</style>`);

export default ForgotPassword;