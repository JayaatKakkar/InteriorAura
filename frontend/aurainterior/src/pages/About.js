const About=()=>{
    const linkButtonStyle = {
        display: 'inline-block',
        padding: '16px 32px',
        backgroundColor: '#B78D65',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '30px',
        fontFamily: 'Playfair Display, serif',
        fontWeight: '700',
        fontSize: '18px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      };
      
      const linkHoverStyle = {
        backgroundColor: 'white',
        color: '#B78D65',
      };
      const styles = {
        aboutImg: {
          position: 'relative',
          width: '100%',
          height: 'auto',
        },
        img1: {
          width: '100%',       // Full width of the container
          height: '650px',     // Your desired height
          objectFit: 'cover',
          borderRadius: '8px',
        },
        img2: {
          position: 'absolute',
          bottom: '-20px',     // Adjust based on overlap you want
          right: '-20px',
          width: '250px',      // Custom width
          height: '250px',     // Custom height
          objectFit: 'cover',
          border: '5px solid white',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          borderRadius: '8px',
        },
      };
      
    return(
 <>
<div class="container-xxl py-5">
    <div class="container">
        <div class="row g-5">
        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
      <div style={styles.aboutImg}>
        <img style={styles.img1} src="img/about1.jpg" alt="About 1" />
        <img style={styles.img2} src="img/about2.jpg" alt="About 2" />
      </div>
    </div>
            <div class="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                <h4 class="section-title">About Us</h4>
                <h1 class="display-5 mb-4">A Creative Architecture Agency For Your Dream Home</h1>
                <p>Welcome to The Interior Aura — where your vision meets craftsmanship. We specialize in custom-made furniture tailored to reflect your unique style and needs. Whether you're furnishing a new home or updating an existing space, our mission is to bring your ideas to life with pieces that are as distinctive as you are. Your home is a personal expression, and we're here to make it truly yours. </p>
                <p class="mb-4">We work closely with clients to develop initial ideas, site analysis, and space planning to create thoughtful and innovative design concepts and We prepare detailed architectural drawings, technical specifications, and documentation for approvals, tenders, and construction.Bring your vision to life with detailed 3D renderings and walkthroughs, allowing you to see and refine your space before construction begins.</p>
                <div class="d-flex align-items-center mb-5">
                <div
  className="d-flex flex-shrink-0 align-items-center justify-content-center"
  style={{
    width: 120,
    height: 120,
    border: '5px solid #B78D65',
    borderRadius: '50%', // optional: make it a circle
  }}
>
  <h1 style={{ marginBottom: '-0.5rem', fontSize: '3rem', color: '#B78D65' }}>25</h1>
</div>

                    <div class="ps-4">
                        <h3>Years</h3>
                        <h3>Working</h3>
                        <h3 class="mb-0">Experience</h3>
                    </div>
                </div>
                {/* <a
                href="#"
                style={linkButtonStyle}
                >
                Read More
                </a> */}

            </div>
        </div>
    </div>
</div>
</>
);
}
export default About;
