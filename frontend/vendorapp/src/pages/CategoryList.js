import React, { useEffect, useState } from 'react';
import CategoryForm from './CategoryForm.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);

  const loadCategories = () => {
    fetch('http://localhost:5000/api/category')
      .then(res => res.json())
      .then(data => {
        // Ensure data is always an array
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error('Error loading categories:', err);
        setCategories([]);  // Fallback to empty array on error
      });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this category?');
    if (!confirmDelete) return;

    const res = await fetch(`http://localhost:5000/api/category/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      loadCategories();
    }
  };

  return (
    <div className="container-fluid">
      <CategoryForm selected={editing} onSave={() => {
        setEditing(null);
        loadCategories();
      }} /><br /><br />
      <h3 className="text-center mb-4"> List</h3>
      <div className="table-responsive">
        <table className="table table-bordered table-striped" style={{ width: '1100px' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Parent</th>
              <th>Sub</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Ensure categories is always an array before mapping */}
            {Array.isArray(categories) && categories.map(cat => (
              <tr key={cat._id}>
                <td>{cat.name}</td>
                <td>{cat.desc}</td>
                <td>{cat.parent_cat?.name || '-'}</td>
                <td>{cat.sub_cat?.name || '-'}</td>
                <td>{cat.status}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => setEditing(cat)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(cat._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryList;
