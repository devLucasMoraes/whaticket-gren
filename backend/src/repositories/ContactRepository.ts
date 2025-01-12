import { appDataSource } from "../database/data-source";
import { Contact } from "../entities/Contact";
import { BaseRepository, Page, PageRequest } from "./BaseRepository";

export class ContactRepository extends BaseRepository<Contact> {
  constructor() {
    const repository = appDataSource.getRepository(Contact);
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findAllPaginated(pageRequest?: PageRequest): Promise<Page<Contact>> {
    return this.paginate(pageRequest);
  }
}
