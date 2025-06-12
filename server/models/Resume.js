const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fileUrl: String,
  parsedData: {
    name: String,
    email: String,
    phone: String,
    skills: [String],
    experience: String,
    education: [String],
  },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Resume", resumeSchema);
