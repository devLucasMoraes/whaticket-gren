import { Queue } from "../../entities/Queue";
import { BadRequestError, NotFoundError } from "../../errors/AppError";
import { queueRepository } from "../../repositories";
import { QueueService } from "../QueueService";

export class QueueServiceImpl implements QueueService {
  async list(): Promise<Queue[]> {
    return await queueRepository.find();
  }

  async show(id: number): Promise<Queue> {
    const queueExists = await queueRepository.findOneBy({ id });

    if (!queueExists) {
      throw new NotFoundError("ERR_QUEUE_NOT_FOUND");
    }

    return queueExists;
  }

  async create(entity: Queue): Promise<Queue> {
    const { name, color } = entity;

    const queueExists = await queueRepository.findOneBy({ name });

    if (queueExists) {
      throw new BadRequestError("ERR_QUEUE_INVALID_NAME");
    }

    const colorExists = await queueRepository.findOneBy({ color });

    if (colorExists) {
      throw new BadRequestError("ERR_QUEUE_INVALID_COLOR");
    }

    const newQueue = queueRepository.create(entity);
    return await queueRepository.save(newQueue);
  }

  async update(id: number, entity: Queue): Promise<Queue> {
    const queueExists = await queueRepository.findOneBy({ id });

    if (!queueExists) {
      throw new NotFoundError("ERR_QUEUE_NOT_FOUND");
    }

    const colorExists = await queueRepository.findOneBy({
      color: entity.color,
    });

    if (colorExists) {
      throw new BadRequestError("ERR_QUEUE_INVALID_COLOR");
    }

    const nameExists = await queueRepository.findOneBy({ name: entity.name });

    if (nameExists) {
      throw new BadRequestError("ERR_QUEUE_INVALID_NAME");
    }

    queueRepository.merge(queueExists, entity);

    return await queueRepository.save(queueExists);
  }

  async delete(id: number): Promise<void> {
    const queueExists = await queueRepository.findOneBy({ id });

    if (!queueExists) {
      throw new NotFoundError("ERR_QUEUE_NOT_FOUND");
    }

    await queueRepository.softDelete(id);

    return Promise.resolve();
  }
}
