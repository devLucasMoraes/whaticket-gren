import { AppDataSource } from "../database/data-source";
import { Whatsapp } from "../entities/Whatsapp";

export const whatsappRepository = AppDataSource.getRepository(Whatsapp);
