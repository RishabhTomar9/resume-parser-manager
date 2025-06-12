const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const axios = require("axios");  // <-- important

const resumeRoutes = require("./routes/resumeRoutes");
const authRoutes = require("./routes/authRoutes");
const Resume = require("./models/Resume"); // Import your MongoDB model

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/uploads", express.static("uploads"));

// Upload API with ML parser call
app.post("/upload", upload.single("resume"), async (req, res) => {
  const filePath = req.file.path;

  try {
    // Call ML parsing microservice
    const response = await axios.post("http://localhost:5001/parse", {
      file_path: filePath
    });

    const parsedData = response.data;

    // Store into MongoDB
    const newResume = new Resume({
      name: parsedData.name,
      email: parsedData.email,
      skills: parsedData.skills,
      experience: parsedData.experience,
      filePath: filePath
    });

    await newResume.save();

    res.json({
      message: "Resume uploaded, parsed and saved!",
      data: parsedData
    });

  } catch (err) {
    console.error("Error during parsing/upload:", err);
    res.status(500).json({ message: "Error parsing resume." });
  }
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
