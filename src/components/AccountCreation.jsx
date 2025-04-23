import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/Logo.png';
import { AuthContext } from '../context/AuthContext';

const AccountCreation = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const handleCreate = () => {
    if (password !== confirmPassword) {
      return alert('Passwords do not match');
    }
    register({
      email: email.trim(),
      password,
      name: `${firstName} ${name}`,
      preferences: {
        area: '',
        children: null,
        transport: '',
        hobbies: [],
        income: null,
      },
    });
    navigate('/my-account', { state: { newAccount: true } });
  };

  return (
    <div style={pageWrapperStyle}>
      <header style={headerStyle}>
        <img src={logo} alt="NextNest Logo" style={logoStyle} />
        {/* hamburger */}
      </header>

      <section style={heroSectionStyle}>
        <div style={heroOverlayStyle}>
          <h2 style={formTitleStyle}>Create your Account</h2>

          <div style={twoColumnRowStyle}>
            <div style={formGroupHalfStyle}>
              <label style={labelStyle} htmlFor="name">Name</label>
              <input
                style={inputStyle}
                type="text"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your last name"
              />
            </div>
            <div style={formGroupHalfStyle}>
              <label style={labelStyle} htmlFor="firstname">First name</label>
              <input
                style={inputStyle}
                type="text"
                id="firstname"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="Enter your first name"
              />
            </div>
          </div>

          <div style={twoColumnRowStyle}>
            <div style={formGroupHalfStyle}>
              <label style={labelStyle} htmlFor="mail">Mail</label>
              <input
                style={inputStyle}
                type="email"
                id="mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div style={formGroupHalfStyle}>
              <label style={labelStyle} htmlFor="address">Address</label>
              <input
                style={inputStyle}
                type="text"
                id="address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Enter your address"
              />
            </div>
          </div>

          <div style={twoColumnRowStyle}>
            <div style={formGroupHalfStyle}>
              <label style={labelStyle} htmlFor="password">Password</label>
              <input
                style={inputStyle}
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <div style={formGroupHalfStyle}>
              <label style={labelStyle} htmlFor="confirmPassword">Confirm Password</label>
              <input
                style={inputStyle}
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Re‑enter your password"
              />
            </div>
          </div>

          <button style={createBtnStyle} onClick={handleCreate}>
            Create Account
          </button>
        </div>
      </section>

      <footer style={footerStyle}>
        {/* … */}
      </footer>
    </div>
  );
};

export default AccountCreation;