import React, { useState, useEffect } from "react";

const EditProfile = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...user });

  useEffect(() => {
    // Immediately show the form when component mounts
    const form = document.querySelector('.edit-profile-form');
    if (form) {
      form.style.opacity = "1";
      form.style.transform = "translateY(0)";
    }

    // Animate fields sequentially
    const fields = document.querySelectorAll('.edit-profile-field');
    fields.forEach((field, index) => {
      setTimeout(() => {
        field.style.opacity = "1";
        field.style.transform = "translateX(0)";
      }, 100 * index);
    });

    // Animate buttons after fields
    setTimeout(() => {
      const buttons = document.querySelector('.edit-profile-buttons');
      if (buttons) {
        buttons.style.opacity = "1";
        buttons.style.transform = "translateY(0)";
      }
    }, 100 * fields.length);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="edit-profile-form w-100"
      style={{
        opacity: 0,
        transform: "translateY(20px)",
        transition: "all 0.4s ease-out"
      }}
    >
      <h3 className="mb-4" style={{ color: "#343a40" }}>Edit Profile</h3>

      <div className="row g-3">
        {/* Column 1 */}
        <div className="col-md-6">
          <div 
            className="mb-3 edit-profile-field"
            style={{ 
              opacity: 0,
              transform: "translateX(-20px)",
              transition: "all 0.4s ease-out"
            }}
          >
            <label className="form-label">Name:</label>
            <input 
              type="text" 
              className="form-control" 
              name="name" 
              value={formData.name} 
              onChange={handleChange}
            />
          </div>

          <div 
            className="mb-3 edit-profile-field"
            style={{ 
              opacity: 0,
              transform: "translateX(-20px)",
              transition: "all 0.4s ease-out"
            }}
          >
            <label className="form-label">Email:</label>
            <input 
              type="email" 
              className="form-control" 
              name="email" 
              value={formData.email} 
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Column 2 */}
        <div className="col-md-6">
          <div 
            className="mb-3 edit-profile-field"
            style={{ 
              opacity: 0,
              transform: "translateX(20px)",
              transition: "all 0.4s ease-out"
            }}
          >
            <label className="form-label">Phone:</label>
            <input 
              type="text" 
              className="form-control" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange}
            />
          </div>

          <div 
            className="mb-3 edit-profile-field"
            style={{ 
              opacity: 0,
              transform: "translateX(20px)",
              transition: "all 0.4s ease-out"
            }}
          >
            <label className="form-label">Address:</label>
            <input 
              type="text" 
              className="form-control" 
              name="address" 
              value={formData.address} 
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div 
        className="d-flex gap-3 mt-4 edit-profile-buttons"
        style={{ 
          opacity: 0,
          transform: "translateY(20px)",
          transition: "all 0.4s ease-out"
        }}
      >
        <button 
          type="submit" 
          className="btn btn-success px-4 py-2"
        >
          Save Changes
        </button>
        <button 
          type="button" 
          className="btn btn-secondary px-4 py-2"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProfile;