import { appDataSource } from "../database/data-source";
import { Ticket } from "../entities/Ticket";
import { BaseRepository, Page, PageRequest } from "./BaseRepository";

export class TicketRepository extends BaseRepository<Ticket> {
  constructor() {
    const repository = appDataSource.getRepository(Ticket);
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findAllPaginated(pageRequest?: PageRequest): Promise<Page<Ticket>> {
    return this.paginate(pageRequest);
  }
}
