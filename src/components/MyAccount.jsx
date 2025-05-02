import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../images/Logo.png';
import { AuthContext } from '../context/AuthContext';

const MyAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useContext(AuthContext);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);

  useEffect(() => {
    if (location.state && location.state.newAccount) {
      setShowPreferencesModal(true);
    }
  }, [location.state]);

  // -----------------------------------
  // Page wrapper (shared)
  // -----------------------------------
  const pageWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: "'Roboto', sans-serif",
    color: '#333',
  };

  // -----------------------------------
  // HEADER (shared)
  // -----------------------------------
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 2rem',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };
  const logoStyle = { height: '40px', width: 'auto' };
  const hamburgerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    cursor: 'pointer',
  };
  const hamburgerBarStyle = {
    width: '25px',
    height: '3px',
    backgroundColor: '#24295B',
  };

  // -----------------------------------
  // HERO (background + overlay)
  // -----------------------------------
  const heroSectionStyle = {
    position: 'relative',
    backgroundImage:
      "url('https://images.pexels.com/photos/41949/earth-earth-at-night-night-lights-41949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '6rem 2rem',
    flex: 1,
  };
  const heroOverlayStyle = {
    backgroundColor: 'rgba(255,255,255,0.85)',
    padding: '3rem 2rem',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    textAlign: 'left',
  };

  // -----------------------------------
  // Content styles
  // -----------------------------------
  const greetingStyle = {
    fontSize: '2rem',
    color: '#24295B',
    marginBottom: '2rem',
    textAlign: 'center',
  };

  // grid for 2 columns × 3 rows
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem 2rem',
    marginBottom: '2rem',
  };

  const buttonStyle = {
    padding: '0.75rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#fff',
    color: '#24295B',
    fontSize: '1rem',
    cursor: 'pointer',
    width: '100%',
  };

  const extraLinksStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '2rem',
    color: '#24295B',
    fontSize: '0.9rem',
  };

  // -----------------------------------
  // FOOTER (shared)
  // -----------------------------------
  const footerStyle = {
    backgroundColor: '#fafafa',
    textAlign: 'center',
    padding: '1rem',
    borderTop: '1px solid #ccc',
  };
  const footerLinkStyle = {
    margin: '0 1rem',
    textDecoration: 'none',
    color: '#24295B',
    fontWeight: '500',
  };

  // -----------------------------------
  // MODAL (shared pattern)
  // -----------------------------------
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 1000,
  };
  const modalContentStyle = {
    position: 'relative',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '90%',
    textAlign: 'center',
  };
  const modalButtonStyle = {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#24295B',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    width: '100%',
  };
  const modalCloseButtonStyle = {
    position: 'absolute',
    top: '10px', right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
  };
  return (
    <div style={pageWrapperStyle}>
      {/* HEADER */}
      <header style={headerStyle}>
        <img src={logo} alt="NextNest Logo" style={logoStyle} />
        <div style={hamburgerStyle}>
          <div style={hamburgerBarStyle} />
          <div style={hamburgerBarStyle} />
          <div style={hamburgerBarStyle} />
        </div>
      </header>

      {/* HERO + ACCOUNT DASHBOARD */}
      <section style={heroSectionStyle}>
        <div style={heroOverlayStyle}>
          <h2 style={greetingStyle}>
            Hello, Emma!
          </h2>

          <div style={gridStyle}>
            <button style={buttonStyle} onClick={() => navigate('/preferences')}>
              Your Preferences
            </button>
            <button style={buttonStyle} onClick={() => navigate('/map')}>
              Map
            </button>
            <button style={buttonStyle} onClick={() => navigate('/recommendations')}>
              Recommendations
            </button>
            <button style={buttonStyle} onClick={() => navigate('/comparing')}>
              Comparing
            </button>
            <button style={buttonStyle} onClick={() => navigate('/favourites')}>
              Favourites
            </button>
            <button style={buttonStyle} onClick={() => navigate('/settings')}>
              Settings
            </button>
          </div>

          <div style={extraLinksStyle}>
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/support')}
            >
              Help – Support Service
            </span>
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => {
                logout();
                navigate('/login');
              }}
            >
              Log out
            </span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={footerStyle}>
        <nav>
          <a href="/support" style={footerLinkStyle}>Support</a>
          <a href="/data-security" style={footerLinkStyle}>Data Security</a>
          <a href="/info" style={footerLinkStyle}>Info</a>
        </nav>
        <p style={{ marginTop: '0.5rem', color: '#777' }}>&copy; 2025 NextNest</p>
      </footer>

      {/* PREFERENCES MODAL */}
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
            <p>Please tell us your preferences so we can give you the best recommendations.</p>
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
