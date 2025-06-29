import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Architectprofile = () => {
  const [arps, setArps] = useState([]);
  const [architectName, setArchitectName] = useState('');
  const [architectlogin_id, setArchitectLogin] = useState('');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [about, setAbout] = useState('');
  const [architect_image, setImage] = useState(null);
  const [email_id, setEmailId] = useState('');
  const [website, setWebsite] = useState('');
  const [company_name, setCompanyName] = useState('');
  const [mobile_number, setMobile] = useState('');
  const [facebook_id, setFacebook] = useState('');
  const [instagram_id, setInstagram] = useState('');
  const [existingImage, setExistingImage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const user = localStorage.getItem('arch');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setArchitectLogin(parsedUser.id || '');
        setArchitectName(parsedUser.name || ''); // Assuming the name is stored as 'name' in localStorage
        fetchArchitectprofiles(parsedUser.id);
      } catch (e) {
        console.error('Error parsing user from localStorage:', e);
      }
    }
  }, []);

  const fetchArchitectprofiles = async (architectId) => {
    try {
      const res = await axios.get(`http://localhost:5000/Architectprofile?architectlogin_id=${architectId}`);
      setArps(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Fetch error:', err);
      setArps([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('architectlogin_id', architectlogin_id);
    formData.append('architect_name', architectName); // Add architectName to form data
    formData.append('qualification', qualification);
    formData.append('experience', experience);
    formData.append('about', about);
    formData.append('email_id', email_id);
    formData.append('website', website);
    formData.append('company_name', company_name);
    formData.append('mobile_number', mobile_number);
    formData.append('facebook_id', facebook_id);
    formData.append('instagram_id', instagram_id);

    if (architect_image) {
      formData.append('architect_image', architect_image);
    } else if (existingImage) {
      formData.append('existing_image', existingImage);
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/Architectprofile/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Architect profile updated successfully!');
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5000/Architectprofile', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Architect profile created successfully!');
      }

      resetForm();
      fetchArchitectprofiles(architectlogin_id);
    } catch (err) {
      console.error('Submit error:', err);
      toast.error('Architect cannot create a second profile');
      
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  const resetForm = () => {
    setQualification('');
    setExperience('');
    setAbout('');
    setEmailId('');
    setWebsite('');
    setCompanyName('');
    setMobile('');
    setFacebook('');
    setInstagram('');
    setImage(null);
    setExistingImage('');
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleEdit = (arp) => {
    setEditingId(arp._id);
    setQualification(arp.qualification);
    setExperience(arp.experience);
    setAbout(arp.about);
    setEmailId(arp.email_id);
    setWebsite(arp.website);
    setCompanyName(arp.company_name);
    setMobile(arp.mobile_number);
    setFacebook(arp.facebook_id);
    setInstagram(arp.instagram_id);
    setImage(null);
    setExistingImage(arp.architect_image);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/Architectprofile/${id}`);
      fetchArchitectprofiles(architectlogin_id);
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const filteredProfiles = arps.filter(arp => arp.architectlogin_id === architectlogin_id);

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <h1 className="card-header text-center mb-4" style={{ backgroundColor: "#171e45", color: "white" }}>
          Architect Profile Table
        </h1>
        <div className="card-body">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label><h6>Architect Name</h6></label>
                <input className="form-control" value={architectName} readOnly />
              </div>
              <div className="col-12 col-md-6">
                <label><h6>Architect Login Id</h6></label>
                <input className="form-control" value={architectlogin_id} readOnly required />
              </div>
            </div>

            <div className="row g-3 mt-3">
              <div className="col-12">
                <label><h6>Qualification</h6></label>
                <input className="form-control" value={qualification} onChange={(e) => setQualification(e.target.value)} required />
              </div>
            </div>

            <div className="row g-3 mt-3">
              <div className="col-12 col-md-6">
                <label><h6>Experience</h6></label>
                <input className="form-control" value={experience} onChange={(e) => setExperience(e.target.value)} required />
              </div>
              <div className="col-12 col-md-6">
                <label><h6>About</h6></label>
                <input className="form-control" value={about} onChange={(e) => setAbout(e.target.value)} required />
              </div>
            </div>

            <div className="row g-3 mt-3">
              <div className="col-12 col-md-6">
                <label><h6>Email Id</h6></label>
                <input className="form-control" value={email_id} onChange={(e) => setEmailId(e.target.value)} required />
              </div>
              <div className="col-12 col-md-6">
                <label><h6>Website</h6></label>
                <input className="form-control" value={website} onChange={(e) => setWebsite(e.target.value)} required />
              </div>
            </div>

            <div className="row g-3 mt-3">
              <div className="col-12 col-md-6">
                <label><h6>Company Name</h6></label>
                <input className="form-control" value={company_name} onChange={(e) => setCompanyName(e.target.value)} required />
              </div>
              <div className="col-12 col-md-6">
                <label><h6>Mobile Number</h6></label>
                <input className="form-control" value={mobile_number} onChange={(e) => setMobile(e.target.value)} required />
              </div>
            </div>

            <div className="row g-3 mt-3">
              <div className="col-12 col-md-6">
                <label><h6>Facebook Id</h6></label>
                <input className="form-control" value={facebook_id} onChange={(e) => setFacebook(e.target.value)} required />
              </div>
              <div className="col-12 col-md-6">
                <label><h6>Instagram Id</h6></label>
                <input className="form-control" value={instagram_id} onChange={(e) => setInstagram(e.target.value)} required />
              </div>
            </div>

            <div className="row g-3 mt-3">
              <div className="col-12">
                <label><h6>Upload Image</h6></label>
                <input className="form-control" type="file" ref={fileInputRef} onChange={(e) => setImage(e.target.files[0])} />
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
            </div>

            <div className="card-footer text-center mt-4">
              <button type="submit" className="btn w-100" style={{ backgroundColor: "#B78D65", color: "white" }}>
                {editingId ? 'Update Architect Profile' : 'Create Architect Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-center mb-4">Architect Profile List</h3>
        {arps.length === 0 ? (
          <p className="text-center text-muted">No Architect Profile Available</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped text-center align-middle shadow">
              <thead className="bg-primary text-white">
                <tr>
                  <th>Architect Name</th>
                  {/* <th>Architect ID</th> */}
                  <th>Qualification</th>
                  <th>Experience</th>
                  <th>About</th>
                  <th>Email Id</th>
                  <th>Website</th>
                  <th>Company Name</th>
                  <th>Mobile Number</th>
                  <th>Facebook Id</th>
                  <th>Instagram Id</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProfiles.length > 0 ? (
                  filteredProfiles.map((arp) => (
                    <tr key={arp._id}>
                      <td>{arp.architect_name}</td> {/* Show architect name from the DB */}
                      {/* <td>{arp.architectlogin_id}</td> */}
                      <td>{arp.qualification}</td>
                      <td>{arp.experience}</td>
                      <td>{arp.about}</td>
                      <td>{arp.email_id}</td>
                      <td>{arp.website}</td>
                      <td>{arp.company_name}</td>
                      <td>{arp.mobile_number}</td>
                      <td>{arp.facebook_id}</td>
                      <td>{arp.instagram_id}</td>
                      <td>
                        {arp.architect_image ? (
                          <img
                            src={`http://localhost:5000/${arp.architect_image}`}
                            alt="Architect"
                            width="60"
                            height="60"
                            style={{ borderRadius: '8px', border: '1px solid #ccc' }}
                          />
                        ) : (
                          <span>No Image</span>
                        )}
                      </td>
                      <td>
                        <button onClick={() => handleEdit(arp)} className="btn btn-primary me-2">Edit</button>
                        <button onClick={() => handleDelete(arp._id)} className="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="13" className="text-center">No profiles found for the logged-in user.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default Architectprofile;
