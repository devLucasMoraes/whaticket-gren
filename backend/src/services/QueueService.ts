import { Queue } from "../entities/Queue";
import { CrudService } from "./CrudService";

export interface QueueService extends CrudService<number, Queue> {}
