import { AppDataSource } from "../database/data-source";
import { Queue } from "../entities/Queue";
import { Whatsapp } from "../entities/Whatsapp";
import { UserRepository } from "./userRepository";

export const queueRepository = AppDataSource.getRepository(Queue);
export const whatsappRepository = AppDataSource.getRepository(Whatsapp);
export const userRepository = new UserRepository();
