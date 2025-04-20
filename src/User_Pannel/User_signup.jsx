import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";



const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    birthDate: "",
    phone: ""
  });

  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    birthDate: "",
    phone: ""
  });

  const [touched, setTouched] = useState({
    fullname: false,
    email: false,
    password: false,
    confirmPassword: false,
    address: false,
    birthDate: false,
    phone: false
  });

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
    signupContainer: {
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    signupBox: {
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
      const signupBox = document.querySelector('.signup-box');
      const leftSection = document.querySelector('.left-section');
      const rightSection = document.querySelector('.right-section');
      const heading = document.querySelector('.signup-heading');
      
      if (signupBox) {
        signupBox.style.opacity = "1";
        signupBox.style.transform = "translateY(0)";
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
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    return re.test(password);
  };

  const validatePhone = (phone) => {
    const re = /^\+?\d{10,15}$/;
    return re.test(phone);
  };

  const validateBirthDate = (date) => {
    const re = /^\d{4}-\d{2}-\d{2}$/;
    if (!re.test(date)) return false;
    
    const birthDate = new Date(date);
    const today = new Date();
    const minAgeDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
    
    return birthDate <= minAgeDate;
  };

  const handleBlur = (e) => {
    const { id } = e.target;
    setTouched({
      ...touched,
      [id]: true
    });
    validateField(id, formData[id]);
  };

  const validateField = (fieldName, value) => {
    let error = "";
    
    switch(fieldName) {
      case "fullname":
        if (!value.trim()) {
          error = "Full name is required";
        }
        break;
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
          error = "Password must be at least 8 characters with: 1 uppercase, 1 lowercase, 1 number, and 1 special character (!@#$%^&*)";
        }
        break;
      case "confirmPassword":
        if (!value) {
          error = "Please confirm your password";
        } else if (value !== formData.password) {
          error = "Passwords do not match";
        }
        break;
      case "address":
        if (!value.trim()) {
          error = "Address is required";
        }
        break;
      case "birthDate":
        if (!value) {
          error = "Birth date is required";
        } else if (!validateBirthDate(value)) {
          error = "Please enter a valid date (YYYY-MM-DD) and you must be at least 13 years old";
        }
        break;
      case "phone":
        if (!value) {
          error = "Phone number is required";
        } else if (!validatePhone(value)) {
          error = "Please enter a valid phone number (10-15 digits, + optional)";
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
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
    
    // Validate field if it's been touched
    if (touched[id]) {
      validateField(id, value);
    }
  };

  const validateForm = async (e) => {
  e.preventDefault();
  let isValid = true;

  Object.keys(formData).forEach(field => {
    const fieldValid = validateField(field, formData[field]);
    if (!fieldValid) {
      isValid = false;
    }
  });

  setTouched({
    fullname: true,
    email: true,
    password: true,
    confirmPassword: true,
    address: true,
    birthDate: true,
    phone: true
  });

  if (isValid) {
    try {
      const response = await fetch("http://localhost:5000/api/signup", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(formData)
});


      const data = await response.json();

      if (response.ok) {
        alert("Sign-up successful! Redirecting to login page...");
        navigate("/login");
      } else {
        alert(`Error: ${data.message || "Failed to sign up"}`);
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("Server error. Please try again later.");
    }
  }
};

  return (
    <div style={styles.body}>
      <Navbar />

      {/* Main Content */}
      <div style={styles.signupContainer}>
        <div className="signup-box" style={styles.signupBox}>
          {/* Left Section with Image */}
          <div className="left-section" style={styles.leftSection}>
            <img
              src="/assets/Signup.jpeg"
              alt="Signup"
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
            <h3 className="signup-heading mb-4" style={styles.heading}>
              Create an Account
            </h3>

            <form onSubmit={validateForm}>
              {/* Full Name */}
              <div className="mb-3">
                <input
                  type="text"
                  id="fullname"
                  placeholder="Full Name"
                  value={formData.fullname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    ...styles.formControl,
                    ...(errors.fullname && touched.fullname ? styles.formControlError : {})
                  }}
                />
                <div 
                  style={{
                    ...styles.errorText,
                    ...(errors.fullname && touched.fullname ? styles.errorTextVisible : {})
                  }}
                >
                  {errors.fullname}
                </div>
              </div>

              {/* Email */}
              <div className="mb-3">
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
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

              {/* Address */}
              <div className="mb-3">
                <input
                  type="text"
                  id="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    ...styles.formControl,
                    ...(errors.address && touched.address ? styles.formControlError : {})
                  }}
                />
                <div 
                  style={{
                    ...styles.errorText,
                    ...(errors.address && touched.address ? styles.errorTextVisible : {})
                  }}
                >
                  {errors.address}
                </div>
              </div>

              {/* Birth Date */}
              <div className="mb-3">
                <input
                  type="date"
                  id="birthDate"
                  placeholder="Birth Date (YYYY-MM-DD)"
                  value={formData.birthDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    ...styles.formControl,
                    ...(errors.birthDate && touched.birthDate ? styles.formControlError : {})
                  }}
                />
                <div 
                  style={{
                    ...styles.errorText,
                    ...(errors.birthDate && touched.birthDate ? styles.errorTextVisible : {})
                  }}
                >
                  {errors.birthDate}
                </div>
              </div>

              {/* Phone */}
              <div className="mb-3">
                <input
                  type="tel"
                  id="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    ...styles.formControl,
                    ...(errors.phone && touched.phone ? styles.formControlError : {})
                  }}
                />
                <div 
                  style={{
                    ...styles.errorText,
                    ...(errors.phone && touched.phone ? styles.errorTextVisible : {})
                  }}
                >
                  {errors.phone}
                </div>
              </div>

              {/* Password */}
              <div className="mb-3">
                <input
                  type="password"
                  id="password"
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

              {/* Confirm Password */}
              <div className="mb-3">
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    ...styles.formControl,
                    ...(errors.confirmPassword && touched.confirmPassword ? styles.formControlError : {})
                  }}
                />
                <div 
                  style={{
                    ...styles.errorText,
                    ...(errors.confirmPassword && touched.confirmPassword ? styles.errorTextVisible : {})
                  }}
                >
                  {errors.confirmPassword}
                </div>
              </div>

              <button type="submit" style={styles.btnPrimary}>Sign Up</button>
            </form>

            {/* Login Link */}
            <p className="mt-3">
              Already have an account?{" "}
              <span 
                onClick={() => navigate("/login")} 
                style={styles.linkText}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#0056b3")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "blue")}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignUpPage;