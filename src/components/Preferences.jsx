// src/components/Preferences.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/Logo.png';

const Preferences = () => {
  const navigate = useNavigate();

  const questions = [
    'Which area or neighborhood are you most interested in?',
    'Do you have children, or are you planning to have children soon?',
    'What is your preferred mode of transportation?',
    'Which hobbies or activities matter most to you?',
    'What is your household’s combined annual income?',
  ];

  // helper to generate varied confirmations
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

  // chat state
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Welcome! We’ll ask a few quick questions to personalize NextNest for you.' },
    { sender: 'bot', text: questions[0] },
  ]);
  const [step, setStep] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');

  // refs for input focus and container scroll
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // focus + scroll chat container
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

    // 1) user bubble
    setMessages(m => [...m, { sender: 'user', text: ans }]);
    setCurrentAnswer('');

    // 2) dynamic confirmation
    setTimeout(() => {
      setMessages(m => [...m, { sender: 'bot', text: getConfirmation(ans) }]);
    }, 200);

    // 3) next question or final
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
      }, 600);
      setStep(s => s + 1);
    }
  };

  // === Styles ===
  const pageWrapper = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: "'Roboto', sans-serif",
    color: '#333',
  };
  const header = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 2rem',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };
  const hero = {
    position: 'relative',
    backgroundImage:
      "url('https://images.pexels.com/photos/41949/earth-earth-at-night-night-lights-41949.jpeg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flex: 1,
    padding: '6rem 2rem',
  };
  const overlay = {
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
  const title = {
    fontSize: '1.75rem',
    color: '#24295B',
    textAlign: 'center',
    marginBottom: '1rem',
  };
  const chatContainer = {
    flex: 1,
    overflowY: 'auto',
    padding: '0.5rem 0',
    display: 'flex',
    flexDirection: 'column',
  };
  const bubbleBase = {
    maxWidth: '80%',
    padding: '0.75rem 1rem',
    borderRadius: '16px',
    margin: '0.5rem 0',
    lineHeight: 1.4,
  };
  const botBubble = {
    ...bubbleBase,
    backgroundColor: '#24295B',
    color: '#fff',
    alignSelf: 'flex-start',
  };
  const userBubble = {
    ...bubbleBase,
    backgroundColor: '#999999',
    color: '#fff',
    alignSelf: 'flex-end',
  };
  const form = {
    display: 'flex',
    borderTop: '1px solid #ccc',
    paddingTop: '0.75rem',
  };
  const input = {
    flex: 1,
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };
  const sendBtn = {
    marginLeft: '0.5rem',
    padding: '0.75rem 1rem',
    backgroundColor: '#24295B',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };
  const finalBtns = {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '1rem',
  };
  const finalBtn = {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#24295B',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };
  const footer = {
    backgroundColor: '#fafafa',
    textAlign: 'center',
    padding: '1rem',
    borderTop: '1px solid #ccc',
  };

  // === Render ===
  return (
    <div style={pageWrapper}>
      <header style={header}>
        <img src={logo} alt="NextNest Logo" style={{ height: '40px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, cursor: 'pointer' }}>
          <div style={{ width: 25, height: 3, backgroundColor: '#24295B' }} />
          <div style={{ width: 25, height: 3, backgroundColor: '#24295B' }} />
          <div style={{ width: 25, height: 3, backgroundColor: '#24295B' }} />
        </div>
      </header>

      <section style={hero}>
        <div style={overlay}>
          <h2 style={title}>Setting Your Preferences</h2>

          <div style={chatContainer} ref={chatContainerRef}>
            {messages.map((m, i) => (
              <div key={i} style={m.sender === 'bot' ? botBubble : userBubble}>
                {m.text}
              </div>
            ))}
          </div>

          {step > questions.length ? null : step === questions.length ? (
            <div style={finalBtns}>
              <button style={finalBtn} onClick={() => navigate('/my-account')}>
                Go to My Account
              </button>
              <button style={finalBtn} onClick={() => navigate('/map')}>
                Go to Map
              </button>
            </div>
          ) : (
            <form style={form} onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                style={input}
                type="text"
                value={currentAnswer}
                onChange={e => setCurrentAnswer(e.target.value)}
                placeholder="Type your answer…"
              />
              <button style={sendBtn} type="submit">Send</button>
            </form>
          )}
        </div>
      </section>

      <footer style={footer}>
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
