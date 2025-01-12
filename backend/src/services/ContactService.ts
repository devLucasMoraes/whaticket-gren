import { Contact } from "../entities/Contact";
import { Page, PageRequest } from "../repositories/BaseRepository";
import { CrudService } from "./CrudService";

export interface ContactService extends CrudService<number, Contact> {
  listPaginated(pageRequest?: PageRequest): Promise<Page<Contact>>;
}
