import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/Logo.png';
import elenaImg from '../images/profile-card_Müller.jpeg';
import sophieImg from '../images/profile-card_Wolf.jpeg';
import lillyImg from '../images/profile-card_Bönig.jpg';
import placeholderImg from '../images/placeholder.jpg';

const Welcome = () => {
  const navigate = useNavigate();

  // =========================
  // General Page Layout
  // =========================
  const pageWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: "'Roboto', sans-serif",
    color: '#333',
  };

  // =========================
  // HEADER STYLES
  // =========================
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 2rem',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const logoStyle = {
    height: '40px',
    width: 'auto',
  };

  const navLinkStyle = {
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: '#24295B', // navy
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  };

  // Hover effect (if you add a class or style for hover in an external CSS, omit here)
  // For inline style, you'd handle it via a mouse event or styled-components.
  
  // =========================
  // HERO SECTION STYLES
  // =========================
  // Use the image from your design as the hero background
  // (replace the placeholder URL with the actual path/URL to your hero image).
  const heroSectionStyle = {
    position: 'relative',
    backgroundImage: "url('https://images.pexels.com/photos/41949/earth-earth-at-night-night-lights-41949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')", 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '4rem 2rem',
    textAlign: 'center',
    color: '#fff',
  };

  const heroOverlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '3rem 2rem',
  };

  const heroTitleStyle = {
    fontSize: '2.5rem',
    margin: '0 0 1rem',
    fontWeight: 'bold',
  };

  const heroSubtitleStyle = {
    fontSize: '1.25rem',
    margin: '0 auto 2rem',
    maxWidth: '700px',
    lineHeight: 1.6,
  };

  const heroButtonContainerStyle = {
    marginTop: '3rem',
  };

  const primaryButtonStyle = {
    backgroundColor: '#24295B', 
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    marginRight: '1rem',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '1rem',
  };

  const secondaryButtonStyle = {
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '1rem',
  };

  // =========================
  // WHY NEXTNEST SECTION
  // =========================
  const whyNextNestSectionStyle = {
    backgroundColor: '#f9f9f9',
    padding: '3rem 2rem',
    textAlign: 'center',
  };

  const whyNextNestContainerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
  };

  const whyNextNestHeaderStyle = {
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#24295B',
    fontWeight: 'bold',
  };

  const whyNextNestParagraphStyle = {
    textAlign: 'left',
    lineHeight: 1.6,
    marginBottom: '2rem',
  };

  // =========================
  // PROFILE CARDS SECTION
  // =========================

  const profiles = [
    {
      name: 'Sophie Wolf',
      desc: '“Life is to short to live at the wrong place!”',
      imgSrc: sophieImg,
    },
    {
      name: 'Lilly Bönig',
      desc: '“In the end we only regret the chances we didn’t take”',
      imgSrc: lillyImg,
    },
    {
      name: 'Henna Törmänen',
      desc: '“Some random Quote of the person”',
      imgSrc: placeholderImg,
    },
    {
      name: 'Elena Müller',
      desc: '“Alcohol is bad. Except of when you get mojito then drink mojito”',
      imgSrc: elenaImg,
    },
  ];
  
  const profileCardsSectionStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    padding: '2rem 1rem',
    maxWidth: '1100px',
    margin: '0 auto',
  };

  const cardStyle = {
    flex: '1 1 200px',
    maxWidth: '220px',
    margin: '1rem',
    backgroundColor: '#fff',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    borderRadius: '6px',
    overflow: 'hidden',
  };

  const cardImgStyle = {
    width: '100%',
    height: 'auto',
  };

  const cardContentStyle = {
    padding: '1rem',
  };

  const cardNameStyle = {
    margin: '0.5rem 0',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#000080',
  };

  const cardDescStyle = {
    fontSize: '0.9rem',
    color: '#555',
  };

  // =========================
  // FOOTER STYLES
  // =========================
  const footerStyle = {
    backgroundColor: '#fafafa',
    textAlign: 'center',
    padding: '1rem',
    borderTop: '1px solid #ccc',
  };

  const footerLinkStyle = {
    margin: '0 1rem',
    textDecoration: 'none',
    color: '#000080',
    fontWeight: 'bold',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* HEADER */}
      <header style={headerStyle}>
        <div className="logo">
          {/* Replace the text with an image */}
          <img src={logo} alt="NextNest Logo" style={logoStyle} />
        </div>
        <nav>
          <a style={navLinkStyle} href="/login">
            Log In
          </a>
        </nav>
      </header>

      {/* =========================================
          HERO SECTION
      ========================================= */}
      <section style={heroSectionStyle}>
        <div style={heroOverlayStyle}>
          <h2 style={heroTitleStyle}>WELCOME TO YOUR FUTURE NEST</h2>
          <p style={heroSubtitleStyle}>
            NextNest: Neighborhood insights that help you discover your dream home with
            advanced location-based data. Explore real, accurate data about schools,
            communities, and local amenities—empowering you to make the smartest decisions.
          </p>
          <div style={heroButtonContainerStyle}>
            {/* Example button for "More About Us" – you can link this wherever you'd like */}
            <button style={primaryButtonStyle}>About NextNest</button>
            <button style={secondaryButtonStyle} onClick={() => navigate('/create-account')}>
              Create an Account
            </button>
          </div>
        </div>
      </section>

      {/* =========================================
          WHY NEXTNEST SECTION
      ========================================= */}
      <section style={whyNextNestSectionStyle}>
        <div style={whyNextNestContainerStyle}>
          <h3 style={whyNextNestHeaderStyle}>Why NextNest?</h3>
          <p style={whyNextNestParagraphStyle}>
            <strong>Because Data Matters.</strong> At NextNest, we provide transparent data-driven
            insights from real sources, giving you clarity and confidence in your property search. We
            understand that choosing your future nest is about more than just location; it’s about
            community, convenience, and peace of mind.
          </p>
          <p style={whyNextNestParagraphStyle}>
            We ensure your new neighborhood matches exactly what you’re looking for. From local
            amenities to historical market trends, our platform keeps you connected, informed, and
            prepared to make your next move with ease. Whether you're seeking your first home or a
            luxury upgrade, NextNest ensures every decision is well-informed and truly empowering.
          </p>
        </div>
      </section>

      {/* =========================================
          PROFILE CARDS SECTION
      ========================================= */}
      <section style={profileCardsSectionStyle}>
      {profiles.map((person, idx) => (
  <div key={idx} style={cardStyle}>
    <img
      style={cardImgStyle}
      src={person.imgSrc}
      alt={person.name}
    />
    <div style={cardContentStyle}>
      <h4 style={cardNameStyle}>{person.name}</h4>
      <p style={cardDescStyle}>{person.desc}</p>
    </div>
  </div>
))}

      </section>

      {/* =========================================
          FOOTER
      ========================================= */}
      <footer style={footerStyle}>
        <div>
          <a href="/support" style={footerLinkStyle}>
            Support
          </a>
          <a href="/data-security" style={footerLinkStyle}>
            Data Security
          </a>
        </div>
        <p style={{ marginTop: '0.5rem', color: '#777' }}>&copy; 2025 NextNest</p>
      </footer>
    </div>
  );
};

export default Welcome;
