import { Ticket } from "../entities/Ticket";
import { Page, PageRequest } from "../repositories/BaseRepository";
import { CrudService } from "./CrudService";

export interface TicketService extends CrudService<number, Ticket> {
  listPaginated(pageRequest?: PageRequest): Promise<Page<Ticket>>;
}
