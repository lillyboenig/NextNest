import React from 'react';
import { useNavigate } from 'react-router-dom';

const AccountCreation = () => {
  const navigate = useNavigate();

  // Container style for the whole page
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    margin: 0,
    fontFamily: 'Arial, sans-serif',
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

  // Main content styles (form area)
  const mainStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: '2rem',
  };

  // Form card styles
  const formCardStyle = {
    backgroundColor: '#ddd',
    padding: '2rem',
    borderRadius: '8px',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  };

  const titleStyle = {
    marginBottom: '1.5rem',
    textAlign: 'center',
    fontSize: '1.5rem',
  };

  const formGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem',
  };

  const labelStyle = {
    marginBottom: '0.3rem',
    fontWeight: 'bold',
  };

  const inputStyle = {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  };

  const buttonStyle = {
    marginTop: '1rem',
    padding: '0.75rem 1rem',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    width: '100%',
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
          {/* Hamburger icon placeholder */}
          <div style={{ width: '15px', height: '2px', backgroundColor: '#333', marginBottom: '3px' }} />
          <div style={{ width: '15px', height: '2px', backgroundColor: '#333', marginBottom: '3px' }} />
          <div style={{ width: '15px', height: '2px', backgroundColor: '#333' }} />
        </div>
      </header>

      {/* MAIN CONTENT - ACCOUNT CREATION FORM */}
      <main style={mainStyle}>
        <div style={formCardStyle}>
          <h2 style={titleStyle}>Create your Account</h2>

          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="name">
              Name
            </label>
            <input style={inputStyle} type="text" id="name" placeholder="Enter your name" />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="firstname">
              First name
            </label>
            <input style={inputStyle} type="text" id="firstname" placeholder="Enter your first name" />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="mail">
              Mail
            </label>
            <input style={inputStyle} type="email" id="mail" placeholder="Enter your email" />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="address">
              Address
            </label>
            <input style={inputStyle} type="text" id="address" placeholder="Enter your address" />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="password">
              Password
            </label>
            <input style={inputStyle} type="password" id="password" placeholder="Enter your password" />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle} htmlFor="confirmPassword">
              Password - 2
            </label>
            <input
              style={inputStyle}
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
            />
          </div>

          <button
            style={buttonStyle}
            type="button"
            onClick={() =>
                navigate('/my-account', { state: { newAccount: true } })
              }
          >
            Create Account
          </button>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={footerStyle}>
        <p>&copy; 2025 NextNest</p>
      </footer>
    </div>
  );
};

export default AccountCreation;
