import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Material = () => {
  const [mtrs, setMtrs] = useState([]);
  const [material_name, setMaterialName] = useState('');
  const [material_quality, setMaterialQuality] = useState('');
  const [material_price, setMaterialPrice] = useState('');
  const [material_image, setImage] = useState(null);
  const [parent_cat, setParentCat] = useState('');
  const [sub_cat, setSubCat] = useState('');
  const [subSubCat, setSubSubCat] = useState('');
  const [submittedby, setSubmittedBy] = useState('');
  const [submittedbyname, setSubmittedByName] = useState('');
  const [existingImage, setExistingImage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);
  const [parentCategories, setParentCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);

  useEffect(() => {
    fetchParentCategories();
    fetchMaterials();
    const user = localStorage.getItem('admin');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setSubmittedBy(parsedUser.id || '');
        setSubmittedByName(parsedUser.name || '');
      } catch (err) {
        console.error('Error parsing user from localStorage:', err);
      }
    }
  }, []);

  const fetchParentCategories = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/category/parents');
      const data = await res.json();
      setParentCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch parent categories', err);
    }
  };

  const fetchMaterials = async () => {
    try {
      const res = await axios.get('http://localhost:5000/Material');
      setMtrs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Fetch error:', err);
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
    }
  };

  const fetchSubSubCategories = async (subCatId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/category/subsubs/${subCatId}`);
      const data = await res.json();
      setSubSubCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching sub-sub categories', err);
    }
  };

  const handleParentChange = async (e) => {
    const id = e.target.value;
    setParentCat(id);
    setSubCat('');
    setSubSubCat('');
    setSubCategories([]);
    setSubSubCategories([]);
    if (id) {
      await fetchSubCategories(id);
    }
  };

  const handleSubCatChange = async (e) => {
    const id = e.target.value;
    setSubCat(id);
    setSubSubCat('');
    setSubSubCategories([]);
    if (id) {
      await fetchSubSubCategories(id);
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
    formData.append('sub_sub_cat', subSubCat);
    formData.append('submittedby', submittedby);
    formData.append('submittedbyname', submittedbyname);
    if (material_image) {
      formData.append('material_image', material_image);
    } else if (existingImage) {
      formData.append('existing_image', existingImage);
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/Material/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5000/Material', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      // Reset form
      setMaterialName('');
      setMaterialQuality('');
      setMaterialPrice('');
      setParentCat('');
      setSubCat('');
      setSubSubCat('');
      setImage(null);
      setExistingImage('');
      setSubCategories([]);
      setSubSubCategories([]);
      if (fileInputRef.current) fileInputRef.current.value = null;

      fetchMaterials();
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  const handleEdit = async (mtr) => {
    setEditingId(mtr._id);
    setMaterialName(mtr.material_name);
    setMaterialQuality(mtr.material_quality);
    setMaterialPrice(mtr.material_price);
    setImage(null);
    setExistingImage(mtr.material_image);

    const parentId = mtr.parent_cat._id || mtr.parent_cat;
    const subId = mtr.sub_cat._id || mtr.sub_cat;
    const subSubId = mtr.sub_sub_cat?._id || mtr.sub_sub_cat;

    setParentCat(parentId);
    await fetchSubCategories(parentId);
    setSubCat(subId);
    await fetchSubSubCategories(subId);
    setSubSubCat(subSubId);

    if (fileInputRef.current) fileInputRef.current.value = null;
  };

const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this material?")) {
    try {
      await axios.delete(`http://localhost:5000/Material/${id}`);
      fetchMaterials();
    } catch (err) {
      console.error('Delete error:', err);
    }
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
            <div className="mb-3">
              <label className="form-label"><strong>Parent Category</strong></label>
              <select className="form-select" value={parent_cat} onChange={handleParentChange} required>
                <option value="">-- Select Parent Category --</option>
                {parentCategories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label"><strong>Sub Category</strong></label>
              <select className="form-select" value={sub_cat} onChange={handleSubCatChange} required disabled={!parent_cat}>
                <option value="">-- Select Sub Category --</option>
                {subCategories.map(sub => (
                  <option key={sub._id} value={sub._id}>{sub.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label"><strong>Sub-Sub Category</strong></label>
              <select className="form-select" value={subSubCat} onChange={(e) => setSubSubCat(e.target.value)} disabled={!sub_cat}>
                <option value="">-- Select Sub-Sub Category --</option>
                {subSubCategories.map(subSub => (
                  <option key={subSub._id} value={subSub._id}>{subSub.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label><strong>Material Name</strong></label>
              <input className="form-control" value={material_name} onChange={(e) => setMaterialName(e.target.value)} required />
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label><strong>Quality</strong></label>
                <input className="form-control" value={material_quality} onChange={(e) => setMaterialQuality(e.target.value)} required />
              </div>
              <div className="col-md-6">
                <label><strong>Price</strong></label>
                <input className="form-control" value={material_price} onChange={(e) => setMaterialPrice(e.target.value)} required />
              </div>
            </div>

            <div className="mt-3">
              <label><strong>Upload Image</strong></label>
              <input className="form-control" type="file" ref={fileInputRef} onChange={(e) => setImage(e.target.files[0])} />
              {editingId && existingImage && (
                <div className="mt-2">
                  <p>Current Image:</p>
                  <img src={`http://localhost:5000/${existingImage}`} alt="material" width="120" height="120" />
                </div>
              )}
            </div>

            <div className="mt-3">
              <label><strong>Submitted By</strong></label>
              <input className="form-control" value={submittedby} readOnly required />
            </div>

            <div className="mt-3">
              <label><strong>Submitted By (Name)</strong></label>
              <input className="form-control" value={submittedbyname} readOnly required />
            </div>

            <div className="card-footer text-center mt-4">
              <button type="submit" className="btn w-100" style={{ backgroundColor: "#B78D65", color: "white" }}>
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
                  <th>Sub-Sub Category</th>
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
                    <td>₹{mtr.material_price}</td>
                    <td>{mtr.parent_cat?.name}</td>
                    <td>{mtr.sub_cat?.name}</td>
                    <td>{mtr.sub_sub_cat?.name || '-'}</td>
                    <td>
                      {mtr.material_image && (
                        <img src={`http://localhost:5000/${mtr.material_image}`} alt="material" width="120" height="120" />
                      )}
                    </td>
                    <td>{mtr.submittedby}</td>
                    <td>{mtr.submittedbyname}</td>
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
