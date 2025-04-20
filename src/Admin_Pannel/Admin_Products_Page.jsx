import React, { useState, useEffect } from 'react';
import AdminNavbar from './Admin_navbar';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaCheck, FaSearch, FaImage } from 'react-icons/fa';

const AdminProductsPage = () => {
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
    searchContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
      maxWidth: '400px',
    },
    searchInput: {
      flex: 1,
      padding: '10px 15px 10px 35px',
      border: '1px solid #e0e0e0',
      borderRadius: '4px',
      fontSize: '14px',
    },
    searchIcon: {
      position: 'absolute',
      left: '15px',
      color: '#6c757d',
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
    },
    descriptionCell: {
      maxWidth: '200px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  };

  // State management
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    description: '',
    image: null,
    previewImage: ''
  });

  // Mock data with images
  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        name: 'Premium Headphones',
        price: 199.99,
        category: 'Electronics',
        stock: 50,
        description: 'Noise cancelling wireless headphones',
        image: 'https://via.placeholder.com/50/cccccc/ffffff?text=Headphones',
        createdAt: '2023-05-15T10:30:00'
      },
      {
        id: 2,
        name: 'Smart Watch',
        price: 249.99,
        category: 'Electronics',
        stock: 30,
        description: 'Fitness tracker with heart rate monitor',
        image: 'https://via.placeholder.com/50/cccccc/ffffff?text=Watch',
        createdAt: '2023-06-20T14:45:00'
      },
      {
        id: 3,
        name: 'Wireless Keyboard',
        price: 59.99,
        category: 'Accessories',
        stock: 100,
        description: 'Ergonomic wireless keyboard',
        image: 'https://via.placeholder.com/50/cccccc/ffffff?text=Keyboard',
        createdAt: '2023-07-10T09:15:00'
      }
    ];
    setProducts(mockProducts);
  }, []);

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

  const handleAddProduct = () => {
    if (formData.name.trim() && formData.price && formData.category && formData.stock) {
      const newProduct = {
        ...formData,
        id: products.length + 1,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        image: formData.previewImage || 'https://via.placeholder.com/50/cccccc/ffffff?text=Product',
        createdAt: new Date().toISOString()
      };
      setProducts([newProduct, ...products]);
      resetForm();
    }
  };

  const startEditing = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      description: product.description,
      image: null,
      previewImage: product.image
    });
  };

  const handleUpdateProduct = () => {
    if (formData.name.trim() && formData.price && formData.category && formData.stock) {
      setProducts(products.map(prod => 
        prod.id === editingId 
          ? { 
              ...prod, 
              name: formData.name,
              price: parseFloat(formData.price),
              category: formData.category,
              stock: parseInt(formData.stock),
              description: formData.description,
              image: formData.previewImage || prod.image
            } 
          : prod
      ));
      resetForm();
    }
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(prod => prod.id !== id));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      category: '',
      stock: '',
      description: '',
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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.dashboard}>
      <AdminNavbar />
      
      <div style={styles.content}>
        {/* Products Table Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2>Product Management</h2>
            {!isAdding && !editingId && (
              <button 
                onClick={() => setIsAdding(true)} 
                style={styles.addButton}
              >
                <FaPlus /> Add Product
              </button>
            )}
          </div>

          {/* Search Bar */}
          <div style={{ padding: '15px 20px', borderBottom: '1px solid #e0e0e0' }}>
            <div style={styles.searchContainer}>
              <FaSearch style={styles.searchIcon} />
              <input
                type="text"
                style={styles.searchInput}
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Add/Edit Form */}
          {(isAdding || editingId) && (
            <div style={styles.formContainer}>
              <h3 style={styles.formTitle}>
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h3>
              <div style={styles.formGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter price"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Category</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter category"
                    required
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Stock Quantity</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter stock quantity"
                    min="0"
                    required
                  />
                </div>
                <div style={{ ...styles.inputGroup, ...styles.fullWidthInputGroup }}>
                  <label style={styles.label}>Product Image</label>
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
              <div style={styles.inputGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  style={{...styles.input, minHeight: '80px'}}
                  placeholder="Enter product description"
                />
              </div>
              <div style={styles.buttonGroup}>
                <button
                  onClick={editingId ? handleUpdateProduct : handleAddProduct}
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

          {/* Products Table */}
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Image</th>
                  <th style={styles.tableHeader}>ID</th>
                  <th style={styles.tableHeader}>Product Name</th>
                  <th style={styles.tableHeader}>Price</th>
                  <th style={styles.tableHeader}>Category</th>
                  <th style={styles.tableHeader}>Stock</th>
                  <th style={styles.tableHeader}>Description</th>
                  <th style={styles.tableHeader}>Added On</th>
                  <th style={styles.tableHeader}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const { date, time } = formatDateTime(product.createdAt);
                  return (
                    <tr key={product.id}>
                      <td style={styles.tableCell}>
                        <div style={styles.imageCell}>
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            style={styles.imagePreview} 
                          />
                        </div>
                      </td>
                      <td style={styles.tableCell}>{product.id}</td>
                      <td style={styles.tableCell}>{product.name}</td>
                      <td style={styles.tableCell}>${product.price.toFixed(2)}</td>
                      <td style={styles.tableCell}>{product.category}</td>
                      <td style={styles.tableCell}>{product.stock}</td>
                      <td style={{...styles.tableCell, ...styles.descriptionCell}} title={product.description}>
                        {product.description}
                      </td>
                      <td style={styles.tableCell}>
                        <div style={styles.dateTime}>
                          <span>{date}</span>
                          <span style={styles.timeText}>{time}</span>
                        </div>
                      </td>
                      <td style={styles.tableCell}>
                        <button
                          onClick={() => startEditing(product)}
                          style={{...styles.actionButton, ...styles.editButton}}
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
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

export default AdminProductsPage;