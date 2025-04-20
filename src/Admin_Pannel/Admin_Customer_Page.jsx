import React, { useState, useEffect } from 'react';
import AdminNavbar from './Admin_navbar';
import { FaSearch, FaEdit, FaLock, FaUnlock, FaUser, FaCheck, FaTimes } from 'react-icons/fa';

const AdminCustomersPage = () => {
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
    blockButton: {
      color: '#dc3545',
    },
    unblockButton: {
      color: '#28a745',
    },
    statusActive: {
      color: '#28a745',
      fontWeight: 500,
    },
    statusBlocked: {
      color: '#dc3545',
      fontWeight: 500,
    },
    customerAvatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#f8f9fa',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '10px',
      color: '#6c757d',
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
    passwordCell: {
      fontFamily: 'monospace',
      fontSize: '14px',
      maxWidth: '150px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }
  };

  // State management
  const [customers, setCustomers] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [editingId, setEditingId] = useState(null);

const [formData, setFormData] = useState({
  id: '',              // Optional: useful when editing
  fullName: '',
  email: '',
  address: '',
  birthdate: '',       // e.g. "1998-03-10"
  phoneNumber: '',
  password: '',
  isActive: true,      // true = active, false = blocked
  createdAt: '',
  });

  // Calculate age from birthdate
  const calculateAge = (birthdate) => {
    if (!birthdate) return '';
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  // Mock data - replace with API calls in a real application
  useEffect(() => {
  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${yourToken}`, // Optional
        },
      });

      const data = await response.json();
      console.log("Fetched data:", data);

      if (data.success && Array.isArray(data.data)) {
        setCustomers(data.data); // ✅ set only the array
      } else {
        console.error("Unexpected API response:", data);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  fetchCustomers();
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

  const startEditing = (customer) => {
    setEditingId(customer.id);
    setFormData({
  id: customer.id || '',
  fullName: customer.fullName || '',
  email: customer.email || '',
  address: customer.address || '',
  birthdate: customer.birthdate || '',
  phoneNumber: customer.phoneNumber || '',
  password: customer.password || '',
  isActive: customer.isActive ?? true,
  createdAt: customer.createdAt || ''
    });
  };

  const handleUpdateCustomer = () => {
    if (formData.fullName.trim() && formData.email && formData.password) {
      setCustomers(customers.map(customer => 
        customer.id === editingId 
          ? { 
              ...customer, 
              fullName: formData.fullName,
              email: formData.email,
              address: formData.address,
              birthdate: formData.birthdate,
              phoneNumber: formData.phoneNumber,
              password: formData.password,
              isActive: formData.isActive
            } 
          : customer
      ));
      resetForm();
    }
  };

  const toggleCustomerStatus = (id) => {
    setCustomers(customers.map(customer => 
      customer.id === id ? { ...customer, isActive: !customer.isActive } : customer
    ));
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      address: '',
      birthdate: '',
      phoneNumber: '',
      password: '',
      isActive: true
    });
    setEditingId(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const filteredCustomers = customers.filter(customer =>
    customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phoneNumber.includes(searchTerm)
  );

  return (
    <div style={styles.dashboard}>
      <AdminNavbar />
      
      <div style={styles.content}>
        {/* Customers Table Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2>Customer Management</h2>
          </div>

          {/* Search Bar */}
          <div style={{ padding: '15px 20px', borderBottom: '1px solid #e0e0e0' }}>
            <div style={styles.searchContainer}>
              <FaSearch style={styles.searchIcon} />
              <input
                type="text"
                style={styles.searchInput}
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Edit Form */}
          {editingId && (
            <div style={styles.formContainer}>
              <h3 style={styles.formTitle}>Edit Customer</h3>
              <div style={styles.formGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter full name"
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter email"
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter address"
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Birthdate</label>
                  <input
                    type="date"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter phone number"
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Password</label>
                  <input
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    style={styles.input}
                    placeholder="Enter password"
                  />
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
                  Active Account
                </label>
              </div>
              <div style={styles.buttonGroup}>
                <button
                  onClick={handleUpdateCustomer}
                  style={styles.primaryButton}
                >
                  <FaCheck /> Update
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

          {/* Customers Table */}
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Customer</th>
                  <th style={styles.tableHeader}>Email</th>
                  <th style={styles.tableHeader}>Address</th>
                  <th style={styles.tableHeader}>Age</th>
                  <th style={styles.tableHeader}>Phone</th>
                  <th style={styles.tableHeader}>Password</th>
                  <th style={styles.tableHeader}>Member Since</th>
                  <th style={styles.tableHeader}>Status</th>
                  <th style={styles.tableHeader}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td style={styles.tableCell}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={styles.customerAvatar}>
                          <FaUser />
                        </div>
                        <div>
                          <div>{customer.fullName}</div>
                          <div style={{ fontSize: '12px', color: '#6c757d' }}>
                            ID: {customer.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={styles.tableCell}>{customer.email}</td>
                    <td style={styles.tableCell}>{customer.address || '-'}</td>
                    <td style={styles.tableCell}>
                      {calculateAge(customer.birthdate)} {customer.birthdate && `(${customer.birthdate})`}
                    </td>
                    <td style={styles.tableCell}>{customer.phoneNumber}</td>
                    <td style={{ ...styles.tableCell, ...styles.passwordCell }} title={customer.password}>
                      {customer.password}
                    </td>
                    <td style={styles.tableCell}>{formatDate(customer.createdAt)}</td>
                    <td style={styles.tableCell}>
                      <span style={customer.isActive ? styles.statusActive : styles.statusBlocked}>
                        {customer.isActive ? 'Active' : 'Blocked'}
                      </span>
                    </td>
                    <td style={{ ...styles.tableCell, whiteSpace: 'nowrap' }}>
                      <button
                        onClick={() => startEditing(customer)}
                        style={{...styles.actionButton, ...styles.editButton}}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => toggleCustomerStatus(customer.id)}
                        style={{
                          ...styles.actionButton,
                          ...(customer.isActive ? styles.blockButton : styles.unblockButton)
                        }}
                      >
                        {customer.isActive ? <FaLock /> : <FaUnlock />}
                        {customer.isActive ? 'Block' : 'Unblock'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomersPage;