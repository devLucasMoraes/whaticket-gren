import { QuickAnswer } from "../entities/QuickAnswer";
import { Page, PageRequest } from "../repositories/BaseRepository";
import { CrudService } from "./CrudService";

export interface QuickAnswerService extends CrudService<number, QuickAnswer> {
  listPaginated(pageRequest?: PageRequest): Promise<Page<QuickAnswer>>;
}
