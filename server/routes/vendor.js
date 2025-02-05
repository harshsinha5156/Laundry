const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/userModel');

const router = express.Router();

// Get all vendors
router.get('/', async (req, res) => {
    try {
        const vendors = await User.find({ role: 'vendor' });
        res.json(vendors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Search vendors by location or services
router.get('/search', async (req, res) => {
    const { location, service } = req.query;
    let query = {};
    if (location) query.location = location;
    if (service) query.services = service;
    console.log(query);

    try {
        const vendors = await User.find({ role: 'vendor', ...query });
        res.json(vendors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get unique vendor locations & services
router.get('/list', async (req, res) => {
    try {
        const vendors = await User.find({ role: 'vendor' });
        res.json(vendors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Search vendors by nearby location 
router.get('/nearby', async (req, res) => {
    const { latitude, longitude } = req.query;
    console.log(latitude, longitude);
    if (!latitude || !longitude) return res.status(400).json({ message: "Coordinates required" });

    try {
        const vendors = await User.find({ role: 'vendor' });
        const nearbyVendors = vendors.filter(vendor => {
            const distance = Math.sqrt(Math.pow(vendor.latitude - latitude, 2) + Math.pow(vendor.longitude - longitude, 2));
            return distance < 0.1; // Adjust threshold as needed
        });

        res.json(nearbyVendors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Update vendor services
// router.put('/update-services', authMiddleware,  async (req, res) => {
//     if (req.user.role !== 'vendor') return res.status(403).json({ message: "Access denied" });
//     console.log(req.body);
//     try {
//         console.log(req.body.service)
//         const updatedVendor = await User.findByIdAndUpdate(
//             req.user.id, 
//             { $push: { services: req.body.service } },
//             { new: true, runValidators: true }
//         );
//         console.log(updatedVendor);
//         res.json(updatedVendor);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });
router.put("/update-services", authMiddleware, async (req, res) => {
    try {
        console.log("Updating services")
        // Ensure only vendors can update services
        if (req.user.role !== "vendor") {
            return res.status(403).json({ message: "Access denied. Only vendors can update services." });
        }
        req.body.service = [req.body.service]
        console.log(req.body.service)

        // Validate request body
        if (!req.body.service || !Array.isArray(req.body.service)) {
            return res.status(400).json({ message: "Invalid data. 'services' must be an array of strings." });
        }
        console.log("Services update")
        // Update vendor's services
        const updatedVendor = await User.findByIdAndUpdate(
            req.user.id,
            { $push: { services: req.body.service } },
            { new: true, runValidators: true }
        );
        console.log(updatedVendor);
        if (!updatedVendor) {
            return res.status(404).json({ message: "Vendor not found." });
        }
        res.json(updatedVendor);
        // res.status(200).json({ message: "Services updated successfully", updatedVendor });
    } catch (err) {
        console.error("Error updating services:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
