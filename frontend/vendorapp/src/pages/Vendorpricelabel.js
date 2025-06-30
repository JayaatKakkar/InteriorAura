import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Vendorpricelabel = () => {
  const [vnds, setVnds] = useState([]);
  const [vendor_id, setVendorId] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [parent_cat, setParentCat] = useState('');
  const [sub_cat, setSubCat] = useState('');
  const [sub_sub_cat, setSubSubCat] = useState('');
  const [name_prod, setProdName] = useState('');
  const [mat_id, setMaterial] = useState('');
  const [dim_id, setDimension] = useState('');
  const [price, setPrice] = useState('');
  const [vendor_image, setVendorImage] = useState(null);
  const [status, setStatus] = useState('active');
  const [existingImage, setExistingImage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);

  const [parentCategories, setParentCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [materialId, setMaterialId] = useState([]);
  const [dimensionId, setDimensionId] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      // Fetch parent categories
      const parentRes = await fetch('https://interioraura.onrender.com/api/category/parents');
      const parentData = await parentRes.json();
      setParentCategories(parentData);

      // Fetch other resources
      await fetchVendorpricelabels();
      await fetchMaterials();
      await fetchDimensions();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Call data fetching function
  fetchData();

  // Get user from localStorage
const user = localStorage.getItem('vendor');
if (user) {
  try {
    const parsedUser = JSON.parse(user);
    setVendorId(parsedUser.id || '');
    setVendorName(parsedUser.name || '');
  } catch (err) {
    console.error('Error parsing user from localStorage:', err);
  }
}

}, []);



  const fetchMaterials = async () => {
    try {
      const res = await axios.get('https://interioraura.onrender.com/Material');
      setMaterialId(res.data);
    } catch (err) {
      console.error("Failed to fetch materials", err);
    }
  };

  const fetchDimensions = async () => {
    try {
      const res = await axios.get('https://interioraura.onrender.com/Dimension');
      setDimensionId(res.data);
    } catch (err) {
      console.error("Failed to fetch dimensions", err);
    }
  };

  const fetchSubCategories = async (parentId) => {
    try {
      const res = await fetch(`https://interioraura.onrender.com/api/category/subs/${parentId}`);
      const data = await res.json();
      setSubCategories(data);
    } catch (err) {
      console.error('Error fetching sub-categories', err);
      setSubCategories([]);
    }
  };

  const fetchSubSubCategories = async (subCatId) => {
    try {
      const res = await fetch(`https://interioraura.onrender.com/api/category/subsubs/${subCatId}`);
      const data = await res.json();
      setSubSubCategories(data);
    } catch (err) {
      console.error('Error fetching sub-sub categories', err);
      setSubSubCategories([]);
    }
  };

  const fetchFilteredMaterials = async (subSubCategoryId) => {
    try {
      const res = await axios.get(`https://interioraura.onrender.com/Material/catmat/${subSubCategoryId}`);
      setMaterialId(res.data);
    } catch (err) {
      console.error("Failed to fetch filtered materials", err);
    }
  };

  const fetchFilteredDimensions = async (subSubCategoryId) => {
    try {
      const res = await axios.get(`https://interioraura.onrender.com/Dimension/catdim/${subSubCategoryId}`);
      setDimensionId(res.data);
    } catch (err) {
      console.error("Failed to fetch filtered dimensions", err);
    }
  };

  const handleParentChange = (e) => {
    const selectedId = e.target.value;
    setParentCat(selectedId);
    setSubCat('');
    setSubSubCat('');
    setMaterialId([]);
    setDimensionId([]);
    if (selectedId) fetchSubCategories(selectedId);
    else setSubCategories([]);
  };

  const handleSubChange = (e) => {
    const selectedId = e.target.value;
    setSubCat(selectedId);
    setSubSubCat('');
    setMaterialId([]);
    setDimensionId([]);
    if (selectedId) fetchSubSubCategories(selectedId);
    else setSubSubCategories([]);
  };

  const handleSubSubChange = (e) => {
    const selectedId = e.target.value;
    setSubSubCat(selectedId);
    if (selectedId) {
      fetchFilteredMaterials(selectedId);
      fetchFilteredDimensions(selectedId);
    } else {
      setMaterialId([]);
      setDimensionId([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('vendor_id', vendor_id);
    formData.append('parent_cat', parent_cat);
    formData.append('sub_cat', sub_cat);
    formData.append('sub_sub_cat', sub_sub_cat);
    formData.append('name_prod', name_prod);
    formData.append('mat_id', mat_id);
    formData.append('dim_id', dim_id);
    formData.append('price', price);
    formData.append('status', status);
       if (vendor_image) {
      formData.append('vendor_image', vendor_image);
    } else if (existingImage) {
      formData.append('existing_image', existingImage);
    }

    try {
      if (editingId) {
        await axios.put(`https://interioraura.onrender.com/Vendorlabelprice/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setEditingId(null);
      } else {
        await axios.post('https://interioraura.onrender.com/Vendorlabelprice', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      // setPlanname('');
      // setPlandesc('');
      setParentCat('');
      setSubCat('');
      setSubSubCat('');
      setProdName('');
      setMaterial('');
      setDimension('');
      setPrice('');
      setStatus('active');
      setVendorImage(null);
      setExistingImage('');
      setSubCategories([]);
      setSubSubCategories([]);
      fileInputRef.current.value = null;
      fetchVendorpricelabels();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const fetchVendorpricelabels = async () => {
    try {
      const res = await axios.get('https://interioraura.onrender.com/Vendorlabelprice');
      setVnds(res.data);
    } catch (err) {
      console.error("Failed to fetch blueprints", err);
    }
  };

  const handleEdit = (vd) => {
    console.log(vd.sub_cat._id);
    fetchSubCategories(vd.parent_cat._id);
    fetchSubSubCategories(vd.sub_cat._id)
    setEditingId(vd._id);
    setParentCat(vd.parent_cat._id);
    setSubCat(vd.sub_cat._id);
    setSubSubCat(vd.sub_sub_cat._id);
    setProdName(vd.name_prod);
    setMaterial(vd.mat_id._id);
    setDimension(vd.dim_id._id);
    setPrice(vd.price);
    setStatus(vd.status);
    setExistingImage(vd.vendor_image);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://interioraura.onrender.com/Vendorlabelprice/${id}`);
      fetchVendorpricelabels();
    } catch (err) {
      console.error("Error deleting blueprint:", err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <h1 className="card-header text-center" style={{ backgroundColor: "#171e45", color: "white" }}>
          Vendor Price Label
        </h1>
        <div className="card-body">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label><h6>Vendor Name</h6></label>
            <input
              className="form-control"
              value={vendorName}
              readOnly
            />
          </div>


             {/* <div className="mb-3">
              <label><h6>Plan Description</h6></label>
              <input className="form-control" value={plan_desc} onChange={(e) => setPlanname(e.target.value)} required />
            </div> */}

            {/* Parent Category */}
            <div className="mb-3">
              <label><h6>Parent Category</h6></label>
              <select className="form-select" value={parent_cat} onChange={handleParentChange} required>
                <option value="">-- Select Parent Category --</option>
                {parentCategories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Sub Category */}
            <div className="mb-3">
              <label><h6>Sub Category</h6></label>
              <select className="form-select" value={sub_cat} onChange={handleSubChange} required disabled={!parent_cat}>
                <option value="">-- Select Sub Category --</option>
                {subCategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>{sub.name}</option>
                ))}
              </select>
            </div>

            {/* Sub-Sub Category */}
            <div className="mb-3">
              <label><h6>Sub-Sub Category</h6></label>
              <select className="form-select" value={sub_sub_cat} onChange={handleSubSubChange} required disabled={!sub_cat}>
                <option value="">-- Select Sub-Sub Category --</option>
                {subSubCategories.map((ssc) => (
                  <option key={ssc._id} value={ssc._id}>{ssc.name}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-3">
              <label><h6>Product Name</h6></label>
              <input className="form-control" type="text" value={name_prod} onChange={(e) => setProdName(e.target.value)} required />
            </div>

            {/* Dimension */}
            <div className="mb-3">
              <label><h6>Dimension</h6></label>
              <select className="form-select" value={dim_id} onChange={(e) => setDimension(e.target.value)} required disabled={!parent_cat && !sub_cat}>
                <option value="">-- Select Dimension --</option>
                {dimensionId.map((dim) => (
                  <option key={dim._id} value={dim._id}>{`${dim.width} x ${dim.height} x ${dim.depth}x ${dim.length}`}</option>
                ))}
              </select>
            </div>

            {/* Material */}
            <div className="mb-3">
              <label><h6>Material</h6></label>
              <select className="form-select" value={mat_id} onChange={(e) => setMaterial(e.target.value)} required>
                <option value="">-- Select Material --</option>
                {materialId.map((mat) => (
                  <option key={mat._id} value={mat._id}>{mat.material_name}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label><h6>Price</h6></label>
              <input className="form-control" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label><h6>Status</h6></label>
              <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)} required>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="mb-3">
              <label><h6>Vendor Image</h6></label>
              <input className="form-control" type="file" ref={fileInputRef} onChange={(e) => setVendorImage(e.target.files[0])} />
                      {editingId && existingImage && (
                <div className="mt-2">
                  <p>Current Image:</p>
                  <img src={`https://interioraura.onrender.com/${existingImage}`} alt="material" width="120" height="120" />
                </div>
              )}
            </div>
            <button type="submit" className="btn w-100" style={{ backgroundColor: "#B78D65", color: "white" }}>
              {editingId ? 'Update Blueprint' : 'Add Blueprint'}
            </button>
          </form>
        </div>
      </div>

         <div className="mt-5">
           <h3 className="text-center mb-4">Vendor Label Price List</h3>
           {vnds.length === 0 ? (
          <p className="text-center text-muted">No List Available</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped text-center align-middle shadow">
           <thead className="bg-primary text-white">
              <tr>
                {/* <th>Name</th> */}
                <th>Parent Category</th>
                <th>Sub Category</th>
                <th>Sub-Sub Category</th>
                <th>Product Name</th>
                <th>Dimension</th>
                <th>Material</th>
                <th>Price</th>
                <th>Status</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vnds.map((vd) => (
                <tr key={vd._id}>
               {/* <td>{vd.vendor_id?.name || '—'}</td> */}
                  <td>{vd.parent_cat?.name || '—'}</td>
                  <td>{vd.sub_cat?.name || '—'}</td>
                  <td>{vd.sub_sub_cat?.name || '—'}</td>
                  <td>{vd.name_prod}</td>
                  <td>{vd.dim_id?  `${vd.dim_id.width} x ${vd.dim_id.height} x ${vd.dim_id.depth} x ${vd.dim_id.length}`
                      : '—'}</td>
                  <td>{vd.mat_id?.material_name || '—'}</td>
                  <td>₹{vd.price}</td>
                  <td>{vd.status}</td>
                 <td>
                      <img
                        src={`https://interioraura.onrender.com/${vd.vendor_image}`}
                        alt="dimension"
                        width="80"
                        height="80"
                        style={{ borderRadius: '8px' }}
                      />
                    </td>
                  <td>
                    <button className="btn btn-info" onClick={() => handleEdit(vd)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(vd._id)}>Delete</button>
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

export default Vendorpricelabel;
