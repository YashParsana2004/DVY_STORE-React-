import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaTimes, FaTruck, FaUndo, FaSearch } from 'react-icons/fa';

const ShippingReturnsPopup = ({ onClose }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const shippingReturnsData = [
    {
      category: 'Shipping Information',
      questions: [
        {
          question: "What are your shipping options?",
          answer: "We offer standard (3-5 business days), expedited (2 business days), and overnight shipping. International shipping available to most countries."
        },
        {
          question: "How much does shipping cost?",
          answer: "Standard shipping is free for orders over $50. Expedited shipping is $9.99 and overnight is $19.99. International rates vary by destination."
        },
        {
          question: "How can I track my order?",
          answer: "You'll receive a tracking number via email when your order ships. You can track it directly on our website under 'Order Status'."
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes, we ship to over 100 countries. International orders may be subject to customs fees and import taxes which are the customer's responsibility."
        }
      ]
    },
    {
      category: 'Returns & Refunds',
      questions: [
        {
          question: "What's your return policy?",
          answer: "We accept returns within 30 days of delivery. Items must be unused, in original packaging with tags attached. Some exclusions apply."
        },
        {
          question: "How do I initiate a return?",
          answer: "Go to 'My Orders' in your account, select the item, and click 'Return'. Print the prepaid label and send it back within 7 days."
        },
        {
          question: "When will I get my refund?",
          answer: "Refunds are processed within 3-5 business days after we receive your return. It may take 1-2 billing cycles to appear on your statement."
        },
        {
          question: "Who pays for return shipping?",
          answer: "We provide free return shipping for domestic orders. International returns are the customer's responsibility unless the return is due to our error."
        }
      ]
    },
    {
      category: 'Order Processing',
      questions: [
        {
          question: "How long does order processing take?",
          answer: "Orders are typically processed within 1-2 business days. During peak seasons, processing may take 3-5 business days."
        },
        {
          question: "Can I cancel or change my order?",
          answer: "You can cancel or modify your order within 1 hour of placement by contacting customer service. After that, we cannot guarantee changes."
        },
        {
          question: "What if my order is damaged?",
          answer: "Contact us within 7 days of delivery with photos of the damage. We'll send a replacement or issue a refund once we receive the damaged item."
        }
      ]
    },
    {
      category: 'Shipping Restrictions',
      questions: [
        {
          question: "Are there items with special shipping requirements?",
          answer: "Some items like fragile goods or regulated products may have special packaging or shipping restrictions. These will be noted on the product page."
        },
        {
          question: "Do you ship to PO boxes?",
          answer: "Yes, we ship to PO boxes via standard shipping. Expedited and overnight options are not available for PO box addresses."
        },
        {
          question: "Are there shipping delays during holidays?",
          answer: "Yes, please allow extra processing and transit time during major holidays. Check our holiday shipping calendar for specific cutoff dates."
        }
      ]
    }
  ];

  // Get key shipping/return points from all categories
  const keyShippingPoints = shippingReturnsData.flatMap(category => 
    category.questions.slice(0, 2) // Take first 2 from each category
  );

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredCategories = shippingReturnsData.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      width: '90%',
      maxWidth: '900px',
      minWidth: '600px',
      height: '75vh',
      maxHeight: '85vh',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      fontFamily: '"Segoe UI", Roboto, sans-serif',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'row'
    }}>
      {/* Left Panel - Main Content */}
      <div style={{
        width: '60%',
        padding: '0',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#f8f9fa',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <h2 style={{ 
            margin: 0,
            fontSize: '1.8rem',
            color: '#2c3e50',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <FaTruck style={{ color: '#3498db' }} />
            <FaUndo style={{ color: '#e74c3c' }} />
            Shipping & Returns
          </h2>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#7f8c8d',
              transition: 'color 0.2s'
            }}
          >
            <FaTimes />
          </button>
        </div>

        {/* Search Bar */}
        <div style={{
          padding: '15px 20px',
          position: 'relative',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <FaSearch style={{
              position: 'absolute',
              left: '15px',
              color: '#95a5a6',
              fontSize: '1.1rem'
            }} />
            <input
              type="text"
              placeholder="Search Shipping & Returns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 15px 12px 40px',
                borderRadius: '30px',
                border: '1px solid #ddd',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border 0.3s'
              }}
            />
          </div>
        </div>

        {/* Shipping & Returns Content */}
        <div style={{
          padding: '10px 0',
          overflowY: 'auto',
          flex: 1
        }}>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, catIndex) => (
              <div key={catIndex} style={{ marginBottom: '20px' }}>
                <h3 style={{
                  padding: '10px 20px',
                  margin: 0,
                  fontSize: '1.2rem',
                  color: category.category.includes('Shipping') ? '#3498db' : '#e74c3c',
                  backgroundColor: '#f8f9fa',
                  position: 'sticky',
                  top: '0',
                  zIndex: 5
                }}>
                  {category.category}
                </h3>
                {category.questions.map((item, index) => (
                  <div 
                    key={index}
                    style={{
                      padding: '18px 20px',
                      borderBottom: '1px solid #f0f0f0',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onClick={() => toggleQuestion(`${catIndex}-${index}`)}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <h3 style={{ 
                        margin: 0,
                        fontSize: '1.05rem',
                        color: '#2c3e50',
                        fontWeight: 500,
                        flex: 1
                      }}>
                        {item.question}
                      </h3>
                      {activeIndex === `${catIndex}-${index}` ? (
                        <FaChevronUp style={{ color: '#7f8c8d' }} />
                      ) : (
                        <FaChevronDown style={{ color: '#7f8c8d' }} />
                      )}
                    </div>
                    {activeIndex === `${catIndex}-${index}` && (
                      <p style={{ 
                        marginTop: '12px',
                        color: '#7f8c8d',
                        lineHeight: 1.6,
                        fontSize: '0.95rem'
                      }}>
                        {item.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div style={{
              padding: '40px 20px',
              textAlign: 'center',
              color: '#95a5a6'
            }}>
              <p style={{ fontSize: '1.1rem' }}>No results found for "{searchTerm}"</p>
              <p>Try searching for something else</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Key Shipping Points */}
      <div style={{
        width: '40%',
        backgroundColor: '#f8f9fa',
        borderLeft: '1px solid #eee',
        padding: '20px',
        overflowY: 'auto'
      }}>
        <h3 style={{ 
          color: '#2c3e50', 
          marginTop: 0,
          fontSize: '1.3rem',
          paddingBottom: '10px',
          borderBottom: '1px solid #ddd'
        }}>
          Key Information
        </h3>
        <ul style={{ 
          listStyle: 'none', 
          padding: 0,
          margin: 0
        }}>
          {keyShippingPoints.map((item, index) => (
            <li 
              key={index}
              style={{ 
                padding: '12px 0',
                borderBottom: '1px solid #eee',
                cursor: 'pointer'
              }}
              onClick={() => {
                const categoryIndex = shippingReturnsData.findIndex(cat => 
                  cat.questions.some(q => q.question === item.question));
                const questionIndex = shippingReturnsData[categoryIndex].questions.findIndex(
                  q => q.question === item.question
                );
                toggleQuestion(`${categoryIndex}-${questionIndex}`);
                setSearchTerm('');
              }}
            >
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                {item.question.includes('Shipping') ? (
                  <FaTruck style={{ color: '#3498db', fontSize: '0.9rem' }} />
                ) : (
                  <FaUndo style={{ color: '#e74c3c', fontSize: '0.9rem' }} />
                )}
                <span>{item.question}</span>
              </div>
            </li>
          ))}
        </ul>
        
        <h3 style={{ 
          color: '#2c3e50',
          margin: '25px 0 10px 0',
          fontSize: '1.3rem',
          paddingBottom: '10px',
          borderBottom: '1px solid #ddd'
        }}>
          Browse Sections
        </h3>
        <ul style={{ 
          listStyle: 'none', 
          padding: 0,
          margin: 0
        }}>
          {shippingReturnsData.map((category, index) => (
            <li 
              key={index}
              style={{ 
                padding: '12px 0',
                borderBottom: '1px solid #eee',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
              onClick={() => {
                setSearchTerm('');
                setTimeout(() => {
                  const element = document.getElementById(`category-${index}`);
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            >
              {category.category.includes('Shipping') ? (
                <FaTruck style={{ color: '#3498db', fontSize: '0.9rem' }} />
              ) : (
                <FaUndo style={{ color: '#e74c3c', fontSize: '0.9rem' }} />
              )}
              {category.category}
            </li>
          ))}
        </ul>

        <div style={{ 
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f1f8fe',
          borderRadius: '8px'
        }}>
          <p style={{ margin: 0, color: '#7f8c8d', fontSize: '0.9rem' }}>
            Need help with an order? Contact us at <strong>support@example.com</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingReturnsPopup;