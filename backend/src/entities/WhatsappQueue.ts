import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Queue } from "./Queue";
import { Whatsapp } from "./Whatsapp";

@Entity("whatsapp_queues")
export class WhatsappQueue {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Whatsapp, (whatsapp) => whatsapp.whatsappQueues)
  whatsapp: Whatsapp;

  @ManyToOne(() => Queue, (queue) => queue.whatsappQueues)
  queue: Queue;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
