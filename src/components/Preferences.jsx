import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../images/Logo.png';

const Preferences = () => {
  const navigate = useNavigate();
  const { updatePreferences } = useContext(AuthContext);

  const questions = [
    'Which area or neighborhood are you most interested in?',
    'Do you have children, or are you planning to have children soon?',
    'What is your preferred mode of transportation?',
    'Which hobbies or activities matter most to you?',
    'What is your household’s combined annual income?',
  ];

  const getConfirmation = answer => {
    const templates = [
      `Got it—"${answer}"!`,
      `Thanks, I've noted: "${answer}".`,
      `Interesting, you said "${answer}".`,
      `"${answer}" sounds perfect.`,
      `Perfect, "${answer}" it is!`,
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  };

  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Welcome! We’ll ask a few quick questions to personalize NextNest for you.' },
    { sender: 'bot', text: questions[0] },
  ]);
  const [step, setStep] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const answersRef = useRef([]);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = e => {
    e.preventDefault();
    const ans = currentAnswer.trim();
    if (!ans) return;

    answersRef.current.push(ans);
    setMessages(m => [...m, { sender: 'user', text: ans }]);
    setCurrentAnswer('');

    setTimeout(() => {
      setMessages(m => [...m, { sender: 'bot', text: getConfirmation(ans) }]);
    }, 200);

    if (step + 1 < questions.length) {
      setTimeout(() => {
        setMessages(m => [...m, { sender: 'bot', text: questions[step + 1] }]);
      }, 600);
      setStep(s => s + 1);
    } else {
      setTimeout(() => {
        setMessages(m => [
          ...m,
          { sender: 'bot', text: 'Fantastic—everything is set! Ready to explore your personalized NextNest.' },
        ]);

        const [ area, kids, transport, hobbies, inc ] = answersRef.current;
        updatePreferences({
          area,
          children: parseInt(kids, 10) || 0,
          transport,
          hobbies: hobbies.split(/,\s*/),
          income: parseInt(inc.replace(/\D/g, ''), 10),
        });
        //navigate('/my-account');
      }, 600);
      setStep(s => s + 1);
    }
  };

  // === Styles ===
  const pageWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: "'Roboto', sans-serif",
    color: '#333',
  };
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 2rem',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };
  const heroSectionStyle = {
    position: 'relative',
    backgroundImage:
      "url('https://images.pexels.com/photos/41949/earth-earth-at-night-night-lights-41949.jpeg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flex: 1,
    padding: '6rem 2rem',
  };
  const overlayStyle = {
    backgroundColor: 'rgba(255,255,255,0.9)',
    border: '2px solid #24295B',
    borderRadius: '8px',
    padding: '2rem 1.5rem',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    height: '75vh',
    boxSizing: 'border-box',
  };
  const titleStyle = {
    fontSize: '1.75rem',
    color: '#24295B',
    textAlign: 'center',
    marginBottom: '1rem',
  };
  const chatContainerStyle = {
    flex: 1,
    overflowY: 'auto',
    padding: '0.5rem 0',
    display: 'flex',
    flexDirection: 'column',
  };
  const bubbleBaseStyle = {
    maxWidth: '80%',
    padding: '0.75rem 1rem',
    borderRadius: '16px',
    margin: '0.5rem 0',
    lineHeight: 1.4,
  };
  const botBubbleStyle = {
    ...bubbleBaseStyle,
    backgroundColor: '#24295B',
    color: '#fff',
    alignSelf: 'flex-start',
  };
  const userBubbleStyle = {
    ...bubbleBaseStyle,
    backgroundColor: '#999999',
    color: '#fff',
    alignSelf: 'flex-end',
  };
  const formStyle = {
    display: 'flex',
    borderTop: '1px solid #ccc',
    paddingTop: '0.75rem',
  };
  const inputStyle = {
    flex: 1,
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };
  const sendBtnStyle = {
    marginLeft: '0.5rem',
    padding: '0.75rem 1rem',
    backgroundColor: '#24295B',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };
  const finalBtnsStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '1rem',
  };
  const finalBtnStyle = {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#24295B',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };
  const footerStyle = {
    backgroundColor: '#fafafa',
    textAlign: 'center',
    padding: '1rem',
    borderTop: '1px solid #ccc',
  };

  return (
    <div style={pageWrapperStyle}>
      <header style={headerStyle}>
        <img src={logo} alt="NextNest Logo" style={{ height: '40px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, cursor: 'pointer' }}>
          <div style={{ width: 25, height: 3, backgroundColor: '#24295B' }} />
          <div style={{ width: 25, height: 3, backgroundColor: '#24295B' }} />
          <div style={{ width: 25, height: 3, backgroundColor: '#24295B' }} />
        </div>
      </header>

      <section style={heroSectionStyle}>
        <div style={overlayStyle}>
          <h2 style={titleStyle}>Setting Your Preferences</h2>

          <div style={chatContainerStyle} ref={chatContainerRef}>
            {messages.map((m, i) => (
              <div key={i} style={m.sender === 'bot' ? botBubbleStyle : userBubbleStyle}>
                {m.text}
              </div>
            ))}
          </div>

          {step === questions.length ? (
            <div style={finalBtnsStyle}>
              <button style={finalBtnStyle} onClick={() => navigate('/my-account')}>
                Go to My Account
              </button>
              <button style={finalBtnStyle} onClick={() => navigate('/map')}>
                Go to Map
              </button>
            </div>
          ) : (
            <form style={formStyle} onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                style={inputStyle}
                type="text"
                value={currentAnswer}
                onChange={e => setCurrentAnswer(e.target.value)}
                placeholder="Type your answer…"
              />
              <button style={sendBtnStyle} type="submit">
                Send
              </button>
            </form>
          )}
        </div>
      </section>

      <footer style={footerStyle}>
        <nav>
          <a href="/support" style={{ margin: '0 1rem', color: '#24295B' }}>Support</a>
          <a href="/data-security" style={{ margin: '0 1rem', color: '#24295B' }}>Data Security</a>
          <a href="/info" style={{ margin: '0 1rem', color: '#24295B' }}>Info</a>
        </nav>
        <p style={{ color: '#777', marginTop: '0.5rem' }}>&copy; 2025 NextNest</p>
      </footer>
    </div>
  );
};

export default Preferences;
