import { Response } from "express";
export type AuthResponse = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
  refreshToken: string;
};

export type TokenPayload = {
  id: string;
  tokenVersion: number;
};

export interface AuthService {
  authUser(email: string, password: string): Promise<AuthResponse>;
  refreshAccessToken(token: string, res: Response): Promise<AuthResponse>;
}
