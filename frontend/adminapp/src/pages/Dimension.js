// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Dimension = () => {
//   const [dims, setDims] = useState([]);
//   const [shape_type, setShapeType] = useState('');
//   const [parent_cat, setPatentCat] = useState('');
//   const [sub_cat, setSubCat] = useState('');
//   const [width, setWidth] = useState('');
//   const [height, setHeight] = useState('');
//   const [depth, setDepth] = useState('');
//   const [length, setLength] = useState('');
//   const [dimension_image, setImage] = useState(null);
//   const [unit, setUnit] = useState('');
//   const [existingImage, setExistingImage] = useState('');
//   const [editingId, setEditingId] = useState(null);
//   const fileInputRef = useRef(null);

//   const [parentCategories, setParentCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);

//   const shapeOptions = ["L shape", "U shape", "Circle", "Triangle", "Cylinder"];

//   useEffect(() => {
//     fetch('http://localhost:5000/api/category/parents')
//       .then(res => res.json())
//       .then(setParentCategories)
//       .catch(err => console.error("Failed to fetch parent categories", err));

//     fetchDimensions();
//   }, []);

//   const fetchDimensions = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/Dimension');
//       setDims(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setDims([]);
//     }
//   };

//   const fetchSubCategories = async (parentId) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/category/subs/${parentId}`);
//       const data = await res.json();
//       setSubCategories(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('Error fetching sub-categories', err);
//       setSubCategories([]);
//     }
//   };

//   const handleParentChange = (e) => {
//     const selectedId = e.target.value;
//     setPatentCat(selectedId);
//     setSubCat('');
//     if (selectedId) {
//       fetchSubCategories(selectedId);
//     } else {
//       setSubCategories([]);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('shape_type', shape_type);
//     formData.append('parent_cat', parent_cat);
//     formData.append('sub_cat', sub_cat);
//     formData.append('width', width);
//     formData.append('height', height);
//     formData.append('depth', depth);
//     formData.append('length', length);
//     formData.append('unit', unit);
//     if (dimension_image) {
//       formData.append('dimension_image', dimension_image);
//     } else if (existingImage) {
//       formData.append('existing_image', existingImage);
//     }

//     try {
//       if (editingId) {
//         await axios.put(`http://localhost:5000/Dimension/${editingId}`, formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//         setEditingId(null);
//       } else {
//         await axios.post('http://localhost:5000/Dimension', formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//       }

//       // Reset form
//       setShapeType('');
//       setPatentCat('');
//       setSubCat('');
//       setWidth('');
//       setHeight('');
//       setDepth('');
//       setLength('');
//       setImage(null);
//       setUnit('');
//       setExistingImage('');
//       setSubCategories([]);
//       fileInputRef.current.value = null;
//       fetchDimensions();
//     } catch (err) {
//       console.error("Submit error:", err);
//     }
//   };

//   const handleEdit = async (dim) => {
//     setEditingId(dim._id);
//     setShapeType(dim.shape_type);
//     setWidth(dim.width);
//     setHeight(dim.height);
//     setDepth(dim.depth);
//     setLength(dim.length);
//     setUnit(dim.unit);
//     setImage(null);
//     setExistingImage(dim.dimension_image);

//     const parentId = dim.parent_cat._id || dim.parent_cat;
//     const subId = dim.sub_cat._id || dim.sub_cat;
//     setPatentCat(parentId);
//     await fetchSubCategories(parentId);
//     setSubCat(subId);

