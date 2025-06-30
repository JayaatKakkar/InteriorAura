import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ArchitectList = () => {
  const [architect, setArchitect] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchArchitects = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("Admintoken");

const res = await axios.get("https://interioraura.onrender.com/api/architect_auth/architects/all");

      setArchitect(res.data);
    } catch (err) {
      console.error("Failed to fetch architects:", err);
    } finally {
      setLoading(false);
    }
  };

const handleStatusUpdate = async (id, status) => {
  try {
    await axios.put(`https://interioraura.onrender.com/api/architect_auth/status/${id}`, { status });
    alert(`Architect has been ${status}.`);
    fetchArchitects(); // Refresh the list
  } catch (err) {
    console.error(`Failed to ${status} architect:`, err);
  }
};


  useEffect(() => {
    fetchArchitects();
  }, []);

  return (
    <div className="container-fluid">
      <div style={{ backgroundColor: '#171e45', color: 'white', padding: '15px', textAlign: 'center', marginBottom: '20px' }}>
  <h3 style={{ margin: 0 }}>Architect List</h3>
</div>

      {loading ? (
        <div className="text-center">
          <h5>Loading architect...</h5>
        </div>
      ) : (
        <div className="table-responsive">
          {architect.length === 0 ? (
            <div className="text-center">
              <h5>No architect available</h5>
            </div>
          ) : (
            <table className="table table-bordered table-striped" style={{ width: '1100px' }}>
               <thead className="table-info ">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile Number</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {architect.map(art => (
                  <tr key={art._id}>
                    <td>{art.name}</td>
                    <td>{art.email}</td>
                    <td>{art.mobile_no}</td>
                    <td>{art.status || 'Pending'}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleStatusUpdate(art._id, 'approved')}
                        disabled={art.status === 'approved'}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleStatusUpdate(art._id, 'rejected')}
                        disabled={art.status === 'rejected'}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default ArchitectList;
