import { AppDataSource } from "../database/data-source";
import { Queue } from "../entities/Queue";

export const queueRepository = AppDataSource.getRepository(Queue);
