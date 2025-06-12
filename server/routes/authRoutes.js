const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/google-login", async (req, res) => {
  const { googleId, name, email, picture } = req.body;

  let user = await User.findOne({ googleId });

  if (!user) {
    user = new User({ googleId, name, email, picture });
    await user.save();
  }

  res.json({ message: "User stored successfully", user });
});

module.exports = router;
