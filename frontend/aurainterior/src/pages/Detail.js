import ImageComparison from "./ImageComparison";
import Slideshow1 from "./Slideshow1";
import Slideshow2 from "./Slideshow2";
import Designers from "./slideshow3";

const Detail=()=>{
    return(
 <>
 <div class="container-xxl project py-5">
    <div class="container">
        <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: 600}}>
        <h1
  className="section-title"
  style={{
    fontFamily: 'Playfair Display, serif',
    fontSize: '48px', // Increased font size
    fontWeight: 'bold', // Corrected font weight value
  }}
>
  Design it. Shop it. Bring it to life.
</h1>

        </div>
        
        <div className="row g-4 wow fadeInUp" data-wow-delay="0.3s" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="col-lg-6">
            <Designers/>
            </div>
            <div className="col-lg-6">
                <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: '36px', fontWeight: "bold", color: '#B78D65' }}>
                    STEP 1
                </h2>
                <h4 style={{ fontFamily: "Poppins, sans-serif", fontSize: '24px', color: 'black', lineHeight: 1.6 }}>
                Select one of our talented designers. They'll become your one-on-one guide and partner.
                </h4>
            </div>
        </div><br/><br/><br/><br/>


        <div className="row g-4 wow fadeInUp" data-wow-delay="0.3s" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="col-lg-6">
                <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: '36px', fontWeight: "bold", color: '#B78D65' }}>
                    STEP 2
                </h2>
                <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: '24px', color: 'black', lineHeight: 1.6 }}>
                Tell us all about your dream home. We’ll get to work on bringing it to life.
                </h3>
            </div>
            <div className="col-lg-6">
            <img src="img/image1.jpg" alt="Img" width="600" height="400" />
            </div>
        </div><br/><br/><br/><br/>


        <div className="row g-4 wow fadeInUp" data-wow-delay="0.3s" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="col-lg-6">
                <Slideshow1/>
            </div>
            <div className="col-lg-6">
                <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: '36px', fontWeight: "bold", color: '#B78D65' }}>
                    STEP 3
                </h2>
                <h4 style={{ fontFamily: "Poppins, sans-serif", fontSize: '24px', color: 'black', lineHeight: 1.6 }}>
                    Your designer will blow your mind with inspo and ideas for transforming your space.
                </h4>
            </div>
        </div><br/><br/><br/><br/>

        <div className="row g-4 wow fadeInUp" data-wow-delay="0.3s" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="col-lg-6">
                <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: '36px', fontWeight: "bold", color: '#B78D65' }}>
                    STEP 4
                </h2>
                <h4 style={{ fontFamily: "Poppins, sans-serif", fontSize: '24px', color: 'black', lineHeight: 1.6 }}>
                   Tell us which design ideas you vibe with, and we’ll add all the beautiful finishing touches.
                </h4>
            </div>
            <div className="col-lg-6">
            <ImageComparison
                srcBefore="img/room1.jpg"
                srcAfter="img/room2.jpg"
                width={500}
                height={300}
            />
            </div>
        </div><br/><br/><br/><br/>
        
        <div className="row g-4 wow fadeInUp" data-wow-delay="0.3s" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="col-lg-6">
            <Slideshow2/>
            </div>
            <div className="col-lg-6">
                <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: '36px', fontWeight: "bold", color: '#B78D65' }}>
                    STEP 5
                </h2>
                <h4 style={{ fontFamily: "Poppins, sans-serif", fontSize: '24px', color: 'black', lineHeight: 1.6 }}>
                Shop items from your design in one place, and we'll take care of the logistics. It's that simple.
                </h4>
            </div>
        </div><br/><br/><br/><br/>

      

        
    </div>
 </div>
 </>
);
}
export default Detail;
