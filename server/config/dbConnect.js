const mongoose = require('mongoose');
const Vendor = require('../models/userModel')

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));




module.exports = mongoose;