//     if (fileInputRef.current) fileInputRef.current.value = null;
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/Dimension/${id}`);
//       fetchDimensions();
//     } catch (err) {
//       console.error("Delete error:", err);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card shadow">
//         <h1 className="card-header text-center mb-4" style={{ backgroundColor: "#171e45", color: "white" }}>
//           Dimension Table
//         </h1>
//         <div className="card-body">
//           <form onSubmit={handleSubmit} encType="multipart/form-data">
//             <div className="row g-3 mt-3">
//               <div className="col-12">
//                 <label><h6>Dimension</h6></label>
//                 <select
//                   className="form-select"
//                   value={shape_type}
//                   onChange={(e) => setShapeType(e.target.value)}
//                   required
//                 >
//                   <option value="">-- Select Shape Type --</option>
//                   {shapeOptions.map((shape, idx) => (
//                     <option key={idx} value={shape}>{shape}</option>
//                   ))}
//                 </select>
//               </div>
//             </div><br />

//             {/* Parent and Sub Category */}
//             <div className="mb-3">
//               <label className="form-label"><strong>Parent Category</strong></label>
//               <select
//                 name="parent_cat"
//                 className="form-select"
//                 value={parent_cat || ''}
//                 onChange={handleParentChange}
//                 required
//               >
//                 <option value="">-- Select Parent Category --</option>
//                 {parentCategories.map(cat => (
//                   <option key={cat._id} value={cat._id}>{cat.name}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="mb-3">
//               <label className="form-label"><strong>Sub Category</strong></label>
//               <select
//                 name="sub_cat"
//                 className="form-select"
//                 value={sub_cat || ''}
//                 onChange={(e) => setSubCat(e.target.value)}
//                 disabled={!parent_cat}
//                 required
//               >
//                 <option value="">-- Select Sub Category --</option>
//                 {subCategories.map(sub => (
//                   <option key={sub._id} value={sub._id}>{sub.name}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Width, Height, Depth, Length */}
//             <div className="row g-3">
//               <div className="col-12 col-md-6">
//                 <label><h6>Width</h6></label>
//                 <input
//                   className="form-control"
//                   value={width}
//                   onChange={(e) => setWidth(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="col-12 col-md-6">
//                 <label><h6>Height</h6></label>
//                 <input
//                   className="form-control"
//                   value={height}
//                   onChange={(e) => setHeight(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="row g-3">
//               <div className="col-12 col-md-6">
//                 <label><h6>Depth</h6></label>
//                 <input
//                   className="form-control"
//                   value={depth}
//                   onChange={(e) => setDepth(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="col-12 col-md-6">
//                 <label><h6>Length</h6></label>
//                 <input
//                   className="form-control"
//                   value={length}
//                   onChange={(e) => setLength(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>

//             {/* Image Upload */}
//             <div className="row g-3 mt-3">
//               <div className="col-12">
//                 <label><h6>Upload Image</h6></label>
//                 <input
//                   className="form-control"
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={(e) => setImage(e.target.files[0])}
//                 />
//                 {editingId && existingImage && (
//                   <div className="mt-2">
//                     <p>Current Image:</p>
//                     <img
//                       src={`http://localhost:5000/${existingImage}`}
//                       alt="Current dimension"
//                       width="120"
//                       height="120"
//                       style={{ borderRadius: '8px', border: '1px solid #ccc' }}
//                     />
//                   </div>
//                 )}
//               </div>
//             </div><br />

//             {/* Unit */}
//             <div className="row g-3 mt-3">
//               <div className="col-12">
//                 <label><h6>Unit</h6></label>
//                 <input
//                   className="form-control"
//                   value={unit}
//                   onChange={(e) => setUnit(e.target.value)}
//                   placeholder="Enter Unit"
//                   required
//                 />
//               </div>
//             </div><br />

