import React from "react";
import { Link } from "react-router-dom";

const Carousel2 = () => {
  const buttonStyle = {
    marginTop: "20px",
    padding: "16px 32px",
    fontSize: "20px",
    borderRadius: "30px",
    backgroundColor: "#B78D65",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontFamily: "Playfair Display, serif",
    fontWeight: "800",
  };

  const buttonHover = (e) => {
    e.target.style.backgroundColor = "white";
    e.target.style.color = "#B78D65";
  };

  const buttonOut = (e) => {
    e.target.style.backgroundColor = "#B78D65";
    e.target.style.color = "white";
  };

  const slides = [
    {
      src: "img/5823707-uhd_2160_3840_24fps.mp4",
      title1: "THE #1 INTERIOR DESIGN SERVICE",
      title: "Designing your ",
      title2: "dream home just",
      title3: "became a reality.",
    },
    {
      src: "img/3308993-hd_1920_1080_30fps.mp4",
      title1: "THE #1 INTERIOR DESIGN SERVICE",
      title: "Designing your ",
      title2: "dream home just",
      title3: "became a reality.",
    },
    {
      src: "img/7578552-uhd_3840_2160_30fps.mp4",
      title1: "THE #1 INTERIOR DESIGN SERVICE",
      title: "Designing your ",
      title2: "dream home just",
      title3: "became a reality.",
    },
  ];

  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{
        width: "100%",
        maxWidth: "1500px",
        aspectRatio: "14 / 6",
        margin: "auto",
        overflow: "hidden",
        borderRadius: "10px",
      }}
    >
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : undefined}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      <div className="carousel-inner" style={{ width: "100%", height: "100%" }}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            style={{ width: "100%", height: "100%" }}
          >
            <video
              className="img-fluid"
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            >
              <source src={slide.src} type="video/mp4" />
            </video>

            <div
              className="carousel-caption d-none d-md-block"
              style={{
                position: "absolute",
                top: "50%",
                left: "5%",
                transform: "translateY(-50%)",
                textAlign: "left",
                color: "#fff",
              }}
            >
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "500",
                  color: "white",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {slide.title1}
              </p>
              <h1
                style={{
                  fontSize: "3rem",
                  fontWeight: "700",
                  color: "white",
                  fontFamily: "Playfair Display, serif",
                }}
              >
                {slide.title}
              </h1>
              <h1
                style={{
                  fontSize: "3rem",
                  fontWeight: "700",
                  color: "white",
                  fontFamily: "Playfair Display, serif",
                }}
              >
                {slide.title2}
              </h1>
              <h1
                style={{
                  fontSize: "3rem",
                  fontWeight: "700",
                  color: "white",
                  fontFamily: "Playfair Display, serif",
                }}
              >
                {slide.title3}
              </h1>
              <Link to="/getstarted">
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
        ))}
      </div>
    </div>
  );
};

export default Carousel2;
