const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['vendor', 'customer'], required: true },
    location: String,
    latitude: Number,
    longitude: Number,
    services: { type: [String], default: [] }, // Only for vendors
});

module.exports = mongoose.model('User', UserSchema);
