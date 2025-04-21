// src/components/Login.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/Logo.png';

const Login = () => {
  const navigate = useNavigate();

  // -----------------------------------
  // Page wrapper
  // -----------------------------------
  const pageWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: "'Roboto', sans-serif",
    color: '#333',
  };

  // -----------------------------------
  // HEADER (same as other pages)
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
    textAlign: 'center',
    flex: 1,
  };
  const heroOverlayStyle = {
    backgroundColor: 'rgba(255,255,255,0.85)',
    padding: '3rem 2rem',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto',
    textAlign: 'left',
  };

  // -----------------------------------
  // Form styles
  // -----------------------------------
  const formTitleStyle = {
    fontSize: '2rem',
    color: '#24295B',
    marginBottom: '2rem',
    textAlign: 'center',
  };
  const formGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1.5rem',
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
  const buttonWrapperStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
  };
  const buttonStyle = {
    marginTop: '1rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#24295B',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  };
  const extraLinksStyle = {
    marginTop: '2rem',
    fontSize: '0.9rem',
    color: '#24295B',
    lineHeight: 1.5,
  };

  // -----------------------------------
  // FOOTER (same as other pages)
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

      {/* HERO + LOGIN FORM */}
      <section style={heroSectionStyle}>
        <div style={heroOverlayStyle}>
          <h2 style={formTitleStyle}>Login</h2>

          {/* Email */}
          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="email">Your E‑Mail:</label>
            <input
              style={inputStyle}
              type="email"
              id="email"
              placeholder="user@example.com"
            />
          </div>

          {/* Password */}
          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="password">Your Password:</label>
            <input
              style={inputStyle}
              type="password"
              id="password"
              placeholder="••••••••"
            />
          </div>

          {/* Button aligned right */}
          <div style={buttonWrapperStyle}>
            <button
              style={buttonStyle}
              onClick={() => navigate('/my-account')}
            >
              Sign In
            </button>
          </div>

          {/* Extra links under form */}
          <div style={extraLinksStyle}>
            <p style={{ margin: 0 }}>Forgot your password?</p>
            <p style={{ margin: 0 }}>Help ‑ Support Service</p>
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
    </div>
  );
};

export default Login;
