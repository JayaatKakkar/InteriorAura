const express = require('express'); 
const router = express.Router(); 
const upload = require('../middleware/dimension_upload');
const { createdimension, getdimension, updatedimension, deletedimension ,getdimensions} = require('../Controllers/dimensionController');

router.post('/', upload.single('dimension_image'), createdimension); 
router.get('/', getdimension); 
router.get('/catdim/:subsub', getdimensions);
router.put('/:id', upload.single('dimension_image'), updatedimension); 
router.delete('/:id', deletedimension); 

module.exports = router;
