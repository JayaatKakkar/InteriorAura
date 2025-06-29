const appointment = require('../Models/appointment');
const Appointment = require('../Models/appointment'); // ✅ Use correct model name
const ArchitectProfile=require('../Models/architectprofile')
const sendEmail=require("../utils/sendEmail")
// Create Appointment
exports.createappointment = async (req, res) => {
try {
const {
name,
email_id,
architect,
app_date,
app_time,
app_desc, // ✅ use correct field name
} = req.body;


const appointment = new Appointment({
  name,
  email_id,
  architect,
  app_date,
  app_time,
  app_desc,
});

await appointment.save();
res.status(201).json(appointment);


} catch (error) {
console.error(error);
res.status(500).json({ error: error.message });
}
};

// Get All Appointments
exports.getappointment = async (req, res) => {
const arch=req.params.id
console.log(arch)
try {
const appoin=await ArchitectProfile.findOne({architectlogin_id:arch})
const aid=appoin._id
const appointments = await Appointment.find({architect:aid})
.populate('architect', 'architect_name'); // ✅ optional, if 'architect' is a reference
res.json(appointments);
} catch (error) {
res.status(500).json({ error: error.message });
}
};

// Update Appointment
exports.updateappointment = async (req, res) => {
try {
const {
name,
email_id,
architect,
app_date,
app_time,
app_desc, // ✅ correct field name
} = req.body;


const updateData = {
  name,
  email_id,
  architect,
  app_date,
  app_time,
  app_desc,
};

const appointment = await Appointment.findByIdAndUpdate(req.params.id, updateData, { new: true });
res.json(appointment);


} catch (error) {
res.status(500).json({ error: error.message });
}
};

// Delete Appointment
exports.deleteappointment = async (req, res) => {
try {
await Appointment.findByIdAndDelete(req.params.id);
res.json({ message: 'Deleted Successfully' });
} catch (error) {
res.status(500).json({ error: error.message });
}
};

exports.UpdatestatusforRequest = async (req, res) => {
const { id, status } = req.body;

const allowedStatuses = ["Approved", "Rejected"];
if (!allowedStatuses.includes(status)) {
return res.status(400).json({ message: "Invalid status value" });
}

try {
const existingRequest = await Appointment.findById(id);

if (!existingRequest) {
  return res.status(404).json({ message: "Request not found" });
}

if (existingRequest.status === status) {
  return res.status(400).json({ message: `This request is already ${status.toLowerCase()} `});
}

// Allow switching between Approved, Rejected, and Pending
const previousStatus = existingRequest.status;
existingRequest.status = status;
await existingRequest.save();

// Fetch visitor email using visitor ID
const appoin = await appointment.findById(existingRequest._id); // Adjust field name if needed
const formattedDate = new Date(appoin.app_date).toLocaleDateString('en-GB'); // dd/mm/yyyy

console.log(appoin)
if (!appoin) {
  return res.status(404).json({ message: "Visitor not found" });
}

// Email content
// const clientName = existingRequest.name || "hlo"; 

await sendEmail(
appoin.email_id,
"Your Visitor Request Status",
`     <h3>Dear ${appoin.name},</h3>     <p>Your appointment request for <strong>${formattedDate}</strong> has been <strong>${status}</strong>.</p>     <p>Regards,<br/>Interior Aura</p>
  `
);


return res.status(200).json({
  message: `Status updated from ${previousStatus} to ${status} and email sent successfully.`,
  request: existingRequest
});

} catch (error) {
console.error('Error updating request status:', error.message);
res.status(500).json({ error: 'Server Error' });
  }
};
