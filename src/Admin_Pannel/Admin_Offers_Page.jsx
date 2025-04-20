import React, { useState, useEffect } from 'react';
import AdminNavbar from './Admin_navbar';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaCheck, FaSearch, FaTag } from 'react-icons/fa';

const AdminOffersPage= () => {
  // Styles matching previous admin pages
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
    select: {
      width: '100%',
      padding: '10px',
      border: '1px solid #e0e0e0',
      borderRadius: '4px',
      fontSize: '14px',
      backgroundColor: '#fff',
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
    statusActive: {
      color: '#28a745',
      fontWeight: 500,
    },
    statusInactive: {
      color: '#dc3545',
      fontWeight: 500,
    },
    offerBadge: {
      backgroundColor: '#17a2b8',
      color: '#fff',
      padding: '3px 8px',
      borderRadius: '4px',
      fontWeight: 500,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
    },
  };

  // State management
  const [offers, setOffers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    offerType: 'product',
    discountValue: '',
    startDate: '',
    endDate: '',
    minOrderValue: '',
    applicableProducts: [],
    isActive: true
  });

  // Mock data - replace with API calls in a real application
  useEffect(() => {
    const mockOffers = [
      {
        id: 1,
        title: 'Summer Special',
        description: 'Get extra discount on summer collection',
        offerType: 'category',
        discountValue: 15,
        startDate: '2023-06-01T00:00:00',
        endDate: '2023-06-30T23:59:59',
        minOrderValue: 100,
        applicableProducts: ['Summer Dress', 'Beach Wear'],
        isActive: true
      },
      {
        id: 2,
        title: 'New User Offer',
        description: 'Special discount for new customers',
        offerType: 'first-order',
        discountValue: 20,
        startDate: '2023-05-15T00:00:00',
        endDate: '2023-12-31T23:59:59',
        minOrderValue: 0,
        applicableProducts: [],
        isActive: true
      },
      {
        id: 3,
        title: 'Clearance Sale',
        description: 'Limited time clearance offer',
        offerType: 'product',
        discountValue: 30,
        startDate: '2023-07-01T00:00:00',
        endDate: '2023-07-15T23:59:59',
        minOrderValue: 50,
        applicableProducts: ['Outlet Item 1', 'Outlet Item 2'],
        isActive: false
      }
    ];
    setOffers(mockOffers);
  }, []);

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleAddOffer = () => {
    if (formData.title.trim() && formData.description && formData.discountValue && formData.startDate && formData.endDate) {
      const newOffer = {
        ...formData,
        id: offers.length + 1,
        discountValue: parseFloat(formData.discountValue),
        minOrderValue: parseFloat(formData.minOrderValue) || 0,
        createdAt: new Date().toISOString()
      };
      setOffers([newOffer, ...offers]);
      resetForm();
    }
  };

  const startEditing = (offer) => {
    setEditingId(offer.id);
    setFormData({
      title: offer.title,
      description: offer.description,
      offerType: offer.offerType,
      discountValue: offer.discountValue.toString(),
      startDate: offer.startDate.split('T')[0],
      endDate: offer.endDate.split('T')[0],
      minOrderValue: offer.minOrderValue.toString(),
      applicableProducts: [...offer.applicableProducts],
      isActive: offer.isActive
    });
  };

  const handleUpdateOffer = () => {
    if (formData.title.trim() && formData.description && formData.discountValue && formData.startDate && formData.endDate) {
      setOffers(offers.map(offer => 
        offer.id === editingId 
          ? { 
              ...offer, 
              title: formData.title,
              description: formData.description,
              offerType: formData.offerType,
              discountValue: parseFloat(formData.discountValue),
              startDate: new Date(formData.startDate).toISOString(),
              endDate: new Date(formData.endDate).toISOString(),
              minOrderValue: parseFloat(formData.minOrderValue) || 0,
              applicableProducts: formData.applicableProducts,
              isActive: formData.isActive
            } 
          : offer
      ));
      resetForm();
    }
  };

  const toggleOfferStatus = (id) => {
    setOffers(offers.map(offer => 
      offer.id === id ? { ...offer, isActive: !offer.isActive } : offer
    ));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      offerType: 'product',
      discountValue: '',
      startDate: '',
      endDate: '',
      minOrderValue: '',
      applicableProducts: [],
      isActive: true
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const formatDateOnly = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const filteredOffers = offers.filter(offer =>
    offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    offer.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.dashboard}>
      <AdminNavbar />
      
      <div style={styles.content}>
        {/* Offers Table Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2>Offer Management</h2>
            {!isAdding && !editingId && (
              <button 
                onClick={() => setIsAdding(true)} 
                style={styles.addButton}
              >
                <FaPlus /> Add Offer
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
                placeholder="Search offers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Add/Edit Form */}
          {(isAdding || editingId) && (
            <div style={styles.formContainer}>
              <h3 style={styles.formTitle}>
                {editingId ? 'Edit Offer' : 'Add New Offer'}
              </h3>
              <div style={styles.formGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Offer Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter offer title"
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Description</label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter offer description"
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Offer Type</label>
                  <select
                    name="offerType"
                    value={formData.offerType}
                    onChange={handleInputChange}
                    style={styles.select}
                  >
                    <option value="product">Product Specific</option>
                    <option value="category">Category</option>
                    <option value="first-order">First Order</option>
                    <option value="sitewide">Sitewide</option>
                  </select>
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Discount Value (%)</label>
                  <input
                    type="number"
                    name="discountValue"
                    value={formData.discountValue}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter discount percentage"
                    min="0"
                    max="100"
                    step="1"
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Minimum Order Value ($)</label>
                  <input
                    type="number"
                    name="minOrderValue"
                    value={formData.minOrderValue}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter minimum order amount"
                    min="0"
                    step="0.01"
                  />
                </div>
                {formData.offerType === 'product' && (
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Applicable Products (comma separated)</label>
                    <input
                      type="text"
                      name="applicableProducts"
                      value={formData.applicableProducts.join(', ')}
                      onChange={(e) => {
                        const products = e.target.value.split(',').map(p => p.trim());
                        setFormData({...formData, applicableProducts: products});
                      }}
                      style={styles.input}
                      placeholder="Product 1, Product 2"
                    />
                  </div>
                )}
              </div>
              <div style={styles.inputGroup}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleCheckboxChange}
                  />
                  Active Offer
                </label>
              </div>
              <div style={styles.buttonGroup}>
                <button
                  onClick={editingId ? handleUpdateOffer : handleAddOffer}
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

          {/* Offers Table */}
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Title</th>
                  <th style={styles.tableHeader}>Description</th>
                  <th style={styles.tableHeader}>Type</th>
                  <th style={styles.tableHeader}>Discount</th>
                  <th style={styles.tableHeader}>Valid Period</th>
                  <th style={styles.tableHeader}>Min Order</th>
                  <th style={styles.tableHeader}>Status</th>
                  <th style={styles.tableHeader}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOffers.map((offer) => {
                  const startDate = formatDateOnly(offer.startDate);
                  const endDate = formatDateOnly(offer.endDate);
                  const isActive = new Date(offer.startDate) <= new Date() && 
                                  new Date(offer.endDate) >= new Date() && 
                                  offer.isActive;
                  
                  return (
                    <tr key={offer.id}>
                      <td style={styles.tableCell}>
                        <strong>{offer.title}</strong>
                      </td>
                      <td style={styles.tableCell}>{offer.description}</td>
                      <td style={styles.tableCell}>
                        {offer.offerType === 'product' ? 'Product' : 
                         offer.offerType === 'category' ? 'Category' :
                         offer.offerType === 'first-order' ? 'First Order' : 'Sitewide'}
                      </td>
                      <td style={styles.tableCell}>
                        <span style={styles.offerBadge}>
                          <FaTag />
                          {offer.discountValue}%
                        </span>
                      </td>
                      <td style={styles.tableCell}>
                        <div style={styles.dateTime}>
                          <span>{startDate}</span>
                          <span>to</span>
                          <span>{endDate}</span>
                        </div>
                      </td>
                      <td style={styles.tableCell}>
                        {offer.minOrderValue > 0 ? `$${offer.minOrderValue.toFixed(2)}` : 'None'}
                      </td>
                      <td style={styles.tableCell}>
                        <span style={isActive ? styles.statusActive : styles.statusInactive}>
                          {isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td style={styles.tableCell}>
                        <button
                          onClick={() => startEditing(offer)}
                          style={{...styles.actionButton, ...styles.editButton}}
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => toggleOfferStatus(offer.id)}
                          style={{...styles.actionButton, ...(offer.isActive ? styles.deleteButton : styles.editButton)}}
                        >
                          {offer.isActive ? <FaTimes /> : <FaCheck />} 
                          {offer.isActive ? 'Deactivate' : 'Activate'}
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

export default AdminOffersPage;