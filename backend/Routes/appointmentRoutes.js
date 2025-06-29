const express = require('express'); 
const router = express.Router(); 

const { 
  createappointment, 
  getappointment, 
  updateappointment, 
  deleteappointment,UpdatestatusforRequest // ✅ Fix the typo here
} = require('../Controllers/appointmentController');

// Routes
router.post('/', createappointment); 
router.get('/:id', getappointment); 
router.put('/:id', updateappointment); 
router.delete('/:id', deleteappointment);// ✅ Fix the typo in the imported function name
router.post('/appointment/status',UpdatestatusforRequest) ;

module.exports = router;
