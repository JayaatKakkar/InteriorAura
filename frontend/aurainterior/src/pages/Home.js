import React from 'react';
import NavBar from '../components/NavBar';
// import Services from '../pages/Services';
// import Features from '../pages/Features';
// import Project from '../pages/Project';
import Teampage1 from '../pages/Teampage1';
import Appointment from '../pages/Appointment';
import Testemonial2 from '../pages/Testemonial2';
import Footer from '../pages/Footer';
import Carousel2 from '../pages/Carousel2';
import Work from '../pages/Work';
import ImageComparisonSlider from '../pages/ImageComparisonSlider';
import Detail from '../pages/Detail';

 function Home() {
  return (
<> 
{/* <NavBar/> */}
<Carousel2/>
<Work/>
<ImageComparisonSlider/>
<Detail/>
{/* <Services/> */}
{/* <Features/> */}
{/* <Project/> */}
<Teampage1/>
<Appointment/>
<Testemonial2/>
<Footer/>
</>
  );
}
export default Home;