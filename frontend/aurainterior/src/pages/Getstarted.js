import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const GetStarted = () => {
  const [gets, setGets] = useState([]);
  const [name,setName]=useState([]);
  const [email,setEmail]=useState([]);
  const [parent_cat, setParentCat] = useState('');
  const [sub_cat, setSubCat] = useState('');
  const [sub_sub_cat, setSubSubCat] = useState('');
  const [mat_id, setMaterial] = useState('');
  const [dim_id, setDimension] = useState('');
  const [price, setPrice] = useState('');
  const [available, setAvailable] = useState(true);
  // const [status, setStatus] = useState('active');
  const [getstarted_image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);


  const [parentCategories, setParentCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [materialId, setMaterialId] = useState([]);
  const [dimensionId, setDimensionId] = useState([]);

// useEffect(() => {
//   const user = JSON.parse(localStorage.getItem('user'));
//   if (user) {
//     setName(user.name || '');
//     setEmail(user.email || '');
//   }
// }, []);
// const handleResponse = async (bp, status) => {
//     try {
//       const res = await axios.post("http://localhost:5000/Getstarted", {
//         id: bp,
//         status: status,
//       });
//       // fetchAppointments()
//       alert(`Email sent: Appointment is ${status}`);
//     } catch (err) {
//       console.error("Email send error:", err);
//       alert("Failed to send email.");
//     }
//   };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parentRes = await fetch('http://localhost:5000/api/category/parents');
        const parentData = await parentRes.json();
        setParentCategories(parentData);

        await fetchBlueprints();
        await fetchMaterials();
        await fetchDimensions();

        if (parentData.length > 0) {
          const firstParentId = parentData[0]._id;
          setParentCat(firstParentId);
          await fetchSubCategories(firstParentId);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };
    fetchData();
  }, []);

  const fetchBlueprints = async () => {
    try {
      const res = await axios.get('http://localhost:5000/Getstarted');
      setGets(res.data);
    } catch (err) {
      console.error("Failed to fetch Getstarted:", err);
    }
  };

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

      if (data.length > 0) {
        const firstSubId = data[0]._id;
        setSubCat(firstSubId);
        await fetchSubSubCategories(firstSubId);
      }
    } catch (err) {
      console.error("Error fetching subcategories", err);
      // setSubCategories([]);
    }
  };

  const fetchSubSubCategories = async (subCatId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/category/subsubs/${subCatId}`);
      const data = await res.json();
      setSubSubCategories(data);

      if (data.length > 0) {
        const firstSubSubId = data[0]._id;
        setSubSubCat(firstSubSubId);
        await fetchFilteredMaterials(firstSubSubId);
        await fetchFilteredDimensions(firstSubSubId);
      }
    } catch (err) {
      console.error("Error fetching sub-sub categories", err);
      // setSubSubCategories([]);
    }
  };

  const fetchFilteredMaterials = async (subSubId) => {
    try {
      const res = await axios.get(`http://localhost:5000/Material/catmat/${subSubId}`);
      setMaterialId(res.data);
      if (res.data.length > 0) setMaterial(res.data[0]._id);
    } catch (err) {
      console.error("Error fetching filtered materials", err);
      // setMaterialId([]);
    }
  };

  const fetchFilteredDimensions = async (subSubId) => {
    try {
      const res = await axios.get(`http://localhost:5000/Dimension/catdim/${subSubId}`);
      setDimensionId(res.data);
      if (res.data.length > 0) setDimension(res.data[0]._id);
    } catch (err) {
      console.error("Error fetching filtered dimensions", err);
      // setDimensionId([]);
    }
  };

  useEffect(() => {
    const selectedMaterial = materialId.find(m => m._id === mat_id);
    const selectedDimension = dimensionId.find(d => d._id === dim_id);

    if (selectedMaterial && selectedDimension) {
      const noOfSheets = selectedDimension.no_of_sheets || 1;
      const materialPrice = selectedMaterial.material_price || 0;
      setPrice(noOfSheets * materialPrice);
    } else {
      setPrice('');
    }
  }, [mat_id, dim_id, materialId, dimensionId]);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!price) {
    alert('Price could not be calculated. Please check your selections.');
    return;
  }

  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('parent_cat', parent_cat);
  formData.append('sub_cat', sub_cat);
  formData.append('sub_sub_cat', sub_sub_cat);
  formData.append('mat_id', mat_id);
  formData.append('dim_id', dim_id);
  formData.append('price', price);
  formData.append('available', available.toString());

  // Optional: include image if needed
  // if (getstarted_image) formData.append('getstarted_image', getstarted_image);

  try {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    console.log('Submitting form data:');
    console.log({
      name,
      email,
      parent_cat,
      sub_cat,
      sub_sub_cat,
      mat_id,
      dim_id,
      price,
      available,
      editingId
    });

    let response;
    // if (editingId) {
    //   response = await axios.put(`http://localhost:5000/Getstarted/${editingId}`, formData, config);
    //   console.log('Updated entry ID:', editingId);
    // } else
     {
      response = await axios.post('http://localhost:5000/Getstarted', formData, config);
      console.log('Created entry ID:', response.data._id); // Adjust if backend returns differently
    }

    // Reset form
    setName('');
    setEmail('');
    setParentCat('');
    setSubCat('');
    setSubSubCat('');
    setMaterial('');
    setDimension('');
    setPrice('');
    setAvailable(true);
    setEditingId(null);
    setSubCategories([]);
    setSubSubCategories([]);

    fetchBlueprints();
  } catch (err) {
    console.error("Submit error:", err.response || err.message || err);
  }
};


  const handleEdit = (bp) => {
    setEditingId(bp._id);
    setParentCat(bp.parent_cat?._id || '');
    setSubCat(bp.sub_cat?._id || '');
    setSubSubCat(bp.sub_sub_cat?._id || '');
    setMaterial(bp.mat_id?._id || '');
    setDimension(bp.dim_id?._id || '');
    setAvailable(bp.available);
    // setStatus(bp.status || 'active');
    // setImage(null);
    // setExistingImage(bp.getstarted_image);

    fetchSubCategories(bp.parent_cat?._id);
    fetchSubSubCategories(bp.sub_cat?._id);
    fetchFilteredMaterials(bp.sub_sub_cat?._id);
    fetchFilteredDimensions(bp.sub_sub_cat?._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/Getstarted/${id}`);
      fetchBlueprints();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleParentChange = async (id) => {
    setParentCat(id);
    setSubCat('');
    setSubSubCat('');
    setMaterial('');
    setDimension('');
    setPrice('');
    await fetchSubCategories(id);
  };

  const handleSubChange = async (id) => {
    setSubCat(id);
    setSubSubCat('');
    setMaterial('');
    setDimension('');
    setPrice('');
    await fetchSubSubCategories(id);
  };

  const handleSubSubChange = async (id) => {
    setSubSubCat(id);
    setMaterial('');
    setDimension('');
    setPrice('');
    await fetchFilteredMaterials(id);
    await fetchFilteredDimensions(id);
  };
  const labourCost = 8000;    // fixed amount
const deliveryCost = 3000;  // fixed amount

const totalCost = Number(price || 0) + labourCost + deliveryCost;

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div
  className="card-header text-center text-white"
  style={{
    backgroundImage: 'url("img/how-work10.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '250px', // Adjust height as needed
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    fontWeight: 'bold'
  }}
>
  Quotation Price
</div>

        <div className="card-body">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
           <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input
      type="text"
      className="form-control"
      id="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
    />
  </div>

  {/* Email Field */}
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email</label>
    <input
      type="email"
      className="form-control"
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  </div>

            {/* Parent Categories as boxes */}
            <div className="mb-3">
              <label>Parent Category</label>
              <div className="d-flex flex-wrap gap-2">
                {parentCategories.map(cat => (
                  <div
                    key={cat._id}
                    onClick={() => handleParentChange(cat._id)}
                    style={{
                      border: cat._id === parent_cat ? '2px solid #B78D65' : '1px solid #B78D65',
                      borderRadius: '8px',
                      padding: '10px 15px',
                      cursor: 'pointer',
                      backgroundColor: cat._id === parent_cat ? '#e7f1ff' : '#fff',
                      minWidth: '120px',
                      textAlign: 'center',
                      userSelect: 'none',
                    }}
                  >
                    {cat.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Sub Categories as boxes */}
            <div className="mb-3">
              <label>Sub Category</label>
              <div className="d-flex flex-wrap gap-2">
                {subCategories.length === 0 && <p>No subcategories found.</p>}
                {subCategories.map(cat => (
                  <div
                    key={cat._id}
                    onClick={() => handleSubChange(cat._id)}
                    style={{
                      border: cat._id === sub_cat ? '2px solid #B78D65' : '1px solid #B78D65',
borderRadius: '8px',
padding: '10px 15px',
cursor: 'pointer',
backgroundColor: cat._id === sub_cat ? '#e7f1ff' : '#fff',
minWidth: '120px',
textAlign: 'center',
userSelect: 'none',
}}
>
{cat.name}
</div>
))}
</div>
</div>
        {/* Sub-Sub Categories as boxes */}
        <div className="mb-3">
          <label>Sub-Sub Category</label>
          <div className="d-flex flex-wrap gap-2">
            {subSubCategories.length === 0 && <p>No sub-sub categories found.</p>}
            {subSubCategories.map(cat => (
              <div
                key={cat._id}
                onClick={() => handleSubSubChange(cat._id)}
                style={{
                  border: cat._id === sub_sub_cat ? '2px solid #B78D65' : '1px solid #B78D65',
                  borderRadius: '8px',
                  padding: '10px 15px',
                  cursor: 'pointer',
                  backgroundColor: cat._id === sub_sub_cat ? '#e7f1ff' : '#fff',
                  minWidth: '120px',
                  textAlign: 'center',
                  userSelect: 'none',
                }}
              >
                {cat.name}
              </div>
            ))}
          </div>
        </div>

        {/* Material Dropdown */}
{/* Material as boxes with images */}
<div className="mb-3">
  <label>Material</label>
  <div className="d-flex flex-wrap gap-2">
    {materialId.length === 0 && <p>No materials found.</p>}
    {materialId.map(mat => (
      <div
        key={mat._id}
        onClick={() => setMaterial(mat._id)}
        style={{
          border: mat._id === mat_id ? '2px solid #B78D65' : '1px solid #B78D65',
          borderRadius: '8px',
          padding: '10px',
          cursor: 'pointer',
          backgroundColor: mat._id === mat_id ? '#e7f1ff' : '#fff',
          minWidth: '120px',
          textAlign: 'center',
          userSelect: 'none',
        }}
      >
        {mat.material_image && (
          <img
            src={`http://localhost:5000/${mat.material_image}`}
            alt={mat.material_name}
            style={{ width: '100%', height: '80px', objectFit: 'cover', marginBottom: '8px', borderRadius: '4px' }}
          />
        )}
        <div>{mat.material_name}</div>
      </div>
    ))}
  </div>
