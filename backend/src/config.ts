import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

interface Config {
  port: number;
  mongoURI: string;
  jwtSecret: string;
}

const config: Config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  mongoURI: process.env.MONGO_URI || '',
  jwtSecret: process.env.JWT_SECRET || '',
};

if (!config.mongoURI) {
  throw new Error('Missing MONGO_URI environment variable');
}

if (!config.jwtSecret) {
  throw new Error('Missing JWT_SECRET environment variable');
}

export default config;
