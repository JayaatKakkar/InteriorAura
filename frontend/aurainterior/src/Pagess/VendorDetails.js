import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VendorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vendor, setVendor] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [materialOptions, setMaterialOptions] = useState([]);
  const [allMaterials, setAllMaterials] = useState([]);

  const BASE_URL = "https://interioraura.onrender.com/";

  const fetchVendor = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`${BASE_URL}/Vendorlabelprice/${id}`);
      setVendor(response.data);
    } catch (err) {
      setError("Failed to fetch vendor details. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllMaterials = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/Material`);
      setAllMaterials(response.data);
    } catch (error) {
      console.error("Error fetching all materials", error);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/Vendorlabelprice/related/${id}`);
      setRelatedProducts(response.data);
    } catch (err) {
      console.error("Failed to fetch related products:", err);
      setRelatedProducts([]);
    }
  };

  const fetchMaterialsByCategory = async (subCatId, subSubCatId) => {
    try {
      const response = await axios.get(`${BASE_URL}/Material/${subCatId}/${subSubCatId}`);
      setMaterialOptions(response.data);
    } catch (error) {
      console.error("Failed to fetch related materials", error);
      setMaterialOptions([]);
    }
  };

  const handleBuyNow = (product) => {
    const itemToBuy = {
      _id: product._id,
      name_prod: product.name_prod,
      price: product.price,
      vendor_image: product.vendor_image,
      quantity: 1,
      parent_cat: product.parent_cat,
      sub_cat: product.sub_cat,
      sub_sub_cat: product.sub_sub_cat,
    };

    localStorage.setItem("purchaseItem", JSON.stringify(itemToBuy));
    navigate("/buy-now");
  };

  const handleRelatedClick = (newId) => {
    navigate(`/vendor/${newId}`);
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchVendor();
      await fetchAllMaterials();
      await fetchRelatedProducts();
    };
    loadData();
  }, [id]);

  useEffect(() => {
    if (!vendor || !vendor.sub_cat?._id || !vendor.sub_sub_cat?._id) return;
    fetchMaterialsByCategory(vendor.sub_cat._id, vendor.sub_sub_cat._id);
  }, [vendor]);

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div className="skeleton skeleton-title" style={styles.skeletonTitle}></div>
        <div className="skeleton skeleton-image" style={styles.skeletonImage}></div>
        <div className="skeleton skeleton-text" style={styles.skeletonText}></div>
        <div className="skeleton skeleton-text" style={styles.skeletonText}></div>
        <div className="skeleton skeleton-text" style={styles.skeletonText}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <p>{error}</p>
        <button onClick={fetchVendor} style={styles.retryButton}>Retry</button>
      </div>
    );
  }

  if (!vendor) return <div style={styles.center}>No vendor found.</div>;

  return (
    <main style={styles.container}>
      <article style={styles.card}>
        <h1 style={styles.title}>{vendor.name_prod}</h1>
        <div style={styles.flexWrapper}>
          <div style={styles.imageWrapper}>
            <img
              src={
                vendor.vendor_image?.startsWith("http")
                  ? vendor.vendor_image
                  : `${BASE_URL}/${vendor.vendor_image}`
              }
              alt={vendor.name_prod || "Vendor Image"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px",
                display: "block",
              }}
            />
          </div>

          <section style={styles.details}>
            <p><strong>{vendor.parent_cat?.name} ({vendor.sub_cat?.name})</strong></p>
            <p><strong>{vendor.sub_sub_cat?.name}</strong></p>
            <p><strong>Price:</strong>{" "}
              <span style={{ color: "green", fontWeight: "bold" }}>₹{vendor.price}</span>
            </p>

            <div style={{ marginTop: "10px" }}>
              <p><strong>Material:</strong> {vendor.mat_id?.material_name}</p>
              {vendor.mat_id?.material_image && (
                <img
                  src={
                    vendor.mat_id.material_image.startsWith("http")
                      ? vendor.mat_id.material_image
                      : `${BASE_URL}/${vendor.mat_id.material_image}`
                  }
                  alt={vendor.mat_id.material_name || "Material"}
                  style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "6px", display: "block", marginBottom: "5px" }}
                />
              )}
            </div>

            <p><strong>Dimensions:</strong></p>
            <div style={styles.matrix}>
              <div style={styles.box}><div style={styles.label}>Width</div>{vendor.dim_id?.width}</div>
              <div style={styles.box}><div style={styles.label}>Height</div>{vendor.dim_id?.height}</div>
              <div style={styles.box}><div style={styles.label}>Depth</div>{vendor.dim_id?.depth}</div>
              <div style={styles.box}><div style={styles.label}>Length</div>{vendor.dim_id?.length}</div>
            </div>

            <button
              onClick={() => handleBuyNow(vendor)}
              style={styles.cartButton}
            >
              Buy Now
            </button>

            {materialOptions.length > 0 && (
              <div>
                <h4>Other Materials in Same Category</h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {materialOptions.map((mat) => (
                    <div key={mat._id} style={styles.materialImageWrapper}>
                      <img
                        src={mat.material_image?.startsWith("http")
                          ? mat.material_image
                          : `${BASE_URL}/${mat.material_image}`}
                        alt={mat.material_name || "Material"}
                        style={styles.materialImage}
                      />
                      <p style={{ textAlign: "center", marginTop: "5px" }}>{mat.material_name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>

        <div>
          <h4>Related Products</h4>
          {Array.isArray(relatedProducts) && relatedProducts.length > 0 ? (
            <div style={styles.relatedGrid}>
              {relatedProducts.map((p) => (
                <div
                  key={p._id}
                  style={styles.relatedCard}
                  onClick={() => handleRelatedClick(p._id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleRelatedClick(p._id);
                    }
                  }}
                >
                  <img
                    src={
                      p.vendor_image?.startsWith("http")
                        ? p.vendor_image
                        : `${BASE_URL}/${p.vendor_image}`
                    }
                    alt={p.name_prod || "Related Product"}
                    style={styles.relatedImage}
                  />
                  <h5 style={styles.relatedTitle}>{p.name_prod}</h5>
                  <p style={styles.relatedPrice}>₹{p.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <div>No related products found.</div>
          )}
        </div>
      </article>
    </main>
  );
}

const styles = {
  container: {
    padding: "20px",
    width: "100vw",
    boxSizing: "border-box",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    width: "100%",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
    textAlign: "center",
  },
  flexWrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    alignItems: "flex-start",
  },
  imageWrapper: {
    flex: "1 1 40%",
    minWidth: "280px",
    height: "500px",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    padding: "40px",
  },
  details: {
    flex: "1 1 50%",
    fontSize: "1.1rem",
    lineHeight: "1.6",
    color: "#333",
    minWidth: "280px",
  },
  matrix: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px",
    width: "100%",
    marginTop: "10px",
    boxSizing: "border-box",
  },
  box: {
    padding: "12px 15px",
    fontWeight: "600",
    fontSize: "1.1rem",
    color: "black",
    textAlign: "center",
    backgroundColor: "#d3d3d3",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "70px",
  },
  label: {
    fontSize: "0.9rem",
    fontWeight: "700",
    marginBottom: "6px",
    color: "#B78D65",
  },
  cartButton: {
    marginTop: "15px",
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  materialImageWrapper: {
    marginTop: "10px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    maxWidth: "300px",
    backgroundColor: "#f0f0f0",
  },
  materialImage: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
    borderRadius: "6px",
  },
  loadingContainer: {
    maxWidth: "900px",
    margin: "auto",
    padding: "20px",
  },
  skeletonTitle: {
    height: "40px",
    backgroundColor: "#ddd",
    borderRadius: "8px",
    marginBottom: "20px",
    width: "60%",
    animation: "pulse 1.5s infinite",
  },
  skeletonImage: {
    height: "250px",
    backgroundColor: "#ddd",
    borderRadius: "10px",
    marginBottom: "20px",
    animation: "pulse 1.5s infinite",
  },
  skeletonText: {
    height: "20px",
    backgroundColor: "#ddd",
    borderRadius: "8px",
    marginBottom: "15px",
    width: "80%",
    animation: "pulse 1.5s infinite",
  },
  errorContainer: {
    textAlign: "center",
    color: "red",
    padding: "20px",
  },
  retryButton: {
    marginTop: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
  },
  center: {
    textAlign: "center",
    padding: "20px",
  },
  relatedGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginTop: "15px",
  },
  relatedCard: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    textAlign: "center",
    backgroundColor: "#fafafa",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
  },
  relatedImage: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  relatedTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    margin: "10px 0 5px",
  },
  relatedPrice: {
    fontSize: "1rem",
    color: "green",
    fontWeight: "bold",
  },
};
