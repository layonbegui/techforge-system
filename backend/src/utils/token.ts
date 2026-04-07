import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export const signToken = (userId: string): string =>
  jwt.sign({ sub: userId }, env.jwtSecret, { expiresIn: '1d' });
