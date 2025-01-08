import { User } from "../entities/User";
import { Page, PageRequest } from "../repositories/BaseRepository";
import { CrudService } from "./CrudService";

export interface UserService extends CrudService<string, User> {
  findByEmail(email: string): Promise<User>;
  listPaginated(pageRequest?: PageRequest): Promise<Page<User>>;
}
