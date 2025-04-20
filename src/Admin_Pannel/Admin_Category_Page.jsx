import React, { useState } from 'react';
import AdminNavbar from './Admin_navbar';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaCheck, FaImage } from 'react-icons/fa';

const AdminCategoryPage = () => {
  // Initial data with image URLs
  const initialCategories = [
    { 
      id: 1, 
      name: 'Electronics', 
      productCount: 24, 
      createdAt: '2023-05-15T16:00:00Z',
      image: 'https://via.placeholder.com/50/cccccc/ffffff?text=Electronics'
    },
    { 
      id: 2, 
      name: 'Clothing', 
      productCount: 18, 
      createdAt: '2023-05-10T20:15:00Z',
      image: 'https://via.placeholder.com/50/cccccc/ffffff?text=Clothing'
    },
    { 
      id: 3, 
      name: 'Home & Kitchen', 
      productCount: 12, 
      createdAt: '2023-05-05T14:45:00Z',
      image: 'https://via.placeholder.com/50/cccccc/ffffff?text=Home'
    },
    { 
      id: 4, 
      name: 'Books', 
      productCount: 8, 
      createdAt: '2023-04-28T16:50:00Z',
      image: 'https://via.placeholder.com/50/cccccc/ffffff?text=Books'
    },
    { 
      id: 5, 
      name: 'Toys', 
      productCount: 15, 
      createdAt: '2023-04-20T22:00:00Z',
      image: 'https://via.placeholder.com/50/cccccc/ffffff?text=Toys'
    }
  ];

  // State management
  const [categories, setCategories] = useState(initialCategories);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    productCount: '',
    image: null,
    previewImage: ''
  });

  // Styles
  const styles = {
    dashboard: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
    },
    content: {
      flex: 1,
      padding: '20px',
      marginTop: '60px',
    },
    section: {
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      marginBottom: '20px',
      overflow: 'hidden',
    },
    sectionHeader: {
      padding: '15px 20px',
      borderBottom: '1px solid #e0e0e0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    tableContainer: {
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    tableHeader: {
      backgroundColor: '#f8f9fa',
      color: '#333',
      fontWeight: 600,
      textAlign: 'left',
      padding: '12px 15px',
      borderBottom: '2px solid #e0e0e0',
    },
    tableCell: {
      padding: '12px 15px',
      borderBottom: '1px solid #e0e0e0',
    },
    formContainer: {
      padding: '20px',
    },
    formTitle: {
      marginBottom: '15px',
      fontSize: '18px',
      fontWeight: 600,
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '15px',
      marginBottom: '15px',
    },
    inputGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 500,
      fontSize: '14px',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #e0e0e0',
      borderRadius: '4px',
      fontSize: '14px',
    },
    buttonGroup: {
      display: 'flex',
      gap: '10px',
    },
    primaryButton: {
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    secondaryButton: {
      backgroundColor: '#fff',
      color: '#333',
      border: '1px solid #e0e0e0',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    actionButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '5px',
    },
    editButton: {
      color: '#17a2b8',
    },
    deleteButton: {
      color: '#dc3545',
    },
    dateTime: {
      display: 'flex',
      flexDirection: 'column',
    },
    timeText: {
      fontSize: '12px',
      color: '#6c757d',
    },
    addButton: {
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    imagePreview: {
      width: '50px',
      height: '50px',
      objectFit: 'cover',
      borderRadius: '4px',
      marginRight: '10px'
    },
    imageUploadContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    imageUploadButton: {
      padding: '8px 15px',
      backgroundColor: '#f8f9fa',
      border: '1px dashed #6c757d',
      borderRadius: '4px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: '#e9ecef',
        borderColor: '#495057'
      }
    },
    imageCell: {
      display: 'flex',
      alignItems: 'center'
    },
    fullWidthInputGroup: {
      gridColumn: '1 / -1'
    }
  };

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        previewImage: URL.createObjectURL(file)
      });
    }
  };

  const handleAddCategory = () => {
    if (formData.name.trim() && formData.productCount) {
      const newCategory = {
        id: categories.length + 1,
        name: formData.name,
        productCount: parseInt(formData.productCount),
        createdAt: new Date().toISOString(),
        image: formData.previewImage || 'https://via.placeholder.com/50/cccccc/ffffff?text=Category'
      };
      setCategories([newCategory, ...categories]);
      resetForm();
    }
  };

  const startEditing = (category) => {
    setEditingId(category.id);
    setFormData({
      name: category.name,
      productCount: category.productCount.toString(),
      image: null,
      previewImage: category.image
    });
  };

  const handleUpdateCategory = () => {
    if (formData.name.trim() && formData.productCount) {
      setCategories(categories.map(cat => 
        cat.id === editingId 
          ? { 
              ...cat, 
              name: formData.name, 
              productCount: parseInt(formData.productCount),
              image: formData.previewImage || cat.image
            } 
          : cat
      ));
      resetForm();
    }
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const resetForm = () => {
    setFormData({ 
      name: '', 
      productCount: '', 
      image: null,
      previewImage: ''
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    
    return {
      date: date.toLocaleDateString('en-US', dateOptions),
      time: date.toLocaleTimeString('en-US', timeOptions)
    };
  };

  return (
    <div style={styles.dashboard}>
      <AdminNavbar />
      
      <div style={styles.content}>
        {/* Categories Table Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2>Categories</h2>
            {!isAdding && !editingId && (
              <button 
                onClick={() => setIsAdding(true)} 
                style={styles.addButton}
              >
                <FaPlus /> Add Category
              </button>
            )}
          </div>
          
          {/* Add/Edit Form */}
          {(isAdding || editingId) && (
            <div style={styles.formContainer}>
              <h3 style={styles.formTitle}>
                {editingId ? 'Edit Category' : 'Add New Category'}
              </h3>
              <div style={styles.formGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Category Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter category name"
                    required
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Number of Products</label>
                  <input
                    type="number"
                    name="productCount"
                    value={formData.productCount}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter product count"
                    min="0"
                    required
                  />
                </div>
                <div style={{ ...styles.inputGroup, ...styles.fullWidthInputGroup }}>
                  <label style={styles.label}>Category Image</label>
                  <div style={styles.imageUploadContainer}>
                    {formData.previewImage && (
                      <img 
                        src={formData.previewImage} 
                        alt="Preview" 
                        style={styles.imagePreview} 
                      />
                    )}
                    <label style={styles.imageUploadButton}>
                      <FaImage />
                      {formData.previewImage ? 'Change Image' : 'Upload Image'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div style={styles.buttonGroup}>
                <button
                  onClick={editingId ? handleUpdateCategory : handleAddCategory}
                  style={styles.primaryButton}
                >
                  <FaCheck /> {editingId ? 'Update' : 'Save'}
                </button>
                <button
                  onClick={resetForm}
                  style={styles.secondaryButton}
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            </div>
          )}

          {/* Categories Table */}
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Image</th>
                  <th style={styles.tableHeader}>Category</th>
                  <th style={styles.tableHeader}>Products</th>
                  <th style={styles.tableHeader}>Created</th>
                  <th style={styles.tableHeader}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => {
                  const { date, time } = formatDateTime(category.createdAt);
                  return (
                    <tr key={category.id}>
                      <td style={styles.tableCell}>
                        <div style={styles.imageCell}>
                          <img 
                            src={category.image} 
                            alt={category.name} 
                            style={styles.imagePreview} 
                          />
                        </div>
                      </td>
                      <td style={styles.tableCell}>{category.name}</td>
                      <td style={styles.tableCell}>{category.productCount}</td>
                      <td style={styles.tableCell}>
                        <div style={styles.dateTime}>
                          <span>{date}</span>
                          <span style={styles.timeText}>{time}</span>
                        </div>
                      </td>
                      <td style={styles.tableCell}>
                        <button
                          onClick={() => startEditing(category)}
                          style={{...styles.actionButton, ...styles.editButton}}
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          style={{...styles.actionButton, ...styles.deleteButton}}
                        >
                          <FaTrash /> Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryPage;