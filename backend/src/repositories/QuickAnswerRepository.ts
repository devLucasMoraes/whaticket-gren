import { appDataSource } from "../database/data-source";
import { QuickAnswer } from "../entities/QuickAnswer";
import { BaseRepository, Page, PageRequest } from "./BaseRepository";

export class QuickAnswerRepository extends BaseRepository<QuickAnswer> {
  constructor() {
    const repository = appDataSource.getRepository(QuickAnswer);
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findAllPaginated(
    pageRequest?: PageRequest
  ): Promise<Page<QuickAnswer>> {
    return this.paginate(pageRequest);
  }
}
