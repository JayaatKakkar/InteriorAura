import React from 'react';

const Gallery = () => {
  const images = [
    'img/how-work11.jpg',
    'img/how-work12.jpg',
    'img/how-work1.jpg',
    'img/about5.jpg',
     'img/about1.jpg',
    'img/about2.jpg',
    'img/how-work7.jpg',
    'img/how-work3.jpg',
     'img/project-1.jpg',
    'img/project-2.jpg',
    'img/project-3.jpg',
    'img/project-4.jpg',
  ];

  // CSS as JS objects
  const styles = {
    app: {
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '20px',
    },
    galleryContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      marginTop: '20px',
      padding: '10px',
    },
    galleryItem: {
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
      overflow: 'hidden',
      transition: 'transform 0.3s ease',
    },
    image: {
      width: '100%',
      height: 'auto',
      display: 'block',
    },
  };

  return (
    <div style={styles.app}>
      <h1 style={{color:"#B78D65"}}>Image Gallery</h1>
      <div style={styles.galleryContainer}>
        {images.map((src, index) => (
          <div
            style={styles.galleryItem}
            key={index}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <img src={src} alt={`Image ${index + 1}`} style={styles.image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
