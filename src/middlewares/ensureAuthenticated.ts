import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AuthConfig from '../config/auth';

export default function ensureUserAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new Error('JWT Token is missing');

  const [, token] = authHeader.split(' ');

  try {
    const decode = verify(token, AuthConfig.jwt.secret);
    console.log(decode);
    next();
  } catch {
    throw new Error('Invalid JWT Token');
  }
}
