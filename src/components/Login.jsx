import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/Logo.png';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const ok = login(email.trim(), password);
    if (!ok) {
      setError('Invalid email or password');
      return;
    }
    navigate('/my-account');
  };

  return (
    <div style={pageWrapperStyle}>
      <header style={headerStyle}>
        <img src={logo} alt="NextNest Logo" style={logoStyle} />
        {/* hamburger */}
      </header>
      <section style={heroSectionStyle}>
        <div style={heroOverlayStyle}>
          <h2 style={formTitleStyle}>Login</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div style={formGroupStyle}>
              <label style={labelStyle} htmlFor="email">Your E‑Mail:</label>
              <input
                style={inputStyle}
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="user@example.com"
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle} htmlFor="password">Your Password:</label>
              <input
                style={inputStyle}
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div style={buttonWrapperStyle}>
              <button style={buttonStyle} type="submit">
                Sign In
              </button>
            </div>
          </form>
          <div style={extraLinksStyle}>
            <p style={{ margin: 0 }}>Forgot your password?</p>
            <p style={{ margin: 0 }}>Help ‑ Support Service</p>
          </div>
        </div>
      </section>
      <footer style={footerStyle}>
        {/* … */}
      </footer>
    </div>
  );
};

export default Login;