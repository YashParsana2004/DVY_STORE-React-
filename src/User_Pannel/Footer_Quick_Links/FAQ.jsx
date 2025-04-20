import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaTimes, FaSearch } from 'react-icons/fa';

const FAQPopup = ({ onClose }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqData = [
  {
    category: 'Account',
    questions: [
      {
        question: "How do I create an account?",
        answer: "Click on 'Sign Up' at the top right corner of the page. Fill in your details including email and password, then verify your email address to complete registration."
      },
      {
        question: "I forgot my password. How can I reset it?",
        answer: "Click 'Forgot Password' on the login page. Enter your email address and we'll send you a link to reset your password."
      },
      {
        question: "How do I update my profile information?",
        answer: "Go to 'My Account' > 'Profile Settings'. Make your changes and click 'Save'. Some changes may require verification."
      }
    ]
  },
  {
    category: 'Billing',
    questions: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for certain services."
      },
      {
        question: "How can I view my billing history?",
        answer: "Your complete billing history is available under 'Billing' in your account dashboard. You can download invoices as PDFs."
      },
      {
        question: "Why was my payment declined?",
        answer: "Common reasons include insufficient funds, expired card, or bank restrictions. Contact your bank for details or try a different payment method."
      }
    ]
  },
  {
    category: 'Features',
    questions: [
      {
        question: "How do I use the advanced search filters?",
        answer: "Click the filter icon next to the search bar. Select your criteria from the dropdown menus. You can combine multiple filters for precise results."
      },
      {
        question: "Can I customize my dashboard layout?",
        answer: "Yes! Click the gear icon in the top right of your dashboard. Drag and drop widgets to rearrange them to your preference."
      },
      {
        question: "What are keyboard shortcuts available?",
        answer: "Press '?' anytime to see available shortcuts. Common ones include Ctrl+S (Save), Ctrl+F (Find), and Esc (Close current window)."
      }
    ]
  },
  {
    category: 'Security',
    questions: [
      {
        question: "How do I enable two-factor authentication?",
        answer: "Go to 'Security Settings' and click 'Enable 2FA'. Choose between SMS or authenticator app and follow the setup instructions."
      },
      {
        question: "How can I tell if a message is really from your team?",
        answer: "Official communications will always come from our verified domain (@company.com). Never share credentials via email or messages."
      },
      {
        question: "What should I do if I suspect unauthorized access?",
        answer: "Immediately change your password and enable 2FA if not already active. Contact our security team through the emergency support channel."
      }
    ]
  },
  {
    category: 'Mobile App',
    questions: [
      {
        question: "Is there a mobile app available?",
        answer: "Yes! Our app is available for both iOS and Android. Download it from the App Store or Google Play Store."
      },
      {
        question: "How do I sync data between web and mobile?",
        answer: "All data syncs automatically when you're logged in with the same account. Make sure you have a stable internet connection."
      },
      {
        question: "Why isn't push notifications working?",
        answer: "First check notification permissions in your phone settings. Then verify they're enabled in the app's notification settings."
      }
    ]
  },
  {
    category: 'Troubleshooting',
    questions: [
      {
        question: "What should I do if the page isn't loading?",
        answer: "Try refreshing the page, clearing your browser cache, or using a different browser. If the issue persists, check our status page for outages."
      },
      {
        question: "Why am I seeing error messages?",
        answer: "Note the exact error code/message and check our error code reference guide. Temporary issues often resolve with a page refresh."
      },
      {
        question: "How do I report a bug?",
        answer: "Use the 'Report a Problem' option in the Help menu. Include screenshots and steps to reproduce the issue for faster resolution."
      }
    ]
  }
];

  // Get popular questions from all categories
  const popularQuestions = faqData.flatMap(category => 
    category.questions.slice(0, 2) // Take first 2 from each category
  );

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredCategories = faqData.map(category => ({
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
            fontWeight: 600
          }}>
            Help Center
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
              placeholder="Search FAQs..."
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

        {/* FAQ Content */}
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
                  color: '#3498db',
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

      {/* Right Panel - Popular Questions */}
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
          Popular Questions
        </h3>
        <ul style={{ 
          listStyle: 'none', 
          padding: 0,
          margin: 0
        }}>
          {popularQuestions.map((item, index) => (
            <li 
              key={index}
              style={{ 
                padding: '12px 0',
                borderBottom: '1px solid #eee',
                cursor: 'pointer'
              }}
              onClick={() => {
                const categoryIndex = faqData.findIndex(cat => 
                  cat.questions.some(q => q.question === item.question));
                const questionIndex = faqData[categoryIndex].questions.findIndex(
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
                <FaSearch style={{ 
                  color: '#95a5a6',
                  fontSize: '0.9rem'
                }} />
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
          Browse Categories
        </h3>
        <ul style={{ 
          listStyle: 'none', 
          padding: 0,
          margin: 0
        }}>
          {faqData.map((category, index) => (
            <li 
              key={index}
              style={{ 
                padding: '12px 0',
                borderBottom: '1px solid #eee',
                cursor: 'pointer'
              }}
              onClick={() => {
                setSearchTerm('');
                setTimeout(() => {
                  const element = document.getElementById(`category-${index}`);
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            >
              {category.category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FAQPopup;