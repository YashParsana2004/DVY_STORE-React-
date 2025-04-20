import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaTimes, FaFileAlt } from 'react-icons/fa';

const TermsConditionsPopup = ({ onClose }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const termsData = [
    {
      category: 'General Terms',
      questions: [
        {
          question: "Acceptance of Terms",
          answer: "By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part, you may not access the service."
        },
        {
          question: "Modifications",
          answer: "We reserve the right to modify these terms at any time. Your continued use after changes constitutes acceptance of the new terms."
        },
        {
          question: "Service Eligibility",
          answer: "You must be at least 18 years old to use our services. By using our services, you represent you meet all eligibility requirements."
        }
      ]
    },
    {
      category: 'User Accounts',
      questions: [
        {
          question: "Account Creation",
          answer: "You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your account credentials."
        },
        {
          question: "Account Security",
          answer: "You are responsible for all activities under your account. Notify us immediately of any unauthorized use or security breaches."
        },
        {
          question: "Account Termination",
          answer: "We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent or illegal activities."
        }
      ]
    },
    {
      category: 'Purchases & Payments',
      questions: [
        {
          question: "Pricing",
          answer: "All prices are in USD unless stated otherwise. We reserve the right to change prices at any time without notice."
        },
        {
          question: "Payment Methods",
          answer: "We accept major credit cards and PayPal. You authorize us to charge your selected payment method for all applicable fees."
        },
        {
          question: "Refunds",
          answer: "Refunds are processed according to our refund policy. Digital products may have different refund terms than physical goods."
        }
      ]
    },
    {
      category: 'Intellectual Property',
      questions: [
        {
          question: "Ownership",
          answer: "All content on our platform, including text, graphics, logos, and software, is our property or our licensors' and is protected by law."
        },
        {
          question: "License",
          answer: "We grant you a limited, non-exclusive, non-transferable license to access and use our services for personal, non-commercial purposes."
        },
        {
          question: "Restrictions",
          answer: "You may not modify, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, or sell any content."
        }
      ]
    },
    {
      category: 'User Conduct',
      questions: [
        {
          question: "Prohibited Activities",
          answer: "You agree not to engage in illegal activities, infringe on others' rights, distribute malware, or interfere with our services' operation."
        },
        {
          question: "Content Standards",
          answer: "User-generated content must not be illegal, offensive, or infringe on intellectual property rights. We may remove violating content."
        },
        {
          question: "Compliance",
          answer: "You agree to comply with all applicable laws and regulations regarding your use of our services."
        }
      ]
    },
    {
      category: 'Limitations of Liability',
      questions: [
        {
          question: "Disclaimer",
          answer: "Our services are provided 'as is' without warranties of any kind. We do not guarantee uninterrupted or error-free service."
        },
        {
          question: "Limitation",
          answer: "We shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of our services."
        },
        {
          question: "Indemnification",
          answer: "You agree to indemnify us against any claims arising from your violation of these terms or misuse of our services."
        }
      ]
    }
  ];

  // Get important terms from all categories
  const importantTerms = termsData.flatMap(category => 
    category.questions.slice(0, 2) // Take first 2 from each category
  );

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredCategories = termsData.map(category => ({
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
            <FaFileAlt style={{ color: '#3498db' }} />
            Terms & Conditions
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
            <FaFileAlt style={{
              position: 'absolute',
              left: '15px',
              color: '#95a5a6',
              fontSize: '1.1rem'
            }} />
            <input
              type="text"
              placeholder="Search Terms..."
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

        {/* Terms Content */}
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

      {/* Right Panel - Important Terms */}
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
          Important Terms
        </h3>
        <ul style={{ 
          listStyle: 'none', 
          padding: 0,
          margin: 0
        }}>
          {importantTerms.map((item, index) => (
            <li 
              key={index}
              style={{ 
                padding: '12px 0',
                borderBottom: '1px solid #eee',
                cursor: 'pointer'
              }}
              onClick={() => {
                const categoryIndex = termsData.findIndex(cat => 
                  cat.questions.some(q => q.question === item.question));
                const questionIndex = termsData[categoryIndex].questions.findIndex(
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
                <FaFileAlt style={{ 
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
          {termsData.map((category, index) => (
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

export default TermsConditionsPopup;