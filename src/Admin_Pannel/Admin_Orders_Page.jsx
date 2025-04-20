import React, { useState, useEffect } from 'react';
import AdminNavbar from './Admin_navbar';
import { FaSearch, FaEye, FaPrint, FaTruck, FaCheck, FaTimes, FaMoneyBillWave } from 'react-icons/fa';

const AdminOrdersPage = () => {
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
    statusPending: {
      color: '#ffc107',
      fontWeight: 500,
    },
    statusProcessing: {
      color: '#17a2b8',
      fontWeight: 500,
    },
    statusShipped: {
      color: '#007bff',
      fontWeight: 500,
    },
    statusDelivered: {
      color: '#28a745',
      fontWeight: 500,
    },
    statusCancelled: {
      color: '#dc3545',
      fontWeight: 500,
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
    viewButton: {
      color: '#17a2b8',
    },
    printButton: {
      color: '#6c757d',
    },
    filterContainer: {
      display: 'flex',
      gap: '15px',
      marginBottom: '20px',
      flexWrap: 'wrap',
    },
    filterButton: {
      padding: '8px 15px',
      borderRadius: '4px',
      border: '1px solid #e0e0e0',
      backgroundColor: '#fff',
      cursor: 'pointer',
      fontSize: '14px',
    },
    filterButtonActive: {
      backgroundColor: '#28a745',
      color: '#fff',
      borderColor: '#28a745',
    },
    orderBadge: {
      padding: '3px 8px',
      borderRadius: '4px',
      fontWeight: 500,
      display: 'inline-block',
    },
  };

  // State management
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mock data - replace with API calls in a real application
  useEffect(() => {
    const mockOrders = [
      {
        id: 'ORD-1001',
        customer: 'John Doe',
        date: '2023-06-15T10:30:00',
        items: 3,
        amount: 125.99,
        paymentMethod: 'Credit Card',
        status: 'processing',
        shippingAddress: '123 Main St, Anytown, USA'
      },
      {
        id: 'ORD-1002',
        customer: 'Jane Smith',
        date: '2023-06-14T15:45:00',
        items: 5,
        amount: 234.50,
        paymentMethod: 'PayPal',
        status: 'shipped',
        shippingAddress: '456 Oak Ave, Somewhere, USA'
      },
      {
        id: 'ORD-1003',
        customer: 'Robert Johnson',
        date: '2023-06-13T09:15:00',
        items: 2,
        amount: 89.99,
        paymentMethod: 'Credit Card',
        status: 'delivered',
        shippingAddress: '789 Pine Rd, Nowhere, USA'
      },
      {
        id: 'ORD-1004',
        customer: 'Emily Davis',
        date: '2023-06-12T14:20:00',
        items: 1,
        amount: 45.25,
        paymentMethod: 'Debit Card',
        status: 'pending',
        shippingAddress: '321 Elm Blvd, Anycity, USA'
      },
      {
        id: 'ORD-1005',
        customer: 'Michael Wilson',
        date: '2023-06-11T11:10:00',
        items: 4,
        amount: 176.80,
        paymentMethod: 'Credit Card',
        status: 'cancelled',
        shippingAddress: '654 Maple Ln, Somecity, USA'
      },
    ];
    setOrders(mockOrders);
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter orders by status and search term
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  // Status filter options
  const statusFilters = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  // Get status style
  const getStatusStyle = (status) => {
    switch(status) {
      case 'pending': return styles.statusPending;
      case 'processing': return styles.statusProcessing;
      case 'shipped': return styles.statusShipped;
      case 'delivered': return styles.statusDelivered;
      case 'cancelled': return styles.statusCancelled;
      default: return {};
    }
  };

  return (
    <div style={styles.dashboard}>
      <AdminNavbar />
      
      <div style={styles.content}>
        {/* Orders Table Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2>Order Management</h2>
          </div>

          {/* Search and Filters */}
          <div style={{ padding: '15px 20px', borderBottom: '1px solid #e0e0e0' }}>
            <div style={styles.searchContainer}>
              <FaSearch style={styles.searchIcon} />
              <input
                type="text"
                style={styles.searchInput}
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div style={styles.filterContainer}>
              {statusFilters.map(filter => (
                <button
                  key={filter.value}
                  style={{
                    ...styles.filterButton,
                    ...(statusFilter === filter.value ? styles.filterButtonActive : {})
                  }}
                  onClick={() => setStatusFilter(filter.value)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Table */}
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Order ID</th>
                  <th style={styles.tableHeader}>Customer</th>
                  <th style={styles.tableHeader}>Date</th>
                  <th style={styles.tableHeader}>Items</th>
                  <th style={styles.tableHeader}>Amount</th>
                  <th style={styles.tableHeader}>Payment</th>
                  <th style={styles.tableHeader}>Status</th>
                  <th style={styles.tableHeader}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td style={styles.tableCell}>
                      <strong>{order.id}</strong>
                    </td>
                    <td style={styles.tableCell}>{order.customer}</td>
                    <td style={styles.tableCell}>{formatDate(order.date)}</td>
                    <td style={styles.tableCell}>{order.items}</td>
                    <td style={styles.tableCell}>${order.amount.toFixed(2)}</td>
                    <td style={styles.tableCell}>{order.paymentMethod}</td>
                    <td style={styles.tableCell}>
                      <span style={getStatusStyle(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td style={{ ...styles.tableCell, whiteSpace: 'nowrap' }}>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        style={{...styles.actionButton, ...styles.viewButton}}
                      >
                        <FaEye /> View
                      </button>
                      <button
                        style={{...styles.actionButton, ...styles.printButton}}
                      >
                        <FaPrint /> Invoice
                      </button>
                      {order.status === 'pending' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'processing')}
                          style={{...styles.actionButton, color: '#17a2b8'}}
                        >
                          <FaCheck /> Process
                        </button>
                      )}
                      {order.status === 'processing' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'shipped')}
                          style={{...styles.actionButton, color: '#007bff'}}
                        >
                          <FaTruck /> Ship
                        </button>
                      )}
                      {order.status === 'pending' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'cancelled')}
                          style={{...styles.actionButton, color: '#dc3545'}}
                        >
                          <FaTimes /> Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Modal - would be implemented in a real app */}
        {selectedOrder && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}>
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              padding: '20px',
              width: '80%',
              maxWidth: '800px',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                borderBottom: '1px solid #e0e0e0',
                paddingBottom: '10px',
              }}>
                <h3>Order Details: {selectedOrder.id}</h3>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    fontSize: '20px',
                    cursor: 'pointer',
                  }}
                >
                  &times;
                </button>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '20px',
              }}>
                <div>
                  <h4 style={{ marginBottom: '10px' }}>Customer Information</h4>
                  <p><strong>Name:</strong> {selectedOrder.customer}</p>
                  <p><strong>Order Date:</strong> {formatDate(selectedOrder.date)}</p>
                  <p><strong>Status:</strong> 
                    <span style={getStatusStyle(selectedOrder.status)}>
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </span>
                  </p>
                </div>
                <div>
                  <h4 style={{ marginBottom: '10px' }}>Shipping Information</h4>
                  <p><strong>Address:</strong> {selectedOrder.shippingAddress}</p>
                  <p><strong>Shipping Method:</strong> Standard Shipping</p>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ marginBottom: '10px' }}>Payment Information</h4>
                <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                <p><strong>Total Amount:</strong> ${selectedOrder.amount.toFixed(2)}</p>
              </div>

              <div>
                <h4 style={{ marginBottom: '10px' }}>Order Items</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                      <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Product</th>
                      <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Price</th>
                      <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Quantity</th>
                      <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Mock order items - in a real app this would come from the order data */}
                    <tr>
                      <td style={{ padding: '10px', borderBottom: '1px solid #e0e0e0' }}>Product Name 1</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid #e0e0e0' }}>$29.99</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid #e0e0e0' }}>1</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid #e0e0e0' }}>$29.99</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '10px', borderBottom: '1px solid #e0e0e0' }}>Product Name 2</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid #e0e0e0' }}>$49.99</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid #e0e0e0' }}>2</td>
                      <td style={{ padding: '10px', borderBottom: '1px solid #e0e0e0' }}>$99.98</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  style={{
                    backgroundColor: '#6c757d',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                >
                  <FaPrint /> Print Invoice
                </button>
                <button
                  style={{
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedOrder(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;