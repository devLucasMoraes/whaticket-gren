import { Whatsapp } from "../entities/Whatsapp";
import { CrudService } from "./CrudService";

export interface WhatsappService extends CrudService<number, Whatsapp> {}
