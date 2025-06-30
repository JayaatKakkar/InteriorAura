import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


function PlansShow() {
  const location = useLocation();
  const { plan } = location.state || {};

  const [vendorPlanData, setVendorPlanData] = useState(null);
  const [relatedVendors, setRelatedVendors] = useState([]);
  

  useEffect(() => {
    const fetchVendorPlanData = async () => {
      try {
        const response = await fetch('https://interioraura.onrender.com/Vendorlabelprice');
        const data = await response.json();
        setVendorPlanData(data);

        if (plan && data.vendor === plan.vendor) {
          console.log('Vendor matches!');
        }
      } catch (error) {
        console.error('Error fetching vendor plan data:', error);
      }
    };

    fetchVendorPlanData();
  }, [plan]);

  useEffect(() => {
  if (plan) {
    const fetchRelatedVendorLabels = async () => {
      try {
        const response = await fetch('https://interioraura.onrender.com/Vendorlabelprice/filter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            parent_cat: plan.parent_cat,
            sub_cat: plan.sub_cat,
            sub_sub_cat: plan.sub_sub_cat,
          }),
        });

        const result = await response.json();
        if (result.success) {
          const filteredVendors = result.vendorDetails.filter((vendor) => {
            const vDim = vendor.dim_id || {};
            const pDim = plan.dim_id || {};
            return (
              vDim.width === pDim.width &&
              vDim.height === pDim.height &&
              vDim.depth === pDim.depth &&
              vDim.length === pDim.length
            );
          });

          console.log('Filtered Matching Vendors:', filteredVendors);
          setRelatedVendors(filteredVendors);
        } else {
          console.log('No related vendor labels found.');
        }
      } catch (error) {
        console.error('Error fetching related vendor price labels:', error);
      }
    };

    fetchRelatedVendorLabels();
  }
}, [plan]);
const navigate = useNavigate();
const handleVendorClick = (vendor) => {
  navigate(`/vendor/${vendor._id}`);
};


  if (!plan) return <div>No plan selected.</div>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img
          src={`https://interioraura.onrender.com/${plan.blueprint_image}`}
          alt={plan.name}
          style={styles.image}
        />
        <h2 style={styles.subCategory}>{plan.sub_cat?.name || 'N/A'}</h2>
        <div style={styles.details}>
          <p>
            <strong>Material Used:</strong><br />
            {plan.mat_id?.material_name || 'N/A'}
          </p>
          <div>
            <strong>Dimensions:</strong>
            {plan.dim_id ? (
              <div style={styles.dimensionsGrid}>
                <div style={styles.dimBox}><strong>Width:</strong> {plan.dim_id.width || 0}</div>
                <div style={styles.dimBox}><strong>Height:</strong> {plan.dim_id.height || 0}</div>
                <div style={styles.dimBox}><strong>Depth:</strong> {plan.dim_id.depth || 0}</div>
                <div style={styles.dimBox}><strong>Length:</strong> {plan.dim_id.length || 0}</div>
              </div>
            ) : (
              <p>N/A</p>
            )}
          </div>
        </div>
        <div style={styles.price}>
          <strong>Price:</strong> {plan.price || 'N/A'}
        </div>
      </div>

      {/* Related Vendor Cards */}
      {relatedVendors.length > 0 && (
        <div style={styles.relatedVendorsContainer}>
          <h3 style={styles.relatedTitle}>Related Vendor Price Labels</h3>
          <div style={styles.relatedGrid}>
{relatedVendors.map((vendor, idx) => (
  <div
    key={idx}
    style={styles.relatedCard}
    onClick={() => handleVendorClick(vendor)}
  >
    <img
      src={`https://interioraura.onrender.com/${vendor.vendor_image}`}
      alt={`Vendor ${idx + 1}`}
      style={styles.relatedImage}
    />
    <div style={styles.vendorDetails}>
      <p><strong></strong> {vendor.name_prod || 'N/A'}</p>
      <p><strong>Price:</strong> {vendor.price || 'N/A'}</p>
    </div>
  </div>
))}

          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
  },
  card: {
    width: '100%',
    maxWidth: '1600px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    boxSizing: 'border-box',
    marginBottom: '40px',
  },
  image: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  subCategory: {
    fontSize: '1.6rem',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  details: {
    fontSize: '1rem',
    lineHeight: '1.8',
    color: '#444',
    marginBottom: '20px',
  },
  price: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#2a7d2e',
    textAlign: 'left',
    borderTop: '1px solid #eee',
    paddingTop: '10px',
  },
  dimensionsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
    marginTop: '10px',
    marginBottom: '20px',
  },
  dimBox: {
    padding: '10px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '1rem',
  },
  relatedVendorsContainer: {
    width: '100%',
    maxWidth: '1600px',
  },
relatedTitle: {
  fontSize: '1.8rem',
  fontWeight: '700',
  marginBottom: '24px',
  color: '#222',
  position: 'relative',
  paddingLeft: '12px',
  borderLeft: '5px solid #2a7d2e', // green accent
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
},

relatedGrid: {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)', // force 4 columns
  gap: '20px',
},
  relatedCard: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
  },
relatedImage: {
  width: '100%',
  height: '220px',
  objectFit: 'contain',
  borderRadius: '6px',
  marginBottom: '12px',
  backgroundColor: '#f0f0f0', // optional: neutral background for images with transparency or white space
  padding: '10px',            // optional: adds spacing inside image container
},

  vendorDetails: {
    fontSize: '0.95rem',
    color: '#555',
  },
};

export default PlansShow;
