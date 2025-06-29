const Work=()=>{
    const columnStyle = {
        float: 'left',
        width: '50%',
        padding: '5px',
        boxSizing: 'border-box',
      };
    
      const rowStyle = {
        content: '""',
        clear: 'both',
        display: 'table',
        borderRadius: '20px',      // 👈 Round the row container
        overflow: 'hidden',        // 👈 Clips overflowing child corners
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      };
    
      const imageStyle = {
        width: '250px',
        height: '180px',
        objectFit: 'cover',
        borderRadius: '20px',     // 👈 Rounds each image individually
      };
      const firstImageStyle = {
        width: '250px',
        height: '180px',
        objectFit: 'cover',
        borderTopLeftRadius: '20px', // Rounded top-left
        borderBottomLeftRadius: '20px', // Rounded bottom-left
      };
    
      const secondImageStyle = {
        width: '250px',
        height: '180px',
        objectFit: 'cover',
        borderTopRightRadius: '20px', // Rounded top-right
        borderBottomRightRadius: '20px', // Rounded bottom-right
      };
    
    return(
        <>
<div class="container-xxl project py-5">
    <div class="container">
        <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: 600}}>
            <h1 class="section-title" style={{ fontFamily: "Playfair Display, serif", fontSize: '24px', fontWeight: 'heavy'}}>How Interior Aura Works</h1>
            <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: '36px', fontWeight: "bold", color: '#333' }}>Enhancing spaces through mindful designs.</h3>
        </div>


        <div className="row g-4 wow fadeInUp" data-wow-delay="0.3s">
            <div className="col-lg-1">
                <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: '36px', fontWeight: 'bold', color: '#B78D65' }}>
                01
                </h2>
            </div>
            <div className="col-lg-5">
                <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: '36px', fontWeight: "bold", color: '#B78D65' }}>
                Match with one of our talented designers and get inspired.
                </h2>
                <p style={{ fontFamily: "Poppins, sans-serif", fontSize: '18px', color: '#333', lineHeight: 1.6,textAlign: 'justify' }}>
                Take a style quiz to help us get to know you a little bit better, then choose your interior designer from our personalized recommendations. With over 10 years of experience and nearly 1 million designs, our expert team will help you turn your vision into reality.
                </p>
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-5"  style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '16px', color: '#555' ,textAlign: 'justify'}} >
                <div style={rowStyle}>
                    <div style={columnStyle}>
                        <img src="img/how-work4.jpg" alt="Snow" style={firstImageStyle} />
                    </div>
                    <div style={columnStyle}>
                        <img src="img/how-work3.jpg" alt="Forest" style={secondImageStyle} />
                    </div>
                </div>
            </div>
        </div><br/>


        <div className="row g-4 wow fadeInUp" data-wow-delay="0.3s">
            <div className="col-lg-1">
                <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: '36px', fontWeight: 'bold', color: '#B78D65' }}>
                02
                </h2>
            </div>
            <div className="col-lg-5">
                <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: '36px', fontWeight: "bold", color: '#B78D65' }}>
                Partner with your designer to create a home you love.
                </h2>
                <p style={{ fontFamily: "Poppins, sans-serif", fontSize: '18px', color: '#333', lineHeight: 1.6,textAlign: 'justify' }}>
                Great design doesn’t happen alone. Let your designer guide you to solutions that meet your functional needs and products that suit your unique style. See it come to life with a 3D rendering of the design in your actual space.
                </p>
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-5"  style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '16px', color: '#555' ,textAlign: 'justify'}} >
            <div style={rowStyle}>
                    <div style={columnStyle}>
                        <img src="img/how-work9.jpg" alt="Snow" style={firstImageStyle} />
                    </div>
                    <div style={columnStyle}>
                        <img src="img/how-work10.jpg" alt="Forest" style={secondImageStyle} />
                    </div>
                </div>
            </div>
        </div><br/>


        <div className="row g-4 wow fadeInUp" data-wow-delay="0.3s">
            <div className="col-lg-1">
                <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: '36px', fontWeight: 'bold', color: '#B78D65' }}>
                03
                </h2>
            </div>
            <div className="col-lg-5">
                <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: '36px', fontWeight: "bold", color: '#B78D65' }}>
                Shop exclusive deals, and bring your design home with ease.
                </h2>
                <p style={{ fontFamily: "Poppins, sans-serif", fontSize: '18px', color: '#333', lineHeight: 1.6,textAlign: 'justify' }}>
                Access the best prices on your favorite home brands, get exclusive discounts, and shop everything you need for your space in a single, streamlined checkout. The result? Even better than your dreams.
                </p>
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-5"  style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '16px', color: '#555' ,textAlign: 'justify'}} >
                <div style={rowStyle}>
                    <div style={columnStyle}>
                        <img src="img/how-work11.jpg" alt="Snow" style={firstImageStyle} />
                    </div>
                    <div style={columnStyle}>
                        <img src="img/how-work12.jpg" alt="Forest" style={secondImageStyle} />
                    </div>
                </div>
            </div>
        </div>
           
    </div>
</div>
</>
    );
    }
    export default Work;
