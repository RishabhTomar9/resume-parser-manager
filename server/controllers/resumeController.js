const Resume = require('../models/Resume');
const parseResume = require('../utils/parseResume');

exports.bulkUpload = async (req, res) => {
  try {
    console.log(`[API] Received ${req.files.length} files`);
    let saved = 0;

    for (const file of req.files) {
      const data = await parseResume(file.buffer);
      const resume = new Resume(data);
      await resume.save();
      saved++;
      console.log(`[DB] Resume ${saved} saved`);
    }

    res.json({ saved });
  } catch (err) {
    console.error("[API] Bulk upload failed:", err);
    res.status(500).json({ error: 'Failed bulk upload' });
  }
};
