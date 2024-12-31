import { compare } from "bcrypt";
import { Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../../config/auth";
import { User } from "../../entities/User";
import { UnauthorizedError } from "../../errors/AppError";
import {
  createAccessToken,
  createRefreshToken,
} from "../../helpers/CreateTokens";
import { removeRefreshToken } from "../../utils/cookie";
import { AuthResponse, AuthService, TokenPayload } from "../AuthService";
import { UserService } from "../UserService";

export class AuthServiceImpl implements AuthService {
  constructor(private readonly userService: UserService) {}

  async refreshAccessToken(
    token: string,
    res: Response
  ): Promise<AuthResponse> {
    if (!token) {
      removeRefreshToken(res);
      throw new UnauthorizedError("No refresh token provided");
    }
    try {
      const decoded = verify(token, authConfig.refreshSecret) as TokenPayload;

      const user = await this.userService.show(decoded.id);

      if (user.tokenVersion !== decoded.tokenVersion) {
        removeRefreshToken(res);
        throw new UnauthorizedError("ERR_SESSION_EXPIRED");
      }

      return this.mapToAuthResponse(user);
    } catch (error) {
      removeRefreshToken(res);
      throw new UnauthorizedError("ERR_SESSION_EXPIRED");
    }
  }

  async authUser(email: string, password: string): Promise<AuthResponse> {
    const user = await this.userService.findByEmail(email);

    const verifyPassword = await compare(password, user.password);

    if (!verifyPassword) {
      throw new UnauthorizedError("Invalid password");
    }

    return this.mapToAuthResponse(user);
  }

  private mapToAuthResponse(user: User): AuthResponse {
    const { tokenVersion, ...userData } = user;
    const token = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    return {
      user: userData,
      token,
      refreshToken,
    };
  }
}
