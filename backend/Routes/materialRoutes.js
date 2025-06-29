const express = require('express'); 
const router = express.Router(); 
const upload = require('../middleware/material_upload');
const { creatematerial, getmaterial, updatematerial, deletematerial, getmaterials } = require('../Controllers/materialController');

router.post('/', upload.single('material_image'), creatematerial); 
router.get('/', getmaterial); 
router.get('/catmat/:subsub', getmaterials);
router.put('/:id', upload.single('material_image'), updatematerial); 
router.delete('/:id', deletematerial); 

module.exports = router;
