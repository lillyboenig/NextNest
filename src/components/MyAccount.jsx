// src/components/MyAccount.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MyAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);

  useEffect(() => {
    if (location.state && location.state.newAccount) {
      setShowPreferencesModal(true);
    }
  }, [location.state]);

  // Inline styles for the account page:
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    margin: 0,
    fontFamily: 'Arial, sans-serif',
  };

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

  const mainStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: '2rem',
  };

  const cardStyle = {
    backgroundColor: '#ddd',
    padding: '2rem',
    borderRadius: '8px',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    textAlign: 'center',
  };

  const greetingStyle = {
    marginBottom: '1.5rem',
    fontSize: '1.5rem',
  };

  const buttonContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
    marginBottom: '1rem',
  };

  const buttonStyle = {
    padding: '0.75rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontSize: '1rem',
  };

  const extraLinksStyle = {
    marginTop: '1rem',
    textAlign: 'center',
    fontSize: '0.9rem',
    color: '#555',
  };

  const footerStyle = {
    textAlign: 'center',
    padding: '1rem',
    backgroundColor: '#eee',
  };

  // Modal styles:
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const modalContentStyle = {
    position: 'relative',
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '90%',
    textAlign: 'center',
  };

  const modalButtonStyle = {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    width: '100%',
  };

  const modalCloseButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
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
      <main style={mainStyle}>
        <div style={cardStyle}>
          <h2 style={greetingStyle}>Hello, Matti!</h2>
          <div style={buttonContainerStyle}>
            <button style={buttonStyle} onClick={() => navigate('/preferences')}>
              Your Preferences
            </button>
            <button
              style={buttonStyle}
              onClick={() => navigate('/map')} >
              Map
            </button>
            <button style={buttonStyle}>Recommendations</button>
            <button style={buttonStyle}>Comparing</button>
            <button style={buttonStyle}>Favourites</button>
            <button style={buttonStyle}>Settings</button>
          </div>
          <div style={extraLinksStyle}>
            <p>Help - Support Service</p>
            <p>Log out</p>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={footerStyle}>
        <p>&copy; 2025 NextNest</p>
      </footer>

      {/* Modal Popup (if user is new and preferences not set) */}
      {showPreferencesModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <button
              style={modalCloseButtonStyle}
              onClick={() => setShowPreferencesModal(false)}
            >
              &times;
            </button>
            <h2>No Preferences Set</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae massa sed mauris mollis feugiat.
            </p>
            <button
              style={modalButtonStyle}
              onClick={() => {
                setShowPreferencesModal(false);
                navigate('/preferences');
              }}
            >
              Set Your Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccount;
