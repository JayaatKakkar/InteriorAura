import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [blueprints, setBlueprints] = useState([]);

  useEffect(() => {
    const fetchBlueprints = async () => {
      try {
        const res = await axios.get('http://localhost:5000/Getstarted');
        setBlueprints(res.data);
      } catch (err) {
        console.error("Failed to fetch blueprints", err);
      }
    };
    fetchBlueprints();
  }, []);

  const handleEdit = (bp) => {
    // Implement edit logic or navigation to edit page
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/Getstarted/${id}`);
      setBlueprints(prev => prev.filter(bp => bp._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="container mt-4">
      <div style={{ backgroundColor: '#171e45', color: 'white', padding: '15px', textAlign: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0 }}>Quotation Price List</h3>
      </div>

      {blueprints.length === 0 ? (
        <p>No result found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-info ">
  <tr>
    {/* <th>Image</th> */}
    <th>Category</th>
    <th>Name / Email</th>
    <th>Material</th>
    <th>Dimension (W x H x L x D)</th>
    <th>Total Price (₹)</th>
  </tr>
</thead>

            <tbody>
              {blueprints.map(bp => (
                <tr key={bp._id}>
                  {/* <td style={{ width: '150px' }}>
                    {bp.getstarted_image ? (
                      <img
                        src={`http://localhost:5000/${bp.getstarted_image}`}
                        alt={bp.parent_cat?.name}
                        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                      />
                    ) : (
                      'No Image'
                    )}
                  </td> */}
                  <td>
                    {bp.parent_cat?.name} / {bp.sub_cat?.name} / {bp.sub_sub_cat?.name}
                  </td>
                  <td>
                    <div><strong>{bp.name}</strong></div>
                    <div>{bp.email}</div>
                  </td>
                  <td>{bp.mat_id?.material_name || 'N/A'}</td>
                  <td>
                    {bp.dim_id
                      ? `${bp.dim_id.width || 'N/A'} x ${bp.dim_id.height || 'N/A'} x ${bp.dim_id.length || 'N/A'} x ${bp.dim_id.depth || 'N/A'}`
                      : 'N/A'}
                  </td>
                  <td>{(Number(bp.price || 0) + 8000 + 3000).toLocaleString()}</td>
                  {/* <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(bp)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(bp._id)}>Delete</button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
