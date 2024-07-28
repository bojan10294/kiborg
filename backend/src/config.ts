import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

interface Config {
  port: number;
  mongoURI: string;
  jwtSecret: string;
  refreshTokenSecret: string;
  jwtExpiration: string;
  refreshTokenExpiration: string;
}

const config: Config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  mongoURI: process.env.MONGO_URI || '',
  jwtSecret: process.env.JWT_SECRET || '',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || '',
  jwtExpiration: process.env.JWT_EXPIRATION || '1h', // Default to 1 hour
  refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || '7d', // Default to 7 days
};

if (!config.mongoURI) {
  throw new Error('Missing MONGO_URI environment variable');
}

if (!config.jwtSecret) {
  throw new Error('Missing JWT_SECRET environment variable');
}

if (!config.refreshTokenSecret) {
  throw new Error('Missing REFRESH_TOKEN_SECRET environment variable');
}

export default config;
