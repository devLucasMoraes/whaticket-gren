export interface CrudService<ID, T> {
  list(): Promise<T[]>;
  show(id: ID): Promise<T>;
  create(entity: T): Promise<T>;
  update(id: ID, entity: T): Promise<T>;
  delete(id: ID): Promise<void>;
}
