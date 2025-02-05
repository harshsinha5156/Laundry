require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/dbConnect'); // MongoDB connection
const app = express();

app.use(cors());
app.use(bodyParser.json());

const vendorRoutes = require('./routes/vendor');
app.use('/vendors', vendorRoutes);

const orderRoutes = require('./routes/orders');

app.use('/orders', orderRoutes);

const profileRoutes = require('./routes/profile');

app.use('/profile', profileRoutes);

const authRoutes = require('./routes/auth');

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
