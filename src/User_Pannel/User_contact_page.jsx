import React, { useState, useEffect } from "react";
import Navbar from "./Navbar_after_login";
import Footer from "./footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false
  });

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

    // Animation trigger on mount
    setTimeout(() => {
      const container = document.querySelector('.contact-container');
      const image = document.querySelector('.contact-image');
      const form = document.querySelector('.contact-form');
      
      if (container) {
        container.style.opacity = "1";
        container.style.transform = "translateY(0)";
      }
      if (image) {
        image.style.opacity = "1";
        image.style.transform = "translateX(0)";
      }
      if (form) {
        form.style.opacity = "1";
        form.style.transform = "translateX(0)";
      }
    }, 100);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Validation functions
  const validateName = (name) => {
    const re = /^[a-zA-Z ]{2,30}$/;
    return re.test(name.trim());
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateMessage = (message) => {
    return message.trim().length >= 10;
  };

  const validateField = (fieldName, value) => {
    let error = "";
    
    switch(fieldName) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (!validateName(value)) {
          error = "Name should be 2-30 letters only";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!validateEmail(value)) {
          error = "Please enter a valid email";
        }
        break;
      case "message":
        if (!value.trim()) {
          error = "Message is required";
        } else if (!validateMessage(value)) {
          error = "Message should be at least 10 characters";
        }
        break;
      default:
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
    
    return !error;
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
    validateField(name, formData[name]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Validate field if it's been touched
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      message: true
    });

    // Validate all fields
    const isNameValid = validateField("name", formData.name);
    const isEmailValid = validateField("email", formData.email);
    const isMessageValid = validateField("message", formData.message);

    if (isNameValid && isEmailValid && isMessageValid) {
      alert("Your message has been sent!");
      // Reset form
      setFormData({
        name: "",
        email: "",
        message: ""
      });
      setTouched({
        name: false,
        email: false,
        message: false
      });
    }
  };

  const styles = {
    container: {
      opacity: 0,
      transform: "translateY(20px)",
      transition: "all 0.5s ease-out",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      maxWidth: "80%",
      minHeight: "70vh",
      background: "white",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      margin: "100px auto"
    },
    image: {
      opacity: 0,
      transform: "translateX(-20px)",
      transition: "all 0.5s ease-out 0.2s",
      flex: 1,
      padding: "30px",
      display: "flex",
      justifyContent: "center"
    },
    form: {
      opacity: 0,
      transform: "translateX(20px)",
      transition: "all 0.5s ease-out 0.4s",
      flex: 1,
      padding: "30px"
    },
    img: {
      width: "100%",
      maxWidth: "400px",
      borderRadius: "10px",
      transition: "transform 0.3s ease",
      ":hover": {
        transform: "scale(1.02)"
      }
    },
    button: {
      transition: "all 0.3s ease",
      ":hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
      }
    },
    input: {
      transition: "all 0.3s ease",
      borderColor: "#ced4da",
      ":focus": {
        borderColor: "#6e8efb",
        boxShadow: "0 0 0 0.25rem rgba(110, 142, 251, 0.25)"
      }
    },
    inputError: {
      borderColor: "#dc3545",
      ":focus": {
        borderColor: "#dc3545",
        boxShadow: "0 0 0 0.25rem rgba(220, 53, 69, 0.25)"
      }
    },
    textarea: {
      resize: "none",
      transition: "all 0.3s ease",
      borderColor: "#ced4da",
      ":focus": {
        borderColor: "#6e8efb",
        boxShadow: "0 0 0 0.25rem rgba(110, 142, 251, 0.25)"
      }
    },
    textareaError: {
      borderColor: "#dc3545",
      ":focus": {
        borderColor: "#dc3545",
        boxShadow: "0 0 0 0.25rem rgba(220, 53, 69, 0.25)"
      }
    },
    errorText: {
      color: "#dc3545",
      fontSize: "0.875rem",
      marginTop: "0.25rem",
      opacity: 0,
      height: 0,
      overflow: "hidden",
      transition: "all 0.3s ease"
    },
    errorTextVisible: {
      opacity: 1,
      height: "auto"
    }
  };

  return (
    <>
      <Navbar />
      <div className="contact-container" style={styles.container}>
        <div className="contact-image" style={styles.image}>
          <img 
            src="/assets/Contact-us.jpeg" 
            alt="Contact Us" 
            style={styles.img}
          />
        </div>
        <div className="contact-form" style={styles.form}>
          <h2 className="mb-4 text-center">Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input 
                type="text" 
                className="form-control" 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  ...styles.input,
                  ...(errors.name && touched.name ? styles.inputError : {})
                }}
              />
              <div 
                style={{
                  ...styles.errorText,
                  ...(errors.name && touched.name ? styles.errorTextVisible : {})
                }}
              >
                {errors.name}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input 
                type="email" 
                className="form-control" 
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  ...styles.input,
                  ...(errors.email && touched.email ? styles.inputError : {})
                }}
              />
              <div 
                style={{
                  ...styles.errorText,
                  ...(errors.email && touched.email ? styles.errorTextVisible : {})
                }}
              >
                {errors.email}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea 
                className="form-control" 
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  ...styles.textarea,
                  ...(errors.message && touched.message ? styles.textareaError : {})
                }}
              ></textarea>
              <div 
                style={{
                  ...styles.errorText,
                  ...(errors.message && touched.message ? styles.errorTextVisible : {})
                }}
              >
                {errors.message}
              </div>
            </div>
            <button 
              type="submit" 
              className="btn btn-primary w-100"
              style={styles.button}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;