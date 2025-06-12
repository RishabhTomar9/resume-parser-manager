const express = require("express");
const router = express.Router();
const Resume = require("../models/Resume");
const multer = require("multer");
const User = require("../models/User");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Resume upload route
router.post("/upload", upload.single("resume"), async (req, res) => {
  const { googleId } = req.body;
  const file = req.file;
  const user = await User.findOne({ googleId });

  if (!user) return res.status(404).json({ message: "User not found" });

  try {
    const formData = new FormData();
    formData.append("resume", fs.createReadStream(file.path));

    const response = await axios.post("http://localhost:5001/parse_resume", formData, {
      headers: formData.getHeaders(),
    });

    const data = response.data;

    const newResume = new Resume({
      uploader: user._id,
      fileUrl: file.path,
      parsedData: {
        name: data.name,
        email: data.email,
        phone: data.mobile_number,
        skills: data.skills,
        experience: data.total_experience,
        education: data.education,
      },
    });

    await newResume.save();
    res.json({ message: "Resume parsed and saved!", resume: newResume });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Resume parsing failed", error: err });
  }
});

// Admin: list all resumes
router.get("/list", async (req, res) => {
  const resumes = await Resume.find().populate("uploader", "name email");
  res.json(resumes);
});

// Admin: filter by skill
router.get("/filter", async (req, res) => {
  const { skill } = req.query;
  const resumes = await Resume.find({ "parsedData.skills": skill });
  res.json(resumes);
});

// Admin: full text search
router.get("/search", async (req, res) => {
  const { keyword } = req.query;
  const resumes = await Resume.find({
    $or: [
      { "parsedData.name": { $regex: keyword, $options: "i" } },
      { "parsedData.skills": { $regex: keyword, $options: "i" } },
      { "parsedData.education": { $regex: keyword, $options: "i" } },
    ],
  });
  res.json(resumes);
});

module.exports = router;
