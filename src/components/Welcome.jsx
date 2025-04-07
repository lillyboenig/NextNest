import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  // Inline styles for all sections

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
  const navLinkStyle = {
    textDecoration: 'none',
    color: '#333',
    padding: '0.5rem 1rem',
    border: '1px solid #333',
    borderRadius: '4px',
  };

  // Hero section styles
  const heroStyle = {
    position: 'relative',
    background: "url('https://via.placeholder.com/1200x600') no-repeat center center",
    backgroundSize: 'cover',
    color: 'white',
    padding: '4rem 2rem',
    textAlign: 'center',
  };
  const heroOverlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: '2rem',
  };
  const heroContentStyle = {
    maxWidth: '800px',
    margin: '0 auto',
  };
  const heroButtonStyle = {
    margin: '0.5rem',
    padding: '0.75rem 1.5rem',
    border: 'none',
    cursor: 'pointer',
  };
  const btnPrimaryStyle = {
    ...heroButtonStyle,
    backgroundColor: '#007bff',
    color: 'white',
  };
  const btnSecondaryStyle = {
    ...heroButtonStyle,
    backgroundColor: '#6c757d',
    color: 'white',
  };
  const heroExtraTextStyle = {
    marginTop: '1rem',
    fontStyle: 'italic',
  };

  // MoreInfo section styles
  const moreInfoStyle = {
    backgroundColor: '#f9f9f9',
    padding: '2rem',
    textAlign: 'center',
  };
  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
  };

  // Profile cards section styles
  const profileCardsStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    padding: '2rem',
  };
  const cardStyle = {
    flex: '1 1 150px',
    maxWidth: '200px',
    margin: '1rem',
    textAlign: 'center',
  };
  const cardImgStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '50%',
  };

  // Footer styles
  const footerStyle = {
    backgroundColor: '#eee',
    textAlign: 'center',
    padding: '1rem',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* HEADER */}
      <header style={headerStyle}>
        <div className="logo">
          <h1 style={logoStyle}>NextNest</h1>
        </div>
        <nav>
          <a style={navLinkStyle} href="/login">
            Log In
          </a>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1 }}>
        {/* HERO SECTION */}
        <section style={heroStyle}>
          <div style={heroOverlayStyle}>
            <div style={heroContentStyle}>
              <h1>Welcome to NextNest</h1>
              <p>
                Discover a new way of connecting. Our platform offers unique solutions that bring you
                closer to what matters.
              </p>
              <div>
                <button style={btnPrimaryStyle}>More About Us</button>
                <button style={btnSecondaryStyle} onClick={() => navigate('/create-account')}>
                  Create an Account
                </button>
              </div>
              <div style={heroExtraTextStyle}>
                <p>
                  Join us today and experience a community designed with you in mind. We’re more than
                  just a website; we’re a lifestyle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MORE INFO SECTION */}
        <section style={moreInfoStyle}>
          <div style={containerStyle}>
            <h2>About NextNest</h2>
            <p>
              NextNest is dedicated to providing a seamless experience where you can connect with
              like-minded individuals. Our platform is built with the latest technologies, ensuring a
              secure and intuitive user experience. Whether you're looking for collaboration or
              community, NextNest is here to support you. Stay tuned for more features, updates, and
              exciting announcements!
            </p>
          </div>
        </section>

        {/* PROFILE CARDS SECTION */}
        <section style={profileCardsStyle}>
          {[1, 2, 3, 4].map((card) => (
            <div key={card} style={cardStyle}>
              <img style={cardImgStyle} src="https://via.placeholder.com/150" alt="Placeholder" />
              <h3>Name Name</h3>
            </div>
          ))}
        </section>
      </main>

      {/* FOOTER */}
      <footer style={footerStyle}>
        <p>&copy; 2025 NextNest</p>
      </footer>
    </div>
  );
};

export default Welcome;