//             <button 
//               type="submit" 
//               className="btn w-100"
//               style={{ backgroundColor: "#B78D65", color: "white" }}
//             >
//               {editingId ? ' Update Dimension' : 'Add Dimension'}
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Dimension List Table */}
//       <div className="mt-5">
//         <h3 className="text-center mb-4">Dimension List</h3>
//         {dims.length === 0 ? (
//           <p className="text-center text-muted">No Dimension Available</p>
//         ) : (
//           <div className="table-responsive">
//             <table className="table table-bordered table-striped text-center align-middle shadow">
//               <thead className="bg-primary text-white">
//                 <tr>
//                   <th>Shape Type</th>
//                   <th>Parent Category</th>
//                   <th>Sub Category</th>
//                   <th>Width</th>
//                   <th>Height</th>
//                   <th>Depth</th>
//                   <th>Length</th>
//                   <th>Unit</th>
//                   <th>Image</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {dims.map((dim) => (
//                   <tr key={dim._id}>
//                     <td>{dim.shape_type}</td>
//                     <td>{dim.parent_cat.name}</td>
//                     <td>{dim.sub_cat.name}</td>
//                     <td>{dim.width}</td>
//                     <td>{dim.height}</td>
//                     <td>{dim.depth}</td>
//                     <td>{dim.length}</td>
//                     <td>{dim.unit}</td>
//                     <td>
//                       {dim.dimension_image && (
//                         <img
//                           src={`http://localhost:5000/${dim.dimension_image}`}
//                           alt="material"
//                           width="120"
//                           height="120"
//                         />
//                       )}
//                     </td>
//                     <td>
//                       <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(dim)}>Edit</button>
//                       <button className="btn btn-danger btn-sm" onClick={() => handleDelete(dim._id)}>Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dimension;
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dimension = () => {
  const [dims, setDims] = useState([]);
  const [shape_type, setShapeType] = useState('');
  const [parent_cat, setPatentCat] = useState('');
  const [sub_cat, setSubCat] = useState('');
  const [subSubCat, setSubSubCat] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [depth, setDepth] = useState('');
  const [length, setLength] = useState('');
  const [dimension_image, setImage] = useState(null);
  const [noOfSheets, setNoOfSheets] = useState("");
  const [unit, setUnit] = useState('');
  const [existingImage, setExistingImage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);

  const [parentCategories, setParentCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);

  // const shapeOptions = ["L shape", "U shape", "Circle", "Triangle", "Cylinder"];

  useEffect(() => {
    fetch('http://localhost:5000/api/category/parents')
      .then(res => res.json())
      .then(setParentCategories)
      .catch(err => console.error("Failed to fetch parent categories", err));

    fetchDimensions();
  }, []);

  const fetchDimensions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/Dimension');
      setDims(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setDims([]);
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

  const fetchSubSubCategories = async (subCatId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/category/subsubs/${subCatId}`);
      const data = await res.json();
      setSubSubCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching sub-sub categories', err);
      setSubSubCategories([]);
    }
  };

  const handleParentChange = (e) => {
    const selectedId = e.target.value;
    setPatentCat(selectedId);
    setSubCat('');
    setSubSubCat('');
    if (selectedId) {
      fetchSubCategories(selectedId);
    } else {
      setSubCategories([]);
    }
  };

  const handleSubCatChange = (e) => {
    const selectedSubCatId = e.target.value;
    setSubCat(selectedSubCatId);
    setSubSubCat('');
    if (selectedSubCatId) {
      fetchSubSubCategories(selectedSubCatId);
    } else {
      setSubSubCategories([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('shape_type', shape_type);
    formData.append('parent_cat', parent_cat);
    formData.append('sub_cat', sub_cat);
    formData.append('sub_sub_cat', subSubCat);
    formData.append('width', width);
    formData.append('height', height);
    formData.append('depth', depth);
    formData.append('length', length);
    formData.append("no_of_sheets", noOfSheets);
        formData.append('unit', unit);
    if (dimension_image) {
      formData.append('dimension_image', dimension_image);
    } else if (existingImage) {
      formData.append('existing_image', existingImage);
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/Dimension/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5000/Dimension', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      // Reset form
      setShapeType('');
      setPatentCat('');
      setSubCat('');
      setSubSubCat('');
      setWidth('');
      setHeight('');
      setDepth('');
      setLength('');
      setImage(null);
      setNoOfSheets("");
      setUnit('');
      setExistingImage('');
      setSubCategories([]);
      setSubSubCategories([]);
      fileInputRef.current.value = null;
      fetchDimensions();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleEdit = async (dim) => {
    setEditingId(dim._id);
    setShapeType(dim.shape_type);
    setWidth(dim.width);
    setHeight(dim.height);
    setDepth(dim.depth);
    setLength(dim.length);
    setUnit(dim.unit);
    setImage(null);
    setNoOfSheets(dim.no_of_sheets || "");
    setExistingImage(dim.dimension_image);

    const parentId = dim.parent_cat._id || dim.parent_cat;
    const subId = dim.sub_cat._id || dim.sub_cat;
    const subSubId = dim.sub_sub_cat._id || dim.sub_sub_cat;
    
    setPatentCat(parentId);
    await fetchSubCategories(parentId);
    setSubCat(subId);
    await fetchSubSubCategories(subId);
    setSubSubCat(subSubId);

    if (fileInputRef.current) fileInputRef.current.value = null;
  };

const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this dimension?")) {
    try {
      await axios.delete(`http://localhost:5000/Dimension/${id}`);
      fetchDimensions();
    } catch (err) {
      console.error("Delete error:", err);
    }
  }
};

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <h1 className="card-header text-center mb-4" style={{ backgroundColor: "#171e45", color: "white" }}>
          Dimension Table
        </h1>
        <div className="card-body">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* <div className="row g-3 mt-3">
              <div className="col-12">
                <label><h6>Dimension</h6></label>
                <select
                  className="form-select"
                  value={shape_type}
                  onChange={(e) => setShapeType(e.target.value)}
                  required
                >
                  <option value="">-- Select Shape Type --</option>
                  {shapeOptions.map((shape, idx) => (
                    <option key={idx} value={shape}>{shape}</option>
                  ))}
                </select>
              </div>
            </div><br /> */}

            {/* Parent and Sub Category */}
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
                onChange={handleSubCatChange}
                disabled={!parent_cat}
                required
              >
                <option value="">-- Select Sub Category --</option>
                {subCategories.map(sub => (
                  <option key={sub._id} value={sub._id}>{sub.name}</option>
                ))}
              </select>
            </div>

            {/* Sub-Sub Category */}
            <div className="mb-3">
              <label className="form-label"><strong>Sub-Sub Category</strong></label>
              <select
                name="sub_sub_cat"
                className="form-select"
                value={subSubCat || ''}
                onChange={(e) => setSubSubCat(e.target.value)}
                disabled={!sub_cat}
              >
                <option value="">-- Select Sub-Sub Category --</option>
                {subSubCategories.map(subSub => (
                  <option key={subSub._id} value={subSub._id}>{subSub.name}</option>
                ))}
              </select>
            </div>

            {/* Width, Height, Depth, Length */}
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label><h6>Width</h6></label>
                <input
                  className="form-control"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <label><h6>Height</h6></label>
                <input
                  className="form-control"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label><h6>Depth</h6></label>
                <input
                  className="form-control"
                  value={depth}
                  onChange={(e) => setDepth(e.target.value)}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <label><h6>Length</h6></label>
                <input
                  className="form-control"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row g-3 mt-3">
            <div className="col-12">
              <label><h6>No. of Sheets</h6></label>
              <input
                type="number"
                className="form-control"
                value={noOfSheets}
                onChange={(e) => setNoOfSheets(e.target.value)}
                placeholder="Enter number of sheets"
                required
              />
                </div>
              </div>
              <br />


            {/* Image Upload */}
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
            </div>  

            {/* Unit */}
            <div className="row g-3 mt-3">
              <div className="col-12">
                <label><h6>Unit</h6></label>
                <input
                  className="form-control"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="Enter Unit"
                  required
                />
              </div>
            </div><br />

            <button 
              type="submit" 
              className="btn w-100"
              style={{ backgroundColor: "#B78D65", color: "white" }}
            >
              {editingId ? ' Update Dimension' : 'Add Dimension'}
            </button>
          </form>
        </div>
      </div>

      {/* Dimension List Table */}
      <div className="mt-5">
        <h3 className="text-center mb-4">Dimension List</h3>
        {dims.length === 0 ? (
          <p className="text-center text-muted">No Dimension Available</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped text-center align-middle shadow">
              <thead className="bg-primary text-white">
                <tr>
                  {/* <th>Shape Type</th> */}
                  <th>Parent Category</th>
                  <th>Sub Category</th>
                  <th>Sub-Sub Category</th>
                  <th>Width</th>
                  <th>Height</th>
                  <th>Depth</th>
                  <th>Length</th>
                   <th>No. of Sheets</th>
                  <th>Unit</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dims.map((dim) => (
                  <tr key={dim._id}>
                    {/* <td>{dim.shape_type}</td> */}
                    <td>{dim.parent_cat.name}</td>
                    <td>{dim.sub_cat.name}</td>
                    <td>{dim.sub_sub_cat?.name || '-'}</td>
                    <td>{dim.width}</td>
                    <td>{dim.height}</td>
                    <td>{dim.depth}</td>
                    <td>{dim.length}</td>
                    <td>{dim.no_of_sheets}</td>
                    <td>{dim.unit}</td>
                    <td>
                      <img
                        src={`http://localhost:5000/${dim.dimension_image}`}
                        alt="dimension"
                        width="80"
                        height="80"
                        style={{ borderRadius: '8px' }}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => handleEdit(dim)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => handleDelete(dim._id)}
                      >
                        Delete
                      </button>
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

export default Dimension;
