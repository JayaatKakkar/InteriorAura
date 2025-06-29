import React, { useEffect, useState } from 'react';

export default function Designers() {
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFocused(true), 2000); // Delayed activation
    return () => clearTimeout(timer);
  }, []);

  const designers = [
    {
      name: 'Ghianella',
      img: '/img/team-1.jpg',
      message: "Hey there, I’m Ghianella! I’m so excited to help you create your dream home!",
    },
    { name: 'Freddi', img: '/img/test2.jpg', message: "Hi, I'm Freddi. Let's build something amazing!" },
    { name: 'Jordan', img: '/img/test6.jpg', message: "I'm Jordan. Ready to get started on your project!" },
    { name: 'Emmanuel', img: '/img/test5.jpg', message: "Hey, I'm Emmanuel! Let's create some stunning designs!" },
  ];

  return (
    <>
      <style>{`
        .designer-grid {
          display: grid;
          gap: 20px;
          transition: all 0.5s ease-in-out;
          grid-template-columns: repeat(2, 1fr);
        }

        .designer-card {
          position: relative;
          padding: 10px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          transition: all 0.6s ease-in-out;
          transform-origin: top center;
        }

        .designer-card img {
          width: 100%;
          border-radius: 8px;
          object-fit: cover;
          height: 200px;
          transition: all 0.6s ease-in-out;
        }

        .info h3 {
          margin: 10px 0 5px;
        }

        .info p {
          margin: 0;
          color: #666;
          font-size: 14px;
        }

        .bubble {
          position: absolute;
          top: 10px;
          right: -10px;
          background: #fff8dc;
          padding: 10px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          opacity: 0;
          transform: scale(0.95);
          transition: all 0.5s ease;
          pointer-events: none;
          max-width: 240px;
          font-size: 14px;
        }

        .designer-grid.show-focus {
          grid-template-columns: repeat(3, 1fr);
        }

        /* Specific styles for the first card */
        .designer-grid.show-focus .designer-card:first-child img {
          width: 150px; /* Set the width for the first image */
          height: 150px; /* Set the height for the first image */
          object-fit: cover;
        }

        .designer-grid.show-focus .designer-card.active {
          grid-column: span 3;
          transform: scale(1.03);
          z-index: 1;
        }

        .designer-grid.show-focus .designer-card.active .bubble {
          opacity: 1;
          transform: scale(1);
        }

        .designer-grid.show-focus .designer-card:not(.active) {
          opacity: 1;
          filter: none;
          transition-delay: 0.2s;
        }
      `}</style>

      <div className={`designer-grid ${focused ? 'show-focus' : ''}`}>
        {designers.map((designer, index) => (
          <div
            key={designer.name}
            className={`designer-card ${designer.name.toLowerCase()} ${index === 0 ? 'active' : ''}`}
          >
            <img src={designer.img} alt={designer.name} />
            <div className="info">
              <h3>{designer.name}</h3>
              <p>Taking on projects this week</p>
            </div>
            {index === 0 && (  // Show message only for the first designer
              <div className="bubble">👋 {designer.message}</div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
