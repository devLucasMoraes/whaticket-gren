import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError, UnauthorizedError } from "../errors/AppError";
import { userRepository } from "../repositories/userRepository";

export const isAuth: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError("Missing authorization header");
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET ?? "") as {
      id: string;
    };
    const user = await userRepository.findOneBy({ id });

    if (!user) {
      throw new BadRequestError("User not found");
    }

    const { password: _, ...loggedUser } = user;

    req.user = loggedUser;
  } catch (err) {
    throw new BadRequestError("Invalid token");
  }

  next();
};
