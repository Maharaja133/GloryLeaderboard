const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/users');
const claimRoutes = require('./routes/claim');
const seedUsers = require('./seedUsers');

const app = express();

app.use(cors({
  origin: '*',
}));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/claim', claimRoutes);

mongoose.connect(process.env.MONGO_URI,).then(async () => {
  console.log('MongoDB connected');
  await seedUsers(); 
}).catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Leaderboard API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));