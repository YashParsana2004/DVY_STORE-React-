import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";
import Navbar from "./navbar";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false
  });

  // Admin credentials
  const ADMIN_CREDENTIALS = {
    username: "Admin@gmail.com",
    password: "Admin@1234"
  };

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
    body: {
      background: "white",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      paddingTop: "80px",
    },
    loginContainer: {
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    loginBox: {
      width: "90vw",
      maxWidth: "1000px",
      display: "flex",
      background: "white",
      borderRadius: "15px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      overflow: "hidden",
      opacity: 0,
      transform: "translateY(20px)",
      transition: "all 0.5s ease-out"
    },
    leftSection: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      padding: "20px",
      opacity: 0,
      transform: "translateX(-20px)",
      transition: "all 0.5s ease-out 0.2s"
    },
    rightSection: {
      flex: 1,
      padding: "40px",
      textAlign: "center",
      opacity: 0,
      transform: "translateX(20px)",
      transition: "all 0.5s ease-out 0.4s"
    },
    formControl: {
      borderRadius: "8px",
      fontSize: "16px",
      padding: "12px",
      width: "100%",
      border: "1px solid #ccc",
      transition: "all 0.3s ease",
      outline: "none",
      ":focus": {
        borderColor: "#6e8efb",
        boxShadow: "0 0 0 2px rgba(110, 142, 251, 0.2)"
      }
    },
    formControlError: {
      borderColor: "#ff4444",
      boxShadow: "0 0 0 2px rgba(255, 68, 68, 0.2)"
    },
    btnPrimary: {
      width: "100%",
      borderRadius: "8px",
      padding: "12px",
      fontSize: "16px",
      fontWeight: "bold",
      backgroundColor: "#6e8efb",
      color: "white",
      border: "none",
      cursor: "pointer",
      marginTop: "10px",
      transition: "all 0.3s ease",
      ":hover": {
        backgroundColor: "#5a7df4",
        transform: "translateY(-2px)"
      }
    },
    googleBtn: {
      width: "100%",
      borderRadius: "8px",
      padding: "12px",
      fontSize: "16px",
      fontWeight: "bold",
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      marginTop: "10px",
      transition: "all 0.3s ease",
      ":hover": {
        backgroundColor: "#f8f9fa",
        transform: "translateY(-2px)"
      }
    },
    googleLogo: {
      width: "20px",
      marginRight: "10px",
      transition: "transform 0.3s ease"
    },
    linkText: {
      color: "blue",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "all 0.2s ease",
      ":hover": {
        textDecoration: "underline"
      }
    },
    errorText: {
      color: "#ff4444",
      fontSize: "14px",
      textAlign: "left",
      marginTop: "5px",
      opacity: 0,
      height: 0,
      overflow: "hidden",
      transition: "all 0.3s ease"
    },
    errorTextVisible: {
      opacity: 1,
      height: "auto",
      marginTop: "5px"
    },
    heading: {
      fontWeight: "bold",
      color: "#333",
      opacity: 0,
      transform: "translateY(10px)",
      transition: "all 0.5s ease-out 0.6s"
    }
  };

  useEffect(() => {
    // Add custom scrollbar styles
    const styleElement = document.createElement("style");
    styleElement.innerHTML = customScrollbarStyles;
    document.head.appendChild(styleElement);

    // Animation trigger on mount
    setTimeout(() => {
      const loginBox = document.querySelector('.login-box');
      const leftSection = document.querySelector('.left-section');
      const rightSection = document.querySelector('.right-section');
      const heading = document.querySelector('.login-heading');
      
      if (loginBox) {
        loginBox.style.opacity = "1";
        loginBox.style.transform = "translateY(0)";
      }
      if (leftSection) {
        leftSection.style.opacity = "1";
        leftSection.style.transform = "translateX(0)";
      }
      if (rightSection) {
        rightSection.style.opacity = "1";
        rightSection.style.transform = "translateX(0)";
      }
      if (heading) {
        heading.style.opacity = "1";
        heading.style.transform = "translateY(0)";
      }
    }, 100);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 Special character
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    return re.test(password);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
    validateField(name, formData[name]);
  };

  const validateField = (fieldName, value) => {
    let error = "";
    
    switch(fieldName) {
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!validateEmail(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "password":
        if (!value) {
          error = "Password is required";
        } else if (!validatePassword(value)) {
          error = "Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number";
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

  const validateForm = () => {
    let isValid = true;
    
    // Validate all fields
    Object.keys(formData).forEach(field => {
      const fieldValid = validateField(field, formData[field]);
      if (!fieldValid) {
        isValid = false;
      }
    });
    
    // Mark all fields as touched
    setTouched({
      email: true,
      password: true
    });
    
    return isValid;
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  if (!validateForm()) return;

  // Admin login
  if (
    formData.email === ADMIN_CREDENTIALS.username &&
    formData.password === ADMIN_CREDENTIALS.password
  ) {
    navigate("/admin-dashboard");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email: formData.email,
    password: formData.password
  })
});

    const data = await response.json();

    if (!data.success) {
      alert(data.message); // Show "Incorrect password" or "User not found"
      return;
    }

    // ✅ If login is successful
    alert("Sign-in successful! Redirecting to dashboard...");
    navigate("/dashboard");

  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong. Please try again.");
  }
};


  return (
    <div style={styles.body}>
      <Navbar />

      {/* Main Content */}
      <div style={styles.loginContainer}>
        <div className="login-box" style={styles.loginBox}>
          {/* Left Section with Image */}
          <div className="left-section" style={styles.leftSection}>
            <img
              src="https://th.bing.com/th/id/OIP.kXbM74etdhf7LW1DDHhwrAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="Shopping"
              style={{ 
                maxWidth: "100%", 
                height: "90%",
                transition: "transform 0.3s ease",
                ":hover": {
                  transform: "scale(1.02)"
                }
              }}
            />
          </div>

          {/* Right Section with Form */}
          <div className="right-section" style={styles.rightSection}>
            <h3 className="login-heading mb-4" style={styles.heading}>
              Login to Your Account
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input 
                  type="text" 
                  name="email"
                  placeholder="Username or Email" 
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    ...styles.formControl,
                    ...(errors.email && touched.email ? styles.formControlError : {})
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
                <input 
                  type="password" 
                  name="password"
                  placeholder="Password" 
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    ...styles.formControl,
                    ...(errors.password && touched.password ? styles.formControlError : {})
                  }} 
                />
                <div 
                  style={{
                    ...styles.errorText,
                    ...(errors.password && touched.password ? styles.errorTextVisible : {})
                  }}
                >
                  {errors.password}
                </div>
              </div>
              <button type="submit" style={styles.btnPrimary}>Login</button>
            </form>

            {/* Google Login Button */}
            <button 
              type="button" 
              style={styles.googleBtn}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector('img').style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector('img').style.transform = "scale(1)";
              }}
            >
              <img
                src="https://static.vecteezy.com/system/resources/previews/013/948/549/original/google-logo-on-transparent-white-background-free-vector.jpg"
                alt="Google"
                style={styles.googleLogo}
              />
              Login with Google
            </button>

            {/* Links */}
            <p className="mt-3">
              Don't have an account?{" "}
              <span 
                onClick={() => navigate("/signup")} 
                style={styles.linkText}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#0056b3")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "blue")}
              >
                Sign up
              </span>
            </p>
            <p className="mt-3">
              <a 
                href="/forgotpassword" 
                style={{ 
                  color: "blue",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  ":hover": {
                    textDecoration: "underline"
                  }
                }}
              >
                Forgot Password?
              </a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;