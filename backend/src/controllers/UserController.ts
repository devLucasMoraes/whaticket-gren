import { RequestHandler } from "express";
import { User } from "../entities/User";
import { UserCreateSchema, UserUpdateSchema } from "../schemas/user.schemas";
import { UserService } from "../services/UserService";

export class UserController {
  constructor(private readonly userService: UserService) {}

  create: RequestHandler = async (req, res) => {
    const { email, name, password }: UserCreateSchema = req.body;

    const user = new User({ email, name, password });

    const newUser = await this.userService.create(user);

    res.status(201).json(newUser);
  };

  show: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const user = await this.userService.show(id);

    res.status(200).json(user);
  };

  update: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { email, name, password }: UserUpdateSchema = req.body;

    const user = new User({ email, name, password });

    const updatedUser = await this.userService.update(id, user);

    res.status(200).json(updatedUser);
  };

  delete: RequestHandler = async (req, res) => {
    const { id } = req.params;

    await this.userService.delete(id);

    res.status(204).send();
  };
}
