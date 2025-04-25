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

  // === Styles ===
  const pageWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%',
    fontFamily: "'Roboto', sans-serif",
    color: '#333',
  };
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px',
    padding: '0 2rem',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    width: '100%',
  };
  const heroSectionStyle = {
    position: 'relative',
    backgroundImage:
      "url('https://images.pexels.com/photos/41949/earth-earth-at-night-night-lights-41949.jpeg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '6rem 2rem',
    flex: 1,
    width: '100%',
  };
  const heroOverlayStyle = {
    backgroundColor: 'rgba(255,255,255,0.85)',
    padding: '3rem 2rem',
    borderRadius: '8px',
    width: '100%',
    boxSizing: 'border-box',
  };

  const formTitleStyle = {
    fontSize: '2rem',
    color: '#24295B',
    textAlign: 'center',
    marginBottom: '2rem',
  };
  const twoColumnRowStyle = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem',
    width: '100%',
  };
  const formGroupHalfStyle = {
    flex: '1 1 0',
    display: 'flex',
    flexDirection: 'column',
  };
  const formGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1.25rem',
    width: '100%',
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
    width: '100%',
    boxSizing: 'border-box',
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
  const footerStyle = {
    backgroundColor: '#fafafa',
    textAlign: 'center',
    padding: '1rem',
    borderTop: '1px solid #ccc',
    width: '100%',
  };
  const footerLinkStyle = {
    margin: '0 1rem',
    textDecoration: 'none',
    color: '#24295B',
    fontWeight: '500',
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