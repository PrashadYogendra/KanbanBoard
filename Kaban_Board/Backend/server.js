const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const AuthRoutes = require('./Routes/AuthRoutes');
const BoardRoutes = require('./Routes/BoardRoutes');
const ListRoutes = require('./Routes/ListRoutes');
const CardRoutes = require('./Routes/CardRoutes');






dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI;


mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


app.use('/user/auth',AuthRoutes);
app.use('/api/boards',BoardRoutes);
app.use('/api/lists',ListRoutes);
app.use('/api/cards',CardRoutes)







const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
