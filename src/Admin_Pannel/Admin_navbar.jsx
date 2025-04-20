import React from 'react';
import { Link, useNavigate, useMatch } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaList, 
  FaBox, 
  FaTag, 
  FaTicketAlt, 
  FaShoppingCart, 
  FaUsers, 
  FaSignOutAlt 
} from 'react-icons/fa';

// Define styles outside the components so they can be shared
const navbarStyles = {
  navbar: {
    backgroundColor: '#fff',
    color: '#333',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 1000,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 700,
    color: '#333',
    textDecoration: 'none',
    fontSize: '1.2rem',
    gap: '0.5rem',
  },
  links: {
    display: 'flex',
    gap: '1.5rem',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    color: '#555',
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'color 0.3s',
    gap: '0.5rem',
    ':hover': {
      color: '#000',
    }
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#000',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    gap: '0.5rem',
    ':hover': {
      backgroundColor: '#333',
      transform: 'translateY(-1px)',
    }
  },
  activeLink: {
    color: '#000',
    fontWeight: 600,
  }
};

const NavItem = ({ to, icon, label }) => {
  const match = useMatch(to);
  return (
    <Link 
      to={to}
      style={{
        ...navbarStyles.link,
        ...(match ? navbarStyles.activeLink : {})
      }}
    >
      {icon} {label}
    </Link>
  );
};

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login', { replace: true });
    window.location.reload();
  };

  return (
    <nav style={navbarStyles.navbar}>
      <div style={navbarStyles.container}>
        <Link style={navbarStyles.brand} to="/admin-dashboard">
          <FaTachometerAlt /> Admin Panel
        </Link>
        
        <div style={navbarStyles.links}>
          <NavItem to="/admin/categories" icon={<FaList />} label="Categories" />
          <NavItem to="/admin/products" icon={<FaBox />} label="Products" />
          <NavItem to="/admin/discounts" icon={<FaTag />} label="Discounts" />
          <NavItem to="/admin/offers" icon={<FaTicketAlt />} label="Offers" />
          <NavItem to="/admin/orders" icon={<FaShoppingCart />} label="Orders" />
          <NavItem to="/admin/customers" icon={<FaUsers />} label="Customers" />
        </div>
        
        <button 
          onClick={handleLogout} 
          style={navbarStyles.logoutBtn}
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;