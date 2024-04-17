import express from 'express';
import rateLimit from 'express-rate-limit';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import pkg from 'mongoose';
const { Promise } = pkg;
import dotenv from 'dotenv';

import router from './router/index.js';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });
console.log(`Running in ${process.env.NODE_ENV} mode`);

/**
 * Rate limiter middleware to limit the number of requests per IP
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per 15 minutes per IP
  message: 'Too many requests from this IP, please try again after some time',
});

// Express app
const app = express();
if (process.env.RATE_LIMITING === 'TRUE') {
  app.use(limiter);
}
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// HTTP server
const server = http.createServer(app);

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});

// MongoDB connection
const MONGO_URL = 'mongodb://localhost:27017/DuckPond';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.log('Error connecting to MongoDB', err);
});

app.use('/', router());
