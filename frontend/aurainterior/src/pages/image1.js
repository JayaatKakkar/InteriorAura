import React from 'react';
import { Link, useNavigate, Outlet } from "react-router-dom";
const App1 = () => {
  // Button hover effect functions
  const buttonHover = (e) => {
    e.target.style.backgroundColor = '#795C34';
    e.target.style.color = 'white';
  };

  const buttonOut = (e) => {

    e.target.style.backgroundColor = 'white';
    e.target.style.color = '#B78D65';
  };

  return (
    <div style={styles.container}>
      <div style={styles.left}></div>
      <div style={styles.right}>
        <h4 style={styles.h4}>STYLE QUIZ</h4>
        <h1 style={styles.h1}>A "just for you" room design awaits.</h1>
                <Link
            to="/getstarted">
               <button
          style={buttonStyle}
          onMouseOver={buttonHover}
          onMouseOut={buttonOut}
        >
          GET STARTED
        </button>
            </Link>
       
      </div>
    </div>
  );
};

// Define the styles
const buttonStyle = {
  marginTop: '20px',
  padding: '16px 32px', // larger padding
  backgroundColor: '#B78D65',
  color: 'white',
  border: 'none',
  borderRadius: '30px',
  cursor: 'pointer',
  fontFamily: 'Playfair Display, serif',
  fontWeight: '800',
  fontSize: '20px', // larger font
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
  },
  left: {
    flex: 1,
    backgroundImage: 'url("/img/step3-9.jpg")', // Replace with your image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  right: {
    flex: 1,
    backgroundColor: '#B78D65',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '60px',
  },
  h4: {
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontFamily: 'Playfair Display, serif',
    color: '#c5ded9',
    fontSize: '30px',
  },
  h1: {
    fontSize: '70px',
    margin: '10px 0 30px',
    fontFamily: 'Playfair Display, serif',
    fontWeight: '800',
    lineHeight: '1.1',
  },
  
};

export default App1;
