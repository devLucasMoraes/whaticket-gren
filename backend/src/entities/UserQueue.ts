import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Queue } from "./Queue";
import { User } from "./User";

@Entity("user_queues")
class UserQueue {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userQueues)
  user: User;

  @ManyToOne(() => Queue, (queue) => queue.userQueues)
  queue: Queue;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}

export default UserQueue;
