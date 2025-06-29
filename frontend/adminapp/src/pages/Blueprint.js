import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const BlueprintForm = () => {
  const [blps, setBlps] = useState([]);
  // const [plan_name, setPlanname] = useState('');
  // const [plan_desc, setPlandesc] = useState('');
  const [parent_cat, setParentCat] = useState('');
  const [sub_cat, setSubCat] = useState('');
  const [sub_sub_cat, setSubSubCat] = useState('');
  const [mat_id, setMaterial] = useState('');
  const [dim_id, setDimension] = useState('');
  const [price, setPrice] = useState('');
  const [available, setAvailable] = useState(true);
  // const [description_id, setDescriptionId] = useState('');
  const [blueprint_image, setImage] = useState(null);
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
      const parentRes = await fetch('http://localhost:5000/api/category/parents');
      const parentData = await parentRes.json();
      setParentCategories(parentData);
      
      await fetchBlueprints();
      await fetchMaterials();
      await fetchDimensions();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);


  const fetchMaterials = async () => {
    try {
      const res = await axios.get('http://localhost:5000/Material');
      setMaterialId(res.data);
    } catch (err) {
      console.error("Failed to fetch materials", err);
    }
  };

  const fetchDimensions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/Dimension');
      setDimensionId(res.data);
    } catch (err) {
      console.error("Failed to fetch dimensions", err);
    }
  };

  const fetchSubCategories = async (parentId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/category/subs/${parentId}`);
      const data = await res.json();
      setSubCategories(data);
    } catch (err) {
      console.error('Error fetching sub-categories', err);
      setSubCategories([]);
    }
  };

  const fetchSubSubCategories = async (subCatId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/category/subsubs/${subCatId}`);
      const data = await res.json();
      setSubSubCategories(data);
    } catch (err) {
      console.error('Error fetching sub-sub categories', err);
      setSubSubCategories([]);
    }
  };

  const fetchFilteredMaterials = async (subSubCategoryId) => {
    try {
      const res = await axios.get(`http://localhost:5000/Material/catmat/${subSubCategoryId}`);
      setMaterialId(res.data);
    } catch (err) {
      console.error("Failed to fetch filtered materials", err);
    }
  };

  const fetchFilteredDimensions = async (subSubCategoryId) => {
    try {
      const res = await axios.get(`http://localhost:5000/Dimension/catdim/${subSubCategoryId}`);
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
    // formData.append('plan_name', plan_name);
    // formData.append('plan_desc', plan_desc);
    formData.append('parent_cat', parent_cat);
    formData.append('sub_cat', sub_cat);
    formData.append('sub_sub_cat', sub_sub_cat);
    formData.append('mat_id', mat_id);
    formData.append('dim_id', dim_id);
    formData.append('price', price);
    formData.append('available', available);
    // formData.append('description_id', description_id);
    formData.append('status', status);
       if (blueprint_image) {
      formData.append('blueprint_image', blueprint_image);
    } else if (existingImage) {
      formData.append('existing_image', existingImage);
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/Blueprint/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5000/Blueprint', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      // setPlanname('');
      // setPlandesc('');
      setParentCat('');
      setSubCat('');
      setSubSubCat('');
      setMaterial('');
      setDimension('');
      setPrice('');
      setAvailable(true);
      // setDescriptionId('');
      setStatus('active');
      setImage(null);
      setExistingImage('');
      setSubCategories([]);
      setSubSubCategories([]);
      fileInputRef.current.value = null;
      fetchBlueprints();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const fetchBlueprints = async () => {
    try {
      const res = await axios.get('http://localhost:5000/Blueprint');
      setBlps(res.data);
    } catch (err) {
      console.error("Failed to fetch blueprints", err);
    }
  };

  const handleEdit = (bp) => {
    setEditingId(bp._id);
    fetchSubCategories(bp.parent_cat._id);
    fetchSubSubCategories(bp.sub_cat._id);
    fetchDimensions(bp.mat_id._id);
   fetchMaterials(bp.dim_id._id);
    console.log("Text",editingId)
    // setPlanname(bp.plan_name);
    // setPlandesc(bp.plan_desc);
    setParentCat(bp.parent_cat._id);
    setSubCat(bp.sub_cat._id);
    setSubSubCat(bp.sub_sub_cat._id);
    setMaterial(bp.mat_id._id);
    setDimension(bp.dim_id._id);
    setPrice(bp.price);
    setAvailable(bp.available);
    setImage(null);
    // setDescriptionId(bp.description_id);
    setStatus(bp.status);
    setExistingImage(bp.blueprint_image);
    console.log(setSubCat(bp.sub_cat._id))
  };

const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this blueprint?")) {
    try {
      await axios.delete(`http://localhost:5000/Blueprint/${id}`);
      fetchBlueprints();
    } catch (err) {
      console.error("Error deleting blueprint:", err);
    }
  }
};


  return (
    <div className="container mt-5">
      <div className="card shadow">
        <h1 className="card-header text-center" style={{ backgroundColor: "#171e45", color: "white" }}>
          Blueprint Form
        </h1>
        <div className="card-body">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* <div className="mb-3">
              <label><h6>Plan Name</h6></label>
              <input className="form-control" value={plan_name} onChange={(e) => setPlanname(e.target.value)} required />
            </div>

             <div className="mb-3">
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
                      alt="Current dimension"
                      width="120"
                      height="120"
                      style={{ borderRadius: '8px', border: '1px solid #ccc' }}
                    />
                  </div>
                )}
              </div>
            </div>  <br/>
            <button type="submit" className="btn w-100" style={{ backgroundColor: "#B78D65", color: "white" }}>
              {editingId ? 'Update Blueprint' : 'Add Blueprint'}
            </button>
          </form>
        </div>
      </div>

         <div className="mt-5">
           <h3 className="text-center mb-4">Blueprint List</h3>
           {blps.length === 0 ? (
          <p className="text-center text-muted">No List Available</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped text-center align-middle shadow">
           <thead className="bg-primary text-white">
              <tr>
                {/* <th>Name</th>
                <th>Description</th> */}
                <th>Parent Category</th>
                <th>Sub Category</th>
                <th>Sub-Sub Category</th>
                <th>Dimension</th>
                <th>Material</th>
                <th>Price</th>
                <th>Available</th>
                <th>Status</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blps.map((bp) => (
                <tr key={bp._id}>
                  {/* <td>{bp.plan_name}</td>
                  <td>{bp.plan_desc}</td> */}
                  <td>{bp.parent_cat?.name || '—'}</td>
                  <td>{bp.sub_cat?.name || '—'}</td>
                  <td>{bp.sub_sub_cat?.name || '—'}</td>
                  <td>
                    {bp.dim_id
                      ? `${bp.dim_id.width} x ${bp.dim_id.height} x ${bp.dim_id.depth} x ${bp.dim_id.length}`
                      : '—'}
                  </td>
                  <td>{bp.mat_id?.material_name || '—'}</td>
                  <td>{bp.price}</td>
                  <td>{bp.available ? 'Yes' : 'No'}</td>
                  <td>{bp.status}</td>
                                      <td>
                      <img
                        src={`http://localhost:5000/${bp.blueprint_image}`}
                        alt="dimension"
                        width="80"
                        height="80"
                        style={{ borderRadius: '8px' }}
                      />
                    </td>
                  <td>
                    <button className="btn btn-info" onClick={() => handleEdit(bp)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(bp._id)}>Delete</button>
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

export default BlueprintForm;
