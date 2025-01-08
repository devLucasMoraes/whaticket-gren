import { RequestHandler } from "express";
import { Queue } from "../entities/Queue";
import { User } from "../entities/User";
import { Whatsapp } from "../entities/Whatsapp";
import { pageable } from "../helpers/pageable";
import { UserCreateSchema, UserUpdateSchema } from "../schemas/user.schemas";
import { UserService } from "../services/UserService";

export class UserController {
  constructor(private readonly userService: UserService) {}

  list: RequestHandler = async (req, res) => {
    const { page, size, sort } = req.query;
    // arrumar isso aqui depois para fazer a verificação de tipo com o zod
    const result = await this.userService.listPaginated(
      pageable(page as string, size as string, sort as string | string[])
    );
    res.status(200).json(result);
  };

  create: RequestHandler = async (req, res) => {
    const {
      email,
      name,
      password,
      queueIds,
      profile,
      whatsappId,
    }: UserCreateSchema = req.body;

    const user = new User({
      email,
      name,
      password,
      profile,
      whatsapp: whatsappId ? new Whatsapp({ id: whatsappId }) : undefined,
      queues: queueIds?.map((queueId) => {
        return new Queue({ id: queueId });
      }),
    });

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
    const {
      email,
      name,
      password,
      profile,
      whatsappId,
      queueIds,
    }: UserUpdateSchema = req.body;

    const user = new User({
      email,
      name,
      password,
      profile,
      whatsapp: whatsappId ? new Whatsapp({ id: whatsappId }) : undefined,
      queues: queueIds?.map((queueId) => {
        return new Queue({ id: queueId });
      }),
    });

    const updatedUser = await this.userService.update(id, user);

    res.status(200).json(updatedUser);
  };

  delete: RequestHandler = async (req, res) => {
    const { id } = req.params;

    await this.userService.delete(id);

    res.status(204).send();
  };
}
