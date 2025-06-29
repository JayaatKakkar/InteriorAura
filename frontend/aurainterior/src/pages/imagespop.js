import React, { useEffect, useState } from 'react';

const SequentialImagePopup = () => {
  const [showImages, setShowImages] = useState([false, false, false, false, false]);

  useEffect(() => {
    // Set the images to show sequentially with delays
    const timers = showImages.map((_, index) => 
      setTimeout(() => {
        setShowImages(prev => {
          const newShowImages = [...prev];
          newShowImages[index] = true;
          return newShowImages;
        });
      }, index * 700)
    );

    // Clear timeouts on component unmount
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <div style={styles.container}>
      <img
        src="/img/how-work2.jpg"
        style={showImages[0] ? styles.imageVisible : styles.image}
        alt="image1"
      />
      <img
        src="/img/how-work2.jpg"
        style={showImages[1] ? styles.imageVisible : styles.image}
        alt="image2"
      />
      <img
        src="/img/how-work2.jpg"
        style={showImages[2] ? styles.imageVisible : styles.image}
        alt="image3"
      />
      <img
        src="/img/how-work2.jpg"
        style={showImages[3] ? styles.imageVisible : styles.image}
        alt="image4"
      />
      <img
        src="image5.jpg"
        style={showImages[4] ? styles.imageVisible : styles.image}
        alt="image5"
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    padding: '20px',
    background: '#fff',
  },
  image: {
    opacity: 0,
    transform: 'scale(0.8)',
    transition: 'opacity 0.5s ease, transform 0.5s ease',
  },
  imageVisible: {
    opacity: 1,
    transform: 'scale(1)',
    transition: 'opacity 0.5s ease, transform 0.5s ease',
  },
};

export default SequentialImagePopup;
