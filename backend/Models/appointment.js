const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email_id: { type: String, required: true },
  architect: { type: mongoose.Schema.Types.ObjectId, ref: 'ArchitectProfile', required: true },
  app_date: { type: Date, required: true },
  app_time: { type: String, required: true },
  app_desc: { type: String, required: true }, 
  status:{type:String,
    enum:["Approved","Pending","Rejected"], 
    default:"Pending"}
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
