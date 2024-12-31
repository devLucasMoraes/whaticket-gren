import { Response } from "express";

const COOKIE_NAME = "jrt"; // jwt refresh token
const ONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in ms

export const sendRefreshToken = (res: Response, token: string): void => {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: ONE_DAY,
  });
};

export const removeRefreshToken = (res: Response): void => {
  res.clearCookie(COOKIE_NAME);
};
