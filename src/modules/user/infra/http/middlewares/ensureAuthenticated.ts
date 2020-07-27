import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AuthConfig from '@config/auth';
import AppError from '@shared/errors/appErrors';

interface TokenPayload {
  iat: number;
  exp: string;
  sub: string;
}

export default function ensureUserAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('JWT Token is missing', 401);

  const [, token] = authHeader.split(' ');

  try {
    const decode = verify(token, AuthConfig.jwt.secret);
    const { sub } = decode as TokenPayload;
    request.user = {
      id: sub,
    };
    next();
  } catch {
    throw new AppError('Invalid JWT Token', 401);
  }
}
