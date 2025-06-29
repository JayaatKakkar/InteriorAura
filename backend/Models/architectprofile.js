const mongoose = require('mongoose');

const ArchitectProfileSchema = new mongoose.Schema({
  architect_name: { type: String, required: true },
  architectlogin_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Architect', required: true },
  qualification: { type: String, required: true },
  experience: { type: String, required: true },
  about: { type: String, required: true },
  email_id: { type: String, required: true },
  website: { type: String, required: true },
  company_name: { type: String, required: true },
  mobile_number: { type: String, required: true },
  facebook_id: { type: String, required: true },
  instagram_id: { type: String, required: true },
  architect_image: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

ArchitectProfileSchema.pre('save', async function(next) {
  const existingProfile = await mongoose.model('ArchitectProfile').findOne({ architectlogin_id: this.architectlogin_id });
  if (existingProfile) next(new Error('Architect can only create one profile')); else next();
});

module.exports = mongoose.model('ArchitectProfile', ArchitectProfileSchema);
