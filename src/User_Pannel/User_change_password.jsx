import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAfterLogin from "./Navbar_after_login";
import Footer from "./footer";

const UserChangePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({ password: "", confirmPassword: "" });

  // Password validation regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  useEffect(() => {
    // Custom scrollbar styles
    const customScrollbarStyles = `
      ::-webkit-scrollbar { width: 10px; }
      ::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
      ::-webkit-scrollbar-thumb { background: #888; border-radius: 10px; }
      ::-webkit-scrollbar-thumb:hover { background: #555; }
    `;

    const styleElement = document.createElement("style");
    styleElement.innerHTML = customScrollbarStyles;
    document.head.appendChild(styleElement);

    // Animation trigger
    const animateElements = () => {
      const card = document.querySelector('.password-card');
      const image = document.querySelector('.password-image');
      const form = document.querySelector('.password-form');
      
      if (card && image && form) {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight * 0.75) {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
          
          image.style.opacity = "1";
          image.style.transform = "translateX(0)";
          
          form.style.opacity = "1";
          form.style.transform = "translateX(0)";
        }
      }
    };

    // Initial animation
    const timer = setTimeout(animateElements, 100);
    window.addEventListener('scroll', animateElements);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', animateElements);
      document.head.removeChild(styleElement);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = { password: "", confirmPassword: "" };

    if (!password.trim()) {
      errors.password = "Password cannot be empty.";
    } else if (!passwordRegex.test(password)) {
      errors.password = "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.";
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Confirm Password cannot be empty.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match!";
    }

    setError(errors);

    if (!errors.password && !errors.confirmPassword) {
      alert("Password successfully changed!");
      navigate("/profile");
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#f8f9fa"
    }}>
      <NavbarAfterLogin activeLink="profile" />
      
      <main style={{
        flex: 1,
        padding: "80px 20px 40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <div 
          className="password-card card shadow-lg p-5 d-flex flex-row" 
          style={{ 
            width: "1100px", 
            height: "500px", 
            borderRadius: "15px",
            opacity: 0,
            transform: "translateY(30px)",
            transition: "all 0.6s ease-out"
          }}
        >
          {/* Left Image Section */}
          <div 
            className="password-image col-md-6 d-flex align-items-center justify-content-center"
            style={{
              opacity: 0,
              transform: "translateX(-30px)",
              transition: "all 0.6s ease-out 0.3s"
            }}
          >
            <img 
              src="/assets/password-reset.jpg" 
              alt="Change Password" 
              className="img-fluid" 
              style={{ 
                maxWidth: "100%", 
                borderRadius: "10px",
                transition: "transform 0.3s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            />
          </div>

          {/* Right Form Section */}
          <div 
            className="password-form col-md-6 d-flex flex-column align-items-center"
            style={{
              opacity: 0,
              transform: "translateX(30px)",
              transition: "all 0.6s ease-out 0.3s"
            }}
          >
            <h2 className="mb-4" style={{ color: "#343a40" }}>Change Password</h2>

            <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "400px" }}>
              <div className="mb-3">
                <label className="form-label">New Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  style={{ transition: "all 0.3s ease" }}
                />
                {error.password && <p className="text-danger mt-1">{error.password}</p>}
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm New Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  style={{ transition: "all 0.3s ease" }}
                />
                {error.confirmPassword && <p className="text-danger mt-1">{error.confirmPassword}</p>}
              </div>

              <div 
                className="d-flex gap-4 mt-4 justify-content-center"
                style={{
                  transition: "all 0.3s ease"
                }}
              >
                <button 
                  type="submit" 
                  className="btn btn-success px-5 py-2"
                  style={{ 
                    transition: "all 0.3s ease",
                    ":hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                    }
                  }}
                >
                  Save
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary px-5 py-2"
                  onClick={() => navigate("/profile")}
                  style={{ 
                    transition: "all 0.3s ease",
                    ":hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                    }
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserChangePassword;