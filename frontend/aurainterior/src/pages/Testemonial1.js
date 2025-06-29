import React from "react";


const Testemonial1=()=>{
    return(
        <>
     
   <div class="container py-5">
   <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: 600}}>
            <h4 class="section-title">Testimonial</h4>
            <h1 class="display-5 mb-4">Thousands Of Customers Who Trust Us And Our Services</h1>
        </div>

    <div class="row text-center d-flex align-items-stretch">
      <div class="col-md-4 mb-5 mb-md-0 d-flex align-items-stretch">
        <div class="testimonial-card">
          <div class="card-up" style={{backgrounColor:" #9d789b"}}></div>
          <div class="avatar mx-auto bg-white">
            <img src="img/testimonial-1.jpg" class="rounded-circle img-fluid" alt="Maria Smantha"/>
          </div>
          <div class="card-body">
            <h4 class="mb-4">Maria Smantha</h4>
            <hr/>
            <p class="dark-grey-text mt-4">
              <i class="fas fa-quote-left pe-2"></i>
              Working with [Your Company Name] was an absolute pleasure. They took my vision and turned it into a stunning, functional space that perfectly reflects my style. From start to finish, the team was professional, creative, and incredibly attentive to my needs. I couldn’t be happier with the results!"
            </p>
          </div>
        </div>
      </div>

      <div class="col-md-4 mb-5 mb-md-0 d-flex align-items-stretch">
        <div class="testimonial-card">
          <div class="card-up" style={{backgrounColor:" #9d789b"}}></div>
          <div class="avatar mx-auto bg-white">
            <img src="img/testimonial-2.jpg" class="rounded-circle img-fluid" alt="Lisa Cudrow"/>
          </div>
          <div class="card-body">
            <h4 class="mb-4">Lisa Cudrow</h4>
            <hr/>
            <p class="dark-grey-text mt-4">
              <i class="fas fa-quote-left pe-2"></i>
              "The team at [Your Company Name] completely transformed our office space. They not only made it look amazing but also optimized the layout to enhance productivity and workflow. The entire process was smooth, and the end result exceeded our expectations. Highly recommend!"
            </p>
          </div>
        </div>
      </div>

      <div class="col-md-4 mb-5 mb-md-0 d-flex align-items-stretch">
        <div class="testimonial-card">
          <div class="card-up" style={{backgrounColor:" #9d789b"}}></div>
          <div class="avatar mx-auto bg-white">
            <img src="img/testimonial-3.jpg" class="rounded-circle img-fluid" alt="John Smith"/>
          </div>
          <div class="card-body">
            <h4 class="mb-4">John Smith</h4>
            <hr/>
            <p class="dark-grey-text mt-4">
              <i class="fas fa-quote-left pe-2"></i>
              "I couldn't be more impressed with the renovation work done by [Your Company Name]. They helped me update my home while maintaining its character, blending modern design with the original charm. Their attention to detail and commitment to quality made all the difference. Truly a fantastic experience!"
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.10.0/mdb.min.js"></script>
</>
);
}
export default Testemonial1;