import { RequestHandler } from "express";
import { loginSchema } from "../schemas/auth.schemas";
import { AuthService } from "../services/AuthService";
import { removeRefreshToken, sendRefreshToken } from "../utils/cookie";

export class SessionController {
  constructor(private readonly authService: AuthService) {}

  login: RequestHandler = async (req, res) => {
    const { email, password }: loginSchema = req.body;

    const authResult = await this.authService.authUser(email, password);

    sendRefreshToken(res, authResult.refreshToken);

    res.status(200).json({
      user: authResult.user,
      token: authResult.token,
    });
  };

  refresh: RequestHandler = async (req, res) => {
    const refreshToken = req.cookies.jrt;

    const authResponse = await this.authService.refreshAccessToken(
      refreshToken,
      res
    );

    sendRefreshToken(res, authResponse.refreshToken);

    res.status(200).json({
      user: authResponse.user,
      token: authResponse.token,
    });
  };

  logout: RequestHandler = async (req, res) => {
    removeRefreshToken(res);
    res.status(204).send();
  };
}
