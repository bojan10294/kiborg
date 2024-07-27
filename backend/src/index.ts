import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import errorHandler from './middleware/errorHandler';
import morgan from 'morgan';

const app = express();
const { port, mongoURI } = config;

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Middleware to sanitize user input
app.use(mongoSanitize());

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

app.use('/api/auth', authRoutes); // Public routes for registration and login
app.use('/api', userRoutes); // Protected routes

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Error handler middleware
app.use(errorHandler);
app.use(morgan('combined'));
