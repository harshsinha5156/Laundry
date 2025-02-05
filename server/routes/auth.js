const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const JWT_SECRET = "your_secret_key"; // Store this securely

// Register User
router.post('/register', [
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password, role, location, latitude, longitude, services } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ name, email, password: hashedPassword, role, location, latitude, longitude, services });

        await user.save();
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
        res.json({ token, user });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// Login User
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
        res.json({ token, user });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

module.exports = router;
