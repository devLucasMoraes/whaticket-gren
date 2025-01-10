import { Whatsapp } from "../entities/Whatsapp";
import { CrudService } from "./CrudService";

export interface WhatsappService extends CrudService<number, Whatsapp> {
  GetDefaultWhatsApp(): Promise<Whatsapp>;
  GetWhatsAppByUserId(userId: string): Promise<Whatsapp | null>;
}
