import React from 'react';
import { Link, useNavigate, Outlet } from "react-router-dom";


import About from '../pages/About';


import Footer from '../pages/Footer';
import Detail from '../pages/Detail';
import App1 from '../pages/image1';
const AboutPage=()=>{


  

  
    const heroStyle = {
        height: '600px',
        width: '100%',
        backgroundImage: "url('http://localhost:5000/img/how-work2.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
      };
    
      const buttonStyle = {
        marginTop: '20px',
        padding: '10px 25px',
        backgroundColor: '#ddd',
        border: 'none',
        cursor: 'pointer',
        color: 'black',
        padding: "16px 32px",       // larger padding
        fontSize: "20px",           // larger font
        borderRadius: "30px",
        backgroundColor: "#B78D65",
        color: "white",
        border: "none",
        cursor: "pointer",
        fontFamily: "Playfair Display, serif",
        fontWeight: "800",
      };
    
      const buttonHover = (e) => {
        e.target.style.backgroundColor = 'white';
        e.target.style.color = '#B78D65';
      };
    
      const buttonOut = (e) => {
        e.target.style.backgroundColor = '#B78D65';
        e.target.style.color = 'white';
      };
    return(
 <>

<div style={heroStyle}>
      <h1 style={{ fontSize: '90px' ,color:"white"}}>Interior Aura <br/>Interior Design Process</h1>
      <p style={{ fontSize: '30px',color:"white" }}>The easiest way to design your space.</p>
      <Link to="/getstarted">
            <button
        style={buttonStyle}
        onMouseOver={buttonHover}
        onMouseOut={buttonOut}
      >
        GET STARTED
      </button></Link>

    </div>
    <Detail/>
    <About/><br/><br/>
    <App1/>
    <Footer/>
</>
);
}
export default AboutPage;
