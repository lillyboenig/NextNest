import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/Logo.png';

const AccountCreation = () => {
  const navigate = useNavigate();

  // ========================================
  // Shared “Page Wrapper”
  // ========================================
  const pageWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: "'Roboto', sans-serif",
    color: '#333',
  };

  // ========================================
  // HEADER (matches Welcome header)
  // ========================================
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

  // ========================================
  // HERO WRAPPER (background image + overlay)
  // ========================================
  const heroSectionStyle = {
    position: 'relative',
    backgroundImage:
      "url('https://images.pexels.com/photos/41949/earth-earth-at-night-night-lights-41949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    /* instead of flex:1 + display:flex */
    padding: '6rem 2rem',      // ← push content in from top & bottom
    textAlign: 'center',
    color: '#fff',
  };

  const heroOverlayStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: '3rem 2rem',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
  };


  // ========================================
  // FORM STYLES
  // ========================================
  const formTitleStyle = {
    fontSize: '2rem',
    color: '#24295B',
    textAlign: 'center',
    marginBottom: '2rem',
  };
  const formGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1.25rem',
  };
  const labelStyle = {
    marginBottom: '0.5rem',
    color: '#24295B',
    fontWeight: '500',
    fontSize: '0.95rem',
  };
  const inputStyle = {
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  };
  const createBtnStyle = {
    marginTop: '1.5rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#24295B',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    width: '100%',
  };
  // at the top, with your other style objects:
  const twoColumnRowStyle = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
  };
  const formGroupHalfStyle = {
    flex: '1 1 45%',
    display: 'flex',
    flexDirection: 'column',
  };


  // ========================================
  // FOOTER (matches Welcome footer)
  // ========================================
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

  return (
    <div style={pageWrapperStyle}>
      {/* -- HEADER -- */}
      <header style={headerStyle}>
        <img src={logo} alt="NextNest Logo" style={logoStyle} />
        <div style={hamburgerStyle} onClick={() => {/* open menu */ }}>
          <div style={hamburgerBarStyle} />
          <div style={hamburgerBarStyle} />
          <div style={hamburgerBarStyle} />
        </div>
      </header>

      {/* -- HERO/BACKGROUND + OVERLAYED FORM -- */}
      <section style={heroSectionStyle}>
        <div style={heroOverlayStyle}>
          <h2 style={formTitleStyle}>Create your Account</h2>

          {/* Row 1 */}
          <div style={twoColumnRowStyle}>
            <div style={formGroupHalfStyle}>
              <label style={labelStyle} htmlFor="name">Name</label>
              <input style={inputStyle} type="text" id="name" placeholder="Enter your name" />
            </div>
            <div style={formGroupHalfStyle}>
              <label style={labelStyle} htmlFor="firstname">First name</label>
              <input style={inputStyle} type="text" id="firstname" placeholder="Enter your first name" />
            </div>
          </div>

          {/* Row 2 */}
          <div style={twoColumnRowStyle}>
            <div style={formGroupHalfStyle}>
              <label style={labelStyle} htmlFor="mail">Mail</label>
              <input style={inputStyle} type="email" id="mail" placeholder="Enter your email" />
            </div>
            <div style={formGroupHalfStyle}>
              <label style={labelStyle} htmlFor="address">Address</label>
              <input style={inputStyle} type="text" id="address" placeholder="Enter your address" />
            </div>
          </div>

          {/* Row 3 */}
          <div style={twoColumnRowStyle}>
            <div style={formGroupHalfStyle}>
              <label style={labelStyle} htmlFor="password">Password</label>
              <input style={inputStyle} type="password" id="password" placeholder="Enter your password" />
            </div>
            <div style={formGroupHalfStyle}>
              <label style={labelStyle} htmlFor="confirmPassword">Confirm Password</label>
              <input style={inputStyle} type="password" id="confirmPassword" placeholder="Re‑enter your password" />
            </div>
          </div>

          <button
            style={createBtnStyle}
            onClick={() => navigate('/my-account', { state: { newAccount: true } })}
          >
            Create Account
          </button>
        </div>
      </section>

      {/* -- FOOTER -- */}
      <footer style={footerStyle}>
        <nav>
          <a href="/support" style={footerLinkStyle}>Support</a>
          <a href="/data-security" style={footerLinkStyle}>Data Security</a>
          <a href="/info" style={footerLinkStyle}>Info</a>
        </nav>
        <p style={{ marginTop: '0.5rem', color: '#777' }}>&copy; 2025 NextNest</p>
      </footer>
    </div>
  );
};

export default AccountCreation;
