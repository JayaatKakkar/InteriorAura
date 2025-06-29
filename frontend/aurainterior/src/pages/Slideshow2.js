import React, { useEffect } from 'react';

const Slideshow1 = () => {
  const slides = [
    { src: 'img/1.jpg' },
    { src: 'img/2.jpg' },
    { src: 'img/3.jpg' },
    { src: 'img/4.jpg' },
    { src: 'img/1.jpg' },
    { src: 'img/2.jpg' },
    { src: 'img/3.jpg' },
    { src: 'img/4.jpg' },
    { src: 'img/1.jpg' },
    { src: 'img/2.jpg' },
    { src: 'img/3.jpg' },
    { src: 'img/4.jpg' },
    { src: 'img/1.jpg' },
    { src: 'img/2.jpg' },
    { src: 'img/3.jpg' },
    { src: 'img/4.jpg' },
    { src: 'img/1.jpg' },
    { src: 'img/2.jpg' },
    { src: 'img/3.jpg' },
    { src: 'img/4.jpg' },
  ];

  // 👇 Create a loop by duplicating slides
  const doubledSlides = [...slides, ...slides];

  const slideshowContainerStyle = {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    padding: '20px 0',
  };

  const slidesWrapperStyle = {
    display: 'flex',
    animation: 'scrollSlideshow 120s linear infinite',
    width: 'max-content',
    gap: '40px',
  };

  const slideStyle = {
    flexShrink: 0,
    borderRadius: '10px',
    overflow: 'hidden',
  };

  const slideImgStyle = {
    width: '400px',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '10px',
    display: 'block',
  };

  const keyframesStyle = `
    @keyframes scrollSlideshow {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `;

  return (
    <div>
      <style>{keyframesStyle}</style>
      <div style={slideshowContainerStyle}>
        <div style={slidesWrapperStyle}>
          {doubledSlides.map((slide, index) => (
            <div key={index} style={slideStyle}>
              <img src={slide.src} alt={`Slide ${index + 1}`} style={slideImgStyle} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slideshow1;
