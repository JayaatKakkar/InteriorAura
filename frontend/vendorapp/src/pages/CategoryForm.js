import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CategoryForm = ({ selected, onSave }) => {
  const [form, setForm] = useState({
    name: '',
    desc: '',
    parent_cat: '',
    sub_cat: '',
    status: 'active',
  });

  const [parentCategories, setParentCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://interioraura.onrender.com/api/category/parents')
      .then(res => res.json())
      .then(data => {
        console.log('Received parent categories:', data);
        if (Array.isArray(data)) {
          setParentCategories(data);
        } else if (data && data.categories && Array.isArray(data.categories)) {
          setParentCategories(data.categories);
        } else {
          setParentCategories([]);
          console.error('Invalid data format:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setError('Error fetching categories');
        setParentCategories([]);
      });

    if (selected) {
      setForm({
        name: selected.name || '',
        desc: selected.desc || '',
        parent_cat: selected.parent_cat?._id || '',
        sub_cat: selected.sub_cat?._id || '',
        status: selected.status || 'active',
      });

      if (selected.parent_cat?._id) {
        fetchSubCategories(selected.parent_cat._id);
      }
    }
  }, [selected]);

  const fetchSubCategories = async (parentId) => {
    const res = await fetch(`https://interioraura.onrender.com/api/category/subs/${parentId}`);
    if (res.ok) {
      const data = await res.json();
      setSubCategories(Array.isArray(data) ? data : []);
    } else {
      setSubCategories([]);
      console.error('Error fetching sub-categories');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'parent_cat' ? { sub_cat: '' } : {}),
    }));

    if (name === 'parent_cat') {
      fetchSubCategories(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Button clicked!');

    const payload = {
      ...form,
      parent_cat: form.parent_cat === '0' ? null : form.parent_cat,
      sub_cat: form.sub_cat === '0' ? null : form.sub_cat,
    };

    const url = selected
      ? `https://interioraura.onrender.com/api/category/${selected._id}`
      : 'https://interioraura.onrender.com/api/category';
    const method = selected ? 'PUT' : 'POST';

    console.log('Sending payload:', payload);

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      console.log('Category saved successfully');
      onSave();  // Call onSave to update the parent component
      setForm({
        name: '',
        desc: '',
        parent_cat: '',
        sub_cat: '',
        status: 'active',
      });
      setSubCategories([]);
    } else {
      const errorData = await res.json();
      setError(errorData.message || 'Error saving category');
      console.error('Error saving category:', errorData);
    }
  };

  return (
    <div className="container-fluid mt-5 px-4">
      <div className="card shadow">
        <h2 className="card-header text-center" style={{ backgroundColor: "#171e45", color: "#fff" }}>
          {selected ? 'Edit Category' : 'Create Category'}
        </h2>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}  {/* Error message display */}
            <div className="mb-3">
              <label className="form-label"><strong>Name</strong></label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label"><strong>Description</strong></label>
              <input
                type="text"
                name="desc"
                className="form-control"
                placeholder="Enter Description"
                value={form.desc}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label"><strong>Parent Category</strong></label>
              <select
                name="parent_cat"
                className="form-select"
                value={form.parent_cat || ''}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Parent Category --</option>
                <option value="0">Parent</option>
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
                value={form.sub_cat}
                onChange={handleChange}
                disabled={!form.parent_cat}
                required
              >
                <option value="">-- Select Sub Category --</option>
                <option value="0">None</option>
                {subCategories.map(sub => (
                  <option key={sub._id} value={sub._id}>{sub.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label"><strong>Status</strong></label>
              <select
                name="status"
                className="form-select"
                value={form.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <button 
          type="submit" 
           className="btn w-100"
            style={{ backgroundColor: "#B78D65", color: "white" }}
                    >
            {selected ? 'Update Catergory' : 'Add Category'}
          </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
