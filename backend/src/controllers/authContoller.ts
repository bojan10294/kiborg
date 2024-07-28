import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import RefreshToken from '../models/RefreshToken';
import config from '../config';

const { jwtSecret, refreshTokenSecret, jwtExpiration, refreshTokenExpiration } = config;

const generateToken = (payload: object, secret: string, expiresIn: string) => {
  return jwt.sign(payload, secret, { expiresIn });
};

const generateRefreshToken = async (userId: string) => {
  const token = generateToken({ userId }, refreshTokenSecret, refreshTokenExpiration);
  const expires = new Date();
  expires.setDate(expires.getDate() + parseInt(refreshTokenExpiration));

  const refreshToken = new RefreshToken({ userId, token, expires });
  await refreshToken.save();

  return token;
};

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    user = new User({ name, email, password });
    await user.save();

    const payload = { userId: user.id };
    const token = generateToken(payload, jwtSecret, jwtExpiration);
    const refreshToken = await generateRefreshToken(user.id);

    res.status(201).json({ success: true, token, refreshToken });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const payload = { userId: user.id };
    const token = generateToken(payload, jwtSecret, jwtExpiration);
    const refreshToken = await generateRefreshToken(user.id);

    res.json({ success: true, token, refreshToken, name: user.name });
  } catch (error) {
    console.error('Server error', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  try {
    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token is required' });
    }

    const decoded: any = jwt.verify(refreshToken, refreshTokenSecret);

    const savedRefreshToken = await RefreshToken.findOne({ token: refreshToken, userId: decoded.userId });
    if (!savedRefreshToken) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    const payload = { userId: decoded.userId };
    const newAccessToken = generateToken(payload, jwtSecret, jwtExpiration);

    res.json({ success: true, token: newAccessToken });
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired refresh token' });
  }
};
