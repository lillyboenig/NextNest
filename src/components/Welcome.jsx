import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/Logo.png';
import sophieImg from '../images/profile-card_Wolf.jpeg';
import lillyImg from '../images/profile-card_Bönig.jpg';
import elenaImg from '../images/profile-card_Müller.jpeg';

const Welcome = () => {
  const navigate = useNavigate();

  const pageWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: "'Roboto', sans-serif",
    color: '#333',
    width: '100%',
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

  const logoStyle = { height: '40px', width: 'auto' };
  const navLinkStyle = {
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: '#24295B',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    fontWeight: 'bold',
  };

  const heroSectionStyle = {
    position: 'relative',
    backgroundImage:
      "url('https://images.pexels.com/photos/41949/earth-earth-at-night-night-lights-41949.jpeg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '4rem 2rem',
    textAlign: 'center',
    color: '#fff',
    width: '100%',
  };

  const heroOverlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '3rem 2rem',
    width: '100%',
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
    width: '100%',
  };

  const heroButtonContainerStyle = { marginTop: '3rem', width: '100%' };

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

  const whySectionStyle = {
    backgroundColor: '#f9f9f9',
    padding: '3rem 2rem',
    textAlign: 'center',
    width: '100%',
  };

  const whyContainerStyle = {
    width: '100%',
  };

  const whyHeaderStyle = {
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#24295B',
    fontWeight: 'bold',
  };

  const whyParagraphStyle = {
    textAlign: 'left',
    lineHeight: 1.6,
    marginBottom: '2rem',
  };

  const profiles = [
    {
      name: 'Sophie Wolf',
      desc: '“Life is too short to live in the wrong place!”',
      imgSrc: sophieImg,
    },
    {
      name: 'Lilly Bönig',
      desc: '“In the end we only regret the chances we didn’t take.”',
      imgSrc: lillyImg,
    },
    {
      name: 'Elena Müller',
      desc: '“Alcohol is bad—except when it’s mojito, then drink mojito.”',
      imgSrc: elenaImg,
    },
  ];

  const cardsSectionStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    padding: '2rem 1rem',
    width: '100%',
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

  const cardImgStyle = { width: '100%', height: 'auto' };
  const cardContentStyle = { padding: '1rem' };
  const cardNameStyle = {
    margin: '0.5rem 0',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#000080',
  };
  const cardDescStyle = { fontSize: '0.9rem', color: '#555' };

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
    color: '#000080',
    fontWeight: 'bold',
  };

  return (
    <div style={pageWrapperStyle}>
      <header style={headerStyle}>
        <img src={logo} alt="NextNest Logo" style={logoStyle} />
        <a style={navLinkStyle} href="/login">
          Log In
        </a>
      </header>

      <section style={heroSectionStyle}>
        <div style={heroOverlayStyle}>
          <h2 style={heroTitleStyle}>WELCOME TO YOUR FUTURE NEST</h2>
          <p style={heroSubtitleStyle}>
            NextNest: Neighborhood insights that help you discover your dream home
            with advanced location-based data. Explore real, accurate data about
            schools, communities, and local amenities—empowering you to make the
            smartest decisions.
          </p>
          <div style={heroButtonContainerStyle}>
            <button style={primaryButtonStyle}>About NextNest</button>
            <button
              style={secondaryButtonStyle}
              onClick={() => navigate('/create-account')}
            >
              Create an Account
            </button>
          </div>
        </div>
      </section>

      <section style={whySectionStyle}>
        <div style={whyContainerStyle}>
          <h3 style={whyHeaderStyle}>Why NextNest?</h3>
          <p style={whyParagraphStyle}>
            <strong>Because Data Matters.</strong> At NextNest, we provide
            transparent, data-driven insights from real sources, giving you
            clarity and confidence in your property search. We understand that
            choosing your future nest is about more than just location—it’s about
            community, convenience, and peace of mind.
          </p>
          <p style={whyParagraphStyle}>
            We ensure your new neighborhood matches exactly what you’re looking
            for. From local amenities to historical market trends, our platform
            keeps you connected, informed, and prepared to make your next move
            with ease. Whether you're seeking your first home or a luxury
            upgrade, NextNest ensures every decision is well-informed and truly
            empowering.
          </p>
        </div>
      </section>

      <section style={cardsSectionStyle}>
        {profiles.map((p, i) => (
          <div key={i} style={cardStyle}>
            <img src={p.imgSrc} alt={p.name} style={cardImgStyle} />
            <div style={cardContentStyle}>
              <h4 style={cardNameStyle}>{p.name}</h4>
              <p style={cardDescStyle}>{p.desc}</p>
            </div>
          </div>
        ))}
      </section>

      <footer style={footerStyle}>
        <a href="/support" style={footerLinkStyle}>
          Support
        </a>
        <a href="/data-security" style={footerLinkStyle}>
          Data Security
        </a>
      </footer>
    </div>
  );
};

export default Welcome;
