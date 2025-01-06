import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Ticket } from "./Ticket";
import UserQueue from "./UserQueue";
import { Whatsapp } from "./Whatsapp";

@Entity("queues")
export class Queue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, unique: true })
  name: string;

  @Column({ type: "varchar", length: 255, unique: true })
  color: string;

  @Column({ type: "text", nullable: true })
  greetingMessage: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Ticket, (ticket) => ticket.queue)
  tickets: Ticket[];

  @OneToMany(() => UserQueue, (userQueue) => userQueue.queue)
  userQueues: UserQueue[];

  @OneToMany(() => Whatsapp, (whatsapp) => whatsapp.queues)
  whatsapps: Whatsapp[];

  constructor(data?: Partial<Queue>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
