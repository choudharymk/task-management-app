const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
require('dotenv').config();

console.log('MONGO_URI:', process.env.MONGO_URI);

const app = express();
connectDB();

const allowedOrigins = [
    'https://task-management-app-frontend-o6n3rp43u-choudharymks-projects.vercel.app',
    'https://task-management-app-frontend-pgn9506hn-choudharymks-projects.vercel.app',
    'https://task-management-app-frontend-choudharymk-choudharymks-projects.vercel.app/',
    'https://task-management-app-frontend-choudharymks-projects.vercel.app/',
    'http://localhost:3000'
  ];
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }));


app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));