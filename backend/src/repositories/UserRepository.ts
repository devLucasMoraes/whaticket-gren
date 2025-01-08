import { appDataSource } from "../database/data-source";
import { User } from "../entities/User";
import { BaseRepository, Page, PageRequest } from "./BaseRepository";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    const repository = appDataSource.getRepository(User);
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findAllPaginated(pageRequest?: PageRequest): Promise<Page<User>> {
    return this.paginate(
      pageRequest,
      {},
      {
        queues: true,
        whatsapp: true,
      }
    );
  }

  async findByEmailPaginated(
    email: string,
    pageRequest?: PageRequest
  ): Promise<Page<User>> {
    return this.paginate(
      pageRequest,
      { email },
      {
        queues: true,
        whatsapp: true,
      }
    );
  }
}
