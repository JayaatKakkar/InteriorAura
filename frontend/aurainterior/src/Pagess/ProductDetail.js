import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetail() {
  const { vendorId } = useParams();
  const [vendorDetails, setVendorDetails] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/Vendorlabelprice/${vendorId}`)
      .then((response) => {
        setVendorDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vendor details:", error);
      });
  }, [vendorId]);

  if (!vendorDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.appContainer}>
        <div style={styles.mainContent}>
          <h2>{vendorDetails.name_prod}</h2>
          <img
            src={
              vendorDetails.vendor_image.startsWith("http")
                ? vendorDetails.vendor_image
                : `http://localhost:5000/${vendorDetails.vendor_image}`
            }
            alt="Vendor"
            style={styles.vendorImage}
          />
          <p><strong>Price:</strong> ₹{vendorDetails.price}</p>
          <p><strong>Description:</strong> {vendorDetails.description}</p>
          <p><strong>Additional Info:</strong> {vendorDetails.additional_info}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    height: "100vh",
    width: "100vw",
    overflowX: "hidden",
    overflowY: "auto",
  },
  appContainer: {
    display: "flex",
    height: "100%",
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "#f4f7f6",
  },
  mainContent: {
    flex: 1,
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
  },
  vendorImage: {
    width: "100%",
    height: "400px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
  },
};
