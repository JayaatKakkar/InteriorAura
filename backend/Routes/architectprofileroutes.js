// const express = require('express'); 
// const router = express.Router(); 
// const upload = require('../middleware/architectprofile_upload');
// const { createarchitectprofile, getarchitectprofile, updatearchitectprofile, deletearchitectprofile } = require('../Controllers/architectprofileController');

// router.post('/', upload.single('architect_image'), createarchitectprofile); 
// router.get('/', getarchitectprofile); 
// router.put('/:id', upload.single('architect_image'), updatearchitectprofile); 
// router.delete('/:id', deletearchitectprofile); 

// module.exports = router;
const express = require('express');
const router = express.Router();
const upload = require('../middleware/architectprofile_upload');
const {
  createarchitectprofile,
  getarchitectprofile,
  updatearchitectprofile,
  deletearchitectprofile
} = require('../Controllers/architectprofileController');

// Create architect profile with image upload
router.post('/', upload.single('architect_image'), createarchitectprofile);

// Get architect profiles (supports filtering by architectlogin_id)
router.get('/', getarchitectprofile);

// Update architect profile by ID, with optional image upload
router.put('/:id', upload.single('architect_image'), updatearchitectprofile);

// Delete architect profile by ID
router.delete('/:id', deletearchitectprofile);

module.exports = router;
