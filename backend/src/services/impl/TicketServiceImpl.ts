import { Ticket } from "../../entities/Ticket";
import { BadRequestError, NotFoundError } from "../../errors/AppError";
import { ticketRepository } from "../../repositories";
import { Page, PageRequest } from "../../repositories/BaseRepository";
import { TicketService } from "../TicketService";
import { WhatsappService } from "../WhatsappService";

export class TicketServiceImpl implements TicketService {
  constructor(private readonly whatsappService: WhatsappService) {}
  async listPaginated(pageRequest?: PageRequest): Promise<Page<Ticket>> {
    return await ticketRepository.findAllPaginated(pageRequest);
  }
  list(): Promise<Ticket[]> {
    throw new Error("Method not implemented.");
  }
  async show(id: number): Promise<Ticket> {
    const ticketExists = await ticketRepository.findOne({
      where: { id },
      relations: {
        user: true,
        whatsapp: true,
        contact: true,
        queue: true,
      },
    });

    if (!ticketExists) {
      throw new NotFoundError("ERR_TICKET_NOT_FOUND");
    }

    return ticketExists;
  }
  async create(entity: Ticket): Promise<Ticket> {
    const { contact, user } = entity;

    const defaultWhatsapp = await this.whatsappService
      .GetWhatsAppByUserId(user.id)
      .then(async (whatsapp) => {
        if (!whatsapp) {
          return await this.whatsappService.GetDefaultWhatsApp();
        }
        return whatsapp;
      });

    const openTickets = await ticketRepository.findOneBy({
      contact,
      whatsapp: defaultWhatsapp,
      status: "open",
    });

    if (openTickets) {
      throw new BadRequestError("ERR_OTHER_OPEN_TICKET");
    }

    const newTicket = ticketRepository.create(entity);

    return await ticketRepository.save(newTicket);
  }
  async update(id: number, entity: Ticket): Promise<Ticket> {
    const { whatsapp, contact } = entity;

    if (id !== entity.id) {
      throw new BadRequestError("ERR_ID_MISMATCH");
    }

    const ticketExists = await ticketRepository.findOneBy({ id });

    if (!ticketExists) {
      throw new BadRequestError("ERR_TICKET_NOT_FOUND");
    }

    if (ticketExists.whatsapp.id !== whatsapp.id) {
      const openTickets = await ticketRepository.findOneBy({
        contact,
        whatsapp: whatsapp,
        status: "open",
      });

      if (openTickets) {
        throw new BadRequestError("ERR_OTHER_OPEN_TICKET");
      }
    }

    const oldStatus = ticketExists.status;
    const oldUserId = ticketExists.user.id;

    if (oldStatus === "closed") {
      const openTickets = await ticketRepository.findOneBy({
        contact: ticketExists.contact,
        whatsapp: ticketExists.whatsapp,
        status: "open",
      });

      if (openTickets) {
        throw new BadRequestError("ERR_OTHER_OPEN_TICKET");
      }
    }

    ticketRepository.merge(ticketExists, entity);

    const newTicket = await ticketRepository.save(ticketExists);

    if (newTicket.status === "closed") {
      const whatsapp = await this.whatsappService.show(
        ticketExists.whatsapp.id
      );

      const { farewellMessage } = whatsapp;

      if (farewellMessage) {
      }
    }
    return newTicket;
  }
  async delete(id: number): Promise<void> {
    const ticketExists = ticketRepository.findOneBy({ id });

    if (!ticketExists) {
      throw new NotFoundError("ERR_TICKET_NOT_FOUND");
    }

    await ticketRepository.softDelete(id);

    return Promise.resolve();
  }
}
