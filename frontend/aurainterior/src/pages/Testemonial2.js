import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    text: "I had a fantastic experience! The service was impeccable, and I highly recommend them.",
    author: "Aishwarya",
    location: "Mumbai, Maharashtra",
    image: "img/test11.jpg"
  },
  {
    text: "Absolutely wonderful! I feel much more confident with their guidance and expertise.",
    author: "Michael Smith",
    location: "New Delhi, Delhi",
    image: "img/test2.jpg"
  },
  {
    text: "A life-changing experience! Their team is dedicated and extremely knowledgeable.",
    author: "Arjun",
    location: "Bengaluru, Karnataka",
    image: "img/test3.jpg"
  },
  {
    text: "The results speak for themselves. Truly grateful for everything they’ve done for me.",
    author: "Sameer",
    location: "Chennai, Tamil Nadu",
    image: "img/test4.jpg"
  },
  {
    text: "I couldn’t be happier! Professional, responsive, and always available to help.",
    author: "Vihaan Kumar",
    location: "Hyderabad, Telangana",
    image: "img/test5.jpg"
  },
  {
    text: "Amazing team and top-notch service. I highly recommend their services to everyone.",
    author: "Priya",
    location: "Kolkata, West Bengal",
    image: "img/test6.jpg"
  },
  {
    text: "From start to finish, everything was perfect. They truly understand their craft.",
    author: "Aarav",
    location: "Pune, Maharashtra",
    image: "img/test7.jpg"
  },
  {
    text: "A five-star experience! They went above and beyond my expectations.",
    author: "Rishabdeep Singh",
    location: "Jalandhar, Punjab",
    image: "img/test8.jpg"
  },
  {
    text: "The most professional team I’ve ever worked with. They exceeded all my expectations.",
    author: "Damandeep Singh",
    location: "Amritsar, Punjab",
    image: "img/test9.jpg"
  },
  {
    text: "I can't thank them enough for the incredible work they did. Truly exceptional.",
    author: "Harmandeep Singh",
    location: "Chandigarh, Punjab",
    image: "img/test10.jpg"
  }
];

const settings = {
  className: "center",
  centerMode: true,
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
  centerPadding: "80px", // Increase this value
  slidesToShow: 2,
  slidesToScroll: 1, // Reduce to 2 if spacing issue persists
  speed: 500,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        centerMode: false
      }
    }
  ]
};

const Testemonial2 = () => {
  return (
    <div className="container-fluid testimonial py-5">
      <div className="container py-5">
        <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 600 }}>
          <h4 className="section-title">Testimonial</h4>
          <h1 className="display-5 mb-4">Thousands Of Customers Who Trust Us And Our Services</h1>
        </div>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div
  key={index}
  className="p-3"
>
  <div
    className="testimonial-item text-center pb-4 testimonial-item-hover"
    style={{ borderRadius: '30px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}
  >
    <div
      className="testimonial-comment bg-light p-4"
      style={{ borderRadius: '20px' }}
    >
      <p className="text-center mb-5">{testimonial.text}</p>
    </div>
    <div className="d-flex align-items-center justify-content-evenly">
      <div className="testimonial-img p-1" style={{ borderRadius: '50%' }}>
        <img src={testimonial.image} className="img-fluid rounded-circle" alt="Testimonial" />
      </div>
      <div className="float-left">
        <h5 className="mb-0">{testimonial.author}</h5>
        <p className="mb-0">{testimonial.location}</p>
        <div className="d-flex justify-content-center">
          <i className="fas fa-star" style={{color:"#B78D65"}}></i>
          <i className="fas fa-star"  style={{color:"#B78D65"}}></i>
          <i className="fas fa-star"  style={{color:"#B78D65"}}></i>
          <i className="fas fa-star "  style={{color:"#B78D65"}}></i>
          <i className="fas fa-star "  style={{color:"#B78D65"}}></i>
        </div>
      </div>
    </div>
  </div>
</div>

          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testemonial2;
