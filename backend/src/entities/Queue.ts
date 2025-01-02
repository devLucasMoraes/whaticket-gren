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
import { WhatsappQueue } from "./WhatsappQueue";

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

  @OneToMany(() => WhatsappQueue, (whatsappQueue) => whatsappQueue.queue)
  whatsappQueues: WhatsappQueue[];

  @OneToMany(() => UserQueue, (userQueue) => userQueue.queue)
  userQueues: UserQueue[];
}
