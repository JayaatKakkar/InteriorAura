// 
import React, { useEffect, useState } from 'react';
import CategoryForm from './CategoryForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadCategories = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/category')
      .then(res => res.json())
      .then(data => {
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error('Error loading categories:', err);
        setCategories([]);
      })
      .finally(() => {
        setLoading(false);
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
      <h3 className="text-center mb-4">Category List</h3>
      
      {/* Loading state */}
      {loading ? (
        <div className="text-center">
          <h5>Loading categories...</h5>
        </div>
      ) : (
        <div className="table-responsive">
          {categories.length === 0 ? (
            <div className="text-center">
              <h5>No categories available</h5>
            </div>
          ) : (
            <table className="table table-bordered table-striped" style={{ width: '1100px' }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Parent Category</th>
                  <th>Sub Category</th>
                  <th>Sub-Sub Category</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(categories) && categories.map(cat => (
                  <tr key={cat._id}>
                    <td>{cat.name}</td>
                    <td>{cat.desc}</td>
                    <td>{cat.parent_cat?.name || '-'}</td>
                    <td>{cat.sub_cat?.map(sub => sub.name).join(', ') || '-'}</td>
                    <td>{cat.sub_sub_cat?.map(subSub => subSub.name).join(', ') || '-'}</td>
                    <td>{cat.status}</td>
                    <td>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => setEditing(cat)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(cat._id)}>Delete</button>
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

export default CategoryList;
