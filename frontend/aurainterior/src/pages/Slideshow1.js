import React, { useEffect } from 'react';

const Slideshow1 = () => {
  const slides = [
    { src: 'img/step3-1.jpg' },
    { src: 'img/step3-2.jpg' },
    { src: 'img/step3-3.jpg' },
    { src: 'img/step3-4.jpg' },
    { src: 'img/step3-5.jpg' },
    { src: 'img/step3-6.jpg' },
    { src: 'img/step3-7.jpg' },
    { src: 'img/step3-8.jpg' },
    { src: 'img/step3-9.jpg' },
    { src: 'img/step3-10.jpg' },
    { src: 'img/step3-11.jpg' },
    { src: 'img/step3-12.jpg' },
    { src: 'img/step3-13.jpg' },
    { src: 'img/step3-14.jpg' },
    { src: 'img/step3-15.jpg' },
    { src: 'img/step3-16.jpg' },
    { src: 'img/step3-17.jpg' },
    { src: 'img/step3-18.jpg' },
    { src: 'img/step3-19.jpg' },
    { src: 'img/step3-20.jpg' },
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
