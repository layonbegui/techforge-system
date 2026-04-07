import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export const authMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: 'Token não informado.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const payload = jwt.verify(token, env.jwtSecret) as { sub: string };
    request.userId = payload.sub;
    next();
  } catch {
    return response.status(401).json({ message: 'Token inválido.' });
  }
};
