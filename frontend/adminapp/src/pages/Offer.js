import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Offer = () => {
  const [ofrs, setOfrs] = useState([]);
  const [offer_name, setOfferName] = useState('');
  const [starting_date, setOfferStartingdate] = useState('');
  const [end_date, setOfferEnddate] = useState('');
  const [offer_code, setOfferCode] = useState('');
  const [offer_percentage, setOfferPercentage] = useState('');
  const [offer_image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null); // file input reference

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/Offer');
      if (Array.isArray(res.data)) {
        setOfrs(res.data);
      } else {
        setOfrs([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setOfrs([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('offer_name', offer_name);
    formData.append('starting_date', starting_date);
    formData.append('end_date', end_date);
    formData.append('offer_code', offer_code);
    formData.append('offer_percentage', offer_percentage);

    if (offer_image) {
      formData.append('offer_image', offer_image);
    } else if (existingImage) {
      formData.append('existing_image', existingImage);
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/Offer/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5000/Offer', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      // Reset form
      setOfferName('');
      setOfferStartingdate('');
      setOfferEnddate('');
      setOfferCode('');
      setOfferPercentage('');
      setImage(null);
      setExistingImage('');
      fileInputRef.current.value = null; // clear file input
      fetchOffers();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this offer?")) {
    try {
      await axios.delete(`http://localhost:5000/Offer/${id}`);
      fetchOffers();
    } catch (err) {
      console.error("Delete error:", err);
    }
  }
};


  const formatDate = (dateStr) => (dateStr ? dateStr.split('T')[0] : '');

  const handleEdit = (ofr) => {
    setEditingId(ofr._id);
    setOfferName(ofr.offer_name);
    setOfferStartingdate(formatDate(ofr.starting_date));
    setOfferEnddate(formatDate(ofr.end_date));
    setOfferCode(ofr.offer_code);
    setOfferPercentage(ofr.offer_percentage);
    setExistingImage(ofr.offer_image);
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = null; // also clear on edit
  };

  return (

    <div className="container mt-5">
      <div className="card shadow">
        <h1 className="card-header text-center mb-4" style={{ backgroundColor: "#171e45", color: "white" }}>
          Offer Table
        </h1>
        <div className="card-body">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row g-3 mt-3">
              <div className="col-12">
                <label><h6>Offer</h6></label>
                <input
                  className="form-control"
                  value={offer_name}
                  onChange={(e) => setOfferName(e.target.value)}
                  placeholder="Enter Offer Name"
                  required
                />
              </div>
            </div><br />

            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label><h6>Starting Date</h6></label>
                <input
                  type="date"
                  className="form-control"
                  value={starting_date}
                  onChange={(e) => setOfferStartingdate(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <label><h6>Ending Date</h6></label>
                <input
                  type="date"
                  className="form-control"
                  value={end_date}
                  onChange={(e) => setOfferEnddate(e.target.value)}
                  required
                />
              </div>
            </div><br />

            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label><h6>Offer Code</h6></label>
                <input
                  className="form-control"
                  value={offer_code}
                  onChange={(e) => setOfferCode(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <label><h6>Offer Percentage</h6></label>
                <input
                  className="form-control"
                  value={offer_percentage}
                  onChange={(e) => setOfferPercentage(e.target.value)}
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
                {editingId && existingImage && (
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
            </div><br/>
            <button 
          type="submit" 
           className="btn w-100"
            style={{ backgroundColor: "#B78D65", color: "white" }}
                    >
            {editingId ? 'Update Material' : 'Add Material'}
          </button>

          </form>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-center mb-4">Offer List</h3>
        {ofrs.length === 0 ? (
          <p className="text-center text-muted">No Offer Available</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped text-center align-middle shadow">
              <thead className="bg-primary text-white">
                <tr>
                  <th>Offer Name</th>
                  <th>Starting Date</th>
                  <th>End Date</th>
                  <th>Offer Code</th>
                  <th>Offer Percentage</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {ofrs.map((ofr) => (
                  <tr key={ofr._id}>
                    <td>{ofr.offer_name}</td>
                    <td>{ofr.starting_date}</td>
                    <td>{ofr.end_date}</td>
                    <td>{ofr.offer_code}</td>
                    <td>{ofr.offer_percentage}</td>
                    <td>
                      {ofr.offer_image && (
                        <img
                          src={`http://localhost:5000/${ofr.offer_image}`}
                          alt="offer"
                          width="120"
                          height="120"
                        />
                      )}
                    </td>
                    <td>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(ofr)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(ofr._id)}>Delete</button>
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

export default Offer;
