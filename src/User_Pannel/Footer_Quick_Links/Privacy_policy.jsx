import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaTimes, FaLock, FaSearch } from 'react-icons/fa';

const PrivacyPolicyPopup = ({ onClose }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const privacyData = [
    {
      category: 'Information Collection',
      questions: [
        {
          question: "What information do we collect?",
          answer: "We collect personal information you provide when creating an account, making purchases, or contacting support. This includes name, email, shipping address, and payment details."
        },
        {
          question: "Do we collect usage data?",
          answer: "Yes, we automatically collect usage data like IP addresses, browser type, pages visited, and timestamps to improve our services and analyze trends."
        },
        {
          question: "How do we use cookies?",
          answer: "We use cookies to remember preferences, analyze site usage, and personalize content. You can manage cookie preferences in your browser settings."
        }
      ]
    },
    {
      category: 'Data Usage',
      questions: [
        {
          question: "How is my information used?",
          answer: "Your data is used to process orders, provide customer support, improve our services, prevent fraud, and send service-related communications."
        },
        {
          question: "Do we share data with third parties?",
          answer: "We only share data with trusted service providers necessary for operations (payment processors, shipping carriers), and only to the extent required."
        },
        {
          question: "Is my data used for marketing?",
          answer: "We may use your contact information to send promotional offers, but only with your consent. You can opt-out anytime through your account settings."
        }
      ]
    },
    {
      category: 'Data Protection',
      questions: [
        {
          question: "How is my data secured?",
          answer: "We implement industry-standard security measures including encryption, secure servers, and regular security audits to protect your information."
        },
        {
          question: "What are my rights?",
          answer: "You have rights to access, correct, or delete your personal data. You may also request data portability or restrict processing in certain circumstances."
        },
        {
          question: "How long is data retained?",
          answer: "We retain personal data only as long as necessary for the purposes collected, or as required by law. Transaction data is typically kept for 7 years."
        }
      ]
    },
    {
      category: 'Third Parties',
      questions: [
        {
          question: "Do we sell data?",
          answer: "We never sell your personal information to third parties. Data is only shared with service providers essential to our operations under strict confidentiality."
        },
        {
          question: "What about external links?",
          answer: "Our site may contain links to third-party websites. We're not responsible for their privacy practices and encourage reviewing their policies."
        },
        {
          question: "International data transfers?",
          answer: "Your information may be transferred to and processed in countries outside your own, but we ensure adequate protection through standard contractual clauses."
        }
      ]
    },
    {
      category: 'Policy Updates',
      questions: [
        {
          question: "How are changes communicated?",
          answer: "We'll notify you of significant changes via email or prominent website notices. The 'Last Updated' date at the bottom will reflect the current version."
        },
        {
          question: "How can I review changes?",
          answer: "The current policy is always available on our website. Previous versions are archived and available upon request."
        },
        {
          question: "What if I disagree with changes?",
          answer: "If you disagree with material changes, you may close your account. Continued use after changes constitutes acceptance of the new policy."
        }
      ]
    }
  ];

  // Get key privacy points from all categories
  const keyPrivacyPoints = privacyData.flatMap(category => 
    category.questions.slice(0, 2) // Take first 2 from each category
  );

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredCategories = privacyData.map(category => ({
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
            <FaLock style={{ color: '#3498db' }} />
            Privacy Policy
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
              placeholder="Search Privacy Policy..."
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

        {/* Privacy Content */}
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

      {/* Right Panel - Key Privacy Points */}
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
          Key Privacy Points
        </h3>
        <ul style={{ 
          listStyle: 'none', 
          padding: 0,
          margin: 0
        }}>
          {keyPrivacyPoints.map((item, index) => (
            <li 
              key={index}
              style={{ 
                padding: '12px 0',
                borderBottom: '1px solid #eee',
                cursor: 'pointer'
              }}
              onClick={() => {
                const categoryIndex = privacyData.findIndex(cat => 
                  cat.questions.some(q => q.question === item.question));
                const questionIndex = privacyData[categoryIndex].questions.findIndex(
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
                <FaLock style={{ 
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
          Policy Sections
        </h3>
        <ul style={{ 
          listStyle: 'none', 
          padding: 0,
          margin: 0
        }}>
          {privacyData.map((category, index) => (
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

        <div style={{ 
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f1f8fe',
          borderRadius: '8px'
        }}>
          <p style={{ margin: 0, color: '#7f8c8d', fontSize: '0.9rem' }}>
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPopup;