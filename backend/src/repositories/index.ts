import { appDataSource } from "../database/data-source";
import { Queue } from "../entities/Queue";
import { Whatsapp } from "../entities/Whatsapp";
import { UserRepository } from "./UserRepository";

export const queueRepository = appDataSource.getRepository(Queue);
export const whatsappRepository = appDataSource.getRepository(Whatsapp);
export const userRepository = new UserRepository();
