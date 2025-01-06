import { RequestHandler } from "express";
import { Queue } from "../entities/Queue";
import { QueueCreateSchema, QueueUpdateSchema } from "../schemas/queue.schemas";
import { QueueService } from "../services/QueueService";

export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  create: RequestHandler = async (req, res) => {
    const { color, name, greetingMessage }: QueueCreateSchema = req.body;

    const queue = new Queue({ name, color, greetingMessage });

    const newQueue = await this.queueService.create(queue);

    res.status(201).json(newQueue);
  };

  show: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const queue = await this.queueService.show(parseInt(id));

    res.status(200).json(queue);
  };

  update: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { name, color, greetingMessage }: QueueUpdateSchema = req.body;

    const queue = new Queue({ name, color, greetingMessage });

    const updatedQueue = await this.queueService.update(parseInt(id), queue);

    res.status(200).json(updatedQueue);
  };

  delete: RequestHandler = async (req, res) => {
    const { id } = req.params;

    await this.queueService.delete(parseInt(id));

    res.sendStatus(204).send();
  };

  list: RequestHandler = async (req, res) => {
    const queues = await this.queueService.list();

    res.status(200).json(queues);
  };
}
