const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
require("dotenv").config();
const app = express();

app.use(cors({
  origin: ['http://localhost:5173','http://localhost:5000'], // or your client's URL
  credentials: true
}));
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
console.log(process.env.PORT);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});