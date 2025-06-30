import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";

export default function Services() {
  const [activeTab, setActiveTab] = useState("tab-1");
  const { parent_id } = useParams();
  const [parentSubCategories, setParentSubCategories] = useState([]);
  const [parentSubSubCategories, setParentSubSubCategories] = useState([]);
  const [vendorData, setVendorData] = useState([]);
  const [error, setError] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  useEffect(() => {
    setSelectedCategory(parent_id);
    console.log("Selected Parent Category ID:", parent_id);

    // Fetch sub-categories
    fetch(`https://interioraura.onrender.com/api/category/subs/${parent_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setParentSubCategories(data);
        } else if (data?.categories && Array.isArray(data.categories)) {
          setParentSubCategories(data.categories);
        } else {
          setParentSubCategories([]);
          console.error('Invalid data format:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setError('Error fetching categories');
        setParentSubCategories([]);
      });

    // Initial vendor data
    axios.post("https://interioraura.onrender.com/Vendorlabelprice/filter", {
      parentCategory: parent_id,
      subCategory: null,
      subSubCategory: null
    })
      .then((response) => {
        console.log("Initial vendor details:", response.data.vendorDetails);
        setVendorData(response.data.vendorDetails);
      })
      .catch((error) => {
        console.error("Error fetching vendor details:", error);
        setVendorData([]);
      });
  }, [parent_id]);

  const handleCategoryClick = (category) => {
    setSelectedSubCategory(category);
    setSelectedSubSubCategory(null);
    setVendorData([]);

    fetch(`https://interioraura.onrender.com/api/category/subsubs/${category}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setParentSubSubCategories(data);
        } else if (data && data.categories && Array.isArray(data.categories)) {
          setParentSubSubCategories(data.categories);
        } else {
          setParentSubSubCategories([]);
          console.error('Invalid data format:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching sub-subcategories:', error);
        setError('Error fetching sub-subcategories');
        setParentSubSubCategories([]);
      });

    axios.post("https://interioraura.onrender.com/Vendorlabelprice/filter", {
      parentCategory: parent_id,
      subCategory: category,
      subSubCategory: null,
    })
      .then((response) => {
        console.log("Default vendor details:", response.data.vendorDetails);
        setVendorData(response.data.vendorDetails);
      })
      .catch((error) => {
        console.error("Error fetching vendor details:", error);
        setVendorData([]);
      });
  };

  const handleSubSubCategoryClick = (subSubCat) => {
    setSelectedSubSubCategory(subSubCat._id);

    axios.post("https://interioraura.onrender.com/Vendorlabelprice/filter", {
      parentCategory: parent_id,
      subCategory: selectedSubCategory,
      subSubCategory: subSubCat._id
    })
      .then((response) => {
        console.log("Vendor details:", response.data.vendorDetails);
        setVendorData(response.data.vendorDetails);
      })
      .catch((error) => {
        console.error("Error fetching vendor details:", error);
        setVendorData([]);
      });
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.appContainer}>
        <div style={styles.sidebar}>
          {parentSubCategories.map((subCat) => (
            <div
              key={subCat._id}
              style={{
                ...styles.sidebarItem,
                ...(selectedCategory === subCat._id ? styles.selectedSidebarItem : {}),
              }}
              onClick={() => handleCategoryClick(subCat._id)}
            >
              {subCat.name}
            </div>
          ))}
        </div>

        <div style={styles.mainContent}>
          <div className="text-center mx-auto mb-4" style={{ maxWidth: 600 }}>
            <h4 className="section-title">Our Services</h4>
            <h1 className="display-5 mb-4">
              We Focused On Modern Architecture And Interior Design
            </h1>
          </div>

          {selectedCategory && parentSubSubCategories.length > 0 && (
            <div style={styles.subNav}>
              <div style={styles.subCategoryButtonsRow}>
                {parentSubSubCategories.map((subSubCat) => (
                  <div
                    key={subSubCat._id}
                    style={{
                      ...styles.subCategoryButton,
                      ...(subSubCat._id === selectedSubSubCategory ? styles.selectedButton : {}),
                      ...(hoveredButton === subSubCat._id ? styles.subCategoryButtonHover : {}),
                    }}
                    onClick={() => handleSubSubCategoryClick(subSubCat)}
                    onMouseEnter={() => setHoveredButton(subSubCat._id)}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    {subSubCat.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {vendorData.length > 0 && (
            <div style={styles.vendorList}>
              <div style={styles.vendorGrid}>
{vendorData.map((vendor, index) => (
  <div key={index} style={styles.vendorCard}>
    {vendor.vendor_image && (
<Link to={`/vendor/${vendor._id}`} style={{ textDecoration: "none" }}>
  <img
    src={
      vendor.vendor_image.startsWith("http")
        ? vendor.vendor_image
        : `https://interioraura.onrender.com/${vendor.vendor_image}`
    }
    alt="Vendor"
    style={styles.vendorImage}
  />
</Link>
    )}
    <p style={{ textAlign: 'center' }}><strong>{vendor.name_prod}</strong></p>
    <p style={{ textAlign: 'center' }}><strong>Price:</strong> ₹{vendor.price}</p>
  </div>
))}

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    height: "100vh",
    width: "100vw",
    overflowX: "hidden",  // prevent horizontal scroll
    overflowY: "auto",    // allow vertical scroll
  },
  appContainer: {
    display: "flex",
    height: "100%",
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: "#f4f7f6",
    overflowX: "hidden",  // prevent horizontal scroll
    overflowY: "auto", 
    maxWidth: "100%",    // allow vertical scroll if needed
  },
  sidebar: {
    width: "250px",
    background: "linear-gradient(135deg, #2d2d2d, #3e3e3e)",
    color: "#fff",
    padding: "20px",
    borderRight: "1px solid #ccc",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },
  sidebarItem: {
    padding: "15px",
    cursor: "pointer",
    borderRadius: "5px",
    marginBottom: "10px",
    backgroundColor: "#3b3b3b",
    transition: "0.3s",
    fontSize: "18px",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  selectedSidebarItem: {
    backgroundColor: "#e2b97f",
    color: "#fff",
    boxShadow: "0 4px 10px rgba(226, 185, 127, 0.5)",
  },
  mainContent: {
    flex: 1,
    padding: "30px",
    overflow: "auto",
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
  },
  subNav: {
    marginBottom: "30px",
    display: "flex",
    flexDirection: "column",
  },
  subCategoryButtonsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    justifyContent: "flex-start",
  },
  subCategoryButton: {
    marginBottom: "12px",
    padding: "12px 25px",
    cursor: "pointer",
    border: "2px solid #3b3b3b",
    borderRadius: "50px",
    backgroundColor: "#fff",
    color: "#3b3b3b",
    transition: "0.3s ease",
    fontSize: "16px",
    fontWeight: "500",
    textTransform: "uppercase",
    minWidth: "120px",
    textAlign: "center",
  },
  selectedButton: {
    backgroundColor: "#e2b97f",
    color: "#fff",
    borderColor: "#e2b97f",
    transform: "scale(1.1)",
    boxShadow: "0 4px 12px rgba(226, 185, 127, 0.5)",
  },
  subCategoryButtonHover: {
    backgroundColor: "#f0e1c7",
    color: "#3b3b3b",
    borderColor: "#f0e1c7",
  },
  vendorList: {
    marginTop: "30px",
  },
  vendorGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  vendorCard: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#fafafa",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  },
  vendorImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
  },
//   html, body : {
//   margin:'0',
//   padding: '0',
//   overflow: 'hidden',
//   height: '100%',
// },
}; 