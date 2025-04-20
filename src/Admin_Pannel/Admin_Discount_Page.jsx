import React, { useState, useEffect } from 'react';
import AdminNavbar from './Admin_navbar';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaCheck, FaSearch, FaPercentage } from 'react-icons/fa';

const AdminDiscountsPage = () => {
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
    discountBadge: {
      backgroundColor: '#ffc107',
      color: '#212529',
      padding: '3px 8px',
      borderRadius: '4px',
      fontWeight: 500,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
    },
  };

  // State management
  const [discounts, setDiscounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    discountType: 'percentage',
    value: '',
    startDate: '',
    endDate: '',
    minPurchase: '',
    applicableTo: 'all',
    isActive: true
  });

  // Mock data - replace with API calls in a real application
  useEffect(() => {
    const mockDiscounts = [
      {
        id: 1,
        name: 'Summer Sale',
        code: 'SUMMER20',
        discountType: 'percentage',
        value: 20,
        startDate: '2023-06-01T00:00:00',
        endDate: '2023-06-30T23:59:59',
        minPurchase: 50,
        applicableTo: 'all',
        isActive: true
      },
      {
        id: 2,
        name: 'New Customer',
        code: 'WELCOME10',
        discountType: 'fixed',
        value: 10,
        startDate: '2023-05-15T00:00:00',
        endDate: '2023-12-31T23:59:59',
        minPurchase: 0,
        applicableTo: 'first-time',
        isActive: true
      },
      {
        id: 3,
        name: 'Clearance',
        code: 'CLEAR30',
        discountType: 'percentage',
        value: 30,
        startDate: '2023-07-01T00:00:00',
        endDate: '2023-07-15T23:59:59',
        minPurchase: 100,
        applicableTo: 'selected',
        isActive: false
      }
    ];
    setDiscounts(mockDiscounts);
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

  const handleAddDiscount = () => {
    if (formData.name.trim() && formData.code && formData.value && formData.startDate && formData.endDate) {
      const newDiscount = {
        ...formData,
        id: discounts.length + 1,
        value: parseFloat(formData.value),
        minPurchase: parseFloat(formData.minPurchase) || 0,
        createdAt: new Date().toISOString()
      };
      setDiscounts([newDiscount, ...discounts]);
      resetForm();
    }
  };

  const startEditing = (discount) => {
    setEditingId(discount.id);
    setFormData({
      name: discount.name,
      code: discount.code,
      discountType: discount.discountType,
      value: discount.value.toString(),
      startDate: discount.startDate.split('T')[0],
      endDate: discount.endDate.split('T')[0],
      minPurchase: discount.minPurchase.toString(),
      applicableTo: discount.applicableTo,
      isActive: discount.isActive
    });
  };

  const handleUpdateDiscount = () => {
    if (formData.name.trim() && formData.code && formData.value && formData.startDate && formData.endDate) {
      setDiscounts(discounts.map(disc => 
        disc.id === editingId 
          ? { 
              ...disc, 
              name: formData.name,
              code: formData.code,
              discountType: formData.discountType,
              value: parseFloat(formData.value),
              startDate: new Date(formData.startDate).toISOString(),
              endDate: new Date(formData.endDate).toISOString(),
              minPurchase: parseFloat(formData.minPurchase) || 0,
              applicableTo: formData.applicableTo,
              isActive: formData.isActive
            } 
          : disc
      ));
      resetForm();
    }
  };

  const toggleDiscountStatus = (id) => {
    setDiscounts(discounts.map(disc => 
      disc.id === id ? { ...disc, isActive: !disc.isActive } : disc
    ));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      discountType: 'percentage',
      value: '',
      startDate: '',
      endDate: '',
      minPurchase: '',
      applicableTo: 'all',
      isActive: true
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const formatDateOnly = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const filteredDiscounts = discounts.filter(discount =>
    discount.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discount.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.dashboard}>
      <AdminNavbar />
      
      <div style={styles.content}>
        {/* Discounts Table Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2>Discount Management</h2>
            {!isAdding && !editingId && (
              <button 
                onClick={() => setIsAdding(true)} 
                style={styles.addButton}
              >
                <FaPlus /> Add Discount
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
                placeholder="Search discounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Add/Edit Form */}
          {(isAdding || editingId) && (
            <div style={styles.formContainer}>
              <h3 style={styles.formTitle}>
                {editingId ? 'Edit Discount' : 'Add New Discount'}
              </h3>
              <div style={styles.formGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Discount Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter discount name"
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Discount Code</label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter discount code"
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Discount Type</label>
                  <select
                    name="discountType"
                    value={formData.discountType}
                    onChange={handleInputChange}
                    style={styles.select}
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>
                    {formData.discountType === 'percentage' ? 'Percentage Value' : 'Fixed Amount'}
                  </label>
                  <input
                    type="number"
                    name="value"
                    value={formData.value}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder={formData.discountType === 'percentage' ? 'Enter percentage' : 'Enter amount'}
                    min="0"
                    step={formData.discountType === 'percentage' ? '1' : '0.01'}
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
                  <label style={styles.label}>Minimum Purchase ($)</label>
                  <input
                    type="number"
                    name="minPurchase"
                    value={formData.minPurchase}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter minimum purchase amount"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Applicable To</label>
                  <select
                    name="applicableTo"
                    value={formData.applicableTo}
                    onChange={handleInputChange}
                    style={styles.select}
                  >
                    <option value="all">All Products</option>
                    <option value="selected">Selected Products</option>
                    <option value="first-time">First-time Customers</option>
                  </select>
                </div>
              </div>
              <div style={styles.inputGroup}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleCheckboxChange}
                  />
                  Active Discount
                </label>
              </div>
              <div style={styles.buttonGroup}>
                <button
                  onClick={editingId ? handleUpdateDiscount : handleAddDiscount}
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

          {/* Discounts Table */}
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Code</th>
                  <th style={styles.tableHeader}>Name</th>
                  <th style={styles.tableHeader}>Discount</th>
                  <th style={styles.tableHeader}>Valid Period</th>
                  <th style={styles.tableHeader}>Min Purchase</th>
                  <th style={styles.tableHeader}>Applicable To</th>
                  <th style={styles.tableHeader}>Status</th>
                  <th style={styles.tableHeader}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDiscounts.map((discount) => {
                  const startDate = formatDateOnly(discount.startDate);
                  const endDate = formatDateOnly(discount.endDate);
                  const isActive = new Date(discount.startDate) <= new Date() && 
                                  new Date(discount.endDate) >= new Date() && 
                                  discount.isActive;
                  
                  return (
                    <tr key={discount.id}>
                      <td style={styles.tableCell}>
                        <strong>{discount.code}</strong>
                      </td>
                      <td style={styles.tableCell}>{discount.name}</td>
                      <td style={styles.tableCell}>
                        <span style={styles.discountBadge}>
                          <FaPercentage />
                          {discount.discountType === 'percentage' 
                            ? `${discount.value}%` 
                            : `$${discount.value.toFixed(2)}`}
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
                        {discount.minPurchase > 0 ? `$${discount.minPurchase.toFixed(2)}` : 'None'}
                      </td>
                      <td style={styles.tableCell}>
                        {discount.applicableTo === 'all' ? 'All Products' : 
                         discount.applicableTo === 'selected' ? 'Selected Products' : 'First-time Customers'}
                      </td>
                      <td style={styles.tableCell}>
                        <span style={isActive ? styles.statusActive : styles.statusInactive}>
                          {isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td style={styles.tableCell}>
                        <button
                          onClick={() => startEditing(discount)}
                          style={{...styles.actionButton, ...styles.editButton}}
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => toggleDiscountStatus(discount.id)}
                          style={{...styles.actionButton, ...(discount.isActive ? styles.deleteButton : styles.editButton)}}
                        >
                          {discount.isActive ? <FaTimes /> : <FaCheck />} 
                          {discount.isActive ? 'Deactivate' : 'Activate'}
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

export default AdminDiscountsPage;