import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAfterLogin from "./Navbar_after_login";
import Footer from "./footer";
import EditProfile from "./User_edit_profile";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
    address: "1234 Elm Street, Springfield, IL, USA",
    birthday: "January 1, 1990",
    gender: "Male",
    joined: "March 10, 2022",
    profileImage: "/assets/profile-logo.png",
  });

  useEffect(() => {
    const animateElements = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < window.innerHeight * 0.8) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      });
    };

    animateElements();
    window.addEventListener('scroll', animateElements);
    return () => window.removeEventListener('scroll', animateElements);
  }, []);

  const handleLogout = () => {
    // Clear any authentication tokens or user data here
    
    // Navigate to login and replace the history entry
    navigate("/login", { replace: true });
    
    // Additional prevention for browser back button
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function() {
      window.history.go(1);
    };
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
        <div className="animate-on-scroll" style={{
          backgroundColor: "white",
          borderRadius: "15px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          padding: "40px",
          width: "100%",
          maxWidth: "1000px",
          opacity: 0,
          transform: "translateY(30px)",
          transition: "all 0.6s ease-out"
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "220px 1fr",
            gap: "40px",
            alignItems: "center"
          }}>
            {/* Profile Image */}
            <div className="animate-on-scroll" style={{
              opacity: 0,
              transform: "translateX(-20px)",
              transition: "all 0.6s ease-out 0.2s"
            }}>
              <img 
                src={user.profileImage} 
                alt="Profile" 
                style={{
                  width: "220px",
                  height: "220px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #dee2e6",
                  transition: "transform 0.3s ease"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              />
            </div>

            {/* Profile Info - 2 columns with 3 fields each */}
            <div className="animate-on-scroll" style={{
              opacity: 0,
              transform: "translateX(20px)",
              transition: "all 0.6s ease-out 0.2s"
            }}>
              {isEditing ? (
                <EditProfile 
                  user={user} 
                  onSave={(updatedUser) => {
                    setUser(updatedUser);
                    setIsEditing(false);
                  }} 
                  onCancel={() => setIsEditing(false)} 
                />
              ) : (
                <>
                  <h2 style={{ 
                    marginBottom: "25px",
                    color: "#343a40"
                  }}>{user.name}</h2>
                  
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "30px"
                  }}>
                    {/* First Column */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                      <div>
                        <h5 style={{ color: "#6c757d", marginBottom: "5px" }}>Email</h5>
                        <p>{user.email}</p>
                      </div>
                      <div>
                        <h5 style={{ color: "#6c757d", marginBottom: "5px" }}>Phone</h5>
                        <p>{user.phone}</p>
                      </div>
                      <div>
                        <h5 style={{ color: "#6c757d", marginBottom: "5px" }}>Address</h5>
                        <p>{user.address}</p>
                      </div>
                    </div>

                    {/* Second Column */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                      <div>
                        <h5 style={{ color: "#6c757d", marginBottom: "5px" }}>Birthday</h5>
                        <p>{user.birthday}</p>
                      </div>
                      <div>
                        <h5 style={{ color: "#6c757d", marginBottom: "5px" }}>Gender</h5>
                        <p>{user.gender}</p>
                      </div>
                      <div>
                        <h5 style={{ color: "#6c757d", marginBottom: "5px" }}>Member Since</h5>
                        <p>{user.joined}</p>
                      </div>
                    </div>
                  </div>

                  <div className="animate-on-scroll" style={{
                    display: "flex",
                    gap: "15px",
                    marginTop: "30px",
                    opacity: 0,
                    transform: "translateY(20px)",
                    transition: "all 0.6s ease-out 0.4s"
                  }}>
                    <button 
                      onClick={() => setIsEditing(true)}
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        ":hover": {
                          backgroundColor: "#0069d9"
                        }
                      }}
                    >
                      Edit Profile
                    </button>
                    <button 
                      onClick={() => navigate("/change-password")}
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        ":hover": {
                          backgroundColor: "#218838"
                        }
                      }}
                    >
                      Change Password
                    </button>
                    <button 
                      onClick={handleLogout}
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "#dc3545",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        ":hover": {
                          backgroundColor: "#c82333"
                        }
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;