
const express = require('express');
const router = express.Router();
const getstartedController = require('../Controllers/getstartedController');
const upload=require('../middleware/upload');
router.post('/',upload.none(), getstartedController.creategetstarted);
router.get('/', getstartedController.getgetstarted);
router.put('/:id',upload.none(), getstartedController.updategetstarted);
router.delete('/:id', getstartedController.deletegetstarted);

module.exports = router;
