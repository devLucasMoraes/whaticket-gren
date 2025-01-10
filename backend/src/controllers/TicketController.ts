import { RequestHandler } from "express";
import { Contact } from "../entities/Contact";
import { Queue } from "../entities/Queue";
import { Ticket } from "../entities/Ticket";
import { User } from "../entities/User";
import { Whatsapp } from "../entities/Whatsapp";
import { pageable } from "../helpers/pageable";
import { TicketService } from "../services/TicketService";

export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  list: RequestHandler = async (req, res) => {
    const { page, size, sort } = req.query;

    const result = await this.ticketService.listPaginated(
      pageable(page as string, size as string, sort as string | string[])
    );

    res.status(200).json(result);
  };

  create: RequestHandler = async (req, res) => {
    const { contactId, status, userId, queueId, whatsappId } = req.body;

    const ticket = new Ticket({
      contact: new Contact({ id: contactId }),
      user: new User({ id: userId }),
      queue: new Queue({ id: queueId }),
      whatsapp: new Whatsapp({ id: whatsappId }),
      status,
    });

    const newTicket = await this.ticketService.create(ticket);

    res.status(201).json(newTicket);
  };

  show: RequestHandler = async (req, res) => {
    const { ticketId } = req.params;

    const ticket = await this.ticketService.show(parseInt(ticketId));

    res.status(200).json(ticket);
  };

  update: RequestHandler = async (req, res) => {
    const { ticketId } = req.params;
    const { contactId, status, userId, queueId, whatsappId, id } = req.body;

    const ticket = new Ticket({
      id,
      contact: new Contact({ id: contactId }),
      user: new User({ id: userId }),
      queue: new Queue({ id: queueId }),
      whatsapp: new Whatsapp({ id: whatsappId }),
      status,
    });

    const updatedTicket = await this.ticketService.update(
      parseInt(ticketId),
      ticket
    );

    res.status(200).json(updatedTicket);
  };

  delete: RequestHandler = async (req, res) => {
    const { ticketId } = req.params;

    await this.ticketService.delete(parseInt(ticketId));

    res.status(204).send();
  };
}
