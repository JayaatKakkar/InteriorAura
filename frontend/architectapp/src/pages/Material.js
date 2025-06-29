
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Material = () => {
  const [mtrs, setMtrs] = useState([]);
  const [username, setUsername] = useState([]);
  const [material_name, setMaterialName] = useState('');
  const [material_quality, setMaterialQuality] = useState('');
  const [material_price, setMaterialPrice] = useState('');
  const [material_image, setImage] = useState(null);
  const [parent_cat, setPatentCat] = useState('');
  const [sub_cat, setSubCat] = useState('');
  const [submittedby, setSubmittedBy] = useState('');
  const [existingImage, setExistingImage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);
  const [parentCategories, setParentCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // Fetch parent categories and materials on mount
  useEffect(() => {
    fetch('http://localhost:5000/api/category/parents')
      .then(res => res.json())
      .then(setParentCategories)
      .catch(err => console.error("Failed to fetch parent categories", err));
      const user = localStorage.getItem("arch");
      if (user) {
        try {
          const parsedUser = JSON.parse(user);
          setUsername(parsedUser.name || '');
        } catch (e) {
          console.error("Error parsing user from localStorage:", e);
          setUsername('');
        }
      }
    fetchMaterials();
  }, []);



  const fetchMaterials = async () => {
    try {
      const res = await axios.get('http://localhost:5000/Material');
      setMtrs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setMtrs([]);
    }
  };

  const fetchSubCategories = async (parentId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/category/subs/${parentId}`);
      const data = await res.json();
      setSubCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching sub-categories', err);
      setSubCategories([]);
    }
  };

  const handleParentChange = (e) => {
    const selectedId = e.target.value;
    setPatentCat(selectedId);
    setSubCat('');
    if (selectedId) {
      fetchSubCategories(selectedId);
    } else {
      setSubCategories([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('material_name', material_name);
    formData.append('material_quality', material_quality);
    formData.append('material_price', material_price);
    formData.append('parent_cat', parent_cat);
    formData.append('sub_cat', sub_cat);
    formData.append('submittedby', submittedby);
    if (material_image) {
      formData.append('material_image', material_image);
    } else if (existingImage) {
      formData.append('existing_image', existingImage);
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/Material/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5000/Material', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      // Reset form
      setMaterialName('');
      setMaterialQuality('');
      setMaterialPrice('');
      setPatentCat('');
      setSubCat('');
      setImage(null);
      setSubmittedBy('');
      setExistingImage('');
      setSubCategories([]);
      fileInputRef.current.value = null;
      fetchMaterials();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleEdit = async (mtr) => {
    setEditingId(mtr._id);
    setMaterialName(mtr.material_name);
    setMaterialQuality(mtr.material_quality);
    setMaterialPrice(mtr.material_price);
    setImage(null);
    setExistingImage(mtr.material_image);
  
    // Extract IDs from populated or raw refs
    const parentId = mtr.parent_cat._id || mtr.parent_cat;
    const subId = mtr.sub_cat._id || mtr.sub_cat;
  
    setPatentCat(parentId);
    await fetchSubCategories(parentId);  // Wait for sub-categories to load
    setSubCat(subId);  // Set sub-cat after subcategories are loaded
  
    if (fileInputRef.current) fileInputRef.current.value = null;
  };
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/Material/${id}`);
      fetchMaterials();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <h1 className="card-header text-center mb-4" style={{ backgroundColor: "#171e45", color: "white" }}>
          Material Table
        </h1>
        <div className="card-body">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row g-3 mt-3">
              <div className="col-12">
                <label><h6>Material</h6></label>
                <input
                  className="form-control"
                  value={material_name}
                  onChange={(e) => setMaterialName(e.target.value)}
                  placeholder="Enter Material Name"
                  required
                />
              </div>
            </div><br />

            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label><h6>Quality</h6></label>
                <input
                  className="form-control"
                  value={material_quality}
                  onChange={(e) => setMaterialQuality(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <label><h6>Price</h6></label>
                <input
                  className="form-control"
                  value={material_price}
                  onChange={(e) => setMaterialPrice(e.target.value)}
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
                      alt="Current material"
                      width="120"
                      height="120"
                      style={{ borderRadius: '8px', border: '1px solid #ccc' }}
                    />
                  </div>
                )}
              </div>
            </div><br />

            <div className="mb-3">
              <label className="form-label"><strong>Parent Category</strong></label>
              <select
                name="parent_cat"
                className="form-select"
                value={parent_cat || ''}
                onChange={handleParentChange}
                required
              >
                <option value="">-- Select Parent Category --</option>
                {parentCategories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label"><strong>Sub Category</strong></label>
              <select
                name="sub_cat"
                className="form-select"
                value={sub_cat || ''}
                onChange={(e) => setSubCat(e.target.value)}
                disabled={!parent_cat}
                required
              >
                <option value="">-- Select Sub Category --</option>
                {subCategories.map(sub => (
                  <option key={sub._id} value={sub._id}>{sub.name}</option>
                ))}
              </select>
            </div>

            <div className="row g-3 mt-3">
              <div className="col-12">
                <label><h6>Submitted By</h6></label>
                <input
                  className="form-control"
                  value={username}
                  readOnly
                  required
                />
              </div>
            </div>

            <div className="card-footer text-center mt-4">
            <button 
          type="submit" 
           className="btn w-100"
            style={{ backgroundColor: "#B78D65", color: "white" }}
                    >
            {editingId ? 'Update Material' : 'Add Material'}
          </button>
           </div>

          </form>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-center mb-4">Material List</h3>
        {mtrs.length === 0 ? (
          <p className="text-center text-muted">No Material Available</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped text-center align-middle shadow">
              <thead className="bg-primary text-white">
                <tr>
                  <th>Material Name</th>
                  <th>Quality</th>
                  <th>Price</th>
                  <th>Parent Category</th>
                  <th>Sub Category</th>
                  <th>Image</th>
                  <th>Submitted By</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mtrs.map((mtr) => (
                  <tr key={mtr._id}>
                    <td>{mtr.material_name}</td>
                    <td>{mtr.material_quality}</td>
                    <td>{mtr.material_price}</td>
                    <td>{mtr.parent_cat.name}</td>
                    <td>{mtr.sub_cat.name}</td>
                    <td>
                      {mtr.material_image && (
                        <img
                          src={`http://localhost:5000/${mtr.material_image}`}
                          alt="material"
                          width="120"
                          height="120"
                        />
                      )}
                    </td>
                    <td>{mtr.submittedby}</td>
                    <td>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(mtr)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(mtr._id)}>Delete</button>
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

export default Material;
