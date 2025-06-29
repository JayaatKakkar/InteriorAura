const express = require('express'); 
const router = express.Router(); 
const upload = require('../middleware/package_upload');
const { createpackage, getpackage, updatepackage, deletepackage } = require('../Controllers/packageController');

router.post('/', upload.single('package_image'), createpackage); 
router.get('/', getpackage); 
router.put('/:id', upload.single('package_image'), updatepackage); 
router.delete('/:id', deletepackage); 

module.exports = router;