</div>


        {/* Dimension Dropdown */}
{/* Dimension as boxes */}
<div
  style={{
    display: 'flex',
    gap: '12px',
    overflowX: 'auto',
    paddingBottom: '8px',
    marginBottom: '20px',
  }}
>
  {dimensionId.map(dim => (
  <div
    key={dim._id}
    onClick={() => setDimension(dim._id)}
    style={{
      border: dim._id === dim_id ? '2px solid #B78D65' : '1px solid #B78D65',
      borderRadius: '8px',
      padding: '10px 15px',
      cursor: 'pointer',
      backgroundColor: dim._id === dim_id ? '#e7f1ff' : '#fff',
      minWidth: '140px',
      textAlign: 'center',
      userSelect: 'none',
      flexShrink: 0,
    }}
  >
    {dim.dimension_image && (
      <img 
        src={`http://localhost:5000/${dim.dimension_image}`}
        alt="Dimension" 
        style={{ width: '100%', height: '80px', borderRadius: '6px', marginBottom: '8px' }} 
      />
    )}
    <div><strong>Dimension</strong></div>
    <div style={{ fontSize: '0.9em', color: '#555', marginTop: '6px', lineHeight: 1.3 }}>
      Width: {dim.width || 'N/A'} <br />
      Height: {dim.height || 'N/A'} <br />
      Depth: {dim.depth || 'N/A'} <br />
      Length: {dim.length || 'N/A'}
    </div>
  </div>
))}
</div>





        {/* Price (readonly) */}


        {/* Availability */}
        {/* <div className="mb-3">
          <label>Available</label>
          <select
            className="form-select"
            value={available}
            onChange={e => setAvailable(e.target.value === 'true')}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div> */}

        {/* Status */}
        {/* <div className="mb-3">
          <label>Status</label>
          <select
            className="form-select"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div> */}

        {/* Image Upload */}
        {/* <div className="mb-3">
          <label>Image</label>
          <input
            type="file"
            className="form-control"
            onChange={e => setImage(e.target.files[0])}
            ref={fileInputRef}
            accept="image/*"
          />
          {existingImage && !getstarted_image && (
            <img
              src={`http://localhost:5000/uploads/${existingImage}`}
              alt="Existing"
              style={{ width: '120px', marginTop: '10px' }}
            />
          )}
        </div> */}



{/* Replace this: */}
{/* <input type="number" className="form-control" value={price} readOnly /> */}

{/* With this: */}
<div className="mb-3">
  <div
    className="border p-3"
    style={{
      backgroundColor: '#e7f1ff',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      maxWidth: '100%',  // limit width so it looks neat
    }}
  >
    {[
      { label: 'Material Price:', value: `₹${price}` },
      { label: 'Labour Cost:', value: `₹${labourCost}` },
      { label: 'Delivery Cost:', value: `₹${deliveryCost}` },
    ].map(({ label, value }) => (
      <div
        key={label}
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          gap: '8px',
          fontSize: '16px',
          fontWeight: '500',
        }}
      >
        <div style={{ flex: '1', textAlign: 'left' }}>{label}</div>
        <div style={{ minWidth: '80px', textAlign: 'left' }}>{value}</div>
      </div>
    ))}

    <hr style={{ margin: '12px 0' }} />

    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        gap: '8px',
        fontSize: '18px',
        fontWeight: '700',
        color: '#111',
      }}
    >
      <div style={{ flex: '1', textAlign: 'left' }}>Total Cost:</div>
      <div style={{ minWidth: '80px', textAlign: 'left' }}>
        ₹{Number(price) + Number(labourCost) + Number(deliveryCost)}
      </div>
    </div>
        <button
  type="submit"
  className="btn"
  style={{ backgroundColor: "#B78D65", width: "100%" }}
  // onClick={() => handleResponse(bp._id)}
>
  {editingId ? 'Update' : 'Get Quotation'}
</button><br/><br/>

  </div>
</div>



      </form>

      <hr />

      {/* Display all blueprints */}
      {/* <div>
        <h3>Existing Blueprints</h3>
        <div className="row">
          {gets.length === 0 && <p>No blueprints found.</p>}
          {gets.map(bp => (
            <div key={bp._id} className="col-md-4 mb-3">
              <div className="card">
                {bp.getstarted_image && (
                  <img
                    src={`http://localhost:5000/${bp.getstarted_image}`}
                    alt={bp.parent_cat?.name}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{bp.parent_cat?.name} / {bp.sub_cat?.name} / {bp.sub_sub_cat?.name}</h5>
                  <p>Material: {bp.mat_id?.material_name}</p>
                  <p>Dimension: {bp.dim_id?.dimension_name}</p>
                  <p>Price: {bp.price}</p>
                  <p>Status: {bp.status}</p>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(bp)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(bp._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  </div>
</div>
);
};

export default GetStarted;