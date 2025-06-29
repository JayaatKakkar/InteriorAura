import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom'; // add useNavigate

function Plans() {
  const location = useLocation();
  const categoryId = location.state?.categoryId;
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;

    const fetchPlans = async () => {
      try {
        const res = await fetch(`http://localhost:5000/Blueprint?parentCategoryId=${categoryId}`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setPlans(data);
          console.log('Fetched plans:', data);
        } else {
          console.error('Unexpected response format:', data);
          setPlans([]);
        }
      } catch (err) {
        console.error('Error fetching blueprints:', err);
        setPlans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [categoryId]);
const navigate = useNavigate();

const handleImageClick = (plan) => {
  console.log('Selected Plan:', plan); // Optional: log on current page too
  navigate('/plans-show', { state: { plan } });
};
  const styles = {
    container: {
      padding: '20px',
      columnCount: 3,
      columnGap: '20px',
    },
    card: {
      backgroundColor: '#fff',
      marginBottom: '20px',
      // borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      display: 'inline-block',
      width: '100%',
    },
    image: {
      width: '100%',
      objectFit: 'cover',
      display: 'block',
    },
    content: {
      padding: '12px 16px',
    },
    title: {
      fontSize: '1rem',
      fontWeight: '600',
      marginBottom: '6px',
    },
    subtitle: {
      color: '#777',
      fontSize: '0.9rem',
      marginBottom: '4px',
    },
  };

  const getRandomHeight = () => {
    const heights = [200, 240, 280, 320];
    return heights[Math.floor(Math.random() * heights.length)];
  };

  return (
    <div style={styles.container}>
      {loading ? (
        <div></div>
      ) : plans.length > 0 ? (
        plans.map((plan) => (
  <div key={plan._id} style={styles.card}>
    <div style={{ position: 'relative' }}>
      {plan.blueprint_image && (
      <img
        src={`http://localhost:5000/${plan.blueprint_image}`}
        alt={plan.name}
        style={{ ...styles.image, height: `${getRandomHeight()}px`, cursor: 'pointer' }}
        onClick={() => handleImageClick(plan)}
      />
      )}
      <div style={{
        position: 'absolute',
        bottom: '8px',
        right: '8px',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        color: '#fff',
        padding: '4px 8px',
        borderRadius: '6px',
        fontSize: '0.85rem',
      }}>
        {plan.sub_cat.name || 'Subcategory'}
      </div>
    </div>
  </div>
        ))
      ) : (
        <div>No plans found for this category.</div>
      )}
    </div>
  );
}

export default Plans;
