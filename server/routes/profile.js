const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const User = require("../models/userModel");

router.get("/", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

module.exports = router;
