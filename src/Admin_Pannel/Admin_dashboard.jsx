import React, { useState } from 'react';
import AdminNavbar from './Admin_navbar';

const AdminDashboard = () => {
  // Product data with state management
  const [products, setProducts] = useState([
    { id: 1, name: 'Premium Headphones', category: 'Electronics', price: 199.99, stock: 45, status: 'Active' },
    { id: 2, name: 'Wireless Keyboard', category: 'Accessories', price: 59.99, stock: 12, status: 'Low Stock' },
    { id: 3, name: 'Smart Watch', category: 'Wearables', price: 249.99, stock: 30, status: 'Active' },
    { id: 4, name: 'Bluetooth Speaker', category: 'Audio', price: 89.99, stock: 0, status: 'Out of Stock' },
    { id: 5, name: 'USB-C Cable', category: 'Accessories', price: 12.99, stock: 78, status: 'Active' },
  ]);

  // Recent activities data
  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'Created new order', time: '2 mins ago', status: 'Completed' },
    { id: 2, user: 'Jane Smith', action: 'Updated product', time: '10 mins ago', status: 'Pending' },
    { id: 3, user: 'Admin', action: 'Deleted user', time: '25 mins ago', status: 'Completed' },
    { id: 4, user: 'System', action: 'Scheduled backup', time: '1 hour ago', status: 'Processing' },
    { id: 5, user: 'Mike Johnson', action: 'Placed order', time: '2 hours ago', status: 'Completed' },
  ];

  // Convert USD to INR (assuming 1 USD = 83 INR)
  const usdToInr = (usd) => {
    const exchangeRate = 83;
    return (usd * exchangeRate).toFixed(2);
  };

  // Update product status
  const handleStatusChange = (id, newStatus) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, status: newStatus } : product
    ));
  };

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
    statusDropdown: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      fontSize: 'inherit',
      width: '100%',
    },
    statusActive: { 
      color: '#28a745', 
      fontWeight: 500,
      backgroundColor: 'rgba(40, 167, 69, 0.1)',
      padding: '2px 8px',
      borderRadius: '4px'
    },
    statusLowStock: { 
      color: '#ffc107', 
      fontWeight: 500,
      backgroundColor: 'rgba(255, 193, 7, 0.1)',
      padding: '2px 8px',
      borderRadius: '4px'
    },
    statusOutOfStock: { 
      color: '#dc3545', 
      fontWeight: 500,
      backgroundColor: 'rgba(220, 53, 69, 0.1)',
      padding: '2px 8px',
      borderRadius: '4px'
    },
    rupeeSymbol: {
      fontWeight: 'bold',
      marginRight: '2px'
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active': return styles.statusActive;
      case 'Low Stock': return styles.statusLowStock;
      case 'Out of Stock': return styles.statusOutOfStock;
      default: return {};
    }
  };

  const getActivityStatusStyle = (status) => {
    switch (status) {
      case 'Completed': return { color: '#28a745', fontWeight: 500 };
      case 'Pending': return { color: '#ffc107', fontWeight: 500 };
      case 'Processing': return { color: '#17a2b8', fontWeight: 500 };
      default: return {};
    }
  };

  return (
    <div style={styles.dashboard}>
      <AdminNavbar />
      
      <div style={styles.content}>
        {/* Products Table */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2>Product Inventory</h2>
          </div>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>ID</th>
                  <th style={styles.tableHeader}>Product</th>
                  <th style={styles.tableHeader}>Category</th>
                  <th style={styles.tableHeader}>Price (₹)</th>
                  <th style={styles.tableHeader}>Stock</th>
                  <th style={styles.tableHeader}>Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td style={styles.tableCell}>{product.id}</td>
                    <td style={styles.tableCell}>{product.name}</td>
                    <td style={styles.tableCell}>{product.category}</td>
                    <td style={styles.tableCell}>
                      <span style={styles.rupeeSymbol}>₹</span>
                      {usdToInr(product.price)}
                    </td>
                    <td style={styles.tableCell}>{product.stock}</td>
                    <td style={styles.tableCell}>
                      <select
                        value={product.status}
                        onChange={(e) => handleStatusChange(product.id, e.target.value)}
                        style={{ 
                          ...styles.statusDropdown,
                          ...getStatusStyle(product.status) 
                        }}
                      >
                        <option value="Active">Active</option>
                        <option value="Low Stock">Low Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activities Table */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2>Recent Activities</h2>
          </div>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>ID</th>
                  <th style={styles.tableHeader}>User</th>
                  <th style={styles.tableHeader}>Action</th>
                  <th style={styles.tableHeader}>Time</th>
                  <th style={styles.tableHeader}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentActivities.map(activity => (
                  <tr key={activity.id}>
                    <td style={styles.tableCell}>{activity.id}</td>
                    <td style={styles.tableCell}>{activity.user}</td>
                    <td style={styles.tableCell}>{activity.action}</td>
                    <td style={styles.tableCell}>{activity.time}</td>
                    <td style={{ ...styles.tableCell, ...getActivityStatusStyle(activity.status) }}>
                      {activity.status}
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

export default AdminDashboard;