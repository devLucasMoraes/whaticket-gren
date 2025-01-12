import { appDataSource } from "../database/data-source";
import { Queue } from "../entities/Queue";
import { Whatsapp } from "../entities/Whatsapp";
import { ContactRepository } from "./ContactRepository";
import { QuickAnswerRepository } from "./QuickAnswerRepository";
import { TicketRepository } from "./TicketRepository";
import { UserRepository } from "./UserRepository";

export const queueRepository = appDataSource.getRepository(Queue);
export const whatsappRepository = appDataSource.getRepository(Whatsapp);
export const userRepository = new UserRepository();
export const quickAnswerRepository = new QuickAnswerRepository();
export const ticketRepository = new TicketRepository();
export const contactRepository = new ContactRepository();
