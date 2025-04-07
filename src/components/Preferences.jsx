// src/components/Preferences.jsx
import React, { useState, useEffect } from 'react';

const Preferences = () => {
  // Question and answer options for children in the neighborhood
  const questionTitle = 'Should there be many children in the area?';
  const questionSubtitle = 'Should the neighborhood have a high share of under 15 year olds?';
  const options = ['Yes', 'No', 'Irrelevant'];

  // State to store the selected option for this question
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  // Simulate an API call that returns the percentage of under-15 year olds.
  // In a real-world scenario, you’d replace this with a fetch call.
  const [under15Percentage, setUnder15Percentage] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      // Example API response: 12.3% under 15 year olds
      setUnder15Percentage(12.3);
    }, 1000);
  }, []);

  // Function that maps percentage to a green intensity.
  // For example: <10% => low intensity, 10-15% => middle, 15-20% => high, >=20% => higher.
  const getColorForPercentage = (p) => {
    if (p < 10) return '#e0f7e9'; // low intensity green
    else if (p < 15) return '#a2d5ab'; // middle
    else if (p < 20) return '#70c188'; // high
    else return '#3ea374'; // higher
  };

  const computedColor =
    under15Percentage !== null ? getColorForPercentage(under15Percentage) : '#c8f7c5';

  // Page layout styles
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
  };

  // Header styles
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#eee',
  };

  const logoStyle = {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 'bold',
  };

  const hamburgerMenuStyle = {
    width: '30px',
    height: '30px',
    backgroundColor: '#ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  // Main content area styles
  const mainContentStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  };

  // Card styles – note the border uses the computed color.
  const cardStyle = {
    backgroundColor: '#ddd',
    padding: '2rem',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: `0 2px 5px ${computedColor}`,
    textAlign: 'center',
    border: `2px solid ${computedColor}`,
  };

  // Title/subtitle styles
  const titleStyle = {
    marginBottom: '1rem',
    fontSize: '1.3rem',
    fontWeight: 'bold',
  };

  const subtitleStyle = {
    marginBottom: '1.5rem',
    fontSize: '1rem',
    color: '#555',
  };

  // Answer option styles
  const answerListStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1.5rem',
  };

  const answerStyle = {
    padding: '0.75rem 1rem',
    marginBottom: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const selectedAnswerStyle = {
    ...answerStyle,
    backgroundColor: computedColor,
    border: `1px solid ${computedColor}`,
    color: '#fff',
  };

  // Navigation button container (optional for multi-question flow)
  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  const navButtonStyle = {
    padding: '0.75rem 1rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#333',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1rem',
    minWidth: '100px',
  };

  // Footer styles
  const footerStyle = {
    textAlign: 'center',
    padding: '1rem',
    backgroundColor: '#eee',
  };

  return (
    <div style={containerStyle}>
      {/* HEADER */}
      <header style={headerStyle}>
        <h1 style={logoStyle}>NextNest</h1>
        <div style={hamburgerMenuStyle}>
          <div style={{ width: '15px', height: '2px', backgroundColor: '#333', marginBottom: '3px' }} />
          <div style={{ width: '15px', height: '2px', backgroundColor: '#333', marginBottom: '3px' }} />
          <div style={{ width: '15px', height: '2px', backgroundColor: '#333' }} />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main style={mainContentStyle}>
        <div style={cardStyle}>
          <div style={titleStyle}>{questionTitle}</div>
          <div style={subtitleStyle}>{questionSubtitle}</div>
          <div style={answerListStyle}>
            {options.map((option, index) => {
              const isSelected = selectedOptionIndex === index;
              return (
                <div
                  key={option}
                  style={isSelected ? selectedAnswerStyle : answerStyle}
                  onClick={() => setSelectedOptionIndex(index)}
                >
                  <span>{option}</span>
                  {isSelected && <span>✓</span>}
                </div>
              );
            })}
          </div>
          <div style={buttonContainerStyle}>
            <button style={navButtonStyle} onClick={() => console.log('Previous question')}>
              Previous
            </button>
            <button style={navButtonStyle} onClick={() => console.log('Next question')}>
              Next
            </button>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={footerStyle}>
        <p>&copy; 2025 NextNest</p>
      </footer>
    </div>
  );
};

export default Preferences;
