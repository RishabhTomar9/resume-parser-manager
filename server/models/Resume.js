const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  name: String,
  skills: String,
  experience: String,
  uploadedAt: { type: Date, default: Date.now },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Resume', resumeSchema);
