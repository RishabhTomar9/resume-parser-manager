const express = require('express');
const router = express.Router();
const multer = require('multer');
const { spawn } = require('child_process');
const Resume = require('../models/Resume');
const User = require('../models/User');
const auth = require('../middlewares/authMiddleware');
const path = require('path');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', auth, upload.single('file'), async (req, res) => {
  const filePath = path.join(__dirname, '..', req.file.path);

  const python = spawn('python', ['parser/resume_parser.py', filePath]);

  let data = '';
  python.stdout.on('data', (chunk) => {
    data += chunk.toString();
  });

  python.stderr.on('data', (err) => {
    console.error('Python error: ', err.toString());
  });

  python.on('close', async () => {
    const parsedData = eval("(" + data + ")");
    fs.unlinkSync(filePath); // remove uploaded file

    let user = await User.findOne({ googleId: req.user.sub });
    if (!user) {
      user = await User.create({
        googleId: req.user.sub,
        name: req.user.name,
        email: req.user.email,
        picture: req.user.picture,
      });
    }

    const resume = new Resume({ ...parsedData, uploadedBy: user._id });
    await resume.save();
    res.json(resume);
  });
});

router.get('/', auth, async (req, res) => {
  const resumes = await Resume.find().populate('uploadedBy', 'name email');
  res.json(resumes);
});

module.exports = router;
