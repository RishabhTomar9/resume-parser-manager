// server/routes/admin.js

const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const authMiddleware = require('../middlewares/authMiddleware');

// Get full upload history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const history = await Resume.find().sort({ uploadedAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
