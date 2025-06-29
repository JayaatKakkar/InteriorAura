import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Packages = () => {
  const [pcks, setPcks] = useState([]);
  const [package_name, setPackageName] = useState('');
  const [package_donationmonth, setPackageDonationMonth] = useState('');
  const [package_details, setPackageDetails] = useState('');
  const [package_plan, setPackagePlans] = useState('');
  const [package_price, setPackagePrice] = useState('');
  const [package_image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const [editingId_package, setEditingIdPackage] = useState(null);
  const fileInputRef = useRef(null); // file input reference

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/packs');
      if (Array.isArray(res.data)) {
        setPcks(res.data);
      } else {
        setPcks([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setPcks([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('package_name', package_name);
    formData.append('package_donationmonth', package_donationmonth);
    formData.append('package_details', package_details);
    formData.append('package_plan', package_plan);
    formData.append('package_price', package_price);

    if (package_image) {
      formData.append('package_image', package_image);
    } else if (existingImage) {
      formData.append('existing_image', existingImage);
    }

    try {
      if (editingId_package) {
        await axios.put(`http://localhost:5000/packs/${editingId_package}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setEditingIdPackage(null);
      } else {
        await axios.post('http://localhost:5000/packs', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      // Reset form
      setPackageName('');
      setPackageDonationMonth('');
      setPackageDetails('');
      setPackagePlans('');
      setPackagePrice('');
      setImage(null);
      setExistingImage('');
      fileInputRef.current.value = null; // clear file input
      fetchPackages();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/packs/${id}`);
      fetchPackages();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };


  const handleEdit = (pck) => {
    setEditingIdPackage(pck._id);
    setPackageName(pck.package_name);
    setPackageDonationMonth(pck.package_donationmonth);
    setPackageDetails(pck.package_details);
    setPackagePlans(pck.package_plan);
    setPackagePrice(pck.package_price);
    setExistingImage(pck.package_image);
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = null; // also clear on edit
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <h1 className="card-header text-center mb-4" style={{ backgroundColor: "#171e45", color: "white" }}>
          Packages Table
        </h1>
        <div className="card-body">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row g-3 mt-3">
              <div className="col-12">
                <label><h6>Package Name</h6></label>
                <input
                  className="form-control"
                  value={package_name}
                  onChange={(e) => setPackageName(e.target.value)}
                  placeholder="Enter Package Name"
                  required
                />
              </div>
            </div><br />

            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label><h6>Package Donation/Month</h6></label>
                <input
                  className="form-control"
                  value={package_donationmonth}
                  onChange={(e) => setPackageDonationMonth(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <label><h6>Package Details</h6></label>
                <input
                  className="form-control"
                  value={package_details}
                  onChange={(e) => setPackageDetails(e.target.value)}
                  required
                />
              </div>
            </div><br />

            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label><h6>No. of Plans</h6></label>
                <input
                  className="form-control"
                  value={package_plan}
                  onChange={(e) => setPackagePlans(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <label><h6>Price</h6></label>
                <input
                  className="form-control"
                  value={package_price}
                  onChange={(e) => setPackagePrice(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row g-3 mt-3">
              <div className="col-12">
                <label><h6>Upload Image</h6></label>
                <input
                  className="form-control"
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => setImage(e.target.files[0])}
                />
                {editingId_package && existingImage && (
                  <div className="mt-2">
                    <p>Current Image:</p>
                    <img
                      src={`http://localhost:5000/${existingImage}`}
                      alt="Current offer"
                      width="120"
                      height="120"
                      style={{ borderRadius: '8px', border: '1px solid #ccc' }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="card-footer text-center mt-4">
            <button 
          type="submit" 
           className="btn w-100"
            style={{ backgroundColor: "#B78D65", color: "white" }}>
                {editingId_package ? 'Update Package' : 'Add Package'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-center mb-4">Package List</h3>
        {pcks.length === 0 ? (
          <p className="text-center text-muted">No Package Available</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped text-center align-middle shadow">
              <thead className="bg-primary text-white">
                <tr>
                  <th>Package Name</th>
                  <th>Package Donation/Month</th>
                  <th>Package Details</th>
                  <th>No of Plans</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pcks.map((pck) => (
                  <tr key={pck._id}>
                    <td>{pck.package_name}</td>
                    <td>{pck.package_donationmonth}</td>
                    <td>{pck.package_details}</td>
                    <td>{pck.package_plan}</td>
                    <td>{pck.package_price}</td>
                    <td>
                      {pck.package_image && (
                        <img
                          src={`http://localhost:5000/${pck.package_image}`}
                          alt="offer"
                          width="120"
                          height="120"
                        />
                      )}
                    </td>
                    <td>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(pck)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(pck._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Packages;


